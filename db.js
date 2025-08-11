// // db.js
// const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "T@7888", // replace with your password
//   database: "new_schema" // your database name
// });

// // db.connect((err) => {
// //   if (err) {
// //     console.error("❌ MySQL connection error:", err);
// //   } else {
// //     console.log("✅ Connected to MySQL database");
// //   }
// // });

// module.exports = db;

//-----------------

// import mysql from 'mysql2';

// const connection = mysql.createConnection({
//   host: 'sql.freedb.tech',
//   user: 'freedb_product_user',
//   password: '5nPyvBY8zHAw5%%',
//   database: 'freedb_product_db',
//   port: 3306
// });
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = db;

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

