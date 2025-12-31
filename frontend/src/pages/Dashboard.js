import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

const Dashboard = ({ onLogout }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const headerTitle = useMemo(() => "EmployeeHub Pro", []);

  const fetchEmployees = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to load employees";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const saveEmployee = async (payload) => {
    setError("");
    setSaving(true);
    try {
      if (editing) {
        const res = await api.put(`/employees/${editing._id}`, payload);
        setEmployees((prev) => prev.map((e) => (e._id === editing._id ? res.data : e)));
        setEditing(null);
      } else {
        const res = await api.post("/employees", payload);
        setEmployees((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to save employee";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const deleteEmployee = async (emp) => {
    setError("");
    setDeletingId(emp._id);
    try {
      await api.delete(`/employees/${emp._id}`);
      setEmployees((prev) => prev.filter((e) => e._id !== emp._id));
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to delete employee";
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: "0 0 4px 0" }}>{headerTitle}</h2>
          <div className="muted">Manage employees</div>
        </div>
        <div className="actions">
          <button className="button secondary" onClick={fetchEmployees} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button className="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {error ? <div className="error" style={{ marginTop: 12 }}>{error}</div> : null}

      <div style={{ marginTop: 16 }}>
        <EmployeeForm
          initialValues={editing}
          onSubmit={saveEmployee}
          onCancel={editing ? () => setEditing(null) : null}
          loading={saving}
        />

        {loading ? (
          <div className="card" style={{ marginTop: 16 }}>Loading employees...</div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={(emp) => setEditing(emp)}
            onDelete={deleteEmployee}
            deletingId={deletingId}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
