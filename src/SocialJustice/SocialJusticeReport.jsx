// src/SocialJustice/components/reports/SocialJusticeReport.jsx
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  FaDownload,
  FaPrint,
  FaFilePdf,
  FaFileExcel,
  FaCalendar,
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
  FaChartPie,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const SocialJusticeReport = () => {
  const [dateRange, setDateRange] = useState('last_quarter');
  const [reportType, setReportType] = useState('comprehensive');

  // Mock data for reports
  const quarterlyPerformanceData = [
    { quarter: 'Q1 2023', cases: 285, resolved: 198, pending: 87, satisfaction: 88 },
    { quarter: 'Q2 2023', cases: 312, resolved: 225, pending: 87, satisfaction: 91 },
    { quarter: 'Q3 2023', cases: 298, resolved: 210, pending: 88, satisfaction: 89 },
    { quarter: 'Q4 2023', cases: 345, resolved: 250, pending: 95, satisfaction: 92 },
    { quarter: 'Q1 2024', cases: 378, resolved: 285, pending: 93, satisfaction: 94 },
    { quarter: 'Q2 2024', cases: 412, resolved: 320, pending: 92, satisfaction: 95 }
  ];

  const caseTypeBreakdownData = [
    { type: 'Civil Disputes', count: 156, trend: '+12%', color: '#8884d8' },
    { type: 'Criminal Cases', count: 128, trend: '+8%', color: '#82ca9d' },
    { type: 'Family Matters', count: 98, trend: '+15%', color: '#ffc658' },
    { type: 'Property Issues', count: 145, trend: '+22%', color: '#ff7300' },
    { type: 'Labor Disputes', count: 87, trend: '+5%', color: '#0088fe' },
    { type: 'Human Rights', count: 65, trend: '+18%', color: '#ff3860' }
  ];

  const regionalPerformanceData = [
    { region: 'Urban Center', cases: 245, resolved: 195, rate: 79.6, trend: 'up' },
    { region: 'Northern District', cases: 187, resolved: 142, rate: 75.9, trend: 'up' },
    { region: 'Southern Region', cases: 156, resolved: 115, rate: 73.7, trend: 'stable' },
    { region: 'Eastern Zone', cases: 134, resolved: 98, rate: 73.1, trend: 'down' },
    { region: 'Western Area', cases: 178, resolved: 135, rate: 75.8, trend: 'up' }
  ];

  const resolutionTimelineData = [
    { period: 'Week 1', civil: 12, criminal: 8, family: 6, property: 10 },
    { period: 'Week 2', civil: 15, criminal: 9, family: 7, property: 12 },
    { period: 'Week 3', civil: 18, criminal: 12, family: 9, property: 14 },
    { period: 'Week 4', civil: 14, criminal: 10, family: 8, property: 11 }
  ];

  const demographicAnalysisData = [
    { group: '18-25 Years', cases: 85, income: 'Low', priority: 'High' },
    { group: '26-35 Years', cases: 142, income: 'Medium', priority: 'Medium' },
    { group: '36-45 Years', cases: 118, income: 'Medium', priority: 'Medium' },
    { group: '46-55 Years', cases: 89, income: 'High', priority: 'Low' },
    { group: '56-65 Years', cases: 67, income: 'Medium', priority: 'High' },
    { group: '65+ Years', cases: 45, income: 'Low', priority: 'High' }
  ];

  const staffPerformanceData = [
    { name: 'Case Officer A', cases: 45, resolved: 38, rate: 84.4, trend: 'up' },
    { name: 'Case Officer B', cases: 52, resolved: 44, rate: 84.6, trend: 'up' },
    { name: 'Case Officer C', cases: 38, resolved: 31, rate: 81.6, trend: 'stable' },
    { name: 'Case Officer D', cases: 47, resolved: 41, rate: 87.2, trend: 'up' },
    { name: 'Case Officer E', cases: 41, resolved: 33, rate: 80.5, trend: 'down' }
  ];

  const keyMetrics = {
    totalCases: 1247,
    resolvedCases: 894,
    resolutionRate: 71.7,
    avgResolutionTime: 14.2,
    clientSatisfaction: 94.2,
    pendingCases: 218,
    urgentCases: 45,
    staffEfficiency: 83.6
  };

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

  const handleDownload = (format) => {
    alert(`Downloading report in ${format.toUpperCase()} format...`);
    // In real implementation, this would generate and download the report
  };

  const handlePrint = () => {
    window.print();
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaArrowUp className="text-green-500" />;
      case 'down': return <FaArrowDown className="text-red-500" />;
      default: return <span className="text-gray-500">→</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 print:bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Report Header */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                SOCIAL JUSTICE QUARTERLY REPORT
              </h1>
              <p className="text-gray-600 text-xl font-semibold">
                Comprehensive Analysis of Case Management and Justice Delivery
              </p>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
              <div className="text-2xl font-black text-gray-900">Q2 2024</div>
              <div className="text-gray-500 font-semibold">Reporting Period: April - June 2024</div>
              <div className="text-gray-500 font-semibold">Generated: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Report Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-6 bg-gray-50 rounded-xl border-2 border-gray-300">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold bg-white"
              >
                <option value="last_month">Last Month</option>
                <option value="last_quarter">Last Quarter</option>
                <option value="last_year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold bg-white"
              >
                <option value="comprehensive">Comprehensive Report</option>
                <option value="executive">Executive Summary</option>
                <option value="detailed">Detailed Analysis</option>
                <option value="performance">Performance Metrics</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDownload('pdf')}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl font-black hover:bg-red-700 transition-colors"
              >
                <FaFilePdf />
                <span>PDF</span>
              </button>
              <button
                onClick={() => handleDownload('excel')}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-black hover:bg-green-700 transition-colors"
              >
                <FaFileExcel />
                <span>Excel</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-colors"
              >
                <FaPrint />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
            <FaChartLine className="mr-3 text-blue-500" />
            EXECUTIVE SUMMARY
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
              <div className="text-3xl font-black text-blue-900 mb-2">{keyMetrics.totalCases}</div>
              <div className="text-blue-800 font-bold">Total Cases Handled</div>
              <div className="text-blue-600 text-sm font-semibold">+15% from last quarter</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <div className="text-3xl font-black text-green-900 mb-2">{keyMetrics.resolutionRate}%</div>
              <div className="text-green-800 font-bold">Resolution Rate</div>
              <div className="text-green-600 text-sm font-semibold">+3.2% improvement</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
              <div className="text-3xl font-black text-purple-900 mb-2">{keyMetrics.avgResolutionTime} days</div>
              <div className="text-purple-800 font-bold">Avg. Resolution Time</div>
              <div className="text-purple-600 text-sm font-semibold">-2.1 days faster</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
              <div className="text-3xl font-black text-orange-900 mb-2">{keyMetrics.clientSatisfaction}%</div>
              <div className="text-orange-800 font-bold">Client Satisfaction</div>
              <div className="text-orange-600 text-sm font-semibold">+1.8% increase</div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <h3 className="font-black text-yellow-900 text-xl mb-3">KEY FINDINGS</h3>
            <ul className="list-disc list-inside space-y-2 text-yellow-800 font-semibold">
              <li>Property dispute cases increased by 22% this quarter</li>
              <li>Urban Center region shows highest resolution rate at 79.6%</li>
              <li>Youth demographic (18-25) represents highest priority cases</li>
              <li>Staff efficiency improved by 5.3% compared to Q1 2024</li>
            </ul>
          </div>
        </div>

        {/* Quarterly Performance Trends */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
            <FaChartLine className="mr-3 text-green-500" />
            QUARTERLY PERFORMANCE TRENDS
          </h2>
          
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={quarterlyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="quarter" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="cases" 
                stroke="#8884d8" 
                strokeWidth={3}
                name="Total Cases"
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="resolved" 
                stroke="#82ca9d" 
                strokeWidth={3}
                name="Resolved Cases"
                dot={{ fill: '#82ca9d', strokeWidth: 2, r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#ffc658" 
                strokeWidth={3}
                name="Satisfaction %"
                dot={{ fill: '#ffc658', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Case Type Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
              <FaBalanceScale className="mr-3 text-purple-500" />
              CASE TYPE BREAKDOWN
            </h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseTypeBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  name="Number of Cases"
                  radius={[4, 4, 0, 0]}
                >
                  {caseTypeBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
              <FaGlobeAmericas className="mr-3 text-blue-500" />
              REGIONAL PERFORMANCE
            </h2>
            
            <div className="space-y-4">
              {regionalPerformanceData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div>
                    <div className="font-black text-gray-900">{region.region}</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      {region.cases} cases • {region.resolved} resolved
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-gray-900">{region.rate}%</span>
                      {getTrendIcon(region.trend)}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold">Success Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
            <FaUsers className="mr-3 text-green-500" />
            STAFF PERFORMANCE METRICS
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-black text-gray-900 border-2 border-gray-200">Case Officer</th>
                  <th className="p-4 text-center font-black text-gray-900 border-2 border-gray-200">Total Cases</th>
                  <th className="p-4 text-center font-black text-gray-900 border-2 border-gray-200">Resolved</th>
                  <th className="p-4 text-center font-black text-gray-900 border-2 border-gray-200">Success Rate</th>
                  <th className="p-4 text-center font-black text-gray-900 border-2 border-gray-200">Trend</th>
                </tr>
              </thead>
              <tbody>
                {staffPerformanceData.map((staff, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-900 border-2 border-gray-200">{staff.name}</td>
                    <td className="p-4 text-center font-semibold text-gray-900 border-2 border-gray-200">{staff.cases}</td>
                    <td className="p-4 text-center font-semibold text-gray-900 border-2 border-gray-200">{staff.resolved}</td>
                    <td className="p-4 text-center font-semibold text-gray-900 border-2 border-gray-200">{staff.rate}%</td>
                    <td className="p-4 text-center border-2 border-gray-200">
                      {getTrendIcon(staff.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Demographic Analysis */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
            <FaUserFriends className="mr-3 text-orange-500" />
            DEMOGRAPHIC ANALYSIS
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demographicAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="cases" 
                name="Number of Cases"
                radius={[4, 4, 0, 0]}
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations and Action Items */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 print:shadow-none">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
            <FaExclamationTriangle className="mr-3 text-red-500" />
            RECOMMENDATIONS & ACTION ITEMS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="font-black text-red-900 text-xl mb-3">IMMEDIATE ACTIONS</h3>
              <ul className="list-disc list-inside space-y-2 text-red-800 font-semibold">
                <li>Allocate additional resources to Eastern Zone (lowest resolution rate)</li>
                <li>Implement urgent case escalation protocol for high-priority demographics</li>
                <li>Provide targeted training for Case Officer E (performance decline)</li>
                <li>Increase outreach programs for youth demographic (18-25 years)</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-black text-blue-900 text-xl mb-3">STRATEGIC INITIATIVES</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-800 font-semibold">
                <li>Develop specialized property dispute resolution team</li>
                <li>Implement digital case management system enhancements</li>
                <li>Expand community partnership programs in underperforming regions</li>
                <li>Launch staff development program for continuous improvement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Report Footer */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-white print:bg-gray-900">
          <div className="text-center">
            <h3 className="text-2xl font-black mb-4">SOCIAL JUSTICE COUNCIL</h3>
            <p className="text-gray-300 font-semibold mb-2">
              Committed to Fairness, Equality, and Justice for All
            </p>
            <p className="text-gray-400 text-sm">
              This report was generated on {new Date().toLocaleDateString()} and reflects data from the specified reporting period.
              For questions or additional information, please contact the Social Justice Council administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialJusticeReport;