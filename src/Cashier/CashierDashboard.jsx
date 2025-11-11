// src/components/cashier/CashierDashboard.jsx
import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaMoneyBillWave, FaReceipt, FaFileInvoiceDollar,
  FaCreditCard, FaUserCircle, FaSignOutAlt
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-900 text-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-green-600">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaMoneyBillWave className="text-yellow-300" />
            Woldia Kebele
          </h2>
          <p className="text-sm opacity-90 mt-1">Cashier Portal • 2025</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-white text-green-800 shadow-lg scale-105' 
                    : 'hover:bg-green-600 hover:scale-105'
                }`}
              >
                <Icon className={isActive ? 'text-green-600' : 'text-green-200'} />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-5 border-t border-green-600 bg-green-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-xl">
              AB
            </div>
            <div>
              <p className="font-bold text-lg">{currentUser.name}</p>
              <p className="text-xs opacity-90">ID: {currentUser.id}</p>
              <p className="text-xs opacity-80">Last login: {currentUser.lastLogin}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{getActiveLabel()}</h1>
              <p className="text-green-600 mt-1">Web-Based Kebele Management System • Group 4</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">November 10, 2025 • 03:48 PM EAT</p>
              <p className="text-lg font-semibold text-green-700">Defense Ready</p>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
    
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
  );
}

export default CashierDashboard;