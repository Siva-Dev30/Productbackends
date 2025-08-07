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
  res.send('Welcome to Node.js backend');
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

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const sql = "CALL AddCategory(?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      if (err.sqlState === '45000') {
        return res.status(409).json({ message: err.message }); // duplicate error from procedure
      }
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({ name });
  });
});


app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
