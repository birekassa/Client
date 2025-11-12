// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaUsersCog, FaUserShield, FaHistory, FaDatabase,
  FaCogs, FaChartPie, FaBullhorn, FaSignOutAlt, FaBars, FaTimes, FaClock
} from "react-icons/fa";

// SUB-COMPONENTS
import SystemOverview from "./SystemOverview";
import UserManagement from "./UserManagement";
import RolePermissions from "./RolePermissions";
import AuditLogs from "./AuditLogs";
import BackupRestore from "./BackupRestore";
import SystemSettings from "./SystemSettings";
import MasterReports from "./MasterReports";
import Announcements from "./Announcements";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: "overview", label: "Overview ", icon: FaTachometerAlt, path: "/admin", uc: "UC-012, UC-013" },
    { id: "users", label: "User Management", icon: FaUsersCog, path: "/admin/users", uc: "UC-002, UC-014" },
    { id: "roles", label: "Role & Permissions", icon: FaUserShield, path: "/admin/roles", uc: "UC-003" },
    { id: "logs", label: "Audit Logs", icon: FaHistory, path: "/admin/logs", uc: "UC-004" },
    { id: "backup", label: "Backup & Restore", icon: FaDatabase, path: "/admin/backup", uc: "UC-005" },
    { id: "settings", label: "System Settings", icon: FaCogs, path: "/admin/settings", uc: "UC-006, UC-011, UC-015" },
    { id: "reports", label: "Master Reports", icon: FaChartPie, path: "/admin/reports", uc: "UC-007" },
    { id: "announcements", label: "Announcements", icon: FaBullhorn, path: "/admin/announcements", uc: "UC-008" },
    { id: "logout", label: "Logout", icon: FaSignOutAlt, path: "/login" }
  ];

  const getActiveLabel = () => {
    const item = menuItems.find(m => m.path === location.pathname);
    return item ? item.label : "Admin Dashboard";
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
    role: "System Administrator",
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
            className="p-3 bg-white rounded-xl shadow-lg text-green-700 hover:bg-green-50 transition-all"
          >
            {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Sidebar - Fixed and non-scrollable */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-green-700 via-green-600 to-green-800 text-white 
          transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-green-600 flex-shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400 rounded-xl">
                <FaUserShield className="text-green-900 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">ወልዲያ ኬበሌ</h2>
                <p className="text-xs opacity-90">Admin Portal • 2025</p>
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
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 font-medium text-left group ${
                    isActive 
                      ? 'bg-white text-green-800 shadow-lg scale-105' 
                      : 'hover:bg-green-600 hover:scale-105 hover:shadow-md'
                  }`}
                  title={item.uc || ''}
                >
                  <Icon className={`text-lg ${isActive ? 'text-green-600' : 'text-green-200'}`} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>}
                  {item.uc && (
                    <span className="text-xs opacity-70 group-hover:opacity-100">
                      {item.uc}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info - Fixed at bottom */}
          <div className="p-5 border-t border-green-600 bg-green-700 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-xl shadow-lg">
                AB
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{currentUser.name}</p>
                <p className="text-xs opacity-90">ID: {currentUser.id}</p>
                <p className="text-xs opacity-80 flex items-center gap-1">
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
          {/* Header - Fixed and non-scrollable */}
          <header className="bg-white shadow-md p-6 border-b border-gray-200 sticky top-0 z-20 flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{getActiveLabel()}</h1>
                <p className="text-green-600 mt-1 text-sm sm:text-base">Web-Based Kebele Management System • Group 4</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-lg font-semibold text-green-700 flex items-center justify-end gap-2">
                  <FaClock /> {formatTime(currentTime)}
                </p>
                <p className="text-sm text-green-600 font-bold mt-1">Defense Ready</p>
              </div>
            </div>
          </header>

          {/* Scrollable Dashboard Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 space-y-6 lg:space-y-8">
              <Routes>
                <Route path="/" element={<SystemOverview />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/roles" element={<RolePermissions />} />
                <Route path="/logs" element={<AuditLogs />} />
                <Route path="/backup" element={<BackupRestore />} />
                <Route path="/settings" element={<SystemSettings />} />
                <Route path="/reports" element={<MasterReports />} />
                <Route path="/announcements" element={<Announcements />} />
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
          .text-green-600 { color: #000 !important; }
        }
      `}</style>
    </>
  );
}

export default AdminDashboard;