// CertificateManagement.jsx
import React, { useState } from "react";
import { useTranslation } from "./useTranslation";

const CertificateManagement = () => {
  const [activeTab, setActiveTab] = useState("issue");
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    certificateType: "",
    purpose: "",
    issueDate: "",
    duration: "",
    remarks: ""
  });
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      fullName: "Alemu Bekele",
      idNumber: "ET-123456",
      certificateType: "Residence Certificate",
      purpose: "University Application",
      issueDate: "2024-01-15",
      status: "Issued",
      duration: "6 months"
    },
    {
      id: 2,
      fullName: "Meron Tesfaye",
      idNumber: "ET-789012",
      certificateType: "Good Conduct Certificate",
      purpose: "Employment Verification",
      issueDate: "2024-01-10",
      status: "Pending",
      duration: "1 year"
    },
    {
      id: 3,
      fullName: "Teshome Lemma",
      idNumber: "ET-345678",
      certificateType: "Income Certificate",
      purpose: "Bank Loan",
      issueDate: "2024-01-12",
      status: "Issued",
      duration: "3 months"
    },
    {
      id: 4,
      fullName: "Hana Mohammed",
      idNumber: "ET-901234",
      certificateType: "Family Certificate",
      purpose: "School Registration",
      issueDate: "2024-01-08",
      status: "Pending",
      duration: "1 year"
    }
  ]);
  const [filters, setFilters] = useState({
    certificateType: "",
    status: "",
    dateRange: ""
  });
  const [activeStat, setActiveStat] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [selectedCertificates, setSelectedCertificates] = useState(new Set());
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearchData, setAdvancedSearchData] = useState({
    name: "",
    idRange: "",
    dateFrom: "",
    dateTo: "",
    department: ""
  });

  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdvancedSearchChange = (e) => {
    const { name, value } = e.target;
    setAdvancedSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatClick = (statType) => {
    setActiveStat(statType);
    if (statType === "all") {
      setFilters(prev => ({ ...prev, status: "" }));
    } else if (statType === "issued") {
      setFilters(prev => ({ ...prev, status: "Issued" }));
    } else if (statType === "pending") {
      setFilters(prev => ({ ...prev, status: "Pending" }));
    }
  };

  const handleIssueCertificate = (e) => {
    e.preventDefault();
    const newCertificate = {
      id: Date.now(),
      ...formData,
      issueDate: formData.issueDate || new Date().toISOString().split('T')[0],
      status: "Issued"
    };
    setCertificates(prev => [newCertificate, ...prev]);
    setFormData({
      fullName: "",
      idNumber: "",
      certificateType: "",
      purpose: "",
      issueDate: "",
      duration: "",
      remarks: ""
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const downloadCertificate = (certificate) => {
    const certificateContent = `
${t.kebeleSocialJusticeCouncil}
${t.officialCertificate}
=================================================================

${t.certificateInformation}:
• ${t.type}: ${certificate.certificateType}
• ${t.status}: ${certificate.status}
• ${t.issueDate}: ${certificate.issueDate}
• ${t.duration}: ${certificate.duration}

${t.applicantDetails}:
• ${t.fullName}: ${certificate.fullName}
• ${t.idNumber}: ${certificate.idNumber}
• ${t.purpose}: ${certificate.purpose}

${t.additionalInformation}:
• ${t.remarks}: ${certificate.remarks || t.notApplicable}

${t.verification}:
${t.verificationText}

${t.officialStampSignature}:
____________________
${t.councilOfficial}
${t.kebeleSocialJusticeCouncil}

${t.date}: ${new Date().toLocaleDateString()}
${t.certificateId}: ${certificate.id}
=================================================================
    `;
    
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate_${certificate.fullName}_${certificate.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEditCertificate = (certificate) => {
    setEditingCertificate(certificate);
    setFormData({
      fullName: certificate.fullName,
      idNumber: certificate.idNumber,
      certificateType: certificate.certificateType,
      purpose: certificate.purpose,
      issueDate: certificate.issueDate,
      duration: certificate.duration,
      remarks: certificate.remarks || ""
    });
    setActiveTab("issue");
  };

  const handleUpdateCertificate = (e) => {
    e.preventDefault();
    if (editingCertificate) {
      setCertificates(prev => prev.map(cert => 
        cert.id === editingCertificate.id 
          ? { ...cert, ...formData, status: "Issued" }
          : cert
      ));
      setEditingCertificate(null);
      setFormData({
        fullName: "",
        idNumber: "",
        certificateType: "",
        purpose: "",
        issueDate: "",
        duration: "",
        remarks: ""
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleRenewCertificate = (certificate) => {
    const renewedCertificate = {
      ...certificate,
      id: Date.now(),
      issueDate: new Date().toISOString().split('T')[0],
      status: "Issued",
      remarks: `${t.renewedFromCertificate} #${certificate.id}. ${certificate.remarks || ''}`
    };
    setCertificates(prev => [renewedCertificate, ...prev]);
    alert(`${t.certificateRenewedSuccessfully} ${certificate.fullName}`);
  };

  const handleDeleteCertificate = (certificateId) => {
    if (window.confirm(t.confirmDeleteCertificate)) {
      setCertificates(prev => prev.filter(cert => cert.id !== certificateId));
      setSelectedCertificates(prev => {
        const newSet = new Set(prev);
        newSet.delete(certificateId);
        return newSet;
      });
    }
  };

  const handleCertificateSelect = (certificateId) => {
    setSelectedCertificates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(certificateId)) {
        newSet.delete(certificateId);
      } else {
        newSet.add(certificateId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedCertificates.size === filteredCertificates.length) {
      setSelectedCertificates(new Set());
    } else {
      setSelectedCertificates(new Set(filteredCertificates.map(cert => cert.id)));
    }
  };

  const handleBulkDownload = () => {
    if (selectedCertificates.size === 0) {
      alert(t.selectCertificatesToDownload);
      return;
    }

    selectedCertificates.forEach(certId => {
      const certificate = certificates.find(c => c.id === certId);
      if (certificate) {
        setTimeout(() => downloadCertificate(certificate), 100);
      }
    });
    alert(`${t.downloading} ${selectedCertificates.size} ${t.certificates}`);
  };

  const handleBulkPrint = () => {
    if (selectedCertificates.size === 0) {
      alert(t.selectCertificatesToPrint);
      return;
    }
    alert(`${t.printing} ${selectedCertificates.size} ${t.certificates}`);
  };

  const handleBulkDelete = () => {
    if (selectedCertificates.size === 0) {
      alert(t.selectCertificatesToDelete);
      return;
    }

    if (window.confirm(`${t.confirmBulkDelete} ${selectedCertificates.size} ${t.certificates}?`)) {
      setCertificates(prev => prev.filter(cert => !selectedCertificates.has(cert.id)));
      setSelectedCertificates(new Set());
    }
  };

  const handleExportAll = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalCertificates: certificates.length,
      certificates: certificates
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificates_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = () => {
    const reportData = {
      reportGenerated: new Date().toISOString(),
      summary: {
        total: certificates.length,
        issued: certificates.filter(c => c.status === 'Issued').length,
        pending: certificates.filter(c => c.status === 'Pending').length,
        byType: certificates.reduce((acc, cert) => {
          acc[cert.certificateType] = (acc[cert.certificateType] || 0) + 1;
          return acc;
        }, {})
      },
      certificates: certificates
    };

    const reportContent = `
${t.certificateManagementReport}
${t.generated}: ${new Date().toLocaleString()}
=================================================================

${t.summary}:
• ${t.totalCertificates}: ${reportData.summary.total}
• ${t.issued}: ${reportData.summary.issued}
• ${t.pending}: ${reportData.summary.pending}

${t.breakdownByType}:
${Object.entries(reportData.summary.byType).map(([type, count]) => `• ${type}: ${count}`).join('\n')}

${t.certificateDetails}:
${certificates.map(cert => `
--- ${t.certificate} #${cert.id} ---
${t.name}: ${cert.fullName}
${t.id}: ${cert.idNumber}
${t.type}: ${cert.certificateType}
${t.status}: ${cert.status}
${t.issueDate}: ${cert.issueDate}
${t.purpose}: ${cert.purpose}
${cert.remarks ? `${t.remarks}: ${cert.remarks}` : ''}
`).join('\n')}
=================================================================
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    alert(t.advancedSearchApplied);
    setShowAdvancedSearch(false);
  };

  const handleEmailCertificate = (certificate) => {
    alert(`${t.emailFunctionality} ${certificate.fullName}`);
  };

  const handleShareCertificate = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `${t.certificateFor} ${certificate.fullName}`,
        text: `${t.checkThisCertificate}: ${certificate.certificateType}`,
        url: window.location.href
      });
    } else {
      alert(t.shareFunctionalityAvailable);
    }
  };

  const handleToggleFavorite = (certificate) => {
    alert(`${t.certificate} ${certificate.id} ${certificate.favorite ? t.removedFromFavorites : t.addedToFavorites}`);
  };

  const filteredCertificates = certificates.filter(certificate => {
    if (filters.certificateType && certificate.certificateType !== filters.certificateType) return false;
    if (filters.status && certificate.status !== filters.status) return false;
    if (filters.dateRange) {
      const issueDate = new Date(certificate.issueDate);
      const filterDate = new Date(filters.dateRange);
      return issueDate.toDateString() === filterDate.toDateString();
    }
    if (advancedSearchData.name && !certificate.fullName.toLowerCase().includes(advancedSearchData.name.toLowerCase())) return false;
    if (advancedSearchData.dateFrom && new Date(certificate.issueDate) < new Date(advancedSearchData.dateFrom)) return false;
    if (advancedSearchData.dateTo && new Date(certificate.issueDate) > new Date(advancedSearchData.dateTo)) return false;
    
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Pending': return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white';
      case 'Rejected': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  const getCertificateTypeColor = (type) => {
    switch (type) {
      case 'Residence Certificate': return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
      case 'Good Conduct Certificate': return 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200';
      case 'Income Certificate': return 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200';
      case 'Family Certificate': return 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200';
      case 'Age Certificate': return 'bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200';
      default: return 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200';
    }
  };

  const getStatCardStyle = (statType) => {
    const baseStyle = "p-4 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ";
    const activeStyle = "ring-4 ring-opacity-50 ";
    
    switch (statType) {
      case 'all':
        return baseStyle + (activeStat === 'all' ? 
          "bg-gradient-to-br from-blue-500 to-cyan-500 text-white " + activeStyle + "ring-blue-300" : 
          "bg-gradient-to-br from-blue-400 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-500");
      
      case 'issued':
        return baseStyle + (activeStat === 'issued' ? 
          "bg-gradient-to-br from-green-500 to-emerald-500 text-white " + activeStyle + "ring-green-300" : 
          "bg-gradient-to-br from-green-400 to-emerald-400 text-white hover:from-green-500 hover:to-emerald-500");
      
      case 'pending':
        return baseStyle + (activeStat === 'pending' ? 
          "bg-gradient-to-br from-yellow-500 to-amber-500 text-white " + activeStyle + "ring-yellow-300" : 
          "bg-gradient-to-br from-yellow-400 to-amber-400 text-white hover:from-yellow-500 hover:to-amber-500");
      
      case 'month':
        return baseStyle + (activeStat === 'month' ? 
          "bg-gradient-to-br from-purple-500 to-violet-500 text-white " + activeStyle + "ring-purple-300" : 
          "bg-gradient-to-br from-purple-400 to-violet-400 text-white hover:from-purple-500 hover:to-violet-500");
      
      default:
        return baseStyle;
    }
  };

  const stats = {
    all: certificates.length,
    issued: certificates.filter(c => c.status === 'Issued').length,
    pending: certificates.filter(c => c.status === 'Pending').length,
    month: certificates.filter(c => {
      const certDate = new Date(c.issueDate);
      const now = new Date();
      return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 transform animate-bounce-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-lg">✅</span>
            </div>
            <div>
              <p className="font-bold">
                {editingCertificate ? t.certificateUpdated : t.certificateIssued} {t.successfully}
              </p>
              <p className="text-green-100 text-sm">
                {editingCertificate ? t.certificateUpdatedDesc : t.certificateAddedDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="flex items-center gap-4 mb-3 relative z-10">
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">📜</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{t.certificateManagement}</h2>
            <p className="text-emerald-100 text-sm md:text-base font-medium">
              {t.certificateManagementDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className={getStatCardStyle('all')}
          onClick={() => handleStatClick('all')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-90 text-sm font-medium">{t.totalCertificates}</p>
              <p className="text-2xl md:text-3xl font-bold">{stats.all}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">📋</span>
            </div>
          </div>
          <div className="mt-2 text-white text-opacity-80 text-xs">
            {t.clickToViewAllCertificates}
          </div>
        </div>

        <div 
          className={getStatCardStyle('issued')}
          onClick={() => handleStatClick('issued')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-90 text-sm font-medium">{t.issued}</p>
              <p className="text-2xl md:text-3xl font-bold">{stats.issued}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">✅</span>
            </div>
          </div>
          <div className="mt-2 text-white text-opacity-80 text-xs">
            {t.clickToViewIssuedCertificates}
          </div>
        </div>

        <div 
          className={getStatCardStyle('pending')}
          onClick={() => handleStatClick('pending')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-90 text-sm font-medium">{t.pending}</p>
              <p className="text-2xl md:text-3xl font-bold">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">⏳</span>
            </div>
          </div>
          <div className="mt-2 text-white text-opacity-80 text-xs">
            {t.clickToViewPendingCertificates}
          </div>
        </div>

        <div 
          className={getStatCardStyle('month')}
          onClick={() => handleStatClick('month')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-90 text-sm font-medium">{t.thisMonth}</p>
              <p className="text-2xl md:text-3xl font-bold">{stats.month}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">📅</span>
            </div>
          </div>
          <div className="mt-2 text-white text-opacity-80 text-xs">
            {t.certificatesIssuedThisMonth}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <nav className="flex flex-col sm:flex-row -mb-px">
            <button
              onClick={() => {
                setActiveTab("issue");
                setEditingCertificate(null);
                setFormData({
                  fullName: "",
                  idNumber: "",
                  certificateType: "",
                  purpose: "",
                  issueDate: "",
                  duration: "",
                  remarks: ""
                });
              }}
              className={`flex-1 py-5 px-6 text-center font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === "issue"
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg transform -translate-y-0.5"
                  : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                <span className={`text-lg transition-transform duration-300 ${activeTab === "issue" ? "scale-110" : ""}`}>
                  {editingCertificate ? "✏️" : "📝"}
                </span>
                <span>{editingCertificate ? t.editCertificate : t.issueCertificate}</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-5 px-6 text-center font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === "manage"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform -translate-y-0.5"
                  : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                <span className={`text-lg transition-transform duration-300 ${activeTab === "manage" ? "scale-110" : ""}`}>
                  📋
                </span>
                <span>{t.manageCertificates}</span>
              </span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white">
          {activeTab === "issue" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-100 border border-emerald-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-emerald-600 text-lg">
                      {editingCertificate ? "✏️" : "🖨️"}
                    </span>
                  </span>
                  {editingCertificate ? t.editCertificate : t.issueNewCertificate}
                </h3>
                <p className="text-gray-600">
                  {editingCertificate 
                    ? `${t.editingCertificateFor} ${editingCertificate.fullName}`
                    : t.issueCertificateDesc
                  }
                </p>
              </div>

              <form onSubmit={editingCertificate ? handleUpdateCertificate : handleIssueCertificate} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">👤</span>
                      </span>
                      {t.personalInformation}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.fullName} *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                          placeholder={t.enterFullName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.idNumber} *
                        </label>
                        <input
                          type="text"
                          name="idNumber"
                          value={formData.idNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                          placeholder={t.enterIdNumber}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details Card */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">📄</span>
                      </span>
                      {t.certificateDetails}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.certificateType} *
                        </label>
                        <select
                          name="certificateType"
                          value={formData.certificateType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-400 appearance-none bg-white"
                        >
                          <option value="">{t.selectCertificateType}</option>
                          <option value="Residence Certificate">{t.residenceCertificate}</option>
                          <option value="Good Conduct Certificate">{t.goodConductCertificate}</option>
                          <option value="Income Certificate">{t.incomeCertificate}</option>
                          <option value="Family Certificate">{t.familyCertificate}</option>
                          <option value="Age Certificate">{t.ageCertificate}</option>
                          <option value="Marital Status Certificate">{t.maritalStatusCertificate}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.purpose} *
                        </label>
                        <select
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-400 appearance-none bg-white"
                        >
                          <option value="">{t.selectPurpose}</option>
                          <option value="University Application">{t.universityApplication}</option>
                          <option value="Employment Verification">{t.employmentVerification}</option>
                          <option value="Passport Application">{t.passportApplication}</option>
                          <option value="Bank Loan">{t.bankLoan}</option>
                          <option value="Legal Proceedings">{t.legalProceedings}</option>
                          <option value="Government Service">{t.governmentService}</option>
                          <option value="Other">{t.other}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Additional Information Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600">⏰</span>
                      </span>
                      {t.validityDates}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.duration}
                        </label>
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 appearance-none bg-white"
                        >
                          <option value="">{t.selectDuration}</option>
                          <option value="3 months">{t.threeMonths}</option>
                          <option value="6 months">{t.sixMonths}</option>
                          <option value="1 year">{t.oneYear}</option>
                          <option value="2 years">{t.twoYears}</option>
                          <option value="Permanent">{t.permanent}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.issueDate}
                        </label>
                        <input
                          type="date"
                          name="issueDate"
                          value={formData.issueDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Remarks Card */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600">📝</span>
                      </span>
                      {t.additionalInformation}
                    </h4>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.remarks} / {t.notes}
                      </label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-400 resize-none"
                        placeholder={t.additionalRemarks}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-500 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-3 min-w-[140px]"
                    onClick={() => {
                      setFormData({
                        fullName: "",
                        idNumber: "",
                        certificateType: "",
                        purpose: "",
                        issueDate: "",
                        duration: "",
                        remarks: ""
                      });
                      setEditingCertificate(null);
                    }}
                  >
                    <span className="text-lg">🔄</span>
                    {editingCertificate ? t.cancel : t.clearForm}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 min-w-[180px]"
                  >
                    <span className="text-xl">{editingCertificate ? "✏️" : "🖨️"}</span>
                    {editingCertificate ? t.updateCertificate : t.issueCertificate}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "manage" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-100 border border-blue-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-blue-600 text-lg">📋</span>
                  </span>
                  {t.manageCertificates}
                </h3>
                <p className="text-gray-600">{t.manageCertificatesDesc}</p>
              </div>

              {/* Advanced Search Modal */}
              {showAdvancedSearch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-6 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{t.advancedSearch}</h3>
                        <button 
                          onClick={() => setShowAdvancedSearch(false)}
                          className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center hover:bg-opacity-30 transition-colors"
                        >
                          <span className="text-lg">✕</span>
                        </button>
                      </div>
                    </div>
                    
                    <form onSubmit={handleAdvancedSearch} className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.nameContains}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={advancedSearchData.name}
                            onChange={handleAdvancedSearchChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder={t.enterName}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.idNumberRange}
                          </label>
                          <input
                            type="text"
                            name="idRange"
                            value={advancedSearchData.idRange}
                            onChange={handleAdvancedSearchChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder={t.idRangeExample}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.dateFrom}
                          </label>
                          <input
                            type="date"
                            name="dateFrom"
                            value={advancedSearchData.dateFrom}
                            onChange={handleAdvancedSearchChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.dateTo}
                          </label>
                          <input
                            type="date"
                            name="dateTo"
                            value={advancedSearchData.dateTo}
                            onChange={handleAdvancedSearchChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                        <button 
                          type="button"
                          onClick={() => setShowAdvancedSearch(false)}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                        >
                          {t.cancel}
                        </button>
                        <button 
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                          <span>🔍</span>
                          {t.applySearch}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Filters Card */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{t.filterCertificates}</h4>
                    <p className="text-gray-600">{t.filterCertificatesDesc}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      name="certificateType"
                      value={filters.certificateType}
                      onChange={handleFilterChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-blue-400 transition-colors duration-200 font-medium"
                    >
                      <option value="">{t.allTypes}</option>
                      <option value="Residence Certificate">{t.residence}</option>
                      <option value="Good Conduct Certificate">{t.goodConduct}</option>
                      <option value="Income Certificate">{t.income}</option>
                      <option value="Family Certificate">{t.family}</option>
                      <option value="Age Certificate">{t.age}</option>
                    </select>
                    
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-blue-400 transition-colors duration-200 font-medium"
                    >
                      <option value="">{t.allStatus}</option>
                      <option value="Issued">{t.issued}</option>
                      <option value="Pending">{t.pending}</option>
                    </select>
                    
                    <input
                      type="date"
                      name="dateRange"
                      value={filters.dateRange}
                      onChange={handleFilterChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-blue-400 transition-colors duration-200 font-medium"
                    />

                    {/* Clear Filters Button */}
                    <button
                      onClick={() => {
                        setFilters({ certificateType: "", status: "", dateRange: "" });
                        setAdvancedSearchData({ name: "", idRange: "", dateFrom: "", dateTo: "", department: "" });
                        setActiveStat('all');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border-2 border-gray-400"
                    >
                      <span className="text-lg">🔄</span>
                      {t.clear}
                    </button>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleExportAll}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-green-400"
                  >
                    <span className="text-lg">📤</span>
                    {t.exportAll}
                  </button>
                  
                  <button 
                    onClick={handleBulkPrint}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-blue-400"
                  >
                    <span className="text-lg">🖨️</span>
                    {t.bulkPrint}
                  </button>
                  
                  <button 
                    onClick={handleGenerateReport}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-purple-400"
                  >
                    <span className="text-lg">📊</span>
                    {t.generateReport}
                  </button>
                  
                  <button 
                    onClick={() => setShowAdvancedSearch(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-orange-400"
                  >
                    <span className="text-lg">🔍</span>
                    {t.advancedSearch}
                  </button>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-100 border-2 border-indigo-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <span className="text-indigo-600 text-lg">📊</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {t.showing} {filteredCertificates.length} {t.of} {certificates.length} {t.certificates}
                      {selectedCertificates.size > 0 && ` (${selectedCertificates.size} ${t.selected})`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {filters.status && `${t.filteredBy}: ${filters.status}`}
                      {filters.certificateType && ` • ${filters.certificateType}`}
                      {filters.dateRange && ` • ${filters.dateRange}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border-2 border-indigo-300 text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2">
                    <span>📱</span>
                    {t.compactView}
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-white border-2 border-indigo-300 text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    <span>🔄</span>
                    {t.refresh}
                  </button>
                </div>
              </div>

              {/* Certificates Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((certificate) => (
                    <div 
                      key={certificate.id} 
                      className={`border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${getCertificateTypeColor(certificate.certificateType)} ${
                        selectedCertificates.has(certificate.id) ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedCertificates.has(certificate.id)}
                              onChange={() => handleCertificateSelect(certificate.id)}
                              className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <h4 className="font-bold text-gray-800 text-xl">
                              {certificate.fullName}
                            </h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{t.id}: {certificate.idNumber}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${getStatusColor(certificate.status)}`}>
                              {certificate.status}
                            </span>
                            <span className="px-4 py-2 bg-white bg-opacity-80 text-gray-700 rounded-full text-sm font-semibold border border-gray-300 shadow-sm">
                              {certificate.certificateType}
                            </span>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-white rounded-2xl border-2 border-gray-200 flex items-center justify-center shadow-lg">
                          <span className="text-2xl">📜</span>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 border-opacity-50">
                          <span className="font-semibold">{t.purpose}:</span>
                          <span className="font-bold text-gray-800">{certificate.purpose}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 border-opacity-50">
                          <span className="font-semibold">{t.issueDate}:</span>
                          <span className="font-bold text-gray-800">{certificate.issueDate}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-semibold">{t.duration}:</span>
                          <span className="font-bold text-gray-800">{certificate.duration}</span>
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 border-opacity-50">
                        {/* Primary Actions */}
                        <div className="flex gap-3 flex-1">
                          <button
                            onClick={() => downloadCertificate(certificate)}
                            disabled={certificate.status === 'Pending'}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 min-w-0 ${
                              certificate.status === 'Pending'
                                ? 'bg-gradient-to-r from-gray-300 to-slate-400 text-gray-500 cursor-not-allowed shadow-inner border-2 border-gray-300'
                                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 border-2 border-emerald-400'
                            }`}
                          >
                            <span className="text-lg">📥</span>
                            <span className="truncate">{t.download}</span>
                          </button>

                          <button 
                            onClick={() => setSelectedCertificate(certificate)}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center gap-3 min-w-0 border-2 border-blue-400"
                          >
                            <span className="text-lg">👁️</span>
                            <span className="truncate">{t.viewDetails}</span>
                          </button>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditCertificate(certificate)}
                            className="py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2 border-2 border-orange-400"
                          >
                            <span className="text-lg">✏️</span>
                            <span className="hidden sm:inline">{t.edit}</span>
                          </button>

                          <button 
                            onClick={() => handleRenewCertificate(certificate)}
                            className="py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2 border-2 border-purple-400"
                          >
                            <span className="text-lg">🔄</span>
                            <span className="hidden sm:inline">{t.renew}</span>
                          </button>

                          <button 
                            onClick={() => handleDeleteCertificate(certificate.id)}
                            className="py-3 px-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2 border-2 border-red-400"
                          >
                            <span className="text-lg">🗑️</span>
                            <span className="hidden sm:inline">{t.delete}</span>
                          </button>
                        </div>
                      </div>

                      {/* Quick Actions Row */}
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 border-opacity-30">
                        <button 
                          onClick={() => handleEmailCertificate(certificate)}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md flex items-center gap-1 border border-gray-300"
                        >
                          <span>📧</span>
                          {t.email}
                        </button>
                        <button 
                          onClick={() => handleShareCertificate(certificate)}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md flex items-center gap-1 border border-gray-300"
                        >
                          <span>🔗</span>
                          {t.share}
                        </button>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md flex items-center gap-1 border border-gray-300">
                          <span>🏷️</span>
                          {t.label}
                        </button>
                        <button 
                          onClick={() => handleToggleFavorite(certificate)}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md flex items-center gap-1 border border-gray-300"
                        >
                          <span>⭐</span>
                          {t.favorite}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-4xl">📋</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{t.noCertificatesFound}</h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      {t.noCertificatesMatchFilters}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => {
                          setFilters({ certificateType: "", status: "", dateRange: "" });
                          setAdvancedSearchData({ name: "", idRange: "", dateFrom: "", dateTo: "", department: "" });
                          setActiveStat('all');
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                      >
                        <span className="text-lg">🔄</span>
                        {t.clearAllFilters}
                      </button>
                      <button 
                        onClick={() => setActiveTab('issue')}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                      >
                        <span className="text-lg">🖨️</span>
                        {t.issueNewCertificate}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bulk Actions Footer */}
              {filteredCertificates.length > 0 && (
                <div className="bg-gradient-to-r from-slate-100 to-gray-200 border-2 border-gray-300 rounded-2xl p-4 mt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={selectedCertificates.size === filteredCertificates.length}
                        onChange={handleSelectAll}
                        className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="font-semibold text-gray-700">
                        {t.selectAll} {filteredCertificates.length} {t.certificates}
                        {selectedCertificates.size > 0 && ` (${selectedCertificates.size} ${t.selected})`}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={handleBulkDownload}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-blue-400"
                      >
                        <span>📥</span>
                        {t.bulkDownload}
                      </button>
                      <button 
                        onClick={handleBulkPrint}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-green-400"
                      >
                        <span>🖨️</span>
                        {t.bulkPrint}
                      </button>
                      <button 
                        onClick={handleBulkDelete}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-red-400"
                      >
                        <span>🗑️</span>
                        {t.bulkDelete}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{t.certificateDetails}</h3>
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center hover:bg-opacity-30 transition-colors"
                >
                  <span className="text-lg">✕</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.fullName}</label>
                    <p className="text-gray-900 font-medium text-lg">{selectedCertificate.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.idNumber}</label>
                    <p className="text-gray-900 font-medium">{selectedCertificate.idNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.certificateType}</label>
                    <p className="text-gray-900 font-medium">{selectedCertificate.certificateType}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.purpose}</label>
                    <p className="text-gray-900 font-medium">{selectedCertificate.purpose}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.issueDate}</label>
                    <p className="text-gray-900 font-medium">{selectedCertificate.issueDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.duration}</label>
                    <p className="text-gray-900 font-medium">{selectedCertificate.duration}</p>
                  </div>
                </div>
              </div>

              {selectedCertificate.remarks && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.remarks}</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-xl border">{selectedCertificate.remarks}</p>
                </div>
              )}
              
              <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                <button 
                  onClick={() => downloadCertificate(selectedCertificate)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>📥</span>
                  {t.downloadCertificate}
                </button>
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateManagement;