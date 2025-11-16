// src/SocialJustice/components/dashboard/MainContent.jsx
import React, { useState } from 'react';
import Overview from "./Overview"
import CaseForm from "./CaseForm";
import Verification from "./Verification";
import ConfirmationSheet from "./ConfirmationSheet";

const MainContent = ({ active, user, onCaseSubmit, onVerificationComplete, isMobile }) => {
  const stats = {
    totalCases: 156,
    pendingCases: 23,
    approvedCases: 89,
    activeMembers: 12
  };

  const recentCases = [
    { caseNumber: 'CASE-001', applicantName: 'John Doe', status: 'pending' },
    { caseNumber: 'CASE-002', applicantName: 'Jane Smith', status: 'approved' },
    { caseNumber: 'CASE-003', applicantName: 'Robert Johnson', status: 'pending' }
  ];

  // Reports data
  const reportsData = {
    monthlyStats: [
      { month: 'January', cases: 45, approved: 32, pending: 13 },
      { month: 'February', cases: 52, approved: 38, pending: 14 },
      { month: 'March', cases: 48, approved: 35, pending: 13 },
      { month: 'April', cases: 61, approved: 44, pending: 17 },
      { month: 'May', cases: 55, approved: 40, pending: 15 },
      { month: 'June', cases: 58, approved: 42, pending: 16 }
    ],
    caseTypes: [
      { type: 'Financial Aid', count: 67, percentage: 43 },
      { type: 'Legal Assistance', count: 45, percentage: 29 },
      { type: 'Housing Support', count: 28, percentage: 18 },
      { type: 'Employment', count: 16, percentage: 10 }
    ],
    councilPerformance: [
      { member: 'Sarah Wilson', casesHandled: 34, completionRate: '92%' },
      { member: 'Mike Chen', casesHandled: 28, completionRate: '89%' },
      { member: 'Emma Rodriguez', casesHandled: 31, completionRate: '94%' },
      { member: 'David Park', casesHandled: 25, completionRate: '86%' }
    ]
  };

  const ReportsSection = () => {
    const [timeRange, setTimeRange] = useState('last6months');
    const [reportType, setReportType] = useState('overview');

    return (
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
            >
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="currentYear">Current Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
            >
              <option value="overview">Overview</option>
              <option value="caseTypes">Case Types</option>
              <option value="performance">Council Performance</option>
              <option value="detailed">Detailed Report</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto">
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <h3 className="text-xs sm:text-sm font-medium text-blue-800">Total Cases</h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">156</p>
            <p className="text-xs text-blue-600">+12% from last period</p>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
            <h3 className="text-xs sm:text-sm font-medium text-green-800">Approval Rate</h3>
            <p className="text-xl sm:text-2xl font-bold text-green-900">78%</p>
            <p className="text-xs text-green-600">+5% from last period</p>
          </div>
          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
            <h3 className="text-xs sm:text-sm font-medium text-yellow-800">Pending Review</h3>
            <p className="text-xl sm:text-2xl font-bold text-yellow-900">23</p>
            <p className="text-xs text-yellow-600">-8% from last period</p>
          </div>
          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
            <h3 className="text-xs sm:text-sm font-medium text-purple-800">Avg. Resolution</h3>
            <p className="text-xl sm:text-2xl font-bold text-purple-900">4.2 days</p>
            <p className="text-xs text-purple-600">-1.3 days improvement</p>
          </div>
        </div>

        {/* Monthly Cases Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Monthly Case Statistics</h3>
          <div className="space-y-3">
            {reportsData.monthlyStats.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-700 w-16 sm:w-20">{month.month}</span>
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="flex items-center">
                    <div 
                      className="bg-green-500 h-3 sm:h-4 rounded-l"
                      style={{ width: `${(month.approved / month.cases) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-yellow-500 h-3 sm:h-4 rounded-r"
                      style={{ width: `${(month.pending / month.cases) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right min-w-16">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">{month.cases} total</span>
                  <div className="text-xs text-gray-500">
                    {month.approved}a • {month.pending}p
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Case Types Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Case Types Distribution</h3>
            <div className="space-y-3">
              {reportsData.caseTypes.map((caseType, index) => (
                <div key={caseType.type} className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{caseType.type}</span>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-20 sm:w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${caseType.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-900 w-12 sm:w-12 text-right">
                      {caseType.count} ({caseType.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Council Performance */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Council Performance</h3>
            <div className="space-y-3 sm:space-y-4">
              {reportsData.councilPerformance.map((member, index) => (
                <div key={member.member} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">{member.member}</h4>
                    <p className="text-xs text-gray-500">{member.casesHandled} cases</p>
                  </div>
                  <div className="text-right ml-2">
                    <span className={`text-sm sm:text-lg font-bold ${
                      parseInt(member.completionRate) > 90 ? 'text-green-600' : 
                      parseInt(member.completionRate) > 85 ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                      {member.completionRate}
                    </span>
                    <p className="text-xs text-gray-500">Rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-none text-center">
            Generate Monthly Report
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-none text-center">
            Export to Excel
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-none text-center">
            Print Summary
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (active) {
      case "Overview":
        return <Overview stats={stats} recentCases={recentCases} isMobile={isMobile} />;

      case "Case Form":
        return <CaseForm onSubmitCase={onCaseSubmit} isMobile={isMobile} />;

      case "Verify Cases":
        return <Verification onVerificationComplete={onVerificationComplete} isMobile={isMobile} />;

      case "Confirmation":
        return <ConfirmationSheet isMobile={isMobile} />;

      case "Write Letters":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Letter Writing</h2>
            <p className="text-gray-600">
              Prepare official letters to inform the concerned individuals.
            </p>
          </div>
        );

      case "Reports":
        return <ReportsSection />;

      case "Settings":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Settings</h2>
            <p className="text-gray-600">
              Update your profile and system preferences here.
            </p>
          </div>
        );

      default:
        return <Overview stats={stats} recentCases={recentCases} isMobile={isMobile} />;
    }
  };

  return (
    <main className="flex-1 p-3 sm:p-6 bg-white min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;