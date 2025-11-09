import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHome, FaFileAlt, FaCog, FaTachometerAlt } from "react-icons/fa";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSidebar from "../../components/DashboardSidebar";
import Overview from "../../components/Overview/Overview";

function RecordOfficerDashboard() {
  const [active, setActive] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/record-officer',
      icon: FaTachometerAlt
    },
    {
      id: 'register-population',
      label: 'Register Population',
      path: '/record-officer/register',
      icon: FaUsers
    },
    {
      id: 'register-houses',
      label: 'Register Houses',
      path: '/record-officer/houses',
      icon: FaHome
    },
    {
      id: 'reports',
      label: 'Generate Reports',
      path: '/record-officer/reports',
      icon: FaFileAlt
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/record-officer/settings',
      icon: FaCog
    }
  ];

  const user = {
    name: "Record Officer",
    role: "Record Management",
    department: "ደፈርጌ ኪቢቃሎ ቀበሌ"
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleProfileClick = () => {
    setActive("Settings");
  };

  const handleNavigation = (item) => {
    setActive(item.label);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleSettingsClick = () => {
    setActive("Settings");
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (active) {
      case "Overview":
        return <Overview setActive={setActive} />;

      case "Register Population":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Register Population</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700">Population registration component will be implemented here.</p>
            </div>
          </div>
        );

      case "Register Houses":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">House Registration</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700">House registration component will be implemented here.</p>
            </div>
          </div>
        );

      case "Generate Reports":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports Generation</h2>
            <p className="text-gray-600 mb-6">Generate various reports for the kebele administration.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-green-800 mb-2">Population Report</h3>
                <p className="text-green-600 text-sm">Generate population statistics</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-blue-800 mb-2">Housing Report</h3>
                <p className="text-blue-600 text-sm">Property and housing data</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-purple-800 mb-2">Financial Report</h3>
                <p className="text-purple-600 text-sm">Revenue and payment reports</p>
              </div>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            <div className="max-w-2xl">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Settings</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name" 
                      defaultValue={user.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Select an Option</h3>
            <p className="text-gray-500">Choose a menu option to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
   <DashboardSidebar
      isOpen={sidebarOpen}
      onToggle={() => setSidebarOpen(!sidebarOpen)}
      user={user}
      navigationItems={menuItems}
      activePath={active}
      onNavigate={handleNavigation}
      onLogout={handleLogout}
      onProfileClick={handleProfileClick}
    />

      {/* Main Content Area - FIXED: Removed extra margin and fixed positioning */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header - Fixed at top */}
       <DashboardHeader
        user={user}
        title={active}
        subtitle="Record Management Dashboard"
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
        onMenuToggle={handleMenuToggle}
        showMenuToggle={true}
      />

        {/* Main Content - FIXED: Proper spacing without extra margins */}
        <main className="flex-1 pt-16 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default RecordOfficerDashboard;