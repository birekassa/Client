// src/components/recordOfficer/RecordOfficerDashboard.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaUserPlus, FaHome, FaChartBar, FaDatabase,
  FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaClock, FaUsers, FaBuilding
} from "react-icons/fa";

// ALL SUB-COMPONENTS
import RecordOfficerOverview from "./RecordOfficerOverview";
import RegisterResident from "./RegisterResident";
import VerifyCertificates from "./VerifyCertificates.jsx";
import RegisterHouse from "./RegisterHouse";
import GenerateReport from "./GenerateReport";
import DataManagement from "./DataManagement";
import Profile from "./Profile.jsx";

function RecordOfficerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: "overview", label: "አጠቃላይ እይታ", icon: FaTachometerAlt, path: "/record-officer" },
    { id: "register-resident", label: "ነዋሪ መመዝገብ", icon: FaUserPlus, path: "/record-officer/register-resident" },
    { id: "register-house", label: "ቤት መመዝገብ", icon: FaHome, path: "/record-officer/register-house" },
    { id: "verify-certificates", label: "ነዋሪዎች እይታ", icon: FaUsers, path: "/record-officer/verify-certificates" },
    { id: "generate-report", label: "ሪፖርት ማመንጨት", icon: FaChartBar, path: "/record-officer/generate-report" },
    { id: "data-management", label: "ዳታ ማኔጅመንት", icon: FaDatabase, path: "/record-officer/data-management" },
    { id: "profile", label: "የእኔ ፕሮፋይል", icon: FaUserCircle, path: "/record-officer/profile" },
    { id: "logout", label: "ውጣ", icon: FaSignOutAlt, path: "/login" }
  ];

  const getActiveLabel = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : "የመዝገብ ኦፊሰር ዳሽቦርድ";
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
    role: "Record Officer",
    lastLogin: "ዛሬ, 08:30 ጥዋት EAT"
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    }) + ' EAT';
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 overflow-hidden">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 bg-white rounded-xl shadow-lg text-green-700 hover:bg-green-50 transition-all"
          >
            {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Sidebar - Fixed and non-scrollable - Updated to green color scheme */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-green-700 via-green-600 to-green-800 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col shadow-2xl`}>
          <div className="p-6 border-b border-green-600 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-400 rounded-xl">
                  <FaDatabase className="text-green-900 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">ወልዲያ ኬበሌ</h2>
                  <p className="text-xs opacity-90">Record Officer • 2025</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white opacity-70 hover:opacity-100"
              >
                <FaTimes />
              </button>
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
                      ? 'bg-white text-green-800 shadow-lg scale-105' 
                      : 'hover:bg-green-600 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <Icon className={`text-lg ${isActive ? 'text-green-600' : 'text-green-200'}`} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>}
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
          <div 
            className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
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
                  {currentTime.toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
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
              {/* ROUTES */}
              <Routes>
                <Route path="/" element={<RecordOfficerOverview />} />
                <Route path="/register-resident" element={<RegisterResident />} />
                <Route path="/verify-certificates" element={<VerifyCertificates />} />
                <Route path="/register-house" element={<RegisterHouse />} />
                <Route path="/generate-report" element={<GenerateReport />} />
                <Route path="/data-management" element={<DataManagement />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page { margin: 1cm; }
          body, html { -webkit-print-color-adjust: exact; }
          .lg\\:hidden, .fixed, .z-50, .z-40, .z-30, .z-20 { display: none !important; }
          .flex { display: block !important; }
          .p-6 { padding: 0.5cm !important; }
          .bg-gradient-to-br { background: white !important; }
          .shadow-md, .shadow-lg, .shadow-xl { box-shadow: none !important; }
          .rounded-xl { border-radius: 0 !important; }
          .border { border: 1px solid #ccc !important; }
          .text-green-600 { color: #000 !important; }
        }
      `}</style>
    </>
  );
}

export default RecordOfficerDashboard;