import React, { useState } from "react";
import api from "../api/axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "80px auto" }}>
        <h2 style={{ marginTop: 0 }}>EmployeeHub Pro</h2>
        <p className="muted">Login to manage employees</p>

        {error ? (
          <div className="error" style={{ marginBottom: 12 }}>
            {error}
          </div>
        ) : null}

        <form onSubmit={submit}>
          <div style={{ marginBottom: 10 }}>
            <label className="muted">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label className="muted">Password</label>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="button" type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
