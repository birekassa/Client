// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🟢 Static user data (temporary)
  const users = {
    chairman: { password: "chairman", role: "chairman", path: "/chairman" },
    recordofficer: { password: "record", role: "recordOfficer", path: "/record-officer" },
    admin: { password: "admin", role: "admin", path: "/admin" },
    casher: { password: "casher", role: "cashier", path: "/cashier" },
    socialJustice: { password: "socialJustice", role: "socialJustice", path: "/social-justice" },
    kebeleCounci: { password: "kebeleCounci", role: "kebeleCouncil", path: "/kebele-council" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users[username];

    if (user && user.password === password) {
      // ✅ Store user info
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      // ✅ Redirect to their dashboard
      navigate(user.path);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Login
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        <p><strong>Static Test Users:</strong></p>
        <ul>
          <li>Chairman → <code>chairman / chairman</code></li>
          <li>Record Officer → <code>recordofficer / record</code></li>
          <li>Administrator → <code>admin / admin</code></li>
          <li>Cashier → <code>casher / casher</code></li>
          <li>Social Justice → <code>socialJustice / socialJustice</code></li>
          <li>Kebele Council → <code>kebeleCounci / kebeleCounci</code></li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
