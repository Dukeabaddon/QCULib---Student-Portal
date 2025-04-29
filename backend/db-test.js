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
  process.exit(1);
}

// Oracle connection configuration
const dbConfig = {
  user: 'im101',
  password: 'password',
  connectString: 'localhost:1521/xe'
};

// Format query results as a table
function formatResultsAsTable(results) {
  if (!results || !results.rows || results.rows.length === 0) {
    return 'No results found';
  }

  const columnNames = results.metaData.map(col => col.name);
  const rows = results.rows;
  
  // Calculate column widths
  const columnWidths = columnNames.map((name, i) => {
    const maxDataWidth = rows.reduce((max, row) => {
      const value = row[i] !== null ? String(row[i]) : 'NULL';
      return Math.max(max, value.length);
    }, 0);
    return Math.max(name.length, maxDataWidth) + 2;
  });
  
  // Create header row
  let table = columnNames.map((name, i) => name.padEnd(columnWidths[i])).join(' | ');
  
  // Create separator row
  const separator = columnWidths.map(width => '-'.repeat(width)).join('-+-');
  table += '\n' + separator;
  
  // Create data rows
  rows.forEach(row => {
    const formattedRow = row.map((value, i) => {
      const strValue = value !== null ? String(value) : 'NULL';
      return strValue.padEnd(columnWidths[i]);
    }).join(' | ');
    table += '\n' + formattedRow;
  });
  
  return table;
}

async function testDatabase() {
  let connection;
  
  try {
    // Attempt to establish a connection to the Oracle database
    console.log('Attempting to connect to Oracle database...');
    connection = await oracledb.getConnection(dbConfig);
    
    console.log('Connection successful!');
    
    // Execute a simple query to verify the connection
    const dateResult = await connection.execute('SELECT SYSDATE FROM DUAL');
    console.log('Current date from database:', dateResult.rows[0][0]);
    
    // Get database version
    const versionResult = await connection.execute(
      `SELECT banner FROM v$version WHERE banner LIKE 'Oracle%'`
    );
    console.log('Database version:', versionResult.rows[0][0]);
    
    // List all tables in the schema
    console.log('\n--- Tables in the schema ---');
    const tablesResult = await connection.execute(
      `SELECT table_name FROM user_tables ORDER BY table_name`
    );
    
    if (tablesResult.rows.length === 0) {
      console.log('No tables found in the schema');
    } else {
      console.log('Tables:');
      tablesResult.rows.forEach(row => {
        console.log(`- ${row[0]}`);
      });
      
      // For each table, get its structure
      for (const row of tablesResult.rows) {
        const tableName = row[0];
        console.log(`\n--- Structure of table ${tableName} ---`);
        
        const columnsResult = await connection.execute(
          `SELECT column_name, data_type, data_length, nullable 
           FROM user_tab_columns 
           WHERE table_name = :tableName
           ORDER BY column_id`,
          [tableName]
        );
        
        console.log(formatResultsAsTable(columnsResult));
        
        // Get row count
        const countResult = await connection.execute(
          `SELECT COUNT(*) FROM ${tableName}`
        );
        console.log(`\nRow count: ${countResult.rows[0][0]}`);
        
        // Sample data (first 5 rows)
        if (countResult.rows[0][0] > 0) {
          console.log('\nSample data (first 5 rows):');
          const sampleResult = await connection.execute(
            `SELECT * FROM ${tableName} WHERE ROWNUM <= 5`
          );
          console.log(formatResultsAsTable(sampleResult));
        }
      }
    }
    
    console.log('\nTest completed successfully!');
    
  } catch (err) {
    console.error('Error during database test:', err);
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
testDatabase();
