// Sidebar.jsx - Complete updated version
import React from "react";
import { useTranslation } from "./useTranslation";

const Sidebar = ({ active, handleItemClick, menuItems, sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();

  const getIcon = (item) => {
    // Use original English item names for icons since they remain constant
    switch (item) {
      case "Overview":
        return "📊";
      case "Evaluate Performance":
        return "⭐";
      case "Review Reports":
        return "📋";
      case "Certificate Management":
        return "📜";
      case "Settings":
        return "⚙️";
      case "Logout":
        return "🚪";
      default:
        return "📄";
    }
  };

  // Map original menu items to their translated versions
  const getTranslatedLabel = (originalItem) => {
    switch(originalItem) {
      case "Overview": return t.overview;
      case "Evaluate Performance": return t.evaluatePerformance;
      case "Review Reports": return t.reviewReports;
      case "Certificate Management": return t.certificateManagement;
      case "Settings": return t.settings;
      case "Logout": return t.logout;
      default: return originalItem;
    }
  };

  return (
    <div className="w-64 md:w-72 theme-sidebar flex flex-col shadow-2xl border-r theme-border">
      {/* Logo Section */}
      <div className="p-6 pb-4 border-b theme-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-xl shadow-lg">
            <span className="text-2xl">🏘️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold theme-sidebar-text tracking-tight">Kebele Council</h1>
            <p className="theme-sidebar-text/80 text-xs font-medium mt-0.5">{t.administrativeDashboard}</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden theme-sidebar-item ${
              active === item && item !== "Logout" ? "active" : ""
            } ${item === "Logout" ? "hover:bg-red-600/20 hover:text-red-100" : ""}`}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className={`text-lg transition-transform duration-300 group-hover:scale-110 z-10 ${
              active === item ? "scale-110" : ""
            }`}>
              {getIcon(item)}
            </span>
            <span className={`font-semibold tracking-wide z-10 text-sm md:text-base ${
              item === "Logout" ? "text-red-200" : "theme-sidebar-text"
            }`}>
              {getTranslatedLabel(item)}
            </span>
            
            {/* Active indicator */}
            {active === item && item !== "Logout" && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 pt-3 border-t theme-border">
        <div className="text-center">
          <p className="theme-sidebar-text/90 font-medium text-sm">{t.councilManagement}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="theme-sidebar-text/70 text-xs font-medium">{t.version} 2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;