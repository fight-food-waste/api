const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONN || 10,
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'ffw',
});

module.exports = pool;
