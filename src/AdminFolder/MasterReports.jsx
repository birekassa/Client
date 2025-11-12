// src/components/admin/MasterReports.jsx
import React, { useState } from "react";
import {
  FaDownload,
  FaFilter,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaUsers,
  FaHome,
  FaMoneyBillWave,
  FaDatabase,
  FaCalendarAlt,
  FaFileExcel,
  FaFilePdf
} from "react-icons/fa";

const MasterReports = () => {
  const [selectedReport, setSelectedReport] = useState("overview");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [generating, setGenerating] = useState(false);

  const reports = [
    {
      id: "overview",
      name: "System Overview Report",
      description: "Comprehensive overview of system usage and performance",
      icon: FaChartBar,
      category: "General"
    },
    {
      id: "user-activity",
      name: "User Activity Report",
      description: "Detailed analysis of user logins and activities",
      icon: FaUsers,
      category: "Users"
    },
    {
      id: "resident-stats",
      name: "Resident Statistics",
      description: "Demographic and registration statistics for residents",
      icon: FaHome,
      category: "Residents"
    },
    {
      id: "financial-summary",
      name: "Financial Summary",
      description: "Revenue, payments, and financial transactions overview",
      icon: FaMoneyBillWave,
      category: "Finance"
    },
    {
      id: "housing-report",
      name: "Housing Inventory",
      description: "Complete housing registration and status report",
      icon: FaHome,
      category: "Housing"
    },
    {
      id: "audit-trail",
      name: "Audit Trail Report",
      description: "Complete system audit trail and security events",
      icon: FaDatabase,
      category: "Security"
    }
  ];

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // In real app, would generate and download report
    }, 2000);
  };

  const handleExport = (format) => {
    // Export logic would go here
    console.log(`Exporting ${selectedReport} in ${format} format`);
  };

  const ReportIcon = reports.find(r => r.id === selectedReport)?.icon || FaChartBar;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Master Reports</h2>
            <p className="text-gray-600 mt-1">Generate comprehensive system reports and analytics (UC-007)</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <FaFileExcel className="text-sm" />
              Export Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <FaFilePdf className="text-sm" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Available Reports</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {reports.map((report) => {
                const Icon = report.icon;
                const isSelected = selectedReport === report.id;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full text-left p-4 border-b border-gray-100 transition-colors ${
                      isSelected
                        ? 'bg-green-50 border-green-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="text-sm" />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          isSelected ? 'text-green-800' : 'text-gray-800'
                        }`}>
                          {report.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {report.category}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Report Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <ReportIcon className="text-green-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">
                  {reports.find(r => r.id === selectedReport)?.name}
                </h3>
                <p className="text-gray-600">
                  {reports.find(r => r.id === selectedReport)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaFilter className="text-green-600" />
              Report Filters
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGenerateReport}
                  disabled={generating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {generating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaChartBar className="text-sm" />
                  )}
                  {generating ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">Report Preview</h4>
            <div className="space-y-6">
              {/* Sample Charts/Data would go here */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center">
                  <FaUsers className="mx-auto text-3xl text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-800">1,247</div>
                  <div className="text-sm text-gray-600">Total Residents</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                  <FaHome className="mx-auto text-3xl text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-800">856</div>
                  <div className="text-sm text-gray-600">Registered Houses</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                  <FaMoneyBillWave className="mx-auto text-3xl text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-800">ETB 245,680</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <FaChartLine className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600">Report visualization and detailed data will appear here</p>
                <p className="text-gray-400 text-sm mt-2">
                  Select filters and generate the report to view detailed analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterReports;