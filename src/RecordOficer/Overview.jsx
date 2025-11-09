import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaUpload,
  FaArchive
} from 'react-icons/fa';

const Overview = () => {
  // Sample data for charts
  const documentStats = [
    { name: 'Jan', processed: 400, pending: 240, approved: 360 },
    { name: 'Feb', processed: 300, pending: 139, approved: 280 },
    { name: 'Mar', processed: 200, pending: 180, approved: 190 },
    { name: 'Apr', processed: 278, pending: 190, approved: 220 },
    { name: 'May', processed: 189, pending: 120, approved: 160 },
    { name: 'Jun', processed: 239, pending: 150, approved: 200 },
  ];

  const approvalRateData = [
    { name: 'Week 1', rate: 92 },
    { name: 'Week 2', rate: 88 },
    { name: 'Week 3', rate: 96 },
    { name: 'Week 4', rate: 94 },
    { name: 'Week 5', rate: 98 },
  ];

  const documentTypes = [
    { name: 'ID Cards', value: 35, color: '#0088FE' },
    { name: 'Birth Certificates', value: 25, color: '#00C49F' },
    { name: 'Residence Proof', value: 20, color: '#FFBB28' },
    { name: 'Business Licenses', value: 15, color: '#FF8042' },
    { name: 'Other Documents', value: 5, color: '#8884D8' },
  ];

  const dailyPerformance = [
    { day: 'Mon', documents: 45, efficiency: 92 },
    { day: 'Tue', documents: 52, efficiency: 88 },
    { day: 'Wed', documents: 49, efficiency: 95 },
    { day: 'Thu', documents: 60, efficiency: 90 },
    { day: 'Fri', documents: 55, efficiency: 94 },
    { day: 'Sat', documents: 30, efficiency: 85 },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Records',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: FaFileAlt,
      color: 'bg-blue-500',
      description: 'All time documents'
    },
    {
      title: 'Pending Review',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: FaClock,
      color: 'bg-orange-500',
      description: 'Awaiting approval'
    },
    {
      title: 'Approved Today',
      value: '45',
      change: '+18%',
      trend: 'up',
      icon: FaCheckCircle,
      color: 'bg-green-500',
      description: 'Processed documents'
    },
    {
      title: 'Approval Rate',
      value: '98.2%',
      change: '+2.3%',
      trend: 'up',
      icon: FaChartLine,
      color: 'bg-purple-500',
      description: 'Success rate'
    }
  ];

  const quickActions = [
    { icon: FaUpload, label: 'Upload New', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { icon: FaSearch, label: 'Quick Search', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: FaClock, label: 'Pending Tasks', color: 'bg-orange-500 hover:bg-orange-600' },
    { icon: FaArchive, label: 'View Archive', color: 'bg-purple-500 hover:bg-purple-600' }
  ];

  const recentActivities = [
    { action: 'Approved ID Card Application', time: '2 mins ago', type: 'success' },
    { action: 'New Birth Certificate Submitted', time: '15 mins ago', type: 'info' },
    { action: 'Residence Proof Requires Review', time: '1 hour ago', type: 'warning' },
    { action: 'Business License Processed', time: '2 hours ago', type: 'success' },
    { action: 'Document Verification Completed', time: '3 hours ago', type: 'success' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Record Officer Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's your document processing overview.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                    <Icon className="text-xl" />
                  </div>
                  <div className={`flex items-center text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-700 font-semibold mb-1">{stat.title}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Document Processing Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Document Processing Trend</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Processed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Approved</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={documentStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="processed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Approval Rate Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Approval Rate Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={approvalRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#8B5CF6" 
                  fill="url(#colorRate)" 
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Document Types Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Document Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={documentTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {documentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Performance */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis yAxisId="left" stroke="#666" />
                <YAxis yAxisId="right" orientation="right" stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="documents" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`${action.color} text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center`}
                  >
                    <Icon className="text-2xl mb-2" />
                    <span className="text-sm font-semibold text-center">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;