import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8081;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});


//DO NOT REMOVE THIS SERVER.JS IS FOR THE EXPRESS WHILE THE ONE IN THE BACKEND IS FOR THE ORACLE CLIENT