// src/components/admin/BackupRestore.jsx
import React, { useState, useEffect } from "react";
import {
  FaDatabase,
  FaDownload,
  FaUpload,
  FaHistory,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrash,
  FaSync,
  FaCloudDownloadAlt,
  FaCloudUploadAlt
} from "react-icons/fa";

const BackupRestore = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);

  useEffect(() => {
    const mockBackups = [
      {
        id: "B001",
        name: "backup_2024_01_15_083000",
        size: "2.4 GB",
        type: "Full Backup",
        status: "completed",
        createdAt: "2024-01-15 08:30:00",
        createdBy: "AGUMAS BIRHANU"
      },
      {
        id: "B002",
        name: "backup_2024_01_14_200000",
        size: "2.3 GB",
        type: "Full Backup",
        status: "completed",
        createdAt: "2024-01-14 20:00:00",
        createdBy: "System Auto"
      },
      {
        id: "B003",
        name: "backup_2024_01_13_200000",
        size: "2.3 GB",
        type: "Full Backup",
        status: "completed",
        createdAt: "2024-01-13 20:00:00",
        createdBy: "System Auto"
      },
      {
        id: "B004",
        name: "incremental_2024_01_15_120000",
        size: "150 MB",
        type: "Incremental",
        status: "completed",
        createdAt: "2024-01-15 12:00:00",
        createdBy: "System Auto"
      }
    ];

    setBackups(mockBackups);
  }, []);

  const handleCreateBackup = () => {
    setLoading(true);
    setTimeout(() => {
      const newBackup = {
        id: `B${String(backups.length + 1).padStart(3, '0')}`,
        name: `backup_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}_${Date.now()}`,
        size: "2.4 GB",
        type: "Full Backup",
        status: "completed",
        createdAt: new Date().toISOString(),
        createdBy: "AGUMAS BIRHANU"
      };
      setBackups([newBackup, ...backups]);
      setLoading(false);
    }, 2000);
  };

  const handleRestore = (backup) => {
    setSelectedBackup(backup);
    if (window.confirm(`Are you sure you want to restore from backup: ${backup.name}?`)) {
      // Restore logic would go here
      setTimeout(() => {
        setSelectedBackup(null);
      }, 3000);
    }
  };

  const handleDeleteBackup = (backupId) => {
    if (window.confirm("Are you sure you want to delete this backup?")) {
      setBackups(backups.filter(b => b.id !== backupId));
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { color: "bg-green-100 text-green-800", icon: FaCheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: FaExclamationTriangle },
      running: { color: "bg-blue-100 text-blue-800", icon: FaSync }
    };
    
    const { color, icon: Icon } = config[status] || config.completed;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Backup & Restore</h2>
            <p className="text-gray-600 mt-1">Manage system backups and restoration (UC-005)</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreateBackup}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaDatabase className="text-sm" />
              )}
              {loading ? "Creating Backup..." : "Create Backup"}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Backups</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{backups.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaDatabase className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">7.1 GB</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaCloudDownloadAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {backups.length > 0 ? new Date(backups[0].createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <FaHistory className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Backup List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Available Backups</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Backup Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FaDatabase className="text-gray-600 text-sm" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {backup.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          by {backup.createdBy}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {backup.type}
                      </span>
                      <div className="text-sm text-gray-500">
                        {backup.size}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(backup.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(backup.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRestore(backup)}
                        disabled={selectedBackup?.id === backup.id}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-xs"
                      >
                        {selectedBackup?.id === backup.id ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FaCloudUploadAlt className="text-xs" />
                        )}
                        Restore
                      </button>
                      <button
                        onClick={() => handleDeleteBackup(backup.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                      >
                        <FaDownload className="text-xs" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {backups.length === 0 && (
          <div className="text-center py-12">
            <FaDatabase className="mx-auto text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No backups available</p>
            <p className="text-gray-400 mt-1">Create your first backup to get started</p>
          </div>
        )}
      </div>

      {/* Backup Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Backup Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto Backup Schedule
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Daily at 20:00</option>
                <option>Weekly on Sunday</option>
                <option>Monthly on 1st</option>
                <option>Disabled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Retention
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Keep last 30 backups</option>
                <option>Keep last 7 days</option>
                <option>Keep last 3 months</option>
                <option>Keep forever</option>
              </select>
            </div>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Restore Options</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Backup File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-gray-600">Drag and drop backup file here or click to browse</p>
                <input type="file" className="hidden" />
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              Upload and Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;