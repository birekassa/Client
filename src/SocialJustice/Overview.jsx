// src/SocialJustice/components/dashboard/Overview.jsx
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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  FaUsers,
  FaBalanceScale,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDollarSign,
  FaGlobeAmericas,
  FaUserFriends,
  FaGavel,
  FaChartBar,
  FaChartPie
} from 'react-icons/fa';

const Overview = () => {
  // Mock data for charts
  const caseStatusData = [
    { name: 'Pending', value: 45, color: '#FFB74D' },
    { name: 'Under Review', value: 25, color: '#4FC3F7' },
    { name: 'Approved', value: 15, color: '#81C784' },
    { name: 'Rejected', value: 8, color: '#E57373' },
    { name: 'Info Required', value: 7, color: '#FFD54F' }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', cases: 42, resolved: 28, pending: 14 },
    { month: 'Feb', cases: 48, resolved: 32, pending: 16 },
    { month: 'Mar', cases: 55, resolved: 38, pending: 17 },
    { month: 'Apr', cases: 52, resolved: 35, pending: 17 },
    { month: 'May', cases: 65, resolved: 45, pending: 20 },
    { month: 'Jun', cases: 72, resolved: 52, pending: 20 }
  ];

  const caseTypeDistributionData = [
    { type: 'Civil', cases: 35, color: '#8884d8' },
    { type: 'Criminal', cases: 28, color: '#82ca9d' },
    { type: 'Family', cases: 22, color: '#ffc658' },
    { type: 'Property', cases: 18, color: '#ff7300' },
    { type: 'Labor', cases: 15, color: '#0088fe' },
    { type: 'Other', cases: 12, color: '#ff3860' }
  ];

  const resolutionTimeData = [
    { week: 'W1', avgDays: 18, minDays: 5, maxDays: 30 },
    { week: 'W2', avgDays: 16, minDays: 4, maxDays: 28 },
    { week: 'W3', avgDays: 15, minDays: 3, maxDays: 25 },
    { week: 'W4', avgDays: 14, minDays: 3, maxDays: 24 },
    { week: 'W5', avgDays: 13, minDays: 2, maxDays: 22 },
    { week: 'W6', avgDays: 12, minDays: 2, maxDays: 20 }
  ];

  const demographicImpactData = [
    { age: '18-25', income: 25000, cases: 15, urgency: 8 },
    { age: '26-35', income: 35000, cases: 28, urgency: 7 },
    { age: '36-45', income: 45000, cases: 22, urgency: 6 },
    { age: '46-55', income: 52000, cases: 18, urgency: 5 },
    { age: '56-65', income: 48000, cases: 12, urgency: 7 },
    { age: '65+', income: 32000, cases: 8, urgency: 9 }
  ];

  // Statistics cards data
  const statsData = [
    {
      title: 'Total Cases',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: FaUsers,
      color: 'from-blue-500 to-blue-600',
      description: 'Cases registered this year'
    },
    {
      title: 'Resolved Cases',
      value: '894',
      change: '+8%',
      trend: 'up',
      icon: FaCheckCircle,
      color: 'from-green-500 to-green-600',
      description: 'Successfully closed cases'
    },
    {
      title: 'Pending Review',
      value: '218',
      change: '-5%',
      trend: 'down',
      icon: FaClock,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Awaiting verification'
    },
    {
      title: 'Avg Resolution Time',
      value: '14 Days',
      change: '-2 Days',
      trend: 'down',
      icon: FaChartLine,
      color: 'from-purple-500 to-purple-600',
      description: 'Average case processing'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border-2 border-gray-300 rounded-xl shadow-2xl">
          <p className="font-black text-gray-800 text-lg mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central" 
        className="text-sm font-black"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-4">SOCIAL JUSTICE OVERVIEW</h1>
              <p className="text-blue-100 text-xl font-semibold max-w-3xl">
                Comprehensive analytics and insights for effective case management and social justice administration.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-white text-sm font-bold uppercase">Current Period</div>
                <div className="text-2xl font-black text-white">Q2 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <span className={`text-sm font-black px-3 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-700 font-bold text-lg mb-1">{stat.title}</p>
                <p className="text-gray-500 text-sm font-semibold">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="space-y-8">
          {/* Row 1: Case Status and Monthly Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Case Status Distribution */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                  <FaChartPie className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">CASE STATUS DISTRIBUTION</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={caseStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {caseStatusData.map((status, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="text-sm font-semibold text-gray-700">{status.name}</span>
                    <span className="text-sm font-black text-gray-900 ml-auto">{status.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Monthly Case Trends */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                  <FaChartLine className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">MONTHLY CASE TRENDS</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    name="New Cases"
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="#82ca9d" 
                    strokeWidth={3}
                    name="Resolved Cases"
                    dot={{ fill: '#82ca9d', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#ffc658" 
                    strokeWidth={3}
                    name="Pending Cases"
                    dot={{ fill: '#ffc658', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 2: Case Types and Resolution Time */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 3: Case Type Distribution */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                  <FaChartBar className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">CASE TYPE DISTRIBUTION</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={caseTypeDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="cases" 
                    name="Number of Cases"
                    radius={[4, 4, 0, 0]}
                  >
                    {caseTypeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 4: Resolution Time Analysis */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <FaClock className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">RESOLUTION TIME ANALYSIS</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={resolutionTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="avgDays" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="Average Days" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="minDays" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Minimum Days" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="maxDays" 
                    stackId="1" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    name="Maximum Days" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 3: Demographic Impact Analysis (Full Width) */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
                <FaUserFriends className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">DEMOGRAPHIC IMPACT ANALYSIS</h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={demographicImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="income" 
                  name="Income ($)" 
                  type="number"
                  label={{ value: 'Annual Income ($)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="cases" 
                  name="Cases" 
                  type="number"
                  label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }}
                />
                <ZAxis 
                  dataKey="urgency" 
                  range={[50, 400]} 
                  name="Urgency Level" 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter 
                  name="Demographic Impact" 
                  data={demographicImpactData} 
                  fill="#8884d8"
                >
                  {demographicImpactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.urgency > 7 ? '#ff3860' : '#8884d8'} />
                  ))}
                </Scatter>
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-black text-blue-900 mb-2">INCOME CORRELATION</h4>
                <p className="text-blue-800 text-sm font-semibold">
                  Lower income groups show higher case frequency with increased urgency levels.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-black text-green-900 mb-2">AGE DISTRIBUTION</h4>
                <p className="text-green-800 text-sm font-semibold">
                  26-35 age group represents the highest number of cases filed.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-black text-purple-900 mb-2">URGENCY PATTERNS</h4>
                <p className="text-purple-800 text-sm font-semibold">
                  Elderly and youth demographics show highest urgency levels in cases.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-black mb-6 text-center">PERFORMANCE SUMMARY</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black mb-2">72%</div>
              <div className="text-indigo-200 font-semibold">Overall Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">94%</div>
              <div className="text-indigo-200 font-semibold">Client Satisfaction Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">86%</div>
              <div className="text-indigo-200 font-semibold">On-Time Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">15 Days</div>
              <div className="text-indigo-200 font-semibold">Average Resolution Time</div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="text-yellow-500 text-2xl" />
              <h4 className="font-black text-gray-900">URGENT CASES</h4>
            </div>
            <p className="text-gray-700 font-semibold">
              18 cases require immediate attention due to high urgency levels and time sensitivity.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaGavel className="text-blue-500 text-2xl" />
              <h4 className="font-black text-gray-900">TRENDING CASES</h4>
            </div>
            <p className="text-gray-700 font-semibold">
              Property disputes show 25% increase this quarter compared to last quarter.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaUsers className="text-green-500 text-2xl" />
              <h4 className="font-black text-gray-900">STAFF PERFORMANCE</h4>
            </div>
            <p className="text-gray-700 font-semibold">
              Team has maintained 94% satisfaction rate with 15% faster resolution times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;