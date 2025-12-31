import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const isAuthed = () => {
  const token = localStorage.getItem("token");
  return Boolean(token);
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [authed, setAuthed] = useState(isAuthed());

  useEffect(() => {
    setAuthed(isAuthed());
  }, []);

  const onLogin = () => {
    setAuthed(true);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setAuthed(false);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={authed ? <Navigate to="/" replace /> : <Login onLogin={onLogin} />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard onLogout={onLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={authed ? "/" : "/login"} replace />} />
    </Routes>
  );
};

export default App;
