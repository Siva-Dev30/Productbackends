// db.js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Dept@456", // replace with your password
  database: "new_schema" // your database name
});

// db.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL connection error:", err);
//   } else {
//     console.log("✅ Connected to MySQL database");
//   }
// });

module.exports = db;
