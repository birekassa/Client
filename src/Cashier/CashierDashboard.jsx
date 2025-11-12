// src/components/cashier/CashierDashboard.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaMoneyBillWave, FaReceipt, FaFileInvoiceDollar,
  FaCreditCard, FaUserCircle, FaSignOutAlt, FaBars, FaTimes
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
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar - Fixed and non-scrollable */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-green-700 to-green-900 text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-green-600 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
            <FaMoneyBillWave className="text-yellow-300 text-lg sm:text-xl" />
            Woldia Kebele
          </h2>
          <p className="text-xs sm:text-sm opacity-90 mt-1">Cashier Portal • 2025</p>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base ${
                  isActive 
                    ? 'bg-white text-green-800 shadow-lg' 
                    : 'hover:bg-green-600 hover:scale-105'
                }`}
              >
                <Icon className={`text-base sm:text-lg ${isActive ? 'text-green-600' : 'text-green-200'}`} />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                {isActive && <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>}
              </button>
            );
          })}
        </nav>

        {/* User Info - Fixed at bottom */}
        <div className="p-4 sm:p-5 border-t border-green-600 bg-green-800 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-sm sm:text-xl">
              AB
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-sm sm:text-lg">{currentUser.name}</p>
              <p className="text-xs opacity-90">ID: {currentUser.id}</p>
              <p className="text-xs opacity-80">Last login: {currentUser.lastLogin}</p>
            </div>
            <div className="sm:hidden">
              <p className="font-bold text-sm">{currentUser.name}</p>
              <p className="text-xs opacity-90">ID: {currentUser.id}</p>
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
        {/* Header - Fixed and non-scrollable */}
        <header className="bg-white shadow-md p-4 sm:p-6 border-b border-gray-200 sticky top-0 z-20 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{getActiveLabel()}</h1>
              <p className="text-green-600 text-xs sm:text-sm mt-1">Web-Based Kebele Management System • Group 4</p>
            </div>
            <div className="text-right text-xs sm:text-sm">
              <p className="text-gray-600">November 11, 2025 • 11:00 PM EAT</p>
              <p className="text-lg font-semibold text-green-700">Defense Ready</p>
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