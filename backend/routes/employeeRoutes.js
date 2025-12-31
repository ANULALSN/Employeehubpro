const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/employees", authMiddleware, getEmployees);
router.post("/employees", authMiddleware, createEmployee);
router.put("/employees/:id", authMiddleware, updateEmployee);
router.delete("/employees/:id", authMiddleware, deleteEmployee);

module.exports = router;
