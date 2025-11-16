// src/components/chairman/ChairmanOverview.jsx
import React, { useState, useEffect } from "react";
import {
  FaIdCard, FaFileAlt, FaUsers, FaHome, FaCheckCircle,
  FaClock, FaExclamationTriangle, FaArrowUp, FaPrint, FaSearch,
  FaChartBar, FaDownload, FaSyncAlt, FaUserCheck, FaStamp,
  FaCalendarAlt, FaBell, FaCog, FaEnvelope
} from "react-icons/fa";

const ChairmanOverview = () => {
  const [stats, setStats] = useState({
    pendingIDCards: 0,
    pendingClearances: 0,
    totalResidents: 0,
    totalHouses: 0,
    todayApprovals: 0,
    monthlyDocuments: 0,
    efficiencyRate: 0,
    avgProcessingTime: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [quickStats, setQuickStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        pendingIDCards: 12,
        pendingClearances: 8,
        totalResidents: 12457,
        totalHouses: 3241,
        todayApprovals: 15,
        monthlyDocuments: 234,
        efficiencyRate: 87,
        avgProcessingTime: 2.4
      });

      setRecentActivities([
        { 
          id: 1, 
          type: 'id_card', 
          message: 'ID Card approved for MESERET KEBEDE', 
          time: '2 min ago', 
          status: 'approved',
          residentId: 'RES-4582'
        },
        { 
          id: 2, 
          type: 'clearance', 
          message: 'Clearance certificate requested by TEWODROS MULATU', 
          time: '15 min ago', 
          status: 'pending',
          residentId: 'RES-8923'
        },
        { 
          id: 3, 
          type: 'id_card', 
          message: 'ID Card rejected - Insufficient residency period', 
          time: '1 hr ago', 
          status: 'rejected',
          residentId: 'RES-3476'
        },
        { 
          id: 4, 
          type: 'clearance', 
          message: 'Clearance certificate issued for ELENI GIRMA', 
          time: '2 hrs ago', 
          status: 'approved',
          residentId: 'RES-7123'
        },
        { 
          id: 5, 
          type: 'registration', 
          message: 'New resident registered: ABEBE TADESSE', 
          time: '3 hrs ago', 
          status: 'completed',
          residentId: 'RES-9561'
        }
      ]);

      setPendingRequests([
        { 
          id: "REQ-001", 
          type: "ID Card", 
          applicant: "Dawit Haile", 
          submitted: "2024-01-15", 
          status: "Pending Verification",
          priority: "high",
          daysPending: 1
        },
        { 
          id: "REQ-002", 
          type: "Clearance", 
          applicant: "Yeshiwas Solomon", 
          submitted: "2024-01-15", 
          status: "Pending Approval",
          priority: "medium",
          daysPending: 1
        },
        { 
          id: "REQ-003", 
          type: "ID Card", 
          applicant: "Zework Aklilu", 
          submitted: "2024-01-14", 
          status: "Residency Check",
          priority: "low",
          daysPending: 2
        },
        { 
          id: "REQ-004", 
          type: "Clearance", 
          applicant: "Marta Asrat", 
          submitted: "2024-01-13", 
          status: "Tax Verification",
          priority: "high",
          daysPending: 3
        }
      ]);

      setQuickStats([
        { label: "ID Cards This Week", value: "24", change: "+12%", trend: "up" },
        { label: "Clearance Rate", value: "92%", change: "+5%", trend: "up" },
        { label: "Avg Processing Time", value: "2.4h", change: "-0.8h", trend: "down" },
        { label: "Resident Satisfaction", value: "94%", change: "+3%", trend: "up" }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color = "blue", gradient, description }) => (
    <div className={`bg-gradient-to-r ${gradient} text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg opacity-90 font-medium">{title}</div>
            <div className="text-4xl font-bold mt-2">{typeof value === 'number' ? value.toLocaleString() : value}</div>
            {change && (
              <div className={`flex items-center gap-1 mt-3 text-sm ${
                change.startsWith('+') ? 'text-green-200' : change.startsWith('-') ? 'text-red-200' : 'text-blue-200'
              }`}>
                {change.startsWith('+') ? <FaArrowUp className="text-green-200" /> : 
                 change.startsWith('-') ? <FaArrowUp className="text-red-200 transform rotate-180" /> : 
                 <FaChartBar className="text-blue-200" />}
                <span>{change}</span>
              </div>
            )}
            {description && (
              <div className="text-sm mt-2 opacity-80">{description}</div>
            )}
          </div>
          <div className="opacity-20 group-hover:opacity-30 transition-opacity">
            <Icon className="text-6xl" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
    </div>
  );

  const QuickStatCard = ({ label, value, change, trend }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? <FaArrowUp /> : <FaArrowUp className="transform rotate-180" />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );

  const getStatusIcon = (type, status) => {
    const baseClass = "text-lg";
    if (type === 'id_card') {
      return <FaIdCard className={`${baseClass} ${
        status === 'approved' ? 'text-green-500' : 
        status === 'rejected' ? 'text-red-500' : 'text-blue-500'
      }`} />;
    } else if (type === 'clearance') {
      return <FaFileAlt className={`${baseClass} ${
        status === 'approved' ? 'text-green-500' : 
        status === 'rejected' ? 'text-red-500' : 'text-orange-500'
      }`} />;
    } else {
      return <FaUserCheck className={`${baseClass} text-purple-500`} />;
    }
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return `px-2 py-1 rounded-full text-xs font-medium border ${styles[priority]}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSyncAlt className="animate-spin text-4xl text-purple-600 mx-auto mb-4" />
          <div className="text-lg text-gray-600">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Chairman</h1>
            <p className="text-gray-600 mt-2">Here's what's happening in your Kebele today</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FaCalendarAlt />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <button className="p-3 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
              <FaBell className="text-xl" />
            </button>
            <button className="p-3 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
              <FaCog className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending ID Cards"
          value={stats.pendingIDCards}
          change="+3 today"
          icon={FaIdCard}
          gradient="from-blue-500 to-blue-600"
          description="Awaiting approval"
        />
        <StatCard
          title="Pending Clearances"
          value={stats.pendingClearances}
          change="+2 today"
          icon={FaFileAlt}
          gradient="from-green-500 to-green-600"
          description="Relocation requests"
        />
        <StatCard
          title="Today's Approvals"
          value={stats.todayApprovals}
          change="+5 from yesterday"
          icon={FaCheckCircle}
          gradient="from-purple-500 to-purple-600"
          description="Documents processed"
        />
        <StatCard
          title="Efficiency Rate"
          value={`${stats.efficiencyRate}%`}
          change="+2% this week"
          icon={FaChartBar}
          gradient="from-orange-500 to-orange-600"
          description="Processing efficiency"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Residents"
          value={stats.totalResidents}
          icon={FaUsers}
          gradient="from-indigo-500 to-indigo-600"
          description="Registered population"
        />
        <StatCard
          title="Registered Houses"
          value={stats.totalHouses}
          icon={FaHome}
          gradient="from-teal-500 to-teal-600"
          description="Housing units"
        />
        <StatCard
          title="Monthly Documents"
          value={stats.monthlyDocuments}
          change="+18% this month"
          icon={FaFileAlt}
          gradient="from-pink-500 to-pink-600"
          description="Issued this month"
        />
        <StatCard
          title="Avg Processing Time"
          value={`${stats.avgProcessingTime}h`}
          change="-0.8h"
          icon={FaClock}
          gradient="from-cyan-500 to-cyan-600"
          description="Average handling time"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activities & Quick Stats */}
        <div className="xl:col-span-2 space-y-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
                <div className="text-sm text-gray-600 mt-1">Document processing timeline</div>
              </div>
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                View All →
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                      {activity.message}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-xs text-gray-500">{activity.time}</div>
                      <div className="text-xs text-blue-600 font-medium">{activity.residentId}</div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                    activity.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            {quickStats.map((stat, index) => (
              <QuickStatCard
                key={index}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
              />
            ))}
          </div>
        </div>

        {/* Pending Requests & Quick Actions */}
        <div className="space-y-8">
          {/* Pending Requests */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Pending Requests</h3>
              <div className="text-sm text-gray-600 mt-1">Requiring your attention</div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        request.type === 'ID Card' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      } group-hover:scale-110 transition-transform`}>
                        {request.type === 'ID Card' ? <FaIdCard /> : <FaFileAlt />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-purple-600">{request.type}</div>
                        <div className="text-sm text-gray-500">{request.applicant}</div>
                        <div className="text-xs text-gray-400 mt-1">{request.submitted} • {request.daysPending}d ago</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={getPriorityBadge(request.priority)}>
                        {request.priority}
                      </div>
                      <div className="text-xs text-orange-600 font-medium mt-1">{request.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-800">Verification Required</div>
                    <div className="text-sm text-blue-600 mt-1">
                      Ensure 6-month residency for ID cards and valid relocation reasons for clearances
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group bg-white">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                  <FaIdCard className="text-xl" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Issue ID Card</div>
                  <div className="text-sm text-gray-500">Verify and print</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all group bg-white">
                <div className="p-3 bg-green-100 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
                  <FaFileAlt className="text-xl" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-green-600">Process Clearance</div>
                  <div className="text-sm text-gray-500">Relocation certificates</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group bg-white">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
                  <FaSearch className="text-xl" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-purple-600">Verify Resident</div>
                  <div className="text-sm text-gray-500">Check eligibility</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all group bg-white">
                <div className="p-3 bg-orange-100 rounded-lg text-orange-600 group-hover:scale-110 transition-transform">
                  <FaPrint className="text-xl" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-orange-600">Print Reports</div>
                  <div className="text-sm text-gray-500">Monthly summaries</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairmanOverview;