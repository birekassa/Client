import React, { useState, useEffect } from "react";
import { useTranslation } from './useTranslation';

const EvaluatePerformance = () => {
  const [activeTab, setActiveTab] = useState("metrics");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [performanceData, setPerformanceData] = useState({
    departments: [],
    metrics: []
  });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  
  const { t, language } = useTranslation();

  // Simulate API call to fetch performance data
  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data with translations
      const mockData = {
        departments: [
          { 
            id: 1, 
            name: "Social Services", 
            completion: 85, 
            satisfaction: 92, 
            timeliness: 78,
            staffCount: 12,
            pendingTasks: 8
          },
          { 
            id: 2, 
            name: "Administration", 
            completion: 92, 
            satisfaction: 88, 
            timeliness: 85,
            staffCount: 8,
            pendingTasks: 3
          },
          { 
            id: 3, 
            name: "Public Works", 
            completion: 78, 
            satisfaction: 85, 
            timeliness: 72,
            staffCount: 15,
            pendingTasks: 15
          },
          { 
            id: 4, 
            name: "Health Services", 
            completion: 88, 
            satisfaction: 90, 
            timeliness: 80,
            staffCount: 10,
            pendingTasks: 6
          }
        ],
        metrics: [
          { period: "Q1 2024", activities: 45, completion: 82, satisfaction: 88, revenue: 125000 },
          { period: "Q2 2024", activities: 52, completion: 85, satisfaction: 90, revenue: 142000 },
          { period: "Q3 2024", activities: 48, completion: 88, satisfaction: 92, revenue: 138000 },
          { period: "Q4 2024", activities: 55, completion: 90, satisfaction: 94, revenue: 156000 }
        ]
      };
      
      setPerformanceData(mockData);
      setLoading(false);
    };

    fetchPerformanceData();
  }, []);

  // Filter departments based on selection
  const filteredDepartments = selectedDepartment === "all" 
    ? performanceData.departments 
    : performanceData.departments.filter(dept => 
        dept.name.toLowerCase().includes(selectedDepartment.toLowerCase())
      );

  // Calculate overall metrics
  const overallMetrics = {
    completion: performanceData.departments.reduce((acc, dept) => acc + dept.completion, 0) / performanceData.departments.length,
    satisfaction: performanceData.departments.reduce((acc, dept) => acc + dept.satisfaction, 0) / performanceData.departments.length,
    timeliness: performanceData.departments.reduce((acc, dept) => acc + dept.timeliness, 0) / performanceData.departments.length,
    totalActivities: performanceData.metrics.reduce((acc, metric) => acc + metric.activities, 0)
  };

  // Export data functionality
  const handleExportData = async (format = 'csv') => {
    setExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const exportData = {
        timestamp: new Date().toISOString(),
        departments: performanceData.departments,
        metrics: performanceData.metrics,
        overall: overallMetrics
      };
      
      console.log(`Exporting data as ${format}:`, exportData);
      alert(t.exportSuccess || `Performance data exported successfully as ${format.toUpperCase()}!`);
    } catch (error) {
      alert(t.exportError || 'Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // Generate department report
  const handleGenerateDepartmentReport = async (department) => {
    setGeneratingReport(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const report = {
        department: department.name,
        generatedAt: new Date().toLocaleString(),
        metrics: {
          completion: department.completion,
          satisfaction: department.satisfaction,
          timeliness: department.timeliness
        },
        summary: t.departmentReportGenerated?.replace('{department}', department.name) || `Performance report for ${department.name} generated successfully.`,
        recommendations: generateRecommendations(department)
      };
      
      console.log('Department Report:', report);
      alert(t.reportGenerated || `Report for ${department.name} generated successfully!`);
    } catch (error) {
      alert(t.reportError || 'Report generation failed. Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };

  // Generate comprehensive report
  const handleGenerateComprehensiveReport = async () => {
    setGeneratingReport(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const comprehensiveReport = {
        generatedAt: new Date().toLocaleString(),
        overallPerformance: overallMetrics,
        departmentBreakdown: performanceData.departments,
        quarterlyTrends: performanceData.metrics,
        executiveSummary: generateExecutiveSummary(),
        actionItems: generateActionItems()
      };
      
      console.log('Comprehensive Report:', comprehensiveReport);
      alert(t.comprehensiveReportGenerated || 'Comprehensive performance report generated successfully!');
    } catch (error) {
      alert(t.comprehensiveReportError || 'Comprehensive report generation failed. Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };

  // Helper functions for report generation
  const generateRecommendations = (department) => {
    const recommendations = [];
    if (department.completion < 80) {
      recommendations.push(t.improveCompletion || "Improve task completion rates through better resource allocation");
    }
    if (department.satisfaction < 85) {
      recommendations.push(t.enhanceSatisfaction || "Enhance stakeholder engagement and feedback collection");
    }
    if (department.timeliness < 75) {
      recommendations.push(t.optimizeTimeliness || "Optimize workflow processes to improve timeliness");
    }
    return recommendations.length > 0 ? recommendations : [t.excellentPerformance || "Department performance is excellent. Maintain current practices."];
  };

  const generateExecutiveSummary = () => {
    const avgCompletion = overallMetrics.completion;
    if (avgCompletion >= 85) return t.excellentPerformanceSummary || "Excellent overall performance with strong completion rates and high satisfaction.";
    if (avgCompletion >= 75) return t.goodPerformanceSummary || "Good performance with opportunities for improvement in timeliness.";
    return t.attentionNeededSummary || "Performance requires attention. Focus on improving completion rates and stakeholder satisfaction.";
  };

  const generateActionItems = () => {
    return [
      t.reviewMetrics || "Review department-specific performance metrics",
      t.scheduleReviews || "Schedule performance review meetings",
      t.allocateResources || "Allocate resources based on performance gaps",
      t.implementTraining || "Implement training programs for low-performing areas"
    ];
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8 p-2">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="animate-pulse p-3 bg-white/20 rounded-xl">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{t.evaluatePerformance || "Evaluate Performance"}</h2>
              <p className="text-purple-100 text-lg">{t.loading || "Loading performance data..."}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">⭐</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{t.evaluatePerformance || "Evaluate Performance"}</h2>
            <p className="text-purple-100 text-lg opacity-90">
              {t.monitoringDepartments 
                ? t.monitoringDepartments.replace('{count}', performanceData.departments.length).replace('{activities}', overallMetrics.totalActivities)
                : `Monitoring ${performanceData.departments.length} departments • ${overallMetrics.totalActivities} total activities`}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t.avgCompletion || "Avg. Completion"}</p>
              <p className="text-2xl font-bold text-gray-800">{overallMetrics.completion.toFixed(1)}%</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t.avgSatisfaction || "Avg. Satisfaction"}</p>
              <p className="text-2xl font-bold text-gray-800">{overallMetrics.satisfaction.toFixed(1)}%</p>
            </div>
            <div className="text-2xl">😊</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t.avgTimeliness || "Avg. Timeliness"}</p>
              <p className="text-2xl font-bold text-gray-800">{overallMetrics.timeliness.toFixed(1)}%</p>
            </div>
            <div className="text-2xl">⏱️</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t.totalDepartments || "Total Departments"}</p>
              <p className="text-2xl font-bold text-gray-800">{performanceData.departments.length}</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {[
            { id: "metrics", label: t.performanceMetrics || "Performance Metrics", icon: "📊" },
            { id: "departments", label: t.departmentAnalysis || "Department Analysis", icon: "🏢" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-white text-purple-600 shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Tab Content */}
      {activeTab === "metrics" && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{t.activityCompletion || "Activity Completion"}</h3>
                <span className="text-3xl bg-white/20 p-3 rounded-xl">📈</span>
              </div>
              <p className="text-4xl font-bold mb-2">{overallMetrics.completion.toFixed(0)}%</p>
              <p className="text-green-100 text-sm">{t.overallCompletionRate || "Overall Completion Rate"}</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div className="bg-white h-2 rounded-full" style={{ width: `${overallMetrics.completion}%` }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{t.memberSatisfaction || "Member Satisfaction"}</h3>
                <span className="text-3xl bg-white/20 p-3 rounded-xl">👥</span>
              </div>
              <p className="text-4xl font-bold mb-2">{overallMetrics.satisfaction.toFixed(0)}%</p>
              <p className="text-blue-100 text-sm">{t.satisfactionRate || "Satisfaction Rate"}</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div className="bg-white h-2 rounded-full" style={{ width: `${overallMetrics.satisfaction}%` }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{t.timeliness || "Timeliness"}</h3>
                <span className="text-3xl bg-white/20 p-3 rounded-xl">⏱️</span>
              </div>
              <p className="text-4xl font-bold mb-2">{overallMetrics.timeliness.toFixed(0)}%</p>
              <p className="text-orange-100 text-sm">{t.onTimeDelivery || "On Time Delivery"}</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div className="bg-white h-2 rounded-full" style={{ width: `${overallMetrics.timeliness}%` }}></div>
              </div>
            </div>
          </div>

          {/* Quarterly Performance Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <span className="text-2xl">📅</span>
                {t.quarterlyTrends || "Quarterly Performance Trends"}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">{t.period || "Period"}</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">{t.activities || "Activities"}</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">{t.completion || "Completion"}</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">{t.satisfaction || "Satisfaction"}</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">{t.revenue || "Revenue"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {performanceData.metrics.map((metric, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📊</span>
                          <span className="font-semibold text-gray-900">{metric.period}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{metric.activities}</span>
                        <p className="text-sm text-gray-600">{t.activities || "Activities"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{metric.completion}%</span>
                          <span className={`w-3 h-3 rounded-full ${
                            metric.completion >= 85 ? 'bg-green-500' : 
                            metric.completion >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              metric.completion >= 85 ? 'bg-green-500' : 
                              metric.completion >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${metric.completion}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{metric.satisfaction}%</span>
                          <span className={`w-3 h-3 rounded-full ${
                            metric.satisfaction >= 90 ? 'bg-green-500' : 
                            metric.satisfaction >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              metric.satisfaction >= 90 ? 'bg-green-500' : 
                              metric.satisfaction >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${metric.satisfaction}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          ${(metric.revenue / 1000).toFixed(0)}K
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Departments Tab Content */}
      {activeTab === "departments" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-2xl">🏢</span>
              {t.departmentAnalysis || "Department Performance Analysis"}
            </h3>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">{t.allDepartments || "All Departments"}</option>
              <option value="social">Social Services</option>
              <option value="admin">Administration</option>
              <option value="works">Public Works</option>
              <option value="health">Health Services</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDepartments.map((dept, index) => (
              <div key={dept.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{dept.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {t.staffCount 
                        ? t.staffCount.replace('{count}', dept.staffCount).replace('{tasks}', dept.pendingTasks)
                        : `${dept.staffCount} staff • ${dept.pendingTasks} pending tasks`}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">{t.completionRate || "Completion Rate"}</span>
                      <span className="font-bold text-gray-800">{dept.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${dept.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">{t.satisfactionScore || "Satisfaction Score"}</span>
                      <span className="font-bold text-gray-800">{dept.satisfaction}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${dept.satisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">{t.timeliness || "Timeliness"}</span>
                      <span className="font-bold text-gray-800">{dept.timeliness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${dept.timeliness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleGenerateDepartmentReport(dept)}
                  disabled={generatingReport}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingReport ? (t.generatingReport || 'Generating Report...') : (t.generateReport || 'Generate Report')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
        <button 
          onClick={() => handleExportData('csv')}
          disabled={exporting}
          className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {exporting ? (t.exporting || 'Exporting...') : (t.exportData || 'Export Data')}
        </button>
        <button 
          onClick={handleGenerateComprehensiveReport}
          disabled={generatingReport}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generatingReport ? (t.generatingReport || 'Generating Report...') : (t.generateComprehensiveReport || 'Generate Comprehensive Report')}
        </button>
      </div>
    </div>
  );
};

export default EvaluatePerformance;