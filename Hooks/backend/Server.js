const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tushar4359",
  database: "Expense_Tracker",
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("MySQL Connected");
});



//Get all expenses (FIXED TABLE NAME)
app.get("/api/expenses", (req, res) => {
  const sql = "SELECT * FROM AddExpense";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

//Add expense (FIXED TABLE NAME)
app.post("/api/add-expense", (req, res) => {
  const { expenseName, expenseAmount, category, date } = req.body;

  if (!expenseName || !expenseAmount || !category || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO AddExpense (expenseName, expenseAmount, category, date) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [expenseName, expenseAmount, category, date],
    (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Expense added successfully" });
    }
  );
});

// Delete expense
app.delete("/api/delete-expense/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM AddExpense WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Expense deleted successfully" });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});