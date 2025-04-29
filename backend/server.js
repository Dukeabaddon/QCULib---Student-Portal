const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const path = require('path');

// Add Oracle client to PATH
const oracleClientPath = 'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server\\bin';
process.env.PATH = `${oracleClientPath};${process.env.PATH}`;
console.log('Added Oracle client to PATH:', oracleClientPath);

// Initialize Oracle client
try {
  oracledb.initOracleClient();
  console.log('Oracle client initialized in Thick mode');
  // Fetch CLOBs as strings
  oracledb.fetchAsString = [ oracledb.CLOB ];
} catch (err) {
  console.error('Failed to initialize Oracle client:', err.message);
  process.exit(1);
}

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration
const dbConfig = {
  user: 'im101',
  password: 'password',
  connectString: 'localhost:1521/xe'
};

// Initialize database connection pool
let pool;

async function initializePool() {
  try {
    pool = await oracledb.createPool(dbConfig);
    console.log('Connection pool created successfully');
  } catch (err) {
    console.error('Error creating connection pool:', err);
    throw err;
  }
}

// Helper function to get a connection from the pool
async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (err) {
    console.error('Error getting connection from pool:', err);
    throw err;
  }
}

// Helper function to execute a query
async function executeQuery(query, params = [], options = {}) {
  let connection;
  try {
    connection = await getConnection();
    return await connection.execute(query, params, options);
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Import API routes
const booksApi = require('./booksapi');
const meetingApi = require('./meetingRoomsApi');
const registrationApi = require('./meetingRegistrationApi');

// API Routes

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const result = await executeQuery('SELECT SYSDATE FROM DUAL');
    res.json({
      message: 'Database connection successful',
      currentDate: result.rows[0][0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use the books API router
app.use('/api/books', booksApi(executeQuery));

// Mount Meeting Rooms API
app.use('/api/meeting', meetingApi(executeQuery));

// Mount the new registration route after existing meeting API
app.use('/api/meeting', registrationApi(executeQuery));

// Get student profile, now including numeric USER_ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const studentIdParam = req.params.id;

    const result = await executeQuery(
      `SELECT u.USER_ID, s.STUDENT_ID, s.FIRST_NAME, s.LAST_NAME, s.EMAIL, s.PHONE,
              s.STATUS, s.YEAR_LEVEL, s.BRANCH
       FROM STUDENTS s
       JOIN LIB_USER u ON u.STUDENT_ID = s.STUDENT_ID
       WHERE s.STUDENT_ID = :studentId`,
      [studentIdParam]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const row = result.rows[0];
    const userId = row[0];
    const studentId = row[1];
    const firstName = row[2];
    const lastName = row[3];
    const email = row[4];
    const phone = row[5];
    const status = row[6];
    const yearLevel = row[7];
    const branch = row[8];

    // Get borrowed books count
    const borrowedBooksResult = await executeQuery(
      `SELECT COUNT(*) FROM BORROWED_BOOKS bb
       JOIN BOOKS b ON bb.BOOK_ID = b.BOOK_ID
       WHERE bb.USER_ID = :userId
         AND bb.RETURN_DATE IS NULL
         AND b.TYPE = 'PHYSICAL'`,
      [userId]
    );

    // Get returned books count
    const returnedBooksResult = await executeQuery(
      `SELECT COUNT(*) FROM BORROWED_BOOKS bb
       JOIN BOOKS b ON bb.BOOK_ID = b.BOOK_ID
       WHERE bb.USER_ID = :userId
         AND bb.RETURN_DATE IS NOT NULL
         AND b.TYPE = 'PHYSICAL'`,
      [userId]
    );

    // Get borrowed equipment count
    const borrowedEquipmentResult = await executeQuery(
      `SELECT COUNT(*) FROM EQUIPMENT_REQUESTS er
       WHERE er.USER_ID = :userId
         AND er.STATUS = 'APPROVED'`,
      [userId]
    );

    const borrowedCount = borrowedBooksResult.rows[0][0];
    const returnedCount = returnedBooksResult.rows[0][0];
    const equipmentCount = borrowedEquipmentResult.rows[0][0];

    res.json({
      userId,
      id: studentId,
      firstName,
      lastName,
      email,
      phone,
      contactNumber: phone,
      status,
      year: yearLevel === 1 ? '1st Year'
           : yearLevel === 2 ? '2nd Year'
           : yearLevel === 3 ? '3rd Year'
           : yearLevel === 4 ? '4th Year'
           : 'Unknown',
      branch,
      borrowedBooksCount: borrowedCount,
      returnedBooksCount: returnedCount,
      borrowedEquipmentCount: equipmentCount
    });
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get books
app.get('/api/books', async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const result = await executeQuery(
      `SELECT b.BOOK_ID, b.TITLE, b.AUTHOR, b.PUBLICATION_YEAR, b.GENRE,
              b.PUBLISHER, b.ISBN, b.EDITION, b.LANGUAGE, b.MATERIAL_TYPE,
              b.PAGES, b.DESCRIPTION, b.TOTAL_COPIES, b.AVAILABLE_COPIES,
              b.LOCATION, b.SHELF_LOCATION, b.KEYWORDS, b.COVER_IMAGE_URL,
              b.BORROWING_PERIOD, b.LATE_FEE, b.IS_RESERVED, b.FILE_FORMAT,
              b.DOWNLOAD_LIMIT, b.TYPE,
              bb.BORROW_DATE, bb.DUE_DATE, bb.RETURN_DATE, bb.LATE_FEE_ACC,
              bb.RENEWS_LEFT, bb.DAYS_LEFT,
              CASE WHEN bb.RETURN_DATE IS NOT NULL THEN 'returned' ELSE 'borrowed' END AS STATUS
       FROM BOOKS b
       JOIN BORROWED_BOOKS bb ON b.BOOK_ID = bb.BOOK_ID
       WHERE bb.USER_ID = :userId
       ORDER BY bb.DUE_DATE`,
      [userId]
    );

    const books = result.rows.map(row => ({
      id: row[0],
      title: row[1],
      author: row[2],
      publicationYear: row[3],
      genre: row[4],
      publisher: row[5],
      isbn: row[6],
      edition: row[7],
      language: row[8],
      materialType: row[9],
      pages: row[10],
      description: row[11],
      totalCopies: row[12],
      availableCopies: row[13],
      location: row[14],
      shelfLocation: row[15],
      keywords: row[16] ? row[16].split(',') : [],
      coverImageUrl: row[17],
      borrowingPeriod: row[18],
      lateFee: `₱${row[19]}.00`,
      isReserved: row[20] === 'Y',
      fileFormat: row[21],
      downloadLimit: row[22],
      type: row[23].toLowerCase(),
      borrowDate: row[24],
      dueDate: row[25],
      returnDate: row[26],
      lateFeeAccumulated: row[27] ? `₱${row[27]}.00` : '₱0.00',
      renewsLeft: row[28],
      daysLeft: row[29],
      status: row[30],
      branch: row[14], // Using location as branch for simplicity
      useMockImage: true
    }));

    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get equipment
app.get('/api/equipment', async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT e.EQUIP_ID, e.TYPE, e.MODEL, e.STATUS, e.BORROWED_UNTIL
       FROM EQUIPMENT e
       ORDER BY e.EQUIP_ID`
    );

    const equipment = result.rows.map(row => ({
      id: `EQ${row[0].toString().padStart(3, '0')}`,
      type: row[1],
      model: row[2],
      status: row[3].toLowerCase(),
      borrowedUntil: row[4],
      useMockImage: true
    }));

    res.json(equipment);
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get equipment requests for a user
app.get('/api/equipment/requests', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId, 10);
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const result = await executeQuery(
      `SELECT er.REQUEST_ID, er.EQUIP_ID, eq.TYPE, eq.MODEL, er.STATUS, er.DURATION, er.REQUEST_DATE, eq.BORROWED_UNTIL
       FROM EQUIPMENT_REQUESTS er
       JOIN EQUIPMENT eq ON er.EQUIP_ID = eq.EQUIP_ID
       WHERE er.USER_ID = :userId
       ORDER BY er.REQUEST_DATE DESC`,
      [userId]
    );
    const requests = result.rows.map(row => ({
      requestId: row[0],
      equipId: 'EQ' + row[1].toString().padStart(3, '0'),
      type: row[2],
      model: row[3],
      status: row[4].toLowerCase(),
      duration: row[5],
      requestDate: row[6],
      borrowedUntil: row[7]
    }));
    res.json(requests);
  } catch (err) {
    console.error('Error fetching equipment requests:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Submit a new equipment request
app.post('/api/equipment/request', async (req, res) => {
  try {
    const { userId, equipId, purpose, duration } = req.body;
    if (!userId || !equipId || !purpose || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Parse numeric equipment ID
    const eqId = parseInt(equipId.replace(/^EQ0*/, ''), 10);
    await executeQuery(
      `INSERT INTO EQUIPMENT_REQUESTS (USER_ID, EQUIP_ID, PURPOSE, DURATION)
       VALUES (:userId, :eqId, :purpose, :duration)`,
      [userId, eqId, purpose, duration],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Equipment request submitted' });
  } catch (err) {
    console.error('Error submitting equipment request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get notifications for a user
app.get('/api/notifications', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId, 10);
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    // Build dynamic query with optional filters
    let sql = `
      SELECT NOTIF_ID, TYPE, TITLE, MESSAGE, STATUS, NOTIF_DATE, IS_READ
      FROM NOTIFICATIONS
      WHERE USER_ID = :userId
    `;
    const binds = { userId };
    const typeFilter = req.query.type;
    const filterParam = req.query.filter;
    if (typeFilter && ['meeting_room', 'equipment', 'book'].includes(typeFilter)) {
      sql += ` AND TYPE = :notifType`;
      binds.notifType = typeFilter.toUpperCase();
    }
    if (filterParam === 'unread') {
      sql += ` AND IS_READ = 'N'`;
    }
    sql += ` ORDER BY NOTIF_DATE DESC`;

    const result = await executeQuery(sql, binds);
    const notes = result.rows.map(row => ({
      id: 'N' + row[0].toString().padStart(3, '0'),
      type: row[1].toLowerCase(),
      title: row[2],
      message: row[3] != null ? row[3].toString() : '',
      status: row[4].toLowerCase(),
      date: row[5],
      read: row[6] === 'Y'
    }));
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add endpoint to mark a notification as read
app.patch('/api/notifications/:id/read', async (req, res) => {
  try {
    const notifIdParam = req.params.id;
    const numericId = parseInt(notifIdParam.replace(/^N0*/, ''), 10);
    if (!numericId) {
      return res.status(400).json({ message: 'Invalid notification ID' });
    }
    await executeQuery(
      `UPDATE NOTIFICATIONS SET IS_READ = 'Y' WHERE NOTIF_ID = :notifId`,
      [numericId],
      { autoCommit: true }
    );
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
async function startServer() {
  try {
    await initializePool();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  try {
    console.log('Shutting down server...');
    if (pool) {
      await pool.close(0);
      console.log('Connection pool closed');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

// Start the server
startServer();
