const mongoose = require("mongoose");
const Employee = require("../models/employees");

const isValidEmail = (value) => {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const validateEmployeeCreatePayload = (payload) => {
  const errors = [];

  if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
    errors.push("Employee name is required");
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    errors.push("Valid email is required");
  }

  if (payload.salary !== undefined && payload.salary !== null) {
    const salaryNum = Number(payload.salary);
    if (Number.isNaN(salaryNum)) {
      errors.push("Salary must be a number");
    }
  }

  if (payload.status !== undefined && payload.status !== null) {
    if (!["Active", "Inactive"].includes(payload.status)) {
      errors.push("Status must be either Active or Inactive");
    }
  }

  return errors;
};

const validateEmployeeUpdatePayload = (payload) => {
  const errors = [];

  if (payload.name !== undefined) {
    if (typeof payload.name !== "string" || !payload.name.trim()) {
      errors.push("Employee name is required");
    }
  }

  if (payload.email !== undefined) {
    if (!isValidEmail(payload.email)) {
      errors.push("Valid email is required");
    }
  }

  if (payload.salary !== undefined && payload.salary !== null) {
    const salaryNum = Number(payload.salary);
    if (Number.isNaN(salaryNum)) {
      errors.push("Salary must be a number");
    }
  }

  if (payload.status !== undefined && payload.status !== null) {
    if (!["Active", "Inactive"].includes(payload.status)) {
      errors.push("Status must be either Active or Inactive");
    }
  }

  return errors;
};

const getEmployees = async (req, res, next) => {
  try {
    const data = await Employee.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const errors = validateEmployeeCreatePayload(req.body);
    if (errors.length) {
      return res.status(400).json({ message: errors.join(", ") });
    }

    const payload = {
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      salary: req.body.salary !== undefined ? Number(req.body.salary) : undefined,
      status: req.body.status || "Active",
    };

    const created = await Employee.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const errors = validateEmployeeUpdatePayload(req.body);
    if (errors.length) {
      return res.status(400).json({ message: errors.join(", ") });
    }

    const update = { ...req.body };
    if (update.salary !== undefined) {
      update.salary = Number(update.salary);
    }

    const updated = await Employee.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
