// src/components/chairman/ChairmanDashboard.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaIdCard, FaFileAlt, FaChartBar, FaUserCheck,
  FaStamp, FaSignOutAlt, FaBars, FaTimes, FaClock, FaUsers,
  FaHome, FaMoneyBillWave, FaCheckCircle, FaPrint, FaSearch
} from "react-icons/fa";

// SUB-COMPONENTS
import ChairmanOverview from "./ChairmanOverview";
import PrepareIDCard from "./PrepareIDCard";
import PrepareClearance from "./PrepareClearance";
import ViewReports from "./ViewReports";

function ChairmanDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: "overview", label: "Overview", icon: FaTachometerAlt, path: "/chairman" },
    { id: "prepare-id", label: "Prepare ID Card", icon: FaIdCard, path: "/chairman/prepare-id" },
    { id: "prepare-clearance", label: "Prepare Clearance", icon: FaFileAlt, path: "/chairman/prepare-clearance" },
    { id: "reports", label: "View Reports", icon: FaChartBar, path: "/chairman/reports" },
    { id: "logout", label: "Logout", icon: FaSignOutAlt, path: "/login" }
  ];

  const getActiveLabel = () => {
    const item = menuItems.find(m => m.path === location.pathname);
    return item ? item.label : "Chairman Dashboard";
  };

  const handleNavigation = (path) => {
    if (path === "/login") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(path);
      setSidebarOpen(false);
    }
  };

  const currentUser = {
    name: "AGUMAS BIRHANU",
    id: "WDU1304903",
    role: "Chairman",
    lastLogin: "ዛሬ, 08:30 ጥዋት EAT"
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
    }) + ' EAT';
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 overflow-hidden">
        {/* Mobile Toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Sidebar - Fixed and non-scrollable - Updated with gradient color scheme */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-700 text-white 
          transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-purple-500 flex-shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-lg">
                <FaStamp className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">ወልዲያ ኬበሌ</h2>
                <p className="text-xs opacity-90">Chairman Portal • 2025</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-white opacity-70 hover:opacity-100"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
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
                <p className="text-xs text-blue-100 opacity-80 flex items-center gap-1">
                  <FaClock className="text-xs" /> {currentUser.lastLogin}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0  bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
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
                    {currentTime.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                    <FaClock className="text-xs" /> {formatTime(currentTime)}
                  </p>
                </div>
                <p className="text-xs text-blue-600 font-bold mt-1">Defense Ready</p>
              </div>
            </div>
          </header>

          {/* Scrollable Dashboard Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 space-y-6 lg:space-y-8">
              <Routes>
                <Route path="/" element={<ChairmanOverview />} />
                <Route path="/prepare-id" element={<PrepareIDCard />} />
                <Route path="/prepare-clearance" element={<PrepareClearance />} />
                <Route path="/reports" element={<ViewReports />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @media print {
          @page { margin: 1cm; size: A4; }
          body, html { -webkit-print-color-adjust: exact; }
          .fixed, .z-50, .z-40, .z-30, .z-20, .lg\\:hidden { display: none !important; }
          .flex { display: block !important; }
          main { margin: 0 !important; }
          .p-6 { padding: 0.5cm !important; }
          .bg-gradient-to-br { background: white !important; }
          .shadow-md, .shadow-lg, .shadow-2xl { box-shadow: none !important; }
          .rounded-xl { border-radius: 0 !important; }
          .border { border: 1px solid #ccc !important; }
          .text-blue-600 { color: #000 !important; }
        }
      `}</style>
    </>
  );
}

export default ChairmanDashboard;