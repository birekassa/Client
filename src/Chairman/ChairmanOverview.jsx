// src/components/chairman/ChairmanOverview.jsx
import React, { useState, useEffect } from "react";
import {
  FaIdCard, FaFileAlt, FaUsers, FaHome, FaCheckCircle,
  FaClock, FaExclamationTriangle, FaArrowUp, FaPrint, FaSearch
} from "react-icons/fa";

const ChairmanOverview = () => {
  const [stats, setStats] = useState({
    pendingIDCards: 0,
    pendingClearances: 0,
    totalResidents: 0,
    totalHouses: 0,
    todayApprovals: 0,
    monthlyDocuments: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    // Mock data
    setStats({
      pendingIDCards: 12,
      pendingClearances: 8,
      totalResidents: 12457,
      totalHouses: 3241,
      todayApprovals: 15,
      monthlyDocuments: 234
    });

    setRecentActivities([
      { id: 1, type: 'id_card', message: 'ID Card approved for MESERET KEBEDE', time: '2 min ago', status: 'approved' },
      { id: 2, type: 'clearance', message: 'Clearance certificate requested by TEWODROS MULATU', time: '15 min ago', status: 'pending' },
      { id: 3, type: 'id_card', message: 'ID Card rejected - Insufficient residency period', time: '1 hr ago', status: 'rejected' },
      { id: 4, type: 'clearance', message: 'Clearance certificate issued for ELENI GIRMA', time: '2 hrs ago', status: 'approved' }
    ]);

    setPendingRequests([
      { id: "REQ-001", type: "ID Card", applicant: "Dawit Haile", submitted: "2024-01-15", status: "Pending Verification" },
      { id: "REQ-002", type: "Clearance", applicant: "Yeshiwas Solomon", submitted: "2024-01-15", status: "Pending Approval" },
      { id: "REQ-003", type: "ID Card", applicant: "Zework Aklilu", submitted: "2024-01-14", status: "Residency Check" }
    ]);
  }, []);

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">Chairman Dashboard</h1>
            <div className="text-purple-100 mt-2 text-lg">Woldia Kebele Administration</div>
            <div className="text-sm opacity-90">Document Issuance & Administrative Oversight</div>
          </div>
          <div className="text-right">
            <div className="text-lg">Welcome,</div>
            <div className="text-3xl font-bold">AGUMAS BIRHANU</div>
            <div className="text-sm opacity-90">Chairman • WDU1304903</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pending ID Cards */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Pending ID Cards</div>
              <div className="text-4xl font-bold mt-2">{stats.pendingIDCards}</div>
              <div className="text-sm mt-3 opacity-80">Awaiting approval</div>
            </div>
            <FaIdCard className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Pending Clearances */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Pending Clearances</div>
              <div className="text-4xl font-bold mt-2">{stats.pendingClearances}</div>
              <div className="text-sm mt-3 opacity-80">Relocation requests</div>
            </div>
            <FaFileAlt className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Today's Approvals */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Today's Approvals</div>
              <div className="text-4xl font-bold mt-2">{stats.todayApprovals}</div>
              <div className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-purple-200" /> +5 from yesterday
              </div>
            </div>
            <FaCheckCircle className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Total Residents */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Total Residents</div>
              <div className="text-4xl font-bold mt-2">{stats.totalResidents.toLocaleString()}</div>
              <div className="text-sm mt-3 opacity-80">Registered population</div>
            </div>
            <FaUsers className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Total Houses */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Registered Houses</div>
              <div className="text-4xl font-bold mt-2">{stats.totalHouses.toLocaleString()}</div>
              <div className="text-sm mt-3 opacity-80">Housing units</div>
            </div>
            <FaHome className="text-6xl opacity-30" />
          </div>
        </div>

        {/* Monthly Documents */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Monthly Documents</div>
              <div className="text-4xl font-bold mt-2">{stats.monthlyDocuments}</div>
              <div className="text-sm mt-3 opacity-80">Issued this month</div>
            </div>
            <FaFileAlt className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
            <div className="text-sm text-gray-600 mt-1">Document processing timeline</div>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                {activity.type === 'id_card' ? (
                  <FaIdCard className={`text-lg ${
                    activity.status === 'approved' ? 'text-green-500' : 
                    activity.status === 'rejected' ? 'text-red-500' : 'text-blue-500'
                  }`} />
                ) : (
                  <FaFileAlt className={`text-lg ${
                    activity.status === 'approved' ? 'text-green-500' : 
                    activity.status === 'rejected' ? 'text-red-500' : 'text-orange-500'
                  }`} />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                  activity.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Pending Requests</h3>
            <div className="text-sm text-gray-600 mt-1">Requiring your attention</div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${
                        request.type === 'ID Card' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {request.type === 'ID Card' ? <FaIdCard /> : <FaFileAlt />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{request.type}</div>
                        <div className="text-sm text-gray-500">{request.applicant}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{request.submitted}</div>
                    <div className="text-xs text-orange-600 font-medium">{request.status}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-blue-600 text-xl" />
                <div>
                  <div className="font-medium text-blue-800">Verification Required</div>
                  <div className="text-sm text-blue-600">Ensure 6-month residency for ID cards and valid relocation reasons for clearances</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
              <FaIdCard className="text-xl" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 group-hover:text-blue-600">Issue ID Card</div>
              <div className="text-sm text-gray-500">Verify and print</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all group">
            <div className="p-3 bg-green-100 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
              <FaFileAlt className="text-xl" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 group-hover:text-green-600">Process Clearance</div>
              <div className="text-sm text-gray-500">Relocation certificates</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
              <FaSearch className="text-xl" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 group-hover:text-purple-600">Verify Resident</div>
              <div className="text-sm text-gray-500">Check eligibility</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all group">
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
  );
};

export default ChairmanOverview;