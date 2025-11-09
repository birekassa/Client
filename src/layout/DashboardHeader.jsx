import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const DashboardHeader = ({
  user = { name: '', role: '' },
  title = "Dashboard",
  subtitle = "Welcome back",
  onLogout,
  onProfileClick,
  onMenuToggle,
  showMenuToggle = false,
  isMobile = false,
  sidebarOpen = false
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-3 lg:py-4 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {showMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          )}
          
          {/* Desktop menu toggle - only show when sidebar is collapsible */}
          {showMenuToggle && !isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors hidden lg:block"
              aria-label="Toggle sidebar"
            >
              <FaBars className="text-xl" />
            </button>
          )}
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg lg:text-xl font-bold text-gray-800 truncate">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 text-xs lg:text-sm mt-1 hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button 
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <FaBell className="text-lg lg:text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative user-menu">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              {!isMobile && (
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-800">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.role || 'Admin'}</p>
                </div>
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.role || 'Admin'}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onProfileClick?.();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <FaUserCircle className="text-gray-400" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                  >
                    <FaTimes className="text-red-400" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;