// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // simple example

  if (!isLoggedIn) {
    // if not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
