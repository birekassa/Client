// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧩 Common Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// 🧩 Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 🧩 Private Pages
import InternalHome from "./pages/InternalHome";
import PrivateRoute from "./PrivateRoute";

// 🧩 Dashboards for each role
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ChairmanDashboard from "./pages/dashboard/ChairmanDashboard";
import RecordOfficerDashboard from "./pages/dashboard/RecordOfficerDashboard";
import CashierDashboard from "./pages/dashboard/CashierDashboard";
import SocialJusticeDashboard from "./pages/dashboard/SocialJusticeDashboard";
import KebeleCouncilDashboard from "./pages/dashboard/KebeleCouncilDashboard";

function App() {
  return (
    <Router>
      {/* 🟢 Common Header visible on all pages */}
      <Header />

      {/* 🟢 Page Wrapper for main content */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Private Routes */}
          <Route
            path="/internal"
            element={
              <PrivateRoute>
                <InternalHome />
              </PrivateRoute>
            }
          />

          {/* 🧭 Dashboards by Role */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/chairman"
            element={
              <PrivateRoute>
                <ChairmanDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/record-officer"
            element={
              <PrivateRoute>
                <RecordOfficerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/cashier"
            element={
              <PrivateRoute>
                <CashierDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/social-justice"
            element={
              <PrivateRoute>
                <SocialJusticeDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/kebele-council"
            element={
              <PrivateRoute>
                <KebeleCouncilDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* 🟢 Common Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
