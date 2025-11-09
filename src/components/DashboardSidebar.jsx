import React, { useState, useEffect } from 'react';
import { FaHome, FaUsers, FaFileAlt, FaCog, FaSignOutAlt, FaUserCircle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({
  isOpen = true,
  onToggle,
  user = { name: '', role: '' },
  navigationItems = [],
  activePath = '',
  onNavigate,
  onLogout,
  onProfileClick,
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const defaultNavItems = [
    { id: 'overview', label: 'Overview', path: '/record-officer', icon: FaHome },
    { id: 'register-population', label: 'Register Population', path: '/record-officer/register', icon: FaUsers },
    { id: 'register-houses', label: 'Register Houses', path: '/record-officer/houses', icon: FaHome },
    { id: 'reports', label: 'Generate Reports', path: '/record-officer/reports', icon: FaFileAlt },
    { id: 'settings', label: 'Settings', path: '/record-officer/settings', icon: FaCog },
  ];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavItems;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (item) => {
    if (onNavigate) {
      onNavigate(item);
    } else {
      navigate(item.path);
    }
    if (isMobile) onToggle?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - FIXED: Header will overlay this on desktop */}
      <aside className={`
        fixed lg:fixed top-0 left-0 h-screen z-30 bg-white border-r border-gray-200 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-0 lg:w-20'}
        flex flex-col
        lg:top-16 /* Push sidebar down below header on desktop */
      `}>
        {isMobile && isOpen && (
          <button
            className="absolute top-4 right-4 z-50 p-2 bg-red-500 text-white rounded-lg"
            onClick={onToggle}
          >
            <FaTimes size={16} />
          </button>
        )}

        {/* Header Section */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FaHome />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Record Officer</h1>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FaHome />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.label;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          {isOpen ? (
            <div className="space-y-2">
              <button
                onClick={onProfileClick}
                className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <FaUserCircle />
                <span>Profile</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <button onClick={onProfileClick} className="p-2 text-gray-600">
                <FaUserCircle />
              </button>
              <button onClick={onLogout} className="p-2 text-red-600">
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;