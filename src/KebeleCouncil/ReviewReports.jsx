import React, { useState } from "react";
import { useTranslation } from './useTranslation';

const ReviewReports = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const { t, language } = useTranslation();
  
  const [reports, setReports] = useState([
    {
      id: 1,
      title: t.monthlySocialServicesReport || "Monthly Social Services Report",
      department: t.socialServices || "Social Services",
      date: "2024-01-15",
      status: t.reviewed || "Reviewed",
      type: t.monthly || "Monthly",
      summary: t.comprehensiveReport || "Comprehensive report on social service activities and community outreach programs for the month.",
      content: t.socialServicesContent || "Detailed content of the social services report including community outreach programs, welfare distributions, and public assistance initiatives."
    },
    {
      id: 2,
      title: t.quarterlyFinancialOverview || "Quarterly Financial Overview",
      department: t.administration || "Administration",
      date: "2024-01-10",
      status: t.pendingReview || "Pending Review",
      type: t.quarterly || "Quarterly",
      summary: t.financialReport || "Detailed financial report covering budget allocation and expenditure for Q4 2023.",
      content: t.financialContent || "Complete financial breakdown including revenue, expenses, budget variances, and financial recommendations."
    },
    {
      id: 3,
      title: t.publicWorksProgressReport || "Public Works Progress Report",
      department: t.publicWorks || "Public Works",
      date: "2024-01-08",
      status: t.approved || "Approved",
      type: t.progress || "Progress",
      summary: t.worksProgress || "Update on ongoing infrastructure projects and maintenance activities.",
      content: t.worksContent || "Progress updates on road construction, public building maintenance, water supply projects, and sanitation initiatives."
    },
    {
      id: 4,
      title: t.healthServicesAnnualReview || "Health Services Annual Review",
      department: t.healthServices || "Health Services",
      date: "2024-01-05",
      status: t.reviewed || "Reviewed",
      type: t.annual || "Annual",
      summary: t.healthReview || "Annual review of health service delivery and community health initiatives.",
      content: t.healthContent || "Comprehensive annual health report covering disease prevention, vaccination campaigns, health facility operations, and public health education."
    }
  ]);

  const [editingReport, setEditingReport] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredReports = activeFilter === "all" 
    ? reports 
    : reports.filter(report => report.status === activeFilter);

  // Button handlers
  const handleApproveReport = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: t.approved || "Approved" } : report
    ));
    setSelectedReport(null);
    alert(`✅ ${t.reportApproved?.replace('{id}', reportId) || `Report #${reportId} has been approved successfully!`}`);
  };

  const handleRequestChanges = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    const changes = prompt(t.changesRequestedConfirm?.replace('{title}', report.title) || `What changes would you like to request for "${report.title}"?`);
    
    if (changes) {
      setReports(reports.map(report => 
        report.id === reportId ? { ...report, status: t.pendingReview || "Pending Review", changesRequested: changes } : report
      ));
      setSelectedReport(null);
      alert(`🔄 ${t.changesRequestedSuccess?.replace('{id}', reportId) || `Changes requested for report #${reportId}. The author has been notified.`}`);
    }
  };

  const handleDownloadPDF = (report) => {
    // Simulate PDF download
    const blob = new Blob([`
      KEBELE COUNCIL OFFICIAL REPORT
      ==============================
      
      ${t.title}: ${report.title}
      ${t.department}: ${report.department}
      ${t.date}: ${report.date}
      ${t.type}: ${report.type}
      ${t.status}: ${report.status}
      
      ${t.summary}:
      ${report.summary}
      
      ${t.fullContent}:
      ${report.content}
      
      Generated on: ${new Date().toLocaleDateString()}
      Kebele Council Management System
    `], { type: 'application/pdf' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}_${report.date}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(`📥 ${t.downloadingReport?.replace('{title}', report.title) || `Downloading: ${report.title}.pdf`}`);
  };

  const handleDownloadAll = () => {
    if (filteredReports.length === 0) {
      alert(t.noReportsAvailable || "No reports available to download.");
      return;
    }

    // Create a zip of all reports (simulated)
    const reportList = filteredReports.map(report => 
      `- ${report.title} (${report.department}) - ${report.status}`
    ).join('\n');
    
    const blob = new Blob([`
      KEBELE COUNCIL - ALL REPORTS
      ============================
      Generated: ${new Date().toLocaleDateString()}
      Total Reports: ${filteredReports.length}
      Filter: ${activeFilter === 'all' ? t.allReports : activeFilter}
      
      REPORTS:
      ${reportList}
      
      This is a summary export. Individual PDFs can be downloaded separately.
    `], { type: 'application/zip' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kebele_Reports_Export_${new Date().toISOString().split('T')[0]}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(`📊 ${t.exportedReports?.replace('{count}', filteredReports.length) || `Exported ${filteredReports.length} reports successfully!`}`);
  };

  const handleEditReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setEditingReport(report);
    setEditForm({
      title: report.title,
      summary: report.summary,
      content: report.content,
      department: report.department,
      type: report.type
    });
  };

  const handleSaveEdit = () => {
    if (!editingReport) return;

    setReports(reports.map(report => 
      report.id === editingReport.id 
        ? { 
            ...report, 
            ...editForm,
            status: t.pendingReview || "Pending Review", // Reset status when edited
            lastModified: new Date().toISOString().split('T')[0]
          } 
        : report
    ));

    alert(`✏️ ${t.reportUpdated?.replace('{title}', editForm.title) || `Report "${editForm.title}" has been updated successfully!`}`);
    setEditingReport(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingReport(null);
    setEditForm({});
  };

  const handleGenerateNewReport = () => {
    const newReport = {
      id: reports.length + 1,
      title: t.newReportTemplate || "New Report Template",
      department: t.selectDepartment || "Select Department",
      date: new Date().toISOString().split('T')[0],
      status: t.draft || "Draft",
      type: t.monthly || "Monthly",
      summary: t.enterReportSummary || "Enter report summary here...",
      content: t.enterDetailedContent || "Enter detailed report content here...",
      isNew: true
    };

    setReports([newReport, ...reports]);
    setEditingReport(newReport);
    setEditForm({
      title: newReport.title,
      summary: newReport.summary,
      content: newReport.content,
      department: newReport.department,
      type: newReport.type
    });

    alert(`🚀 ${t.newReportCreated || "New report template created! Please fill in the details."}`);
  };

  const handleExportAllReports = () => {
    if (reports.length === 0) {
      alert(t.noReportsAvailable || "No reports available to export.");
      return;
    }

    // Create CSV export
    const headers = [t.title, t.department, t.date, t.type, t.status, t.summary];
    const csvData = reports.map(report => [
      report.title,
      report.department,
      report.date,
      report.type,
      report.status,
      report.summary
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kebele_Reports_Complete_Export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`📈 ${t.exportedCSV?.replace('{count}', reports.length) || `Exported ${reports.length} reports to CSV successfully!`}`);
  };

  const handleReviewReport = (report) => {
    setSelectedReport(report);
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-3">{t.reportReviewCenter || "Report Review Center"}</h2>
        <p className="text-blue-100 text-lg">
          {t.reportReviewDescription || "View and analyze reports submitted by various departments. The Kebele Council reviews work activities and generates comprehensive reports as part of the official workflow."}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-lg font-semibold text-gray-700">{t.filterByStatus || "Filter by Status"}:</span>
          <div className="flex flex-wrap gap-3">
            {["all", t.reviewed, t.pendingReview, t.approved, t.draft].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status === "all" ? "all" : status)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeFilter === (status === "all" ? "all" : status)
                    ? status === "all" 
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : status === t.reviewed
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : status === t.pendingReview
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                      : status === t.approved
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-lg"
                }`}
              >
                {status === "all" ? t.allReports || "All Reports" : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {report.title}
                    {report.isNew && <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">NEW</span>}
                  </h3>
                  <div className="flex flex-col gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-blue-600">🏢</span>
                      {report.department}
                    </span>
                    <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <span className="text-green-600">📅</span>
                      {report.date}
                      {report.lastModified && <span className="text-xs text-gray-500"> ({t.modified || "modified"})</span>}
                    </span>
                    <span className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                      <span className="text-purple-600">📋</span>
                      {report.type}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                  report.status === t.reviewed ? 'bg-green-100 text-green-800 border border-green-200' :
                  report.status === t.pendingReview ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  report.status === t.approved ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {report.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{report.summary}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleReviewReport(report)}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md font-semibold"
                >
                  👁️ {t.review || "Review"}
                </button>
                <button 
                  onClick={() => handleDownloadPDF(report)}
                  className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md font-semibold"
                >
                  📥
                </button>
                <button 
                  onClick={() => handleEditReport(report.id)}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md font-semibold"
                >
                  ✏️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Reports Message */}
      {filteredReports.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{t.noReportsFound || "No Reports Found"}</h3>
          <p className="text-gray-600 text-lg">
            {t.noReportsMatchingFilters || "There are no reports matching the current filters."}
          </p>
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">{selectedReport.title}</h3>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <span className="font-semibold text-blue-700">{t.department || "Department"}:</span>
                  <p className="text-blue-800 mt-1 font-medium">{selectedReport.department}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <span className="font-semibold text-green-700">{t.date || "Date"}:</span>
                  <p className="text-green-800 mt-1 font-medium">{selectedReport.date}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <span className="font-semibold text-purple-700">{t.type || "Type"}:</span>
                  <p className="text-purple-800 mt-1 font-medium">{selectedReport.type}</p>
                </div>
                <div className={`p-4 rounded-xl ${
                  selectedReport.status === t.approved ? 'bg-emerald-50' :
                  selectedReport.status === t.reviewed ? 'bg-cyan-50' :
                  'bg-amber-50'
                }`}>
                  <span className="font-semibold text-gray-700">{t.status || "Status"}:</span>
                  <p className={`mt-1 font-medium ${
                    selectedReport.status === t.approved ? 'text-emerald-800' :
                    selectedReport.status === t.reviewed ? 'text-cyan-800' :
                    'text-amber-800'
                  }`}>{selectedReport.status}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <span className="font-semibold text-gray-700 text-lg">{t.summary || "Summary"}:</span>
                <p className="text-gray-600 mt-2 leading-relaxed">{selectedReport.summary}</p>
              </div>

              <div className="bg-white border border-gray-200 p-5 rounded-xl">
                <span className="font-semibold text-gray-700 text-lg">{t.fullContent || "Full Content"}:</span>
                <p className="text-gray-600 mt-2 leading-relaxed whitespace-pre-line">{selectedReport.content}</p>
              </div>
              
              {selectedReport.changesRequested && (
                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl">
                  <span className="font-semibold text-yellow-700 text-lg">{t.changesRequested || "Changes Requested"}:</span>
                  <p className="text-yellow-800 mt-2 leading-relaxed">{selectedReport.changesRequested}</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 text-lg mb-4">{t.reportActions || "Report Actions"}</h4>
                <div className="flex gap-3 flex-wrap">
                  <button 
                    onClick={() => handleApproveReport(selectedReport.id)}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg font-semibold"
                  >
                    ✅ {t.approveReport || "Approve Report"}
                  </button>
                  <button 
                    onClick={() => handleRequestChanges(selectedReport.id)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg font-semibold"
                  >
                    🔄 {t.requestChanges || "Request Changes"}
                  </button>
                  <button 
                    onClick={() => handleDownloadPDF(selectedReport)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg font-semibold"
                  >
                    📥 {t.downloadPDF || "Download PDF"}
                  </button>
                  <button 
                    onClick={() => handleEditReport(selectedReport.id)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg font-semibold"
                  >
                    ✏️ {t.editReport || "Edit Report"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Report Modal */}
      {editingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">{t.editReportTitle || "Edit Report"}</h3>
                <button 
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.title || "Title"}</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleEditFormChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.department || "Department"}</label>
                <select
                  value={editForm.department}
                  onChange={(e) => handleEditFormChange('department', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={t.socialServices || "Social Services"}>{t.socialServices || "Social Services"}</option>
                  <option value={t.administration || "Administration"}>{t.administration || "Administration"}</option>
                  <option value={t.publicWorks || "Public Works"}>{t.publicWorks || "Public Works"}</option>
                  <option value={t.healthServices || "Health Services"}>{t.healthServices || "Health Services"}</option>
                  <option value={t.education || "Education"}>{t.education || "Education"}</option>
                  <option value={t.security || "Security"}>{t.security || "Security"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.type || "Report Type"}</label>
                <select
                  value={editForm.type}
                  onChange={(e) => handleEditFormChange('type', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={t.monthly || "Monthly"}>{t.monthly || "Monthly"}</option>
                  <option value={t.quarterly || "Quarterly"}>{t.quarterly || "Quarterly"}</option>
                  <option value={t.annual || "Annual"}>{t.annual || "Annual"}</option>
                  <option value={t.progress || "Progress"}>{t.progress || "Progress"}</option>
                  <option value={t.special || "Special"}>{t.special || "Special"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.summary || "Summary"}</label>
                <textarea
                  value={editForm.summary}
                  onChange={(e) => handleEditFormChange('summary', e.target.value)}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.fullContent || "Full Content"}</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => handleEditFormChange('content', e.target.value)}
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleSaveEdit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg font-semibold"
                >
                  💾 {t.saveChanges || "Save Changes"}
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg font-semibold"
                >
                  ❌ {t.cancel || "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 bg-white p-6 rounded-2xl shadow-lg">
        <button 
          onClick={handleExportAllReports}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg font-semibold"
        >
          📈 {t.exportAllReports || "Export All Reports"}
        </button>
        <button 
          onClick={handleGenerateNewReport}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg font-semibold"
        >
          🚀 {t.generateNewReport || "Generate New Report"}
        </button>
      </div>
    </div>
  );
};

export default ReviewReports;