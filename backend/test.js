const oracledb = require('oracledb');
const path = require('path');

// Add Oracle client to PATH
const oracleClientPath = 'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server\\bin';
process.env.PATH = `${oracleClientPath};${process.env.PATH}`;
console.log('Added Oracle client to PATH:', oracleClientPath);

// Force Thick mode
try {
  oracledb.initOracleClient();
  console.log('Oracle client initialized in Thick mode');
} catch (err) {
  console.error('Failed to initialize Oracle client:', err.message);
}

// Oracle connection configuration
const dbConfig = {
  user: 'im101',
  password: 'password',
  connectString: 'localhost:1521/xe'
};

async function testConnection() {
  let connection;

  try {
    // Attempt to establish a connection to the Oracle database
    console.log('Attempting to connect to Oracle database...');
    connection = await oracledb.getConnection(dbConfig);

    console.log('Connection successful!');

    // Execute a simple query to verify the connection
    const result = await connection.execute('SELECT SYSDATE FROM DUAL');
    console.log('Current date from database:', result.rows[0][0]);

    // Get database version
    const versionResult = await connection.execute(
      `SELECT banner FROM v$version WHERE banner LIKE 'Oracle%'`
    );
    console.log('Database version:', versionResult.rows[0][0]);

    console.log('Test completed successfully!');

  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed.');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Run the test
testConnection();
