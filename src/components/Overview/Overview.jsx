import React, { useState } from 'react';
import { FaUsers, FaHome, FaBell, FaFileAlt, FaSync, FaArrowUp } from 'react-icons/fa';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const Overview = ({ setActive }) => {
  const [isLoading, setIsLoading] = useState(false);

  const quickStats = [
    { title: "Total Residents", value: "1,247", change: "+12", icon: FaUsers, color: "blue" },
    { title: "Registered Houses", value: "856", change: "+5", icon: FaHome, color: "green" },
    { title: "Pending Requests", value: "23", change: "3 urgent", icon: FaBell, color: "orange" },
    { title: "Services Today", value: "47", change: "+8", icon: FaFileAlt, color: "purple" },
  ];

  const quickActions = [
    { label: "Register Resident", action: () => setActive("Register Population"), icon: FaUsers },
    { label: "Register House", action: () => setActive("Register Houses"), icon: FaHome },
    { label: "Generate Report", action: () => setActive("Generate Reports"), icon: FaFileAlt },
  ];

  const populationData = [
    { month: 'Jan', residents: 1200 }, { month: 'Feb', residents: 1220 },
    { month: 'Mar', residents: 1250 }, { month: 'Apr', residents: 1270 },
    { month: 'May', residents: 1290 }, { month: 'Jun', residents: 1247 },
  ];

  const serviceData = [
    { name: 'ID Cards', value: 1089, color: '#3B82F6' },
    { name: 'Birth Cert', value: 456, color: '#10B981' },
    { name: 'Other', value: 423, color: '#F59E0B' },
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Kebele management statistics</p>
        </div>
        <button 
          onClick={refreshData} 
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <FaSync className={isLoading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const colorClass = getColorClasses(stat.color);
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-center mb-2">
                <div className={`p-2 rounded-lg ${colorClass.bg} ${colorClass.text}`}>
                  <Icon className="text-xl" />
                </div>
                <div className="text-sm bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center">
                  <FaArrowUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-4">Population Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={populationData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="residents" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-4">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie 
                data={serviceData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                label
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button 
                key={index} 
                onClick={action.action}
                className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
              >
                <div className="text-blue-600">
                  <Icon />
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;