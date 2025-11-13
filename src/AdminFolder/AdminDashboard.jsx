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
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 overflow-hidden">
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
      >
        {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar - Fixed and non-scrollable - Updated with gradient color scheme */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-700 text-white 
        shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-purple-500 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-lg">
              <FaUserShield className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ወልዲያ ኬበሌ</h2>
              <p className="text-xs opacity-90">Admin Portal • 2025</p>
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
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
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
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
  );
}

export default AdminDashboard;