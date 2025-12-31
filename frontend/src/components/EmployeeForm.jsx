import React, { useEffect, useState } from "react";

const EmployeeForm = ({ initialValues, onSubmit, onCancel, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setEmail(initialValues.email || "");
      setDepartment(initialValues.department || "");
      setSalary(
        initialValues.salary === undefined || initialValues.salary === null
          ? ""
          : String(initialValues.salary)
      );
      setStatus(initialValues.status || "Active");
    }
  }, [initialValues]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      department,
      salary: salary === "" ? undefined : Number(salary),
      status,
    });
  };

  return (
    <form onSubmit={submit} className="card">
      <h3 style={{ marginTop: 0 }}>{initialValues ? "Edit Employee" : "Add Employee"}</h3>

      <div className="row">
        <div style={{ flex: 1, minWidth: 220 }}>
          <label className="muted">Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <label className="muted">Email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@company.com"
            type="email"
            required
          />
        </div>
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label className="muted">Department</label>
          <input
            className="input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Engineering"
          />
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <label className="muted">Salary</label>
          <input
            className="input"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="50000"
            inputMode="numeric"
          />
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <label className="muted">Status</label>
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="actions" style={{ marginTop: 12 }}>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        {onCancel ? (
          <button className="button secondary" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default EmployeeForm;
