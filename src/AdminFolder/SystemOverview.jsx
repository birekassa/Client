// src/components/admin/SystemOverview.jsx
import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaHome,
  FaMoneyBillWave,
  FaChartLine,
  FaDatabase,
  FaUserCheck,
  FaExclamationTriangle,
  FaSync,
  FaArrowUp,
  FaShieldAlt
} from "react-icons/fa";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const SystemOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResidents: 0,
    totalHouses: 0,
    totalRevenue: 0,
    activeUsers: 0,
    systemUptime: 0,
    pendingTasks: 0,
    securityAlerts: 0
  });

  const [userActivityData, setUserActivityData] = useState([]);
  const [revenueTrendData, setRevenueTrendData] = useState([]);
  const [systemUsageData, setSystemUsageData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 5,
        totalResidents: 12457,
        totalHouses: 3241,
        totalRevenue: 245680,
        activeUsers: 3,
        systemUptime: 99.8,
        pendingTasks: 12,
        securityAlerts: 2
      });

      setUserActivityData([
        { hour: '00:00', logins: 45, actions: 120 },
        { hour: '04:00', logins: 23, actions: 85 },
        { hour: '08:00', logins: 156, actions: 420 },
        { hour: '12:00', logins: 189, actions: 580 },
        { hour: '16:00', logins: 167, actions: 490 },
        { hour: '20:00', logins: 98, actions: 310 }
      ]);

      setRevenueTrendData([
        { month: 'Jan', revenue: 185000, transactions: 1245 },
        { month: 'Feb', revenue: 198000, transactions: 1320 },
        { month: 'Mar', revenue: 210000, transactions: 1450 },
        { month: 'Apr', revenue: 225000, transactions: 1520 },
        { month: 'May', revenue: 238000, transactions: 1680 },
        { month: 'Jun', revenue: 245680, transactions: 1750 }
      ]);

      setSystemUsageData([
        { name: 'Record Officers', value: 45, color: '#3b82f6' },
        { name: 'Cashiers', value: 30, color: '#10b981' },
        { name: 'Admin', value: 15, color: '#8b5cf6' },
        { name: 'Public Users', value: 10, color: '#f59e0b' }
      ]);

      setRecentActivities([
        { id: 1, type: 'login', message: 'AGUMAS BIRHANU logged in', time: '2 min ago', status: 'info', icon: FaUserCheck, color: 'text-blue-500' },
        { id: 2, type: 'payment', message: 'Payment processed - ETB 1,500', time: '15 min ago', status: 'success', icon: FaMoneyBillWave, color: 'text-green-500' },
        { id: 3, type: 'registration', message: 'New resident registered', time: '1 hr ago', status: 'success', icon: FaUsers, color: 'text-green-500' },
        { id: 4, type: 'alert', message: 'System backup completed', time: '2 hrs ago', status: 'info', icon: FaDatabase, color: 'text-blue-500' },
        { id: 5, type: 'security', message: 'Security alert: Multiple login attempts', time: '3 hrs ago', status: 'warning', icon: FaExclamationTriangle, color: 'text-red-500' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
          <div className="font-bold text-gray-800">{label}</div>
          {payload.map((entry, index) => (
            <div key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">System Overview (Live Stats)</h1>
            <div className="text-green-100 mt-2 text-lg">Woldia Kebele Administration</div>
            <div className="text-sm opacity-90">Real-time system performance and usage metrics (UC-012, UC-013)</div>
          </div>
          <div className="text-right">
            <div className="text-lg">Welcome back,</div>
            <div className="text-3xl font-bold">AGUMAS BIRHANU</div>
            <div className="text-sm opacity-90">System Administrator • WDU1304903</div>
            <div className="flex items-center gap-2 text-green-200 mt-2">
              <FaSync className="text-sm" />
              <span className="text-sm font-medium">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Residents */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Total Residents</div>
              <div className="text-4xl font-bold mt-2">{stats.totalResidents.toLocaleString()}</div>
              <div className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-blue-200" /> +2.5%
              </div>
            </div>
            <FaUsers className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Total Houses */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Registered Houses</div>
              <div className="text-4xl font-bold mt-2">{stats.totalHouses.toLocaleString()}</div>
              <div className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-green-200" /> +1.2%
              </div>
            </div>
            <FaHome className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Total Revenue</div>
              <div className="text-4xl font-bold mt-2">ETB {stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-yellow-200" /> +15.8%
              </div>
            </div>
            <FaMoneyBillWave className="text-6xl opacity-30" />
          </div>
        </div>

        {/* System Uptime */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">System Uptime</div>
              <div className="text-4xl font-bold mt-2">{stats.systemUptime}%</div>
              <div className="text-sm mt-3 opacity-80">Last 30 days</div>
            </div>
            <FaDatabase className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Active Users</div>
              <div className="text-4xl font-bold mt-2">{stats.activeUsers}</div>
              <div className="text-sm mt-3 opacity-80">Currently online</div>
            </div>
            <FaUserCheck className="text-6xl opacity-30" />
          </div>
        </div>

        {/* System Users */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">System Users</div>
              <div className="text-4xl font-bold mt-2">{stats.totalUsers}</div>
              <div className="text-sm mt-3 opacity-80">Total accounts</div>
            </div>
            <FaShieldAlt className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Pending Tasks</div>
              <div className="text-4xl font-bold mt-2">{stats.pendingTasks}</div>
              <div className="text-sm mt-3 opacity-80">Requires attention</div>
            </div>
            <FaExclamationTriangle className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Security Alerts</div>
              <div className="text-4xl font-bold mt-2">{stats.securityAlerts}</div>
              <div className="text-sm mt-3 opacity-80">Active alerts</div>
            </div>
            <FaExclamationTriangle className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">User Activity (24h)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={userActivityData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="logins" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} name="Logins" />
              <Area type="monotone" dataKey="actions" stroke="#10b981" fill="#10b981" fillOpacity={0.4} name="Actions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Revenue (ETB)" />
              <Line type="monotone" dataKey="transactions" stroke="#82ca9d" strokeWidth={2} name="Transactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Usage Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">System Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={systemUsageData}
                cx="50%" cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {systemUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (ETB)" />
              <Bar dataKey="transactions" fill="#10b981" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">Recent System Activities</h3>
              <div className="text-sm text-gray-600 mt-1">Live system events and activities</div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <Icon className={`text-lg ${activity.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{activity.message}</div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'success' ? 'bg-green-100 text-green-800' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Database</div>
                <div className="text-green-600 font-bold">Healthy</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">API Services</div>
                <div className="text-green-600 font-bold">Operational</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Backup Status</div>
                <div className="text-yellow-600 font-bold">Pending</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Security</div>
                <div className="text-green-600 font-bold">Protected</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">99.8%</div>
                  <div className="text-xs text-blue-800">Uptime</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45ms</div>
                  <div className="text-xs text-green-800">Response Time</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">1.2K</div>
                  <div className="text-xs text-purple-800">Daily Requests</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-xs text-orange-800">Errors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;