
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/About";
import Services from "./pages/Services";

// 🧩 Private Pages
import PrivateRoute from "./components/PrivateRoute"; // Assuming this is in components

// 🧩 Dashboards for each role
import AdminDashboard from "./AdminFolder/AdminDashboard";
import ChairmanDashboard from "./Chairman/ChairmanDashboard";
import RecordOfficerDashboard from "./RecordOficer/RecordOfficerDashboard";
import CashierDashboard from "./Cashier/CashierDashboard";
import SocialJusticeDashboard from "./SocialJustice/SocialJusticeDashboard";
import KebeleCouncilDashboard from "./KebeleCouncil/KebeleCouncilDashboard";

function App() {
  return (
    <Router>
      {/* 🟢 Common Header visible on all pages */}
     

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
                <Link 
                  to="/" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </main>
     
    </Router>
  );
}

export default App;