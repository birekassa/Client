import React, { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaFileAlt, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaBell, 
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaUserPlus,
  FaHome,
  FaBuilding,
  FaShieldAlt,
  FaRocket  // Added missing import
} from "react-icons/fa";
import { motion } from "framer-motion";

function InternalHome() {
  const [stats, setStats] = useState({
    total_residents: 0,
    pending_requests: 0,
    monthly_revenue: 0,
    active_cases: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [quickActions, setQuickActions] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setStats({
      total_residents: 1247,
      pending_requests: 23,
      monthly_revenue: 45280,
      active_cases: 12
    });

    setRecentActivities([
      {
        id: 1,
        type: 'new_resident',
        message: 'New resident registration - Alemayehu Tesfaye',
        time: '2 hours ago',
        icon: FaUserPlus,
        color: 'text-green-500'
      },
      {
        id: 2,
        type: 'payment',
        message: 'Utility payment received - Birr 1,500',
        time: '4 hours ago',
        icon: FaMoneyBillWave,
        color: 'text-blue-500'
      },
      {
        id: 3,
        type: 'case',
        message: 'New case opened - Property dispute',
        time: '1 day ago',
        icon: FaFileAlt,
        color: 'text-orange-500'
      },
      {
        id: 4,
        type: 'alert',
        message: 'System maintenance scheduled',
        time: '2 days ago',
        icon: FaExclamationTriangle,
        color: 'text-red-500'
      }
    ]);

    setQuickActions([
      {
        id: 1,
        title: 'New Resident',
        description: 'Register new resident',
        icon: FaUserPlus,
        color: 'from-green-500 to-green-600',
        path: '/resident-registration'
      },
      {
        id: 2,
        title: 'Process Payment',
        description: 'Handle utility payments',
        icon: FaMoneyBillWave,
        color: 'from-blue-500 to-blue-600',
        path: '/payments'
      },
      {
        id: 3,
        title: 'Case Management',
        description: 'Manage active cases',
        icon: FaFileAlt,
        color: 'from-orange-500 to-orange-600',
        path: '/cases'
      },
      {
        id: 4,
        title: 'Reports',
        description: 'Generate reports',
        icon: FaChartLine,
        color: 'from-purple-500 to-purple-600',
        path: '/reports'
      }
    ]);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome to Kebele Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage community services and resident affairs efficiently
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-2xl shadow-lg px-6 py-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                  <span className="text-gray-700 font-semibold">
                    {new Date().toLocaleDateString('en-ET', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={containerVariants}>
          {Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {key.replace('_', ' ')}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  {key === 'total_residents' && <FaUsers className="text-blue-600 text-2xl" />}
                  {key === 'pending_requests' && <FaClock className="text-orange-600 text-2xl" />}
                  {key === 'monthly_revenue' && <FaMoneyBillWave className="text-green-600 text-2xl" />}
                  {key === 'active_cases' && <FaFileAlt className="text-red-600 text-2xl" />}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-semibold flex items-center">
                  <FaChartLine className="mr-1" />
                  +2.5%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
                <FaRocket className="text-blue-600 text-xl" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-4 text-left shadow-lg hover:shadow-xl transition-all duration-300`}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="text-2xl" />
                      <div>
                        <h3 className="font-bold text-lg">{action.title}</h3>
                        <p className="text-white/80 text-sm">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Activities</h2>
                <FaBell className="text-blue-600 text-xl" />
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    variants={itemVariants}
                  >
                    <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                      <activity.icon className={`text-lg ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div className="mt-8" variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">System Status</h2>
              <FaShieldAlt className="text-2xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <FaCheckCircle className="text-3xl text-green-300 mx-auto mb-2" />
                <p className="text-lg font-semibold">All Systems Operational</p>
                <p className="text-blue-200 text-sm">No issues reported</p>
              </div>
              <div className="text-center">
                <FaHome className="text-3xl text-white mx-auto mb-2" />
                <p className="text-lg font-semibold">99.9% Uptime</p>
                <p className="text-blue-200 text-sm">Last 30 days</p>
              </div>
              <div className="text-center">
                <FaBuilding className="text-3xl text-white mx-auto mb-2" />
                <p className="text-lg font-semibold">1,247 Residents</p>
                <p className="text-blue-200 text-sm">Active in system</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default InternalHome;