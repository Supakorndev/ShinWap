const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD_DB, //Don't forget to change your password.
    database: process.env.DB_NAME, //Don't forget to change your DB.
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;