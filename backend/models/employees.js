const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: String,
  salary: Number,
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("employee", employeeSchema);
