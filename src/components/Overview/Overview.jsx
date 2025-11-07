// src/components/Overview/Overview.jsx
import React from 'react';
import { FaUsers, FaHome, FaBell, FaUserPlus, FaFileAlt, FaChartBar,  FaClipboardList, FaSync, FaArrowUp, FaIdCard, FaCheckCircle,  FaTasks, FaClock, FaCertificate, FaMapMarkerAlt, FaDatabase } from 'react-icons/fa';
import { HiDocumentReport, HiHome } from 'react-icons/hi';
import { MdPersonAdd, MdHouse, MdAssessment, MdTrendingUp, MdPendingActions } from 'react-icons/md';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
const Overview = ({ setActive }) => {
  // Sample data for charts
  const populationData = [
    { month: 'Jan', residents: 1200, new: 45, houses: 25 },
    { month: 'Feb', residents: 1220, new: 20, houses: 18 },
    { month: 'Mar', residents: 1250, new: 30, houses: 22 },
    { month: 'Apr', residents: 1270, new: 20, houses: 15 },
    { month: 'May', residents: 1290, new: 20, houses: 28 },
    { month: 'Jun', residents: 1247, new: 12, houses: 19 },
  ];
  const houseDistribution = [
    { type: 'Private', value: 650, fill: '#0088FE' },
    { type: 'Kebele', value: 180, fill: '#00C49F' },
    { type: 'Government', value: 26, fill: '#FFBB28' },
  ];
  const serviceData = [
    { name: 'ID Cards', value: 1089, color: '#3B82F6' },
    { name: 'Birth Cert', value: 456, color: '#10B981' },
    { name: 'Marriage Cert', value: 234, color: '#F59E0B' },
    { name: 'Clearance', value: 189, color: '#EF4444' },
  ];
  const ageDistribution = [
    { range: '0-18', count: 320, fill: '#3B82F6' },
    { range: '19-35', count: 450, fill: '#10B981' },
    { range: '36-60', count: 350, fill: '#F59E0B' },
    { range: '60+', count: 127, fill: '#EF4444' },
  ];
  const performanceData = [
    { subject: 'Accuracy', A: 95, fullMark: 100 },
    { subject: 'Speed', A: 88, fullMark: 100 },
    { subject: 'Completeness', A: 92, fullMark: 100 },
    { subject: 'Efficiency', A: 85, fullMark: 100 },
    { subject: 'Reliability', A: 90, fullMark: 100 },
  ];

  const dailyActivity = [
    { time: '9:00', registrations: 4, documents: 2 },
    { time: '10:00', registrations: 3, documents: 1 },
    { time: '11:00', registrations: 6, documents: 3 },
    { time: '12:00', registrations: 2, documents: 0 },
    { time: '13:00', registrations: 5, documents: 2 },
    { time: '14:00', registrations: 7, documents: 4 },
    { time: '15:00', registrations: 4, documents: 1 },
  ];

  const quickStats = [
    { 
      title: "Total Residents", 
      value: "1,247", 
      change: "+12", 
      icon: <FaUsers className="text-2xl" />, 
      color: "blue",
      description: "Active residents",
      trend: "up"
    },
    { 
      title: "Registered Houses", 
      value: "856", 
      change: "+5", 
      icon: <FaHome className="text-2xl" />, 
      color: "green",
      description: "Properties recorded",
      trend: "up"
    },
    { 
      title: "Pending Requests", 
      value: "23", 
      change: "3 urgent", 
      icon: <FaBell className="text-2xl" />, 
      color: "orange",
      description: "Awaiting processing",
      trend: "warning"
    },
    { 
      title: "Services Today", 
      value: "47", 
      change: "+8", 
      icon: <FaFileAlt className="text-2xl" />, 
      color: "purple",
      description: "Documents processed",
      trend: "up"
    },
  ];

  const quickActions = [
    { 
      label: "Register New Resident", 
      action: () => setActive("Register Population"), 
      icon: <MdPersonAdd className="text-xl" />, 
      color: "blue",
      description: "Add new resident record"
    },
    { 
      label: "Register New House", 
      action: () => setActive("Register Houses"), 
      icon: <MdHouse className="text-xl" />, 
      color: "green",
      description: "Record new property"
    },
    { 
      label: "Generate Report", 
      action: () => setActive("Generate Reports"), 
      icon: <MdAssessment className="text-xl" />, 
      color: "purple",
      description: "Create official reports"
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome Record Officer!
        </h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Comprehensive overview of Kebele management activities and real-time statistics
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-blue-100">
          <div className="flex items-center">
            <FaCheckCircle className="w-4 h-4 mr-2" />
            System Status: Operational
          </div>
          <div className="flex items-center">
            <FaClock className="w-4 h-4 mr-2" />
            Last Updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center">
            <FaDatabase className="w-4 h-4 mr-2" />
            Data Sync: Active
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <div className={`text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`text-sm font-semibold text-${stat.color}-600 bg-${stat.color}-50 px-3 py-1 rounded-full flex items-center`}>
                {stat.trend === 'up' && <FaArrowUp className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-800 font-semibold mb-1">{stat.title}</p>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Population Growth Trend */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <MdTrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Population Growth Trend
            </h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="residents" 
                fill="#3B82F6" 
                fillOpacity={0.2}
                stroke="#3B82F6"
                name="Total Residents"
              />
              <Bar 
                dataKey="new" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
                name="New Registrations"
              />
              <Line 
                type="monotone" 
                dataKey="houses" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="New Houses"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaFileAlt className="w-6 h-6 mr-2 text-purple-600" />
            Service Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} documents`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Age Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaUsers className="w-6 h-6 mr-2 text-green-600" />
            Age Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {ageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* House Type Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <HiHome className="w-6 h-6 mr-2 text-orange-600" />
            House Types
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={houseDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {houseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaChartBar className="w-6 h-6 mr-2 text-red-600" />
            Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaTasks className="w-6 h-6 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`w-full flex items-center space-x-4 p-4 bg-${action.color}-50 hover:bg-${action.color}-100 border border-${action.color}-200 rounded-xl transition-all duration-200 group text-left hover:scale-105`}
              >
                <div className={`p-3 rounded-lg bg-${action.color}-600 group-hover:bg-${action.color}-700 transition-colors flex-shrink-0`}>
                  <div className="text-white">
                    {action.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900 block">
                    {action.label}
                  </span>
                  <span className="text-sm text-gray-600">{action.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FaClipboardList className="w-6 h-6 mr-2 text-green-600" />
              Recent Activity & Daily Trends
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              <FaSync className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity List */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Latest Activities</h4>
              <div className="space-y-3">
                {[
                  { action: "New resident registered", time: "2 hours ago", type: "success" },
                  { action: "House registration updated", time: "5 hours ago", type: "info" },
                  { action: "ID card issued", time: "1 day ago", type: "success" },
                  { action: "Clearance request pending", time: "2 days ago", type: "warning" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' : 
                        activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-gray-700 text-sm">{activity.action}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Activity Chart */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Today's Activity</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="registrations" fill="#3B82F6" radius={[2, 2, 0, 0]} name="Registrations" />
                  <Bar dataKey="documents" fill="#10B981" radius={[2, 2, 0, 0]} name="Documents" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 p-2 rounded-lg">
              <FaCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">System Status</h3>
              <p className="text-gray-300">All services operational</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">99.9%</p>
            <p className="text-gray-300 text-sm">Uptime this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;