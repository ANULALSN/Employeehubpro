import React from "react";

const EmployeeTable = ({ employees, onEdit, onDelete, deletingId }) => {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>Employees</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th style={{ width: 180 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department || "-"}</td>
                <td>{emp.salary === undefined || emp.salary === null ? "-" : emp.salary}</td>
                <td>{emp.status}</td>
                <td>
                  <div className="actions">
                    <button className="button secondary" onClick={() => onEdit(emp)}>
                      Edit
                    </button>
                    <button
                      className="button"
                      onClick={() => onDelete(emp)}
                      disabled={deletingId === emp._id}
                    >
                      {deletingId === emp._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="muted">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
