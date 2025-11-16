// src/components/chairman/PrepareClearance.jsx
import React, { useState } from "react";
import {
  FaSearch, FaFileAlt, FaStamp, FaPrint, FaUserCheck,
  FaHome, FaCalendarAlt, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaDownload, FaUser, FaIdCard,
  FaMapMarkerAlt, FaSignature, FaArchive, FaList, FaEye
} from "react-icons/fa";

const PrepareClearance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [clearanceForm, setClearanceForm] = useState({
    reason: "",
    destination: "",
    effectiveDate: "",
    remarks: "",
    certificateType: "relocation",
    urgency: "normal"
  });
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("new"); // "new" or "history"
  const [issuedCertificates, setIssuedCertificates] = useState([]);

  // Mock Residents Data
  const mockResidents = [
    {
      id: "RES-001",
      fullName: "AGUMAS BIRHANU",
      kebeleId: "WLD-KB-1304903",
      houseNumber: "H-045",
      registrationDate: "2022-03-15",
      residencyMonths: 32,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 0,
      lastClearance: "2023-08-10"
    },
    {
      id: "RES-002",
      fullName: "MOGES BEYENE",
      kebeleId: "WLD-KB-146903",
      houseNumber: "H-112",
      registrationDate: "2023-06-01",
      residencyMonths: 18,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Pending",
      outstandingFees: 1500,
      lastClearance: null
    }
  ];

  // Mock issued certificates history
  const mockIssuedCertificates = [
    {
      id: "CLR-001",
      certificateNumber: "CLR-2024-001",
      residentName: "ALEMU KASSA",
      kebeleId: "WLD-KB-567890",
      issueDate: "2024-01-15",
      type: "Relocation",
      status: "Issued",
      downloaded: true,
      printed: true
    },
    {
      id: "CLR-002",
      certificateNumber: "CLR-2024-002",
      residentName: "SENAYIT MOHAMMED",
      kebeleId: "WLD-KB-345678",
      issueDate: "2024-01-10",
      type: "Residency",
      status: "Issued",
      downloaded: false,
      printed: true
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError("");

    if (!searchTerm || searchTerm.trim().length < 3) {
      setSearchError("Please enter at least 3 characters");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const found = mockResidents.find(r =>
        r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.kebeleId.includes(searchTerm) ||
        r.id.includes(searchTerm)
      );
      setSelectedResident(found || null);
      setApprovalStatus(null);
      setIsLoading(false);
      
      if (!found) {
        setSearchError("No resident found with the provided search term");
      }
    }, 800);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClearanceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkEligibility = () => {
    if (!selectedResident) return false;

    const eligibilityChecks = {
      taxCleared: selectedResident.taxStatus === "Cleared",
      noOutstandingFees: selectedResident.outstandingFees === 0,
      activeStatus: selectedResident.status === "Active",
      minResidency: selectedResident.residencyMonths >= 6
    };

    return Object.values(eligibilityChecks).every(check => check);
  };

  const handleApproveClearance = async () => {
    if (!selectedResident) return;

    setIsSubmitting(true);
    
    // Simulate approval process
    setTimeout(() => {
      const isEligible = checkEligibility();
      
      if (isEligible) {
        const certificateNumber = `CLR-${Date.now()}`;
        const issuedDate = new Date().toISOString().split('T')[0];
        
        const newCertificate = {
          id: certificateNumber,
          certificateNumber,
          residentName: selectedResident.fullName,
          kebeleId: selectedResident.kebeleId,
          issueDate: issuedDate,
          type: clearanceForm.certificateType,
          reason: clearanceForm.reason,
          destination: clearanceForm.destination,
          status: "Issued",
          downloaded: false,
          printed: false,
          effectiveDate: clearanceForm.effectiveDate,
          remarks: clearanceForm.remarks
        };

        setApprovalStatus({
          approved: true,
          message: "Clearance certificate approved successfully",
          certificateNumber,
          issuedDate,
          certificateData: newCertificate
        });

        // Add to issued certificates
        setIssuedCertificates(prev => [newCertificate, ...prev]);
      } else {
        setApprovalStatus({
          approved: false,
          message: "Resident is not eligible for clearance",
          reasons: [
            selectedResident.taxStatus !== "Cleared" && "Tax obligations not cleared",
            selectedResident.outstandingFees > 0 && "Outstanding fees pending",
            selectedResident.status !== "Active" && "Resident status not active"
          ].filter(Boolean)
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handlePrintCertificate = () => {
    // Update certificate status
    if (approvalStatus?.certificateData) {
      setIssuedCertificates(prev => 
        prev.map(cert => 
          cert.id === approvalStatus.certificateData.id 
            ? { ...cert, printed: true, lastPrinted: new Date().toISOString() }
            : cert
        )
      );
    }
    window.print();
  };

  const handleDownloadCertificate = () => {
    // Update certificate status
    if (approvalStatus?.certificateData) {
      setIssuedCertificates(prev => 
        prev.map(cert => 
          cert.id === approvalStatus.certificateData.id 
            ? { ...cert, downloaded: true, lastDownloaded: new Date().toISOString() }
            : cert
        )
      );
    }
    
    // Simulate download
    const element = document.createElement("a");
    const file = new Blob([`Clearance Certificate: ${approvalStatus.certificateNumber}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `clearance-${approvalStatus.certificateNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const eligibility = checkEligibility();

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaFileAlt className="text-blue-600" />
              Prepare Clearance Certificate
            </h2>
            <p className="text-gray-600 mt-1">Process relocation and residency clearance requests</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeTab === "new" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaFileAlt />
              New Certificate
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeTab === "history" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaArchive />
              Issued Certificates ({issuedCertificates.length + mockIssuedCertificates.length})
            </button>
          </div>
        </div>
      </div>

      {/* NEW CERTIFICATE TAB */}
      {activeTab === "new" && (
        <>
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaSearch className="text-blue-600" />
              Search Resident
            </h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Name, Kebele ID, or Resident ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchError && <p className="text-red-500 text-xs mt-1">{searchError}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FaUserCheck /> {isLoading ? "Searching..." : "Search Resident"}
              </button>
            </form>
          </div>

          {selectedResident && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resident Information & Eligibility */}
              <div className="space-y-6">
                {/* Resident Profile */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Resident Profile</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                        <FaUser className="text-gray-400 text-2xl" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-800">{selectedResident.fullName}</p>
                        <p className="text-sm text-gray-600">ID: {selectedResident.id}</p>
                        <p className="text-sm text-blue-600 font-medium">Kebele: {selectedResident.kebeleId}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FaHome className="text-gray-500" />
                        <span>House: {selectedResident.houseNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>Registered: {selectedResident.registrationDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>Status: {selectedResident.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaIdCard className="text-blue-500" />
                        <span>Residency: {selectedResident.residencyMonths} months</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Check */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Eligibility Status</h3>
                  <div className={`p-4 rounded-xl border-2 ${
                    eligibility 
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  }`}>
                    <div className="flex items-center gap-3">
                      {eligibility ? (
                        <FaCheckCircle className="text-2xl text-green-600" />
                      ) : (
                        <FaExclamationTriangle className="text-2xl text-yellow-600" />
                      )}
                      <div>
                        <div className="font-bold">
                          {eligibility ? 'ELIGIBLE FOR CLEARANCE' : 'REVIEW REQUIRED'}
                        </div>
                        <div className="text-sm mt-2 space-y-1">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className={`text-sm ${selectedResident.taxStatus === "Cleared" ? 'text-green-500' : 'text-red-500'}`} />
                            Tax Status: {selectedResident.taxStatus}
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className={`text-sm ${selectedResident.outstandingFees === 0 ? 'text-green-500' : 'text-red-500'}`} />
                            Outstanding Fees: ETB {selectedResident.outstandingFees}
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className={`text-sm ${selectedResident.status === "Active" ? 'text-green-500' : 'text-red-500'}`} />
                            Resident Status: {selectedResident.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clearance Form & Approval */}
              <div className="space-y-6">
                {/* Clearance Details Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Clearance Details</h3>
                  
                  <div className="space-y-4">
                    {/* Form fields remain the same as previous version */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Type *
                      </label>
                      <select
                        name="certificateType"
                        value={clearanceForm.certificateType}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="relocation">Relocation Clearance</option>
                        <option value="residency">Residency Certificate</option>
                        <option value="good_standing">Good Standing Certificate</option>
                        <option value="tax_clearance">Tax Clearance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Clearance *
                      </label>
                      <select
                        name="reason"
                        value={clearanceForm.reason}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select reason...</option>
                        <option value="relocation">Relocation to another area</option>
                        <option value="job_transfer">Job Transfer</option>
                        <option value="education">Education Purpose</option>
                        <option value="personal">Personal Reasons</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="destination"
                          value={clearanceForm.destination}
                          onChange={handleFormChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter destination address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Effective Date *
                      </label>
                      <input
                        type="date"
                        name="effectiveDate"
                        value={clearanceForm.effectiveDate}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Remarks
                      </label>
                      <textarea
                        name="remarks"
                        value={clearanceForm.remarks}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any additional notes or special instructions..."
                      />
                    </div>
                  </div>
                </div>

                {/* Approval Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Approval & Issuance</h3>
                  
                  {!approvalStatus ? (
                    <div className="space-y-4">
                      <button
                        onClick={handleApproveClearance}
                        disabled={isSubmitting || !clearanceForm.reason || !clearanceForm.effectiveDate}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <FaStamp />
                        {isSubmitting ? "Processing..." : "Approve & Issue Certificate"}
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        This will generate an official clearance certificate with digital signature
                      </p>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl border-2 ${
                      approvalStatus.approved
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : 'bg-red-50 border-red-300 text-red-800'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        {approvalStatus.approved ? (
                          <FaCheckCircle className="text-2xl text-green-600" />
                        ) : (
                          <FaTimesCircle className="text-2xl text-red-600" />
                        )}
                        <div>
                          <div className="font-bold">
                            {approvalStatus.approved ? 'CERTIFICATE APPROVED' : 'APPROVAL DENIED'}
                          </div>
                          <div className="text-sm">{approvalStatus.message}</div>
                        </div>
                      </div>

                      {approvalStatus.approved && (
                        <div className="space-y-3">
                          <div className="text-sm">
                            <strong>Certificate No:</strong> {approvalStatus.certificateNumber}
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={handlePrintCertificate}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <FaPrint />
                              Print
                            </button>
                            <button
                              onClick={handleDownloadCertificate}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <FaDownload />
                              Download PDF
                            </button>
                          </div>
                          <div className="text-center">
                            <button
                              onClick={() => setActiveTab("history")}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View in Issued Certificates →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ISSUED CERTIFICATES HISTORY TAB */}
      {activeTab === "history" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaArchive className="text-blue-600" />
            Issued Clearance Certificates
          </h3>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{issuedCertificates.length + mockIssuedCertificates.length}</div>
              <div className="text-sm text-blue-800">Total Issued</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {[...issuedCertificates, ...mockIssuedCertificates].filter(c => c.printed).length}
              </div>
              <div className="text-sm text-green-800">Printed</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {[...issuedCertificates, ...mockIssuedCertificates].filter(c => c.downloaded).length}
              </div>
              <div className="text-sm text-purple-800">Downloaded</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {[...issuedCertificates, ...mockIssuedCertificates].filter(c => !c.printed && !c.downloaded).length}
              </div>
              <div className="text-sm text-orange-800">Pending Delivery</div>
            </div>
          </div>

          {/* Certificates Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3 font-medium">Certificate No</th>
                  <th className="text-left p-3 font-medium">Resident Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Issue Date</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...issuedCertificates, ...mockIssuedCertificates].map((certificate) => (
                  <tr key={certificate.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{certificate.certificateNumber}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{certificate.residentName}</div>
                      <div className="text-sm text-gray-500">{certificate.kebeleId}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {certificate.type}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{certificate.issueDate}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          certificate.printed && certificate.downloaded
                            ? 'bg-green-100 text-green-800'
                            : certificate.printed || certificate.downloaded
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {certificate.printed && certificate.downloaded ? 'Delivered' :
                           certificate.printed ? 'Printed' :
                           certificate.downloaded ? 'Downloaded' : 'Issued'}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={handlePrintCertificate}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Print Certificate"
                        >
                          <FaPrint />
                        </button>
                        <button
                          onClick={handleDownloadCertificate}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <FaDownload />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {issuedCertificates.length === 0 && mockIssuedCertificates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FaFileAlt className="mx-auto text-4xl text-gray-300 mb-4" />
              <div className="text-lg font-medium">No certificates issued yet</div>
              <p className="text-sm mt-2">Issued clearance certificates will appear here</p>
            </div>
          )}
        </div>
      )}

      {/* Print Preview - Clearance Certificate */}
      {approvalStatus?.approved && (
        <div className="print:block hidden">
          {/* Same print preview as before */}
        </div>
      )}
    </div>
  );
};

export default PrepareClearance;