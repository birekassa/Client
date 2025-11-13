// src/components/recordOfficer/RecordOfficerOverview.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  FaUsers, FaHome, FaFileAlt, FaExclamationTriangle, FaCheckCircle, FaClock,
  FaArrowUp, FaArrowDown, FaEye, FaPrint, FaPlus, FaChartLine,
  FaCertificate
} from 'react-icons/fa';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import CertificateOverview from './certificate/CertificateOverview';

const RecordOfficerOverview = ({ setActive }) => {
  const now = new Date();
  const today = format(now, "EEEE, dd MMMM yyyy");
  const time = format(now, "hh:mm a");

  const [stats, setStats] = useState({
    totalPopulation: 0,
    totalHouses: 0,
    pendingRegistrations: 0,
    completedReports: 0,
    growthPopulation: 2.5,
    growthHouses: 1.2
  });

  const [certificateStats, setCertificateStats] = useState({
    total: 156,
    verified: 120,
    pending: 25,
    rejected: 11
  });

  const [populationTrendData, setPopulationTrendData] = useState([]);
  const [houseRegistrationData, setHouseRegistrationData] = useState([]);
  const [populationDistributionData, setPopulationDistributionData] = useState([]);
  const [registrationStatusData, setRegistrationStatusData] = useState([]);
  const [monthlyActivityData, setMonthlyActivityData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [showCertificateOverview, setShowCertificateOverview] = useState(false);

  const quickActions = [
    { id: 1, title: 'Register New Person', icon: FaUsers, color: 'bg-blue-500', action: () => setActive('Register Population') },
    { id: 2, title: 'Register New House', icon: FaHome, color: 'bg-green-500', action: () => setActive('Register Houses') },
    { id: 3, title: 'Manage Certificates', icon: FaCertificate, color: 'bg-purple-500', action: () => setActive('Verify Certificates') },
    { id: 4, title: 'Generate Report', icon: FaFileAlt, color: 'bg-orange-500', action: () => setActive('Generate Reports') }
  ];

  useEffect(() => {
    setStats({
      totalPopulation: 12457,
      totalHouses: 3241,
      pendingRegistrations: 23,
      completedReports: 45,
      growthPopulation: 2.5,
      growthHouses: 1.2
    });

    setPopulationTrendData([
      { month: 'Jan', population: 11800, new: 120 },
      { month: 'Feb', population: 11950, new: 150 },
      { month: 'Mar', population: 12080, new: 130 },
      { month: 'Apr', population: 12190, new: 110 },
      { month: 'May', population: 12320, new: 130 },
      { month: 'Jun', population: 12457, new: 137 }
    ]);

    setHouseRegistrationData([
      { type: 'Residential', count: 2850 },
      { type: 'Commercial', count: 241 },
      { type: 'Mixed Use', count: 150 },
      { type: 'Under Construction', count: 120 }
    ]);

    setPopulationDistributionData([
      { name: '0-18', value: 2800, color: '#3b82f6' },
      { name: '19-35', value: 4200, color: '#10b981' },
      { name: '36-50', value: 3200, color: '#f59e0b' },
      { name: '51-65', value: 1500, color: '#8b5cf6' },
      { name: '65+', value: 1200, color: '#ef4444' }
    ]);

    setRegistrationStatusData([
      { status: 'Completed', count: 12434, color: '#00C49F' },
      { status: 'Pending', count: 23, color: '#FFBB28' },
      { status: 'In Review', count: 45, color: '#0088FE' },
      { status: 'Rejected', count: 12, color: '#FF8042' }
    ]);

    setMonthlyActivityData([
      { month: 'Jan', registrations: 145, verifications: 120 },
      { month: 'Feb', registrations: 178, verifications: 155 },
      { month: 'Mar', registrations: 162, verifications: 140 },
      { month: 'Apr', registrations: 195, verifications: 168 },
      { month: 'May', registrations: 210, verifications: 185 },
      { month: 'Jun', registrations: 198, verifications: 172 }
    ]);

    setRecentActivities([
      { id: 1, type: 'registration', message: 'New population registration completed', time: '2 min ago', status: 'completed', icon: FaCheckCircle, color: 'text-green-500' },
      { id: 2, type: 'certificate', message: 'Birth certificate prepared for new resident', time: '15 min ago', status: 'completed', icon: FaCertificate, color: 'text-purple-500' },
      { id: 3, type: 'house', message: 'House registration requires verification', time: '1 hr ago', status: 'pending', icon: FaClock, color: 'text-yellow-500' },
      { id: 4, type: 'certificate', message: '3 certificate verifications pending', time: '2 hrs ago', status: 'warning', icon: FaExclamationTriangle, color: 'text-red-500' }
    ]);

    setRecentRegistrations([
      { id: "REG-2025-0123", name: "AGUMAS BIRHANU", kebeleId: "KB1304903", type: "Population", date: "2025-11-11", status: "Completed" },
      { id: "CERT-2025-0456", name: "New Birth Certificate", kebeleId: "BC-2025-001", type: "Certificate", date: "2025-11-11", status: "Pending" },
      { id: "REG-2025-0121", name: "YESHIWAS SOLOMON", kebeleId: "KB149996", type: "Population", date: "2025-11-10", status: "Completed" },
      { id: "CERT-2025-0455", name: "Marriage Certificate", kebeleId: "MC-2025-002", type: "Certificate", date: "2025-11-10", status: "Verified" }
    ]);
  }, [setActive]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
          <p className="font-bold text-gray-800">{label}</p>
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>Registration Report</title>
      <style>
        body { font-family: Arial; padding: 40px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; }
        h1 { color: #1e40af; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 10px; text-align: left; }
        th { background: #dbeafe; }
        .status-completed { background: #d1fae5; color: #065f46; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-verified { background: #dbeafe; color: #1e40af; }
      </style></head><body>
      <div class="header">
        <h1>WOLDIA KEBELE ADMINISTRATION</h1>
        <h2>COMPREHENSIVE REPORT</h2>
        <p><strong>Date:</strong> ${today} | <strong>Time:</strong> ${time} EAT</p>
        <p><strong>Generated by:</strong> AGUMAS BIRHANU • Record Officer • WDU1304903</p>
      </div>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Kebele ID</th><th>Type</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>
          ${recentRegistrations.map(r => `
            <tr>
              <td>${r.id}</td><td>${r.name}</td><td>${r.kebeleId}</td>
              <td>${r.type}</td><td>${r.date}</td>
              <td class="status-${r.status.toLowerCase()}">${r.status}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <p style="margin-top: 40px; text-align: center; font-size: 12px;">
        © 2025 Woldia Kebele • Web-Based Kebele Management System • Group 4
      </p>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 800);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* CASHIER-STYLE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Total Population</p>
              <p className="text-4xl font-bold mt-2">{stats.totalPopulation.toLocaleString()}</p>
              <p className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-blue-200" /> +{stats.growthPopulation}%
              </p>
            </div>
            <FaUsers className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Total Houses</p>
              <p className="text-4xl font-bold mt-2">{stats.totalHouses.toLocaleString()}</p>
              <p className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-green-200" /> +{stats.growthHouses}%
              </p>
            </div>
            <FaHome className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Total Certificates</p>
              <p className="text-4xl font-bold mt-2">{certificateStats.total.toLocaleString()}</p>
              <p className="text-sm mt-3 opacity-80">Birth & Marriage</p>
            </div>
            <FaCertificate className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Pending Actions</p>
              <p className="text-4xl font-bold mt-2">{stats.pendingRegistrations + certificateStats.pending}</p>
              <p className="text-sm mt-3 opacity-80">Need Review</p>
            </div>
            <FaExclamationTriangle className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Certificate Overview Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Certificate Management Overview</h2>
            <p className="text-gray-600 mt-1">Birth and Marriage Certificate Statistics</p>
          </div>
          <button 
            onClick={() => setShowCertificateOverview(!showCertificateOverview)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {showCertificateOverview ? 'Hide' : 'Show'} Certificate Details
          </button>
        </div>
        
        {showCertificateOverview && (
          <div className="p-6">
            <CertificateOverview stats={certificateStats} />
          </div>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Population Growth Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={populationTrendData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="population" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} name="Total" />
              <Area type="monotone" dataKey="new" stroke="#10b981" fill="#10b981" fillOpacity={0.4} name="New" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={populationDistributionData}
                cx="50%" cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
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

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Registration Status</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={registrationStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#8884d8">
                {registrationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="registrations" stroke="#8884d8" strokeWidth={2} name="Registrations" />
              <Line type="monotone" dataKey="verifications" stroke="#82ca9d" strokeWidth={2} name="Verifications" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Recent Activities & Registrations</h3>
            <p className="text-sm text-gray-600 mt-1">Last 4 entries • Population, Houses & Certificates</p>
          </div>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <FaPrint /> Print Report
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Kebele ID</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-bold text-indigo-700">{r.id}</td>
                    <td className="py-4 text-sm">{r.name}</td>
                    <td className="py-4 text-sm text-gray-600 font-mono">{r.kebeleId}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        r.type === 'Certificate' ? 'bg-purple-100 text-purple-800' :
                        r.type === 'Population' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="py-4 text-sm">{r.date}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        r.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        r.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
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
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{action.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Click to proceed</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <p className="text-sm text-gray-600 mt-1">Latest system logs</p>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <Icon className={`text-lg ${activity.color}`} />
                    <div className="flex-1">
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
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordOfficerOverview;