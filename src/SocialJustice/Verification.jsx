// src/SocialJustice/components/cases/Verification.jsx
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaDownload, FaSearch, FaFilter, FaUser, FaPhone, FaCalendar, FaFile, FaClock } from 'react-icons/fa';

const Verification = ({ onVerificationComplete, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  // Mock pending cases data
  const [pendingCases, setPendingCases] = useState([
    {
      id: 1,
      caseNumber: 'CASE-2024-001',
      applicantName: 'John Doe',
      applicantId: 'ID-123456',
      contactNumber: '+251 91 234 5678',
      caseType: 'Property Dispute',
      dateSubmitted: '2024-01-15',
      urgency: 'high',
      status: 'pending',
      description: 'Neighbor encroachment on property boundaries with clear violation of established boundaries. Requires immediate attention due to ongoing construction.',
      documents: ['property_deed.pdf', 'survey_report.pdf', 'boundary_photos.zip'],
      verificationProgress: 60
    },
    {
      id: 2,
      caseNumber: 'CASE-2024-002',
      applicantName: 'Jane Smith',
      applicantId: 'ID-234567',
      contactNumber: '+251 92 345 6789',
      caseType: 'Family Matter',
      dateSubmitted: '2024-01-14',
      urgency: 'medium',
      status: 'pending',
      description: 'Inheritance distribution dispute among family members regarding ancestral property in Addis Ababa.',
      documents: ['will_document.pdf', 'family_tree.pdf', 'property_records.pdf'],
      verificationProgress: 30
    },
    {
      id: 3,
      caseNumber: 'CASE-2024-003',
      applicantName: 'Robert Johnson',
      applicantId: 'ID-345678',
      contactNumber: '+251 93 456 7890',
      caseType: 'Labor Issue',
      dateSubmitted: '2024-01-13',
      urgency: 'low',
      status: 'under_review',
      description: 'Unfair dismissal from workplace without proper notice or severance package.',
      documents: ['employment_contract.pdf', 'termination_letter.pdf', 'pay_slips.pdf'],
      verificationProgress: 80
    },
    {
      id: 4,
      caseNumber: 'CASE-2024-004',
      applicantName: 'Meron Abebe',
      applicantId: 'ID-456789',
      contactNumber: '+251 94 567 8901',
      caseType: 'Land Rights',
      dateSubmitted: '2024-01-12',
      urgency: 'high',
      status: 'info_required',
      description: 'Dispute over agricultural land rights in Oromia region with multiple claimants.',
      documents: ['land_certificate.pdf', 'witness_statements.pdf'],
      verificationProgress: 45
    }
  ]);

  const filteredCases = pendingCases.filter(caseItem => {
    const matchesSearch = caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || caseItem.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (caseId) => {
    if (!verificationNotes.trim()) {
      alert('Please add verification notes before approving.');
      return;
    }

    if (window.confirm('Are you sure you want to approve this case?')) {
      setPendingCases(prev => prev.map(caseItem => 
        caseItem.id === caseId 
          ? { ...caseItem, status: 'approved', verifiedBy: 'Current User', verificationDate: new Date().toISOString() }
          : caseItem
      ));
      alert('Case approved successfully!');
      setSelectedCase(null);
      setVerificationNotes('');
      onVerificationComplete();
    }
  };

  const handleReject = (caseId) => {
    if (!verificationNotes.trim()) {
      alert('Please add verification notes before rejecting.');
      return;
    }

    const reason = prompt('Please specify the reason for rejection:');
    if (reason) {
      setPendingCases(prev => prev.map(caseItem => 
        caseItem.id === caseId 
          ? { ...caseItem, status: 'rejected', rejectionReason: reason, verifiedBy: 'Current User', verificationDate: new Date().toISOString() }
          : caseItem
      ));
      alert('Case rejected successfully!');
      setSelectedCase(null);
      setVerificationNotes('');
    }
  };

  const handleRequestMoreInfo = (caseId) => {
    const infoRequest = prompt('What additional information is needed?');
    if (infoRequest) {
      setPendingCases(prev => prev.map(caseItem => 
        caseItem.id === caseId 
          ? { ...caseItem, status: 'info_required', infoRequest, requestedBy: 'Current User', requestDate: new Date().toISOString() }
          : caseItem
      ));
      alert('Information request sent successfully!');
      setSelectedCase(null);
      setVerificationNotes('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-yellow-600';
      case 'under_review': return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-600';
      case 'approved': return 'bg-gradient-to-r from-green-400 to-green-500 text-white border-green-600';
      case 'rejected': return 'bg-gradient-to-r from-red-400 to-red-500 text-white border-red-600';
      case 'info_required': return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock className="text-white" />;
      case 'under_review': return <FaEye className="text-white" />;
      case 'approved': return <FaCheck className="text-white" />;
      case 'rejected': return <FaTimes className="text-white" />;
      case 'info_required': return <FaFile className="text-white" />;
      default: return <FaFile className="text-white" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'PENDING REVIEW';
      case 'under_review': return 'UNDER REVIEW';
      case 'approved': return 'APPROVED';
      case 'rejected': return 'REJECTED';
      case 'info_required': return 'INFO REQUIRED';
      default: return status.toUpperCase();
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 'low': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high': return 'HIGH PRIORITY';
      case 'medium': return 'MEDIUM PRIORITY';
      case 'low': return 'LOW PRIORITY';
      default: return 'NORMAL PRIORITY';
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 md:p-8 border-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">CASE VERIFICATION</h2>
              <p className="text-blue-100 text-base md:text-lg max-w-2xl font-medium">
                Review and verify community cases submitted for consideration. Ensure all information is accurate and complete before approval.
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/30">
              <div className="text-white text-sm font-bold uppercase tracking-wide">Pending Cases</div>
              <div className="text-2xl md:text-3xl font-black text-white">{pendingCases.length}</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-2xl border-0 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start lg:items-center">
            <div className="flex-1 relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <input
                type="text"
                placeholder="SEARCH CASES..."
                className="block w-full pl-10 md:pl-12 pr-4 md:pr-6 py-3 md:py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-white focus:border-white text-white placeholder-white/80 text-base md:text-lg font-semibold transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
              <select
                className="px-4 md:px-6 py-3 md:py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-white focus:border-white text-white text-base md:text-lg font-bold transition-all duration-300 w-full sm:w-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all" className="text-gray-900">ALL STATUS</option>
                <option value="pending" className="text-gray-900">PENDING</option>
                <option value="under_review" className="text-gray-900">UNDER REVIEW</option>
                <option value="info_required" className="text-gray-900">INFO REQUIRED</option>
              </select>
              <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2 md:space-x-3 shadow-2xl transform hover:scale-105 w-full sm:w-auto">
                <FaFilter className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-base md:text-lg font-black">FILTER</span>
              </button>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${selectedCase ? 'xl:grid-cols-3' : ''} gap-6 md:gap-8`}>
          {/* Cases List */}
          <div className={`${selectedCase ? 'xl:col-span-2' : ''} space-y-6`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-black text-gray-900">PENDING VERIFICATION</h3>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-lg font-black shadow-lg">
                {filteredCases.length} CASES
              </span>
            </div>
            
            {filteredCases.length === 0 ? (
              <div className="text-center py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-300 shadow-2xl">
                <FaSearch className="text-gray-400 text-4xl md:text-6xl mx-auto mb-4 md:mb-6" />
                <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-4">NO CASES FOUND</h4>
                <p className="text-gray-600 text-base md:text-lg font-medium">No cases match your current filters.</p>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {filteredCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl border-4 transition-all duration-300 hover:shadow-2xl cursor-pointer transform hover:-translate-y-1 md:hover:-translate-y-2 ${
                      selectedCase?.id === caseItem.id 
                        ? 'border-purple-500 shadow-xl' 
                        : 'border-gray-300 shadow-lg'
                    }`}
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 md:mb-6 gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-base md:text-lg font-black text-purple-700 bg-purple-100 px-3 md:px-4 py-1 md:py-2 rounded-xl border-2 border-purple-300">
                            {caseItem.caseNumber}
                          </span>
                          <span className={`px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-black rounded-full ${getUrgencyColor(caseItem.urgency)}`}>
                            {getUrgencyText(caseItem.urgency)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-3">
                          {getStatusIcon(caseItem.status)}
                          <span className={`px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-black rounded-full border-2 ${getStatusColor(caseItem.status)}`}>
                            {getStatusText(caseItem.status)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <h4 className="font-black text-xl md:text-2xl text-gray-900">{caseItem.applicantName}</h4>
                          <p className="text-base md:text-lg text-gray-700 font-bold">{caseItem.caseType}</p>
                        </div>
                        
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium line-clamp-2">
                          {caseItem.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-base md:text-lg text-gray-500 font-semibold gap-2">
                          <div className="flex items-center space-x-4 md:space-x-6">
                            <div className="flex items-center space-x-1 md:space-x-2">
                              <FaCalendar className="h-4 w-4 md:h-5 md:w-5" />
                              <span>{caseItem.dateSubmitted}</span>
                            </div>
                            <div className="flex items-center space-x-1 md:space-x-2">
                              <FaFile className="h-4 w-4 md:h-5 md:w-5" />
                              <span>{caseItem.documents.length} DOCS</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="pt-3 md:pt-4">
                          <div className="flex justify-between text-base md:text-lg text-gray-600 font-bold mb-2">
                            <span>VERIFICATION PROGRESS</span>
                            <span>{caseItem.verificationProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-3 md:h-4 shadow-inner">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 md:h-4 rounded-full transition-all duration-500 shadow-lg"
                              style={{ width: `${caseItem.verificationProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Case Details Panel - Only show when case is selected */}
          {selectedCase && (
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-2xl border-4 border-purple-500 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 md:p-8 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-black">CASE DETAILS</h3>
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="text-white hover:text-purple-200 transition-colors p-2 md:p-3 rounded-2xl hover:bg-purple-500/30"
                    >
                      <FaTimes className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                  </div>
                  <p className="font-mono text-purple-200 text-base md:text-lg font-bold mt-2">{selectedCase.caseNumber}</p>
                </div>

                <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-h-[80vh] overflow-y-auto">
                  {/* Applicant Information */}
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 md:p-6 border-4 border-blue-300">
                    <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 md:p-3 rounded-xl">
                        <FaUser className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <h4 className="font-black text-lg md:text-xl text-blue-900">APPLICANT INFORMATION</h4>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-800 font-bold text-base md:text-lg">NAME:</span>
                        <span className="text-blue-900 font-black text-base md:text-lg">{selectedCase.applicantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-800 font-bold text-base md:text-lg">ID:</span>
                        <span className="text-blue-900 font-black text-base md:text-lg">{selectedCase.applicantId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-800 font-bold text-base md:text-lg">CONTACT:</span>
                        <span className="text-blue-900 font-black text-base md:text-lg flex items-center space-x-1 md:space-x-2">
                          <FaPhone className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{selectedCase.contactNumber}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Case Information */}
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 md:p-6 border-4 border-green-300">
                    <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 md:p-3 rounded-xl">
                        <FaFile className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <h4 className="font-black text-lg md:text-xl text-green-900">CASE INFORMATION</h4>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-800 font-bold text-base md:text-lg">TYPE:</span>
                        <span className="text-green-900 font-black text-base md:text-lg">{selectedCase.caseType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-800 font-bold text-base md:text-lg">URGENCY:</span>
                        <span className={`px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-black rounded-full ${getUrgencyColor(selectedCase.urgency)}`}>
                          {getUrgencyText(selectedCase.urgency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-800 font-bold text-base md:text-lg">SUBMITTED:</span>
                        <span className="text-green-900 font-black text-base md:text-lg flex items-center space-x-1 md:space-x-2">
                          <FaCalendar className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{selectedCase.dateSubmitted}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-gray-900 mb-3 md:mb-4">CASE DESCRIPTION</h4>
                    <p className="text-gray-700 bg-gray-100 rounded-2xl p-4 md:p-6 leading-relaxed text-base md:text-lg font-medium border-2 border-gray-300">
                      {selectedCase.description}
                    </p>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-gray-900 mb-3 md:mb-4">SUPPORTING DOCUMENTS</h4>
                    <div className="space-y-2 md:space-y-3">
                      {selectedCase.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl border-2 border-gray-300 hover:from-gray-200 hover:to-gray-300 transition-colors">
                          <div className="flex items-center space-x-2 md:space-x-4">
                            <FaFile className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                            <span className="text-sm md:text-lg text-gray-800 font-semibold truncate">{doc}</span>
                          </div>
                          <button className="text-purple-600 hover:text-purple-700 p-2 md:p-3 rounded-xl hover:bg-purple-100 transition-colors">
                            <FaDownload className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Notes */}
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-gray-900 mb-3 md:mb-4">
                      VERIFICATION NOTES <span className="text-red-500">*</span>
                    </h4>
                    <textarea
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      rows="4"
                      className="w-full px-4 md:px-6 py-3 md:py-4 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 text-gray-900 text-base md:text-lg font-semibold transition-all duration-300 resize-none"
                      placeholder="ADD YOUR VERIFICATION NOTES, OBSERVATIONS, AND RECOMMENDATIONS..."
                      required
                    />
                  </div>

                  {/* Action Buttons - Stack vertically on mobile */}
                  <div className="flex flex-col gap-3 md:gap-4 pt-4 md:pt-6">
                    <button
                      onClick={() => handleApprove(selectedCase.id)}
                      className="flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 md:px-8 py-3 md:py-5 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 text-base md:text-xl font-black"
                      disabled={!verificationNotes.trim()}
                    >
                      <FaCheck className="h-5 w-5 md:h-6 md:w-6" />
                      <span>APPROVE</span>
                    </button>
                    
                    <button
                      onClick={() => handleRequestMoreInfo(selectedCase.id)}
                      className="flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 md:px-8 py-3 md:py-5 rounded-2xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 text-base md:text-xl font-black"
                      disabled={!verificationNotes.trim()}
                    >
                      <FaEye className="h-5 w-5 md:h-6 md:w-6" />
                      <span>MORE INFO</span>
                    </button>
                    
                    <button
                      onClick={() => handleReject(selectedCase.id)}
                      className="flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 md:px-8 py-3 md:py-5 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 text-base md:text-xl font-black"
                      disabled={!verificationNotes.trim()}
                    >
                      <FaTimes className="h-5 w-5 md:h-6 md:w-6" />
                      <span>REJECT</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Verification Statistics */}
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border-4 border-indigo-300 shadow-2xl p-4 md:p-8">
                <h4 className="font-black text-xl md:text-2xl text-gray-900 mb-4 md:mb-6 text-center">VERIFICATION STATISTICS</h4>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center p-3 md:p-5 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl border-4 border-yellow-400">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <FaClock className="text-yellow-700 h-5 w-5 md:h-6 md:w-6" />
                      <span className="text-yellow-900 text-base md:text-lg font-black">PENDING REVIEW</span>
                    </div>
                    <span className="font-black text-yellow-900 text-xl md:text-2xl">
                      {pendingCases.filter(c => c.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 md:p-5 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl border-4 border-blue-400">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <FaEye className="text-blue-700 h-5 w-5 md:h-6 md:w-6" />
                      <span className="text-blue-900 text-base md:text-lg font-black">UNDER REVIEW</span>
                    </div>
                    <span className="font-black text-blue-900 text-xl md:text-2xl">
                      {pendingCases.filter(c => c.status === 'under_review').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 md:p-5 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl border-4 border-orange-400">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <FaFile className="text-orange-700 h-5 w-5 md:h-6 md:w-6" />
                      <span className="text-orange-900 text-base md:text-lg font-black">INFO REQUIRED</span>
                    </div>
                    <span className="font-black text-orange-900 text-xl md:text-2xl">
                      {pendingCases.filter(c => c.status === 'info_required').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No Case Selected Message */}
          {!selectedCase && (
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl border-4 border-purple-300 shadow-2xl p-6 md:p-12 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <FaEye className="text-white text-2xl md:text-4xl" />
              </div>
              <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4">SELECT A CASE</h4>
              <p className="text-gray-700 text-base md:text-lg font-semibold max-w-md mx-auto">
                CLICK ON A CASE FROM THE LIST TO VIEW DETAILED INFORMATION AND TAKE APPROPRIATE ACTION.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;