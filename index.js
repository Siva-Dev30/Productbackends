// const http  =require('http')

// const server  = http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end('Helo form Node.js!');
// });

// server.listen(3000,()=>{
// console.log('Server running at http://localhost:3000');
// });
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // your React app
  methods: ["GET", "POST"],
  credentials: false
}));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Node.js backends');
});

// ✅ Get categories from MySQL
app.get('/category', (req, res) => {
  const query = "SELECT * FROM category";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// ✅ Add category to MySQL
app.post('/addcategory', (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO category (name, status) VALUES (?, 'Active')";

  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Category added", id: result.insertId });
  });
});

module.exports = app;


app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
