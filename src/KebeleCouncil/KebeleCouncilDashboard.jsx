import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import EvaluatePerformance from "./EvaluatePerformance";
import Settings from "./Settings";
import Overview from "./Overview";

function KebeleCouncilDashboard() {
  const [active, setActive] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const menuItems = [
    "Overview",
    "Evaluate Performance",
    "Settings",
    "Logout",
  ];

  const handleLogout = () => {
    setIsLoggedOut(true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  const handleItemClick = (item) => {
    if (item === "Logout") {
      handleLogout();
    } else {
      setActive(item);
    }
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    if (isLoggedOut) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚪</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Logging Out...</h2>
            
            <p className="text-gray-600 mb-6">
              You are being logged out of the Kebele Council Dashboard. 
              Redirecting to login page...
            </p>

            <div className="flex justify-center mb-6">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>

            <p className="text-gray-500 text-sm">
              Please wait while we secure your session.
            </p>
          </div>
        </div>
      );
    }

    switch (active) {
      case "Overview":
        return <Overview />;
      case "Evaluate Performance":
        return <EvaluatePerformance />;
      case "Settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex">
        <Sidebar 
          active={active} 
          handleItemClick={handleItemClick} 
          menuItems={menuItems}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 z-50 w-64"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar 
              active={active} 
              handleItemClick={handleItemClick} 
              menuItems={menuItems}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          active={active} 
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default KebeleCouncilDashboard;