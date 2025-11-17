// src/components/chairman/ChairmanOverview.jsx
import React, { useState, useEffect } from "react";
import {
  FaIdCard, FaFileAlt, FaUsers, FaHome, FaCheckCircle,
  FaClock, FaExclamationTriangle, FaArrowUp, FaPrint, FaSearch,
  FaChartBar, FaDownload, FaSyncAlt, FaUserCheck, FaStamp,
  FaCalendarAlt, FaBell, FaCog, FaEnvelope, FaShieldAlt,
  FaUserTimes, FaHistory, FaTasks, FaUserShield, FaFileSignature
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
    avgProcessingTime: 0,
    residencyVerifications: 0,
    clearanceApprovals: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
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
        avgProcessingTime: 2.4,
        residencyVerifications: 45,
        clearanceApprovals: 32
      });

      setRecentActivities([
        { 
          id: 1, 
          type: 'id_card', 
          message: 'ID Card approved for MESERET KEBEDE', 
          time: '2 min ago', 
          status: 'approved',
          residentId: 'RES-4582',
          action: 'verified_residency'
        },
        { 
          id: 2, 
          type: 'clearance', 
          message: 'Clearance certificate requested by TEWODROS MULATU', 
          time: '15 min ago', 
          status: 'pending',
          residentId: 'RES-8923',
          action: 'clearance_request'
        },
        { 
          id: 3, 
          type: 'id_card', 
          message: 'ID Card rejected - Insufficient residency period (4 months)', 
          time: '1 hr ago', 
          status: 'rejected',
          residentId: 'RES-3476',
          action: 'residency_check_failed'
        },
        { 
          id: 4, 
          type: 'clearance', 
          message: 'Clearance certificate issued for ELENI GIRMA - Relocation to Addis Ababa', 
          time: '2 hrs ago', 
          status: 'approved',
          residentId: 'RES-7123',
          action: 'clearance_approved'
        },
        { 
          id: 5, 
          type: 'verification', 
          message: 'Residency verification completed for ABEBE TADESSE', 
          time: '3 hrs ago', 
          status: 'completed',
          residentId: 'RES-9561',
          action: 'residency_verified'
        }
      ]);

      setPendingRequests([
        { 
          id: "REQ-001", 
          type: "ID Card", 
          applicant: "Dawit Haile", 
          submitted: "2024-01-15", 
          status: "Pending Residency Verification",
          priority: "high",
          daysPending: 1,
          residencyDuration: "7 months",
          requiresVerification: true
        },
        { 
          id: "REQ-002", 
          type: "Clearance", 
          applicant: "Yeshiwas Solomon", 
          submitted: "2024-01-15", 
          status: "Pending Tax Clearance",
          priority: "high",
          daysPending: 1,
          relocationReason: "Employment transfer",
          destination: "Bahir Dar"
        },
        { 
          id: "REQ-003", 
          type: "ID Card", 
          applicant: "Zework Aklilu", 
          submitted: "2024-01-14", 
          status: "Residency Check Required",
          priority: "medium",
          daysPending: 2,
          residencyDuration: "5 months",
          requiresVerification: true
        },
        { 
          id: "REQ-004", 
          type: "Clearance", 
          applicant: "Marta Asrat", 
          submitted: "2024-01-13", 
          status: "Obligation Verification",
          priority: "high",
          daysPending: 3,
          relocationReason: "Family reasons",
          destination: "Dire Dawa"
        }
      ]);

      setQuickActions([
        {
          id: 1,
          title: "Verify Residency",
          description: "Check 6-month residency requirement",
          icon: FaUserCheck,
          color: "blue",
          path: "/chairman/verify-residency"
        },
        {
          id: 2,
          title: "Process ID Card",
          description: "Issue new ID cards",
          icon: FaIdCard,
          color: "green",
          path: "/chairman/issue-id"
        },
        {
          id: 3,
          title: "Approve Clearance",
          description: "Handle relocation requests",
          icon: FaFileAlt,
          color: "purple",
          path: "/chairman/clearance"
        },
        {
          id: 4,
          title: "Check Obligations",
          description: "Verify outstanding payments",
          icon: FaUserShield, // Replaced FaShield with FaUserShield
          color: "orange",
          path: "/chairman/obligations"
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color = "blue", gradient, description, onClick }) => (
    <div 
      className={`bg-gradient-to-r ${gradient} text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
      onClick={onClick}
    >
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

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200 border-green-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200'
    };

    return (
      <button 
        onClick={onClick}
        className={`flex items-center gap-4 p-4 border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md w-full text-left ${colorClasses[color]}`}
      >
        <div className="flex-shrink-0">
          <Icon className="text-2xl" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{title}</div>
          <div className="text-sm text-gray-600 mt-1">{description}</div>
        </div>
      </button>
    );
  };

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

  const handleQuickAction = (action) => {
    // Navigate to respective page or open modal
    console.log(`Navigating to: ${action.path}`);
    // In real implementation: navigate(action.path);
  };

  const handleStatCardClick = (type) => {
    // Handle navigation based on stat card type
    const routes = {
      pendingIDCards: '/chairman/issue-id',
      pendingClearances: '/chairman/clearance',
      residencyVerifications: '/chairman/verify-residency'
    };
    console.log(`Navigating to: ${routes[type]}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSyncAlt className="animate-spin text-4xl text-purple-600 mx-auto mb-4" />
          <div className="text-lg text-gray-600">Loading Chairman Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Main Stats Grid - Chairman Specific */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending ID Cards"
          value={stats.pendingIDCards}
          change="+3 today"
          icon={FaIdCard}
          gradient="from-blue-500 to-blue-600"
          description="Awaiting residency verification"
          onClick={() => handleStatCardClick('pendingIDCards')}
        />
        <StatCard
          title="Pending Clearances"
          value={stats.pendingClearances}
          change="+2 today"
          icon={FaFileAlt}
          gradient="from-green-500 to-green-600"
          description="Relocation requests pending"
          onClick={() => handleStatCardClick('pendingClearances')}
        />
        <StatCard
          title="Residency Verifications"
          value={stats.residencyVerifications}
          change="+8 this week"
          icon={FaUserCheck}
          gradient="from-purple-500 to-purple-600"
          description="6-month checks required"
          onClick={() => handleStatCardClick('residencyVerifications')}
        />
        <StatCard
          title="Clearance Approvals"
          value={stats.clearanceApprovals}
          change="+5 from yesterday"
          icon={FaCheckCircle}
          gradient="from-orange-500 to-orange-600"
          description="Obligation verifications"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Activities & Quick Actions */}
        <div className="xl:col-span-2 space-y-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Recent Document Activities</h3>
                <div className="text-sm text-gray-600 mt-1">ID Cards & Clearance processing timeline</div>
              </div>
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2">
                <FaHistory /> View History
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group border-b border-gray-100 last:border-b-0">
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
                      {activity.action === 'residency_check_failed' && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Residency Rule</span>
                      )}
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

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <QuickActionCard
                  key={action.id}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  color={action.color}
                  onClick={() => handleQuickAction(action)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Pending Requests & Business Rules */}
        <div className="space-y-8">
          {/* Pending Requests */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Pending Requests</h3>
              <div className="text-sm text-gray-600 mt-1">Requiring your verification</div>
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
                        {request.residencyDuration && (
                          <div className="text-xs text-blue-600 mt-1">Residency: {request.residencyDuration}</div>
                        )}
                        {request.relocationReason && (
                          <div className="text-xs text-green-600 mt-1">To: {request.destination}</div>
                        )}
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
            </div>
          </div>

          {/* Business Rules Panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Business Rules</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <FaUserShield className="text-blue-600 text-lg mt-1 flex-shrink-0" /> {/* Fixed icon */}
                <div>
                  <div className="font-medium text-blue-800">ID Card Requirements</div>
                  <div className="text-sm text-blue-600 mt-1">
                    • 6+ months residency required<br/>
                    • Valid application form & photograph<br/>
                    • Payment confirmation needed
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <FaFileAlt className="text-green-600 text-lg mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-green-800">Clearance Rules</div>
                  <div className="text-sm text-green-600 mt-1">
                    • Verify no outstanding obligations<br/>
                    • Valid relocation reason required<br/>
                    • Destination details mandatory
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <FaExclamationTriangle className="text-purple-600 text-lg mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-purple-800">Important Notes</div>
                  <div className="text-sm text-purple-600 mt-1">
                    • Always verify 6-month residency period<br/>
                    • Check for outstanding payments<br/>
                    • Ensure proper documentation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairmanOverview;