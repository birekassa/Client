// src/SocialJustice/Header.jsx
import React from 'react';

const Header = ({ 
  active, 
  user, 
  onProfileChange, 
  onLogout, 
  onThemeChange, 
  isMobile, 
  onMenuToggle,
  sidebarOpen 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu Icon and Title */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Icon for Mobile */}
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          )}
          
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-gray-800">
            {active}
          </h1>
        </div>

        {/* Right Section - User Info and Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => onThemeChange(false)}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Toggle theme"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {!isMobile && (
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              )}
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={onProfileChange}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;