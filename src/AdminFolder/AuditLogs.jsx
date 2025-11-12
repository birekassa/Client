// src/components/admin/AuditLogs.jsx
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaUserEdit,
  FaTrash,
  FaPlus,
  FaSync,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle
} from "react-icons/fa";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const mockLogs = [
      {
        id: "L001",
        timestamp: "2024-01-15 08:30:00",
        user: "AGUMAS BIRHANU",
        action: "USER_LOGIN",
        description: "User logged into the system",
        ipAddress: "192.168.1.100",
        status: "success",
        details: { browser: "Chrome 120", device: "Desktop" }
      },
      {
        id: "L002",
        timestamp: "2024-01-15 09:15:00",
        user: "MESERET KEBEDE",
        action: "USER_CREATE",
        description: "Created new resident record",
        ipAddress: "192.168.1.101",
        status: "success",
        details: { residentId: "R12345", name: "John Doe" }
      },
      {
        id: "L003",
        timestamp: "2024-01-15 10:20:00",
        user: "TEWODROS MULATU",
        action: "PAYMENT_PROCESS",
        description: "Processed payment for resident",
        ipAddress: "192.168.1.102",
        status: "success",
        details: { amount: "500 ETB", receipt: "RC001234" }
      },
      {
        id: "L004",
        timestamp: "2024-01-15 11:45:00",
        user: "AGUMAS BIRHANU",
        action: "USER_UPDATE",
        description: "Updated user permissions",
        ipAddress: "192.168.1.100",
        status: "success",
        details: { userId: "U002", permissions: "updated" }
      },
      {
        id: "L005",
        timestamp: "2024-01-15 14:30:00",
        user: "ELENI GIRMA",
        action: "LOGIN_FAILED",
        description: "Failed login attempt",
        ipAddress: "192.168.1.103",
        status: "failed",
        details: { reason: "Invalid credentials" }
      }
    ];

    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter(log => log.action === actionFilter);
    }

    if (userFilter !== "all") {
      filtered = filtered.filter(log => log.user === userFilter);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, actionFilter, userFilter, logs]);

  const getStatusBadge = (status) => {
    const config = {
      success: { color: "bg-green-100 text-green-800", icon: FaCheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: FaExclamationTriangle },
      info: { color: "bg-blue-100 text-blue-800", icon: FaInfoCircle }
    };
    
    const { color, icon: Icon } = config[status] || config.info;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getActionIcon = (action) => {
    const icons = {
      USER_LOGIN: FaEye,
      USER_CREATE: FaPlus,
      USER_UPDATE: FaUserEdit,
      PAYMENT_PROCESS: FaSync,
      LOGIN_FAILED: FaExclamationTriangle
    };
    return icons[action] || FaInfoCircle;
  };

  const handleExportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Audit Logs</h2>
            <p className="text-gray-600 mt-1">Monitor system activities and user actions (UC-004)</p>
          </div>
          <button
            onClick={handleExportLogs}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <FaDownload className="text-sm" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{logs.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaEye className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {logs.filter(l => l.status === "success").length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaCheckCircle className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {logs.filter(l => l.status === "failed").length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Users</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {[...new Set(logs.map(l => l.user))].length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <FaUserEdit className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs by user, action, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Actions</option>
            <option value="USER_LOGIN">User Login</option>
            <option value="USER_CREATE">User Create</option>
            <option value="USER_UPDATE">User Update</option>
            <option value="PAYMENT_PROCESS">Payment Process</option>
            <option value="LOGIN_FAILED">Login Failed</option>
          </select>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Users</option>
            {[...new Set(logs.map(l => l.user))].map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User & Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const ActionIcon = getActionIcon(log.action);
                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <ActionIcon className="text-gray-600 text-sm" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {log.user}
                          </div>
                          <div className="text-sm text-gray-500">
                            {log.action.replace(/_/g, ' ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No audit logs found</p>
            <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;