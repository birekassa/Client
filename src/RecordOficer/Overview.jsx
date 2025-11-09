import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaHome, 
  FaFileAlt, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaPlus,
  FaChartLine
} from 'react-icons/fa';
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

const Overview = ({ setActive }) => {
  const [stats, setStats] = useState({
    totalPopulation: 0,
    totalHouses: 0,
    pendingRegistrations: 0,
    completedReports: 0
  });

  // Chart Data
  const [populationTrendData, setPopulationTrendData] = useState([]);
  const [houseRegistrationData, setHouseRegistrationData] = useState([]);
  const [populationDistributionData, setPopulationDistributionData] = useState([]);
  const [registrationStatusData, setRegistrationStatusData] = useState([]);
  const [monthlyActivityData, setMonthlyActivityData] = useState([]);

  const [recentActivities, setRecentActivities] = useState([]);
  
  const quickActions = [
    {
      id: 1,
      title: 'Register New Person',
      description: 'Add new population data',
      icon: FaUsers,
      color: 'bg-blue-500',
      action: () => setActive('Register Population')
    },
    {
      id: 2,
      title: 'Register New House',
      description: 'Add new housing data',
      icon: FaHome,
      color: 'bg-green-500',
      action: () => setActive('Register Houses')
    },
    {
      id: 3,
      title: 'Generate Report',
      description: 'Create population reports',
      icon: FaFileAlt,
      color: 'bg-purple-500',
      action: () => setActive('Generate Reports')
    },
    {
      id: 4,
      title: 'View Statistics',
      description: 'Analytics and insights',
      icon: FaChartLine,
      color: 'bg-orange-500',
      action: () => setActive('Generate Reports')
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchOverviewData = async () => {
      // Stats data
      setStats({
        totalPopulation: 12457,
        totalHouses: 3241,
        pendingRegistrations: 23,
        completedReports: 45
      });

      // Population trend data (last 6 months)
      setPopulationTrendData([
        { month: 'Jan', population: 11800, newRegistrations: 120 },
        { month: 'Feb', population: 11950, newRegistrations: 150 },
        { month: 'Mar', population: 12080, newRegistrations: 130 },
        { month: 'Apr', population: 12190, newRegistrations: 110 },
        { month: 'May', population: 12320, newRegistrations: 130 },
        { month: 'Jun', population: 12457, newRegistrations: 137 }
      ]);

      // House registration data
      setHouseRegistrationData([
        { type: 'Residential', count: 2850 },
        { type: 'Commercial', count: 241 },
        { type: 'Mixed Use', count: 150 },
        { type: 'Under Construction', count: 120 }
      ]);

      // Population distribution data
      setPopulationDistributionData([
        { name: '0-18 Years', value: 2800, color: '#0088FE' },
        { name: '19-35 Years', value: 4200, color: '#00C49F' },
        { name: '36-50 Years', value: 3200, color: '#FFBB28' },
        { name: '51-65 Years', value: 1500, color: '#FF8042' },
        { name: '65+ Years', value: 1200, color: '#8884D8' }
      ]);

      // Registration status data
      setRegistrationStatusData([
        { status: 'Completed', count: 12434, color: '#00C49F' },
        { status: 'Pending', count: 23, color: '#FFBB28' },
        { status: 'In Review', count: 45, color: '#0088FE' },
        { status: 'Rejected', count: 12, color: '#FF8042' }
      ]);

      // Monthly activity data
      setMonthlyActivityData([
        { month: 'Jan', registrations: 145, verifications: 120 },
        { month: 'Feb', registrations: 178, verifications: 155 },
        { month: 'Mar', registrations: 162, verifications: 140 },
        { month: 'Apr', registrations: 195, verifications: 168 },
        { month: 'May', registrations: 210, verifications: 185 },
        { month: 'Jun', registrations: 198, verifications: 172 }
      ]);

      // Recent activities
      setRecentActivities([
        {
          id: 1,
          type: 'registration',
          message: 'New population registration completed',
          time: '2 minutes ago',
          status: 'completed',
          icon: FaCheckCircle,
          color: 'text-green-500'
        },
        {
          id: 2,
          type: 'house',
          message: 'House registration requires verification',
          time: '15 minutes ago',
          status: 'pending',
          icon: FaClock,
          color: 'text-yellow-500'
        },
        {
          id: 3,
          type: 'report',
          message: 'Monthly population report generated',
          time: '1 hour ago',
          status: 'completed',
          icon: FaFileAlt,
          color: 'text-blue-500'
        },
        {
          id: 4,
          type: 'alert',
          message: '3 pending registrations need attention',
          time: '2 hours ago',
          status: 'warning',
          icon: FaExclamationTriangle,
          color: 'text-red-500'
        }
      ]);
    };

    fetchOverviewData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, description }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
              <span className="ml-1">{trend.value}% from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600 text-xl" />
        </div>
      </div>
      {description && (
        <p className="text-xs text-gray-500 mt-3">{description}</p>
      )}
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0">
          <Icon className={`text-lg ${activity.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {activity.status}
        </span>
      </div>
    );
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-sm p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Record Officer!</h1>
            <p className="text-blue-100 mt-2">
              Here's what's happening in your kebele administration today.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 text-sm">
              <FaCheckCircle className="text-green-300" />
              <span>Last login: Today at 08:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Population"
          value={stats.totalPopulation}
          icon={FaUsers}
          trend={{ isPositive: true, value: 2.5 }}
          description="Registered individuals in the kebele"
        />
        <StatCard
          title="Total Houses"
          value={stats.totalHouses}
          icon={FaHome}
          trend={{ isPositive: true, value: 1.2 }}
          description="Registered residential properties"
        />
        <StatCard
          title="Pending Registrations"
          value={stats.pendingRegistrations}
          icon={FaClock}
          description="Requiring immediate attention"
        />
        <StatCard
          title="Reports Generated"
          value={stats.completedReports}
          icon={FaFileAlt}
          trend={{ isPositive: true, value: 15 }}
          description="This month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Population Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Growth Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={populationTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="population" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} name="Total Population" />
                <Area type="monotone" dataKey="newRegistrations" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} name="New Registrations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Population Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Distribution by Age</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={populationDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {populationDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Registration Status Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="status" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Count">
                  {registrationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registration Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="registrations" stroke="#8884d8" strokeWidth={2} name="New Registrations" />
                <Line type="monotone" dataKey="verifications" stroke="#82ca9d" strokeWidth={2} name="Verifications" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-600 mt-1">Frequently used tasks</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                        <Icon size={18} />
                      </div>
                      <div className="ml-4 text-left">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Latest system activities</p>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* House Types Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">House Registration by Type</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={houseRegistrationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Houses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;