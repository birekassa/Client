// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧩 Common Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// 🧩 Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/About";
import Services from "./pages/Services"; // Added Services page

// 🧩 Private Pages
import InternalHome from "./pages/InternalHome";
import PrivateRoute from "./components/PrivateRoute"; // Assuming this is in components

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
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />

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

          {/* 🎯 404 Page - Catch all route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a 
                  href="/" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Return Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>

      {/* 🟢 Common Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;