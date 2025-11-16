// src/components/chairman/ViewReports.jsx
import React, { useState } from "react";
import { 
  FaFileAlt, FaDownload, FaPrint, FaChartBar, 
  FaUsers, FaIdCard, FaFilePdf, FaFileExcel,
  FaCalendarAlt, FaFilter, FaSyncAlt, FaCog,
  FaDatabase, FaShieldAlt, FaClock, FaCheckCircle
} from "react-icons/fa";

const ViewReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-12-31"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportFormat, setReportFormat] = useState("PDF");
  const [includeCharts, setIncludeCharts] = useState(true);

  const reports = [
    {
      id: "resident-demographics",
      title: "Resident Demographics Report",
      description: "Comprehensive analysis of resident population, age distribution, and household statistics",
      icon: FaUsers,
      category: "Demographic",
      format: ["PDF", "Excel"],
      dataPoints: ["Age Distribution", "Household Size", "Gender Ratio", "Registration Trends"],
      requiredData: ["resident_registry", "census_data"]
    },
    {
      id: "id-card-operations",
      title: "ID Card Operations Report",
      description: "Detailed analysis of ID card issuance, rejection rates, and processing efficiency",
      icon: FaIdCard,
      category: "Operational",
      format: ["PDF", "Excel"],
      dataPoints: ["Issuance Rate", "Rejection Reasons", "Processing Time", "Backlog Analysis"],
      requiredData: ["id_card_logs", "verification_records"]
    },
    {
      id: "clearance-certificates",
      title: "Clearance Certificates Analytics",
      description: "Statistical analysis of clearance certificates including approval patterns and reasons",
      icon: FaFileAlt,
      category: "Analytical",
      format: ["PDF", "Excel"],
      dataPoints: ["Approval Rate", "Processing Timeline", "Reason Analysis", "Geographic Distribution"],
      requiredData: ["clearance_records", "resident_movement"]
    },
    {
      id: "administrative-performance",
      title: "Administrative Performance Metrics",
      description: "Key performance indicators and efficiency metrics for Kebele administration",
      icon: FaChartBar,
      category: "Performance",
      format: ["PDF", "Excel"],
      dataPoints: ["Processing Efficiency", "Staff Performance", "Service Delivery", "Compliance Rate"],
      requiredData: ["performance_logs", "service_records"]
    },
    {
      id: "document-audit-trail",
      title: "Document Audit Trail Report",
      description: "Complete audit trail of all document transactions with security verification",
      icon: FaShieldAlt,
      category: "Security",
      format: ["PDF"],
      dataPoints: ["Document Flow", "Authorization Logs", "Modification History", "Access Records"],
      requiredData: ["audit_logs", "security_records"]
    },
    {
      id: "compliance-regulatory",
      title: "Compliance & Regulatory Report",
      description: "Regulatory compliance status and government reporting requirements",
      icon: FaCheckCircle,
      category: "Compliance",
      format: ["PDF", "Excel"],
      dataPoints: ["Regulatory Compliance", "Reporting Status", "Inspection Readiness", "Policy Adherence"],
      requiredData: ["compliance_records", "regulatory_logs"]
    }
  ];

  const reportTemplates = {
    "resident-demographics": {
      sections: ["Executive Summary", "Population Overview", "Household Analysis", "Trend Analysis", "Recommendations"],
      charts: ["Population Pyramid", "Registration Trends", "Household Distribution"],
      dataSources: ["Resident Registry", "Census Data", "Registration Logs"]
    },
    "id-card-operations": {
      sections: ["Operations Summary", "Issuance Statistics", "Efficiency Metrics", "Quality Analysis", "Improvement Plan"],
      charts: ["Monthly Issuance", "Rejection Analysis", "Processing Time"],
      dataSources: ["ID Card Database", "Verification System", "Processing Logs"]
    },
    "clearance-certificates": {
      sections: ["Certificate Overview", "Approval Statistics", "Processing Analysis", "Geographic Insights", "Policy Impact"],
      charts: ["Approval Trends", "Processing Timeline", "Reason Distribution"],
      dataSources: ["Clearance Registry", "Resident Movement", "Approval Logs"]
    }
  };

  const handleGenerateReport = async (report) => {
    setSelectedReport(report);
    setIsGenerating(true);
    
    // Simulate complex report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const handleDownloadReport = () => {
    const reportData = {
      report: selectedReport,
      format: reportFormat,
      dateRange,
      includeCharts,
      generatedAt: new Date().toISOString(),
      reportId: `REP-${Date.now()}`,
      chairman: "Kebele Chairman Office"
    };

    console.log("Downloading report:", reportData);
    
    // Simulate download
    alert(`${selectedReport.title} generated successfully in ${reportFormat} format!`);
  };

  const handleAdvancedSettings = () => {
    // Advanced report configuration
    console.log("Opening advanced settings for:", selectedReport);
  };

  const ReportCard = ({ report }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <report.icon className="text-xl" />
          </div>
          <div>
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium mb-2">
              {report.category}
            </span>
            <h3 className="font-bold text-gray-800 text-lg">{report.title}</h3>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{report.description}</p>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FaDatabase />
          <span>Data Points: {report.dataPoints.join(", ")}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {report.format.map(format => (
            <span key={format} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              {format}
            </span>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => handleGenerateReport(report)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
      >
        <FaFileAlt />
        Generate Report
      </button>
    </div>
  );

  const GenerationProgress = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="text-center">
        <FaSyncAlt className="mx-auto text-4xl text-purple-600 animate-spin mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Generating Report</h3>
        <p className="text-gray-600 mb-6">Processing data and compiling {selectedReport.title}</p>
        
        <div className="space-y-3">
          {[
            "Initializing report engine...",
            "Querying database records...",
            "Processing analytical data...",
            "Generating visualizations...",
            "Compiling final report..."
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
              <FaCheckCircle className="text-green-500 flex-shrink-0" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ReportPreview = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Report Configuration</h3>
        <button
          onClick={handleAdvancedSettings}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FaCog />
          Settings
        </button>
      </div>

      <div className="space-y-6">
        {/* Report Details */}
        <div className="bg-gray-50 rounded-xl p-4 border">
          <h4 className="font-semibold text-gray-800 mb-2">{selectedReport.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{selectedReport.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaClock />
              <span>Generated: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaDatabase />
              <span>Data Sources: {selectedReport.requiredData.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Format
            </label>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {selectedReport.format.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <div className="font-medium text-blue-800">Include Charts & Graphs</div>
            <div className="text-sm text-blue-600">Add visual data representations to the report</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Report Sections Preview */}
        {reportTemplates[selectedReport.id] && (
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Report Structure</h5>
            <div className="grid grid-cols-2 gap-2">
              {reportTemplates[selectedReport.id].sections.map((section, index) => (
                <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                  {section}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Download Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleDownloadReport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
          >
            <FaDownload />
            Download {reportFormat}
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <FaPrint />
            Print Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaChartBar className="text-purple-600" />
              Professional Reports
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Generate comprehensive analytical reports for Kebele administration and regulatory compliance
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-xl border border-purple-200">
              <FaCalendarAlt className="text-purple-600" />
              <span className="text-purple-700 font-medium">
                {dateRange.start} to {dateRange.end}
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <FaFilter />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Reports Library */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Library</h2>
            <p className="text-gray-600">
              Select from professionally designed report templates with comprehensive data analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>

        {/* Report Generation Panel */}
        <div className="space-y-6">
          {isGenerating ? (
            <GenerationProgress />
          ) : selectedReport ? (
            <ReportPreview />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
              <FaFileAlt className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Report Selected</h3>
              <p className="text-gray-600">
                Choose a report template from the library to begin generation
              </p>
            </div>
          )}

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaDatabase className="text-green-600" />
              System Status
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Sources</span>
                <span className="text-green-600 font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Report Engine</span>
                <span className="text-green-600 font-medium">Ready</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;