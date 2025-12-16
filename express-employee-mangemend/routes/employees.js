const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middlewares/authmiddleware");


//get all users and theier department (or show unssigned or unemplode)
router.get("/all-users", authMiddleware, async (req, res) => {
    try {
        const query = `
            SELECT
                u.id AS user_id,
                u.username AS user_name,
                u.email,
                u.status,
                COALESCE(d.name, 'UNassigned') AS department_name
            FROM users u 
            LEFT JOIN users_departments ud ON u.id = ud.user_id
            LEFT JOIN departments d ON ud.department_id = d.id
            ORDER BY u.username
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




//fetch employees by department id

router.get("/departement/:department_id", authMiddleware, async (req, res) => {
    const { department_id } = req.params;

    try {
        const query = `
            SELECT 
                u.id AS user_id,
                u.username AS user_name,
                u.email,
                d.name AS department_name
            FROM users u 
            INNER JOIN users_departments ud ON u.id = ud.user_id
            INNER JOIN departments d ON d.id = ud.department_id
            WHERE d.id = $1
            ORDER BY u.username;
        `;

        const result = await pool.query(query, [department_id]);

        if (result.rows.length === 0) {
            return res.status(200).json({ message: "No employees found for this department" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching department users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




//update user department

router.put("/update-department", authMiddleware, async (req, res) => {
  const { user_id, department_id } = req.body;

  try {
    if (req.user.status !== "admin") {
      return res.status(403).json({ message: "Access denied: admin only" });
    }

    const departmentCheck = await pool.query(
      "SELECT id FROM departments WHERE id = $1",
      [department_id]
    );

    if (departmentCheck.rowCount === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    // UPSERT: insert if not exists, else update
    const query = `
      INSERT INTO users_departments (user_id, department_id, assigned_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET department_id = $2, assigned_at = NOW()
      RETURNING *;
    `;

    const result = await pool.query(query, [user_id, department_id]);

    res.status(200).json({ message: "Department assigned/updated successfully", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});





router.put("/update-status", authMiddleware, async (req, res) => {
    try {
        // console.log("req.user:", req.user);

        if (req.user.status !== "admin") {
            return res.status(403).json({ message: "Access denied: admin only" });
        }

        const { status, user_id } = req.body;

        const allowedStatus = ["admin", "employee"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value. Allowed: admin, employee" });
        }

        const query = `
            UPDATE users
            SET status = $1
            WHERE id = $2
            RETURNING id, username, email, status;
        `;

        const result = await pool.query(query, [status, user_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User status updated successfully",
            data: result.rows[0],
        });

    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router