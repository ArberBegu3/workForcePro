const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express(); // <-- initialize app first

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const departmentsRoutes = require("./routes/departments");
const employeesRoutes = require("./routes/employees");
const tasksRoutes = require("./routes/tasks");
app.use("/api/tasks", tasksRoutes);


app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/employees", employeesRoutes);

// Start server
const PORT = process.env.PORT || 8095;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
