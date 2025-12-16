const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, u.username AS assigned_to_name
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      ORDER BY t.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create task
router.post("/create", authMiddleware, async (req, res) => {
  const { title, description, assigned_to, due_date, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, assigned_to, due_date, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, assigned_to || null, due_date || null, status || "pending"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update task
router.put("/update/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, due_date, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks SET title=$1, description=$2, assigned_to=$3, due_date=$4, status=$5
       WHERE id=$6 RETURNING *`,
      [title, description, assigned_to, due_date, status, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ message: "Task not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete task
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM tasks WHERE id=$1 RETURNING *`, [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
