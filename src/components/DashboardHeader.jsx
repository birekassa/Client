import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

const DashboardHeader = ({
  user = { name: '', role: '' },
  title = "Dashboard",
  subtitle = "Welcome back",
  onLogout,
  onProfileClick,
  onMenuToggle,
  showMenuToggle = false,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-2 lg:py-2 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {showMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <FaBars className="text-xl" />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 truncate">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 text-sm mt-1 hidden lg:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <FaBell className="text-xl" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">{user.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user.role || 'Admin'}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={onProfileClick}
                    className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
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