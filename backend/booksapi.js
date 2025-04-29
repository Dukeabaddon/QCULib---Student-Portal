// Books API for Library Management System
const express = require('express');
const router = express.Router();

// Create a books API router
module.exports = function(executeQuery) {
  // Get all books (both physical and e-books)
  router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId;
      const type = req.query.type; // 'physical', 'ebook', or undefined for all
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      let query = `
        SELECT b.BOOK_ID, b.TITLE, b.AUTHOR, b.PUBLICATION_YEAR, b.GENRE, 
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
      `;
      
      // Add type filter if specified
      if (type) {
        query += ` AND b.TYPE = :type`;
      }
      
      // Add location filter for e-books
      if (type === 'ebook') {
        query += ` OR (b.LOCATION = 'Digital Library' AND bb.USER_ID = :userId)`;
      }
      
      query += ` ORDER BY bb.DUE_DATE`;
      
      const params = type ? [userId, type.toUpperCase()] : [userId];
      
      const result = await executeQuery(query, params);
      
      const books = result.rows.map(row => {
        // Determine if this is an e-book based on location
        const isEbook = row[14] === 'Digital Library';
        
        return {
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
          // Override type based on location for backward compatibility
          type: isEbook ? 'ebook' : 'physical',
          borrowDate: row[24],
          dueDate: row[25],
          returnDate: row[26],
          lateFeeAccumulated: row[27] ? `₱${row[27]}.00` : '₱0.00',
          renewsLeft: row[28],
          daysLeft: row[29],
          status: row[30],
          branch: row[14], // Using location as branch for simplicity
          useMockImage: true
        };
      });
      
      res.json(books);
    } catch (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get a specific book by ID
  router.get('/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      
      const result = await executeQuery(
        `SELECT b.BOOK_ID, b.TITLE, b.AUTHOR, b.PUBLICATION_YEAR, b.GENRE, 
                b.PUBLISHER, b.ISBN, b.EDITION, b.LANGUAGE, b.MATERIAL_TYPE, 
                b.PAGES, b.DESCRIPTION, b.TOTAL_COPIES, b.AVAILABLE_COPIES, 
                b.LOCATION, b.SHELF_LOCATION, b.KEYWORDS, b.COVER_IMAGE_URL, 
                b.BORROWING_PERIOD, b.LATE_FEE, b.IS_RESERVED, b.FILE_FORMAT, 
                b.DOWNLOAD_LIMIT, b.TYPE
         FROM BOOKS b
         WHERE b.BOOK_ID = :bookId`,
        [bookId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      const row = result.rows[0];
      // Determine if this is an e-book based on location
      const isEbook = row[14] === 'Digital Library';
      
      const book = {
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
        // Override type based on location for backward compatibility
        type: isEbook ? 'ebook' : 'physical',
        useMockImage: true
      };
      
      res.json(book);
    } catch (err) {
      console.error('Error fetching book:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get borrowed books for a user
  router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const type = req.query.type; // 'physical', 'ebook', or undefined for all
      
      let query = `
        SELECT b.BOOK_ID, b.TITLE, b.AUTHOR, b.PUBLICATION_YEAR, b.GENRE, 
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
      `;
      
      // Add type filter if specified
      if (type) {
        query += ` AND b.TYPE = :type`;
      }
      
      // Add location filter for e-books
      if (type === 'ebook') {
        query += ` OR (b.LOCATION = 'Digital Library' AND bb.USER_ID = :userId)`;
      }
      
      query += ` ORDER BY bb.DUE_DATE`;
      
      const params = type ? [userId, type.toUpperCase()] : [userId];
      
      const result = await executeQuery(query, params);
      
      const books = result.rows.map(row => {
        // Determine if this is an e-book based on location
        const isEbook = row[14] === 'Digital Library';
        
        return {
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
          // Override type based on location for backward compatibility
          type: isEbook ? 'ebook' : 'physical',
          borrowDate: row[24],
          dueDate: row[25],
          returnDate: row[26],
          lateFeeAccumulated: row[27] ? `₱${row[27]}.00` : '₱0.00',
          renewsLeft: row[28],
          daysLeft: row[29],
          status: row[30],
          branch: row[14], // Using location as branch for simplicity
          useMockImage: true
        };
      });
      
      res.json(books);
    } catch (err) {
      console.error('Error fetching user books:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
};
