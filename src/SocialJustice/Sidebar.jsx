// src/SocialJustice/components/dashboard/Sidebar.jsx
import React from 'react';
import { 
  FaHome, 
  FaCheckCircle, 
  FaEnvelope, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt, 
  FaUserCircle,
  FaFileAlt,
  FaClipboardCheck
} from 'react-icons/fa';

const Sidebar = ({ active, setActive, user, onLogout }) => {
  const getMenuItems = () => {
    const baseItems = [
      { name: "Overview", icon: <FaHome className="text-lg" />, roles: ['admin', 'council'] },
      { name: "Case Form", icon: <FaFileAlt className="text-lg" />, roles: ['admin', 'council'] },
      { name: "Verify Cases", icon: <FaClipboardCheck className="text-lg" />, roles: ['admin', 'council'] },
      { name: "Confirmation", icon: <FaCheckCircle className="text-lg" />, roles: ['admin', 'council'] },
      { name: "Write Letters", icon: <FaEnvelope className="text-lg" />, roles: ['admin'] },
      { name: "Reports", icon: <FaChartBar className="text-lg" />, roles: ['admin', 'council'] },
      { name: "Settings", icon: <FaCog className="text-lg" />, roles: ['admin', 'council'] },
    ];

    return baseItems.filter(item => item.roles.includes(user.role));
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 shadow-xl flex flex-col min-h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="text-2xl text-white">⚖️</div>
          <div>
            <h2 className="text-xl font-bold text-white">Social Justice</h2>
            <p className="text-xs text-slate-300 capitalize">{user.role} Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 group ${
              active === item.name
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
        
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg mt-8 text-red-300 hover:bg-red-900/30 hover:text-white transition-all duration-200 group"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-300 capitalize truncate">
              {user.role} Member
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;