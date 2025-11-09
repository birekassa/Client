import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHome, FaFileAlt, FaCog, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import DashboardHeader from "../layout/DashboardHeader";
import DashboardSidebar from "../layout/DashboardSidebar";
import Overview from "./Overview";

function RecordOfficerDashboard() {
  const [active, setActive] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check screen size and adjust sidebar state accordingly
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // 1024px is typical breakpoint for lg in Tailwind
      setIsMobile(mobile);
      
      // On desktop, sidebar should be open by default
      // On mobile, sidebar should be closed by default
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Check initially
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleNavigation = (item) => {
    setActive(item.label);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSettingsClick = () => {
    setActive("Settings");
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking on overlay (mobile)
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (active) {
      case "Overview":
        return <Overview setActive={setActive} />;

      case "Register Population":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Register Population</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700">Population registration component will be implemented here.</p>
            </div>
          </div>
        );

      case "Register Houses":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">House Registration</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700">House registration component will be implemented here.</p>
            </div>
          </div>
        );

      case "Generate Reports":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Reports Generation</h2>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Settings</h2>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-4">📋</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Select an Option</h3>
            <p className="text-gray-500">Choose a menu option to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex
        w-64 flex-shrink-0
      `}>
        <DashboardSidebar
          isOpen={sidebarOpen}
          onToggle={handleMenuToggle}
          user={user}
          navigationItems={menuItems}
          activePath={active}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        {/* Header */}
        <DashboardHeader
          user={user}
          title={active}
          subtitle="Record Management Dashboard"
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          onMenuToggle={handleMenuToggle}
          showMenuToggle={true}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 pt-16 lg:pt-20 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default RecordOfficerDashboard;