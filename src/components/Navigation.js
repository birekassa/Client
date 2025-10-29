// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
      {isLoggedIn ? (
        <>
          <Link to="/internal" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/" style={{ marginRight: "10px" }}>Public Home</Link>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/Login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
