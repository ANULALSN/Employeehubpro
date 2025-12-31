const express = require("express");
const employee = require("../models/employees");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all employees
router.get("/employees", auth, async (req, res) => {
  const data = await employee.find();
  res.json(data);
});

// ADD employee
router.post("/employees", auth, async (req, res) => {
  const emp = await employee.create(req.body);
  res.json(emp);
});

module.exports = router;
