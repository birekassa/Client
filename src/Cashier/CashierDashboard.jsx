// src/components/cashier/CashierDashboard.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaMoneyBillWave, FaReceipt, FaFileInvoiceDollar,
  FaCreditCard, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaClock
} from "react-icons/fa";

// ALL COMPONENTS
import CashierOverview from "./CashierOverview";
import PaymentProcessing from "./PaymentProcessing";
import FinancialReports from "./FinancialReports";
import ReceiptManagement from "./ReceiptManagement";
import PaymentTypes from "./PaymentTypes";
import Profile from "./Profile";

function CashierDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "Overview", label: "Overview", icon: FaTachometerAlt, path: "/cashier" },
    { id: "payment-processing", label: "Payment Processing", icon: FaMoneyBillWave, path: "/cashier/payment-processing" },
    { id: "receipt-management", label: "Receipt Management", icon: FaReceipt, path: "/cashier/receipt-management" },
    { id: "financial-reports", label: "Financial Reports", icon: FaFileInvoiceDollar, path: "/cashier/financial-reports" },
    { id: "payment-types", label: "Payment Types", icon: FaCreditCard, path: "/cashier/payment-types" },
    { id: "profile", label: "My Profile", icon: FaUserCircle, path: "/cashier/profile" },
    { id: "logout", label: "Sign Out", icon: FaSignOutAlt, path: "/login" }
  ];

  const getActiveLabel = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : "Cashier Dashboard";
  };

  const handleNavigation = (path) => {
    if (path === "/login") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(path);
      setSidebarOpen(false); // Close sidebar on mobile after click
    }
  };

  // Current User - AGUMAS BIRHANU
  const currentUser = {
    name: "AGUMAS BIRHANU",
    id: "WDU1304903",
    role: "Cashier",
    lastLogin: "Today, 08:30 AM EAT"
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
      >
        {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar - Fixed and non-scrollable - Updated with gradient color scheme */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-purple-500 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-lg">
              <FaMoneyBillWave className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ወልዲያ ኬበሌ</h2>
              <p className="text-xs opacity-90">Cashier Portal • 2025</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 font-medium text-left ${
                  isActive 
                    ? 'bg-white text-blue-700 shadow-lg' 
                    : 'text-blue-100 hover:bg-blue-500 hover:bg-opacity-20 hover:text-white'
                }`}
              >
                <Icon className={`text-lg ${isActive ? 'text-blue-600' : 'text-blue-200'}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>}
              </button>
            );
          })}
        </nav>

        {/* User Info - Fixed at bottom */}
        <div className="p-5 border-t border-purple-500 bg-blue-700 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-xl shadow-lg">
              AB
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg text-white">{currentUser.name}</p>
              <p className="text-xs text-blue-100 opacity-90">ID: {currentUser.id}</p>
              <p className="text-xs text-blue-100 opacity-80">Last login: {currentUser.lastLogin}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed and non-scrollable - Reduced Size */}
        <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-20 flex-shrink-0 py-3 px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{getActiveLabel()}</h1>
              <p className="text-blue-600 text-xs sm:text-sm font-semibold">
                Web-Based Kebele Management System • Group 4
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-3">
                <p className="text-xs text-gray-600">
                  {new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                  <FaClock className="text-xs" /> {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
              <p className="text-xs text-blue-600 font-bold mt-1">Defense Ready</p>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* ROUTES */}
            <Routes>
              <Route path="/" element={<CashierOverview />} />
              <Route path="/payment-processing" element={<PaymentProcessing />} />
              <Route path="/financial-reports" element={<FinancialReports />} />
              <Route path="/receipt-management" element={<ReceiptManagement />} />
              <Route path="/payment-types" element={<PaymentTypes />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CashierDashboard;