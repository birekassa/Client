import React from 'react';
import { 
  FaHome,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaTimes,
  FaTachometerAlt,
  FaUserPlus,
  FaBaby,
  FaBuilding,
  FaIdCard,
  FaSearch,
  FaChartBar,
  FaTasks
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({
  isOpen = true,
  onToggle,
  user = { name: '', role: '', department: '' },
  navigationItems = [],
  activePath = '',
  onNavigate,
  onLogout,
  onProfileClick,
  isMobile = false
}) => {
  const navigate = useNavigate();

 const defaultNavItems = [
  // Dashboard
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/record-officer',
    icon: FaTachometerAlt
  },
  
  // Citizen Management
  {
    id: 'citizen-registration',
    label: 'Citizen Registration',
    path: '/record-officer/citizen-registration',
    icon: FaUserPlus
  },
  {
    id: 'family-records',
    label: 'Family Records',
    path: '/record-officer/family-records',
    icon: FaUsers
  },
  {
    id: 'birth-death',
    label: 'Birth & Death Records',
    path: '/record-officer/birth-death',
    icon: FaBaby
  },
  
  // Property Management
  {
    id: 'house-registration',
    label: 'House Registration',
    path: '/record-officer/house-registration',
    icon: FaHome
  },
  {
    id: 'property-records',
    label: 'Property Records',
    path: '/record-officer/property-records',
    icon: FaBuilding
  },
  
  // Documents & IDs
  {
    id: 'id-management',
    label: 'ID Card Management',
    path: '/record-officer/id-management',
    icon: FaIdCard
  },
  {
    id: 'document-search',
    label: 'Document Search',
    path: '/record-officer/document-search',
    icon: FaSearch
  },
  
  // Reports
  {
    id: 'reports',
    label: 'Generate Reports',
    path: '/record-officer/reports',
    icon: FaFileAlt
  },
  {
    id: 'statistics',
    label: 'Population Statistics',
    path: '/record-officer/statistics',
    icon: FaChartBar
  },
  
  // Tasks
  {
    id: 'pending-tasks',
    label: 'Pending Tasks',
    path: '/record-officer/pending-tasks',
    icon: FaTasks
  },
  
  // Settings
  {
    id: 'settings',
    label: 'Settings',
    path: '/record-officer/settings',
    icon: FaCog
  }
];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavItems;

  const handleNavigation = (item) => {
    if (onNavigate) {
      onNavigate(item);
    } else {
      navigate(item.path);
    }
    if (isMobile) {
      onToggle?.();
    }
  };

  const handleProfileClick = () => {
    onProfileClick?.();
    if (isMobile) {
      onToggle?.();
    }
  };

  const handleLogout = () => {
    onLogout?.();
    if (isMobile) {
      onToggle?.();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:fixed top-0 left-0 h-full z-30 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        flex flex-col overflow-hidden
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        {isMobile && isOpen && (
          <button
            className="absolute top-4 right-4 z-40 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            <FaTimes size={16} />
          </button>
        )}

        {/* Header Section */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0 pt-20 lg:pt-4">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-sm">
                <FaHome size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-gray-800 text-sm truncate">Record Officer</h1>
                <p className="text-xs text-gray-500 truncate">{user.department || 'Administration'}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-sm">
                <FaHome size={18} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.label;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm'
                } ${!isOpen ? 'justify-center' : ''}`}
                title={!isOpen ? item.label : ''}
              >
                <Icon className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} size={18} />
                {isOpen && (
                  <span className="font-medium text-sm truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          {/* User Info - Only show when sidebar is open */}
          {isOpen && (
            <div className="px-2 py-3 mb-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user.role || 'Admin'}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className={`space-y-1 ${!isOpen ? 'flex flex-col items-center' : ''}`}>
            <button
              onClick={handleProfileClick}
              className={`flex items-center gap-3 p-2 text-gray-600 hover:bg-white hover:text-gray-800 rounded-lg transition-colors w-full ${
                !isOpen ? 'justify-center' : ''
              }`}
              title={!isOpen ? 'Profile' : ''}
            >
              <FaUserCircle size={16} />
              {isOpen && <span className="text-sm">Profile</span>}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full ${
                !isOpen ? 'justify-center' : ''
              }`}
              title={!isOpen ? 'Sign Out' : ''}
            >
              <FaSignOutAlt size={16} />
              {isOpen && <span className="text-sm">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;