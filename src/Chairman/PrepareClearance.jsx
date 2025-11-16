// src/components/chairman/PrepareClearance.jsx
import React, { useState } from "react";
import {
  FaSearch, FaFileAlt, FaStamp, FaPrint, FaUserCheck,
  FaHome, FaCalendarAlt, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaDownload, FaUser, FaIdCard,
  FaMapMarkerAlt, FaSignature, FaArchive, FaList, FaEye,
  FaMoneyBillWave, FaReceipt, FaShieldAlt, FaFilter,
  FaPhone, FaEnvelope, FaBriefcase, FaUsers, FaUndo
} from "react-icons/fa";

const PrepareClearance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [clearanceForm, setClearanceForm] = useState({
    reason: "",
    destination: "",
    destinationKebele: "",
    effectiveDate: "",
    remarks: "",
    certificateType: "relocation",
    urgency: "normal"
  });
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [issuedCertificates, setIssuedCertificates] = useState([]);

  // Comprehensive Mock Residents Data
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
      lastClearance: "2023-08-10",
      hasObligations: false,
      obligations: [],
      previousKebele: "WLD-KB-1204901",
      phone: "+251-91-123-4567",
      email: "agumas.birhanu@email.com",
      occupation: "Teacher",
      familyMembers: 4
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
      lastClearance: null,
      hasObligations: true,
      obligations: ["Unpaid house rent: ETB 1500"],
      previousKebele: "WLD-KB-140901",
      phone: "+251-92-234-5678",
      email: "moges.beyene@email.com",
      occupation: "Farmer",
      familyMembers: 6
    },
    {
      id: "RES-003",
      fullName: "YESHIWAS SOLOMON",
      kebeleId: "WLD-KB-148996",
      houseNumber: "H-078",
      registrationDate: "2024-01-15",
      residencyMonths: 5,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 0,
      lastClearance: null,
      hasObligations: false,
      obligations: [],
      previousKebele: "WLD-KB-145001",
      phone: "+251-93-345-6789",
      email: "yeshiwas.solomon@email.com",
      occupation: "Student",
      familyMembers: 3
    },
    {
      id: "RES-004",
      fullName: "ZEWORK AKLILU",
      kebeleId: "WLD-KB-149343",
      houseNumber: "H-156",
      registrationDate: "2021-11-20",
      residencyMonths: 38,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 0,
      lastClearance: "2023-12-05",
      hasObligations: false,
      obligations: [],
      previousKebele: "WLD-KB-135001",
      phone: "+251-94-456-7890",
      email: "zework.aklilu@email.com",
      occupation: "Merchant",
      familyMembers: 5
    },
    {
      id: "RES-005",
      fullName: "ALEMU KASSA",
      kebeleId: "WLD-KB-134567",
      houseNumber: "H-089",
      registrationDate: "2023-03-10",
      residencyMonths: 21,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 500,
      lastClearance: null,
      hasObligations: true,
      obligations: ["Unpaid utility bill: ETB 500"],
      previousKebele: "WLD-KB-125001",
      phone: "+251-95-567-8901",
      email: "alemu.kassa@email.com",
      occupation: "Driver",
      familyMembers: 4
    },
    {
      id: "RES-006",
      fullName: "SENAYIT MOHAMMED",
      kebeleId: "WLD-KB-145678",
      houseNumber: "H-203",
      registrationDate: "2020-08-15",
      residencyMonths: 52,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 0,
      lastClearance: "2024-01-10",
      hasObligations: false,
      obligations: [],
      previousKebele: "WLD-KB-115001",
      phone: "+251-96-678-9012",
      email: "senayit.mohammed@email.com",
      occupation: "Nurse",
      familyMembers: 3
    },
    {
      id: "RES-007",
      fullName: "TEDROS HAILE",
      kebeleId: "WLD-KB-156789",
      houseNumber: "H-067",
      registrationDate: "2023-09-01",
      residencyMonths: 15,
      photo: "/api/placeholder/150/150",
      status: "Inactive",
      taxStatus: "Pending",
      outstandingFees: 2000,
      lastClearance: null,
      hasObligations: true,
      obligations: ["Unpaid house rent: ETB 1500", "Unpaid tax: ETB 500"],
      previousKebele: "WLD-KB-142001",
      phone: "+251-97-789-0123",
      email: "tedros.haile@email.com",
      occupation: "Construction Worker",
      familyMembers: 2
    },
    {
      id: "RES-008",
      fullName: "MESERET ABEBE",
      kebeleId: "WLD-KB-167890",
      houseNumber: "H-134",
      registrationDate: "2022-12-01",
      residencyMonths: 24,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 0,
      lastClearance: null,
      hasObligations: false,
      obligations: [],
      previousKebele: "WLD-KB-138001",
      phone: "+251-98-890-1234",
      email: "meseret.abebe@email.com",
      occupation: "Shop Owner",
      familyMembers: 7
    },
    {
      id: "RES-009",
      fullName: "BEYENE TADESSE",
      kebeleId: "WLD-KB-178901",
      houseNumber: "H-045",
      registrationDate: "2022-03-15",
      residencyMonths: 32,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Cleared",
      outstandingFees: 0,
      lastClearance: null,
      hasObligations: false,
      obligations: [],
      previousKebele: "WLD-KB-1204901",
      phone: "+251-99-901-2345",
      email: "beyene.tadesse@email.com",
      occupation: "Teacher",
      familyMembers: 4
    },
    {
      id: "RES-010",
      fullName: "KIDIST SOLOMON",
      kebeleId: "WLD-KB-189012",
      houseNumber: "H-278",
      registrationDate: "2024-02-01",
      residencyMonths: 4,
      photo: "/api/placeholder/150/150",
      status: "Active",
      taxStatus: "Pending",
      outstandingFees: 750,
      lastClearance: null,
      hasObligations: true,
      obligations: ["Registration fee pending: ETB 750"],
      previousKebele: "WLD-KB-148001",
      phone: "+251-90-012-3456",
      email: "kidist.solomon@email.com",
      occupation: "Housewife",
      familyMembers: 2
    }
  ];

  // Mock issued certificates history
  const mockIssuedCertificates = [
    {
      id: "CLR-001",
      certificateNumber: "CLR-2024-001",
      residentName: "ALEMU KASSA",
      kebeleId: "WLD-KB-567890",
      houseNumber: "H-089",
      issueDate: "2024-01-15",
      type: "Relocation",
      status: "Issued",
      downloaded: true,
      printed: true,
      reason: "Job Transfer",
      destination: "Addis Ababa, Bole District",
      destinationKebele: "ADD-KB-045",
      verificationCode: "VER-A1B2C3D4E5"
    },
    {
      id: "CLR-002",
      certificateNumber: "CLR-2024-002",
      residentName: "SENAYIT MOHAMMED",
      kebeleId: "WLD-KB-345678",
      houseNumber: "H-203",
      issueDate: "2024-01-10",
      type: "Residency",
      status: "Issued",
      downloaded: false,
      printed: true,
      reason: "Education Purpose",
      destination: "Bahir Dar, Gish Abay",
      destinationKebele: "BDR-KB-112",
      verificationCode: "VER-F6G7H8I9J0"
    },
    {
      id: "CLR-003",
      certificateNumber: "CLR-2024-003",
      residentName: "MESERET ABEBE",
      kebeleId: "WLD-KB-167890",
      houseNumber: "H-134",
      issueDate: "2024-01-20",
      type: "Business",
      status: "Issued",
      downloaded: true,
      printed: true,
      reason: "Business Expansion",
      destination: "Dire Dawa, Airport Area",
      destinationKebele: "DIR-KB-078",
      verificationCode: "VER-K1L2M3N4O5"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError("");
    setShowResults(false);

    if (!searchTerm || searchTerm.trim().length < 2) {
      setSearchError("Please enter at least 2 characters");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const searchLower = searchTerm.toLowerCase().trim();
      
      const results = mockResidents.filter(resident =>
        resident.fullName.toLowerCase().includes(searchLower) ||
        resident.kebeleId.toLowerCase().includes(searchLower) ||
        resident.houseNumber.toLowerCase().includes(searchLower) ||
        resident.id.toLowerCase().includes(searchLower) ||
        resident.phone.includes(searchTerm) ||
        resident.email.toLowerCase().includes(searchLower)
      );

      setSearchResults(results);
      setShowResults(true);
      setIsLoading(false);
      
      if (results.length === 0) {
        setSearchError("No residents found matching your search criteria");
      }
    }, 800);
  };

  const handleSelectResident = (resident) => {
    setSelectedResident(resident);
    setShowResults(false);
    setSearchTerm("");
    setSearchResults([]);
    setApprovalStatus(null);
    
    // Reset form when new resident is selected
    setClearanceForm({
      reason: "",
      destination: "",
      destinationKebele: "",
      effectiveDate: "",
      remarks: "",
      certificateType: "relocation",
      urgency: "normal"
    });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedResident(null);
    setSearchResults([]);
    setShowResults(false);
    setApprovalStatus(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClearanceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Updated eligibility check according to business rules (BR13, BR14)
  const checkEligibility = () => {
    if (!selectedResident) return false;

    const eligibilityChecks = {
      taxCleared: selectedResident.taxStatus === "Cleared",
      noOutstandingFees: selectedResident.outstandingFees === 0,
      activeStatus: selectedResident.status === "Active",
      minResidency: selectedResident.residencyMonths >= 6,
      noObligations: !selectedResident.hasObligations
    };

    return Object.values(eligibilityChecks).every(check => check);
  };

  // Updated approval process according to business rules
  const handleApproveClearance = async () => {
    if (!selectedResident) return;

    // Validate required fields according to BR13
    if (!clearanceForm.reason || !clearanceForm.destination || !clearanceForm.effectiveDate) {
      setApprovalStatus({
        approved: false,
        message: "Please fill all required fields: Reason, Destination, and Effective Date",
        reasons: ["Missing required information"]
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate approval process with business rule validation
    setTimeout(() => {
      const isEligible = checkEligibility();
      
      if (isEligible) {
        const certificateNumber = `CLR-${new Date().getFullYear()}-${String(issuedCertificates.length + mockIssuedCertificates.length + 1).padStart(3, '0')}`;
        const issuedDate = new Date().toISOString().split('T')[0];
        
        const newCertificate = {
          id: certificateNumber,
          certificateNumber,
          residentName: selectedResident.fullName,
          kebeleId: selectedResident.kebeleId,
          houseNumber: selectedResident.houseNumber,
          issueDate: issuedDate,
          type: clearanceForm.certificateType,
          reason: clearanceForm.reason,
          destination: clearanceForm.destination,
          destinationKebele: clearanceForm.destinationKebele,
          status: "Issued",
          downloaded: false,
          printed: false,
          effectiveDate: clearanceForm.effectiveDate,
          remarks: clearanceForm.remarks,
          urgency: clearanceForm.urgency,
          chairmanSignature: "Digitally Signed",
          verificationCode: `VER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
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
        
        // Log the activity for audit (BR17)
        console.log(`Clearance issued: ${certificateNumber} for ${selectedResident.fullName}`);
      } else {
        const reasons = [
          selectedResident.taxStatus !== "Cleared" && "Tax obligations not cleared",
          selectedResident.outstandingFees > 0 && "Outstanding fees pending",
          selectedResident.status !== "Active" && "Resident status not active",
          selectedResident.residencyMonths < 6 && "Minimum 6 months residency not met",
          selectedResident.hasObligations && "Outstanding obligations exist"
        ].filter(Boolean);
        
        setApprovalStatus({
          approved: false,
          message: "Resident is not eligible for clearance",
          reasons: reasons
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handlePrintCertificate = (certificate = null) => {
    const certToPrint = certificate || approvalStatus?.certificateData;
    if (!certToPrint) return;

    // Update certificate status
    setIssuedCertificates(prev => 
      prev.map(cert => 
        cert.id === certToPrint.id 
          ? { ...cert, printed: true, lastPrinted: new Date().toISOString() }
          : cert
      )
    );
    
    // In a real app, this would open a print dialog with formatted certificate
    alert(`Printing certificate: ${certToPrint.certificateNumber}`);
  };

  const handleDownloadCertificate = (certificate = null) => {
    const certToDownload = certificate || approvalStatus?.certificateData;
    if (!certToDownload) return;

    // Update certificate status
    setIssuedCertificates(prev => 
      prev.map(cert => 
        cert.id === certToDownload.id 
          ? { ...cert, downloaded: true, lastDownloaded: new Date().toISOString() }
          : cert
      )
    );
    
    // Simulate download - in real app, this would generate a PDF
    const element = document.createElement("a");
    const certificateContent = `
KEBELE CLEARANCE CERTIFICATE
Certificate No: ${certToDownload.certificateNumber}
Issued Date: ${certToDownload.issueDate}

RESIDENT INFORMATION:
Name: ${certToDownload.residentName}
Kebele ID: ${certToDownload.kebeleId}
House Number: ${certToDownload.houseNumber}

CLEARANCE DETAILS:
Type: ${certToDownload.type}
Reason: ${certToDownload.reason}
Destination: ${certToDownload.destination}
Destination Kebele: ${certToDownload.destinationKebele}
Effective Date: ${certToDownload.effectiveDate}

STATUS: Approved for Relocation
Verification Code: ${certToDownload.verificationCode}

Issued by: Chairman - Woldia Kebele
Date: ${new Date().toLocaleDateString()}
    `;
    
    const file = new Blob([certificateContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `clearance-${certToDownload.certificateNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleNewClearance = () => {
    setSelectedResident(null);
    setApprovalStatus(null);
    setClearanceForm({
      reason: "",
      destination: "",
      destinationKebele: "",
      effectiveDate: "",
      remarks: "",
      certificateType: "relocation",
      urgency: "normal"
    });
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
            <p className="text-gray-600 mt-1">Process relocation clearance requests according to Kebele business rules</p>
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
              New Clearance
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaSearch className="text-blue-600" />
                Search Resident (By House Number, ID Card, or Name)
              </h3>
              {selectedResident && (
                <button
                  onClick={handleNewClearance}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FaUndo />
                  New Search
                </button>
              )}
            </div>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by House Number (H-045), Kebele ID (WLD-KB-1304903), or Resident Name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowResults(false);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!selectedResident}
                />
                {searchTerm && !selectedResident && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
                {searchError && <p className="text-red-500 text-xs mt-1">{searchError}</p>}
              </div>
              
              {!selectedResident && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaUserCheck /> {isLoading ? "Searching..." : "Search Resident"}
                </button>
              )}
            </form>

            {/* Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="mt-4 border border-gray-200 rounded-xl bg-white shadow-lg">
                <div className="p-3 bg-gray-50 border-b flex items-center gap-2">
                  <FaFilter className="text-blue-600" />
                  <span className="font-medium">Search Results ({searchResults.length})</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((resident) => (
                    <div
                      key={resident.id}
                      onClick={() => handleSelectResident(resident)}
                      className="p-3 border-b hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800">{resident.fullName}</div>
                          <div className="text-sm text-gray-600">
                            ID: {resident.id} | Kebele: {resident.kebeleId} | House: {resident.houseNumber}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            resident.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {resident.status}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {resident.residencyMonths} months
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tips */}
            {!selectedResident && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <FaSearch className="text-blue-600" />
                  Search Tips:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Try searching by <strong>House Number</strong> (e.g., "H-045", "H-112")</li>
                  <li>• Search by <strong>Kebele ID</strong> (e.g., "WLD-KB-1304903")</li>
                  <li>• Search by <strong>Resident Name</strong> (e.g., "Agumas", "Moges")</li>
                  <li>• Search by <strong>Phone Number</strong> (e.g., "251-91-123-4567")</li>
                </ul>
              </div>
            )}
          </div>

          {selectedResident && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resident Information & Eligibility */}
              <div className="space-y-6">
                {/* Resident Profile */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Resident Profile
                  </h3>
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
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className={selectedResident.taxStatus === "Cleared" ? "text-green-500" : "text-red-500"} />
                        <span>Tax: {selectedResident.taxStatus}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaReceipt className={selectedResident.outstandingFees === 0 ? "text-green-500" : "text-red-500"} />
                        <span>Fees: ETB {selectedResident.outstandingFees}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-purple-500" />
                        <span>Family: {selectedResident.familyMembers} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-orange-500" />
                        <span>Occupation: {selectedResident.occupation}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-500" />
                        <span>{selectedResident.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" />
                        <span>{selectedResident.email}</span>
                      </div>
                    </div>

                    {selectedResident.obligations.length > 0 && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                          <FaExclamationTriangle />
                          Outstanding Obligations:
                        </h4>
                        <ul className="text-sm text-red-700 list-disc list-inside">
                          {selectedResident.obligations.map((obligation, index) => (
                            <li key={index}>{obligation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Eligibility Check */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaShieldAlt className="text-blue-600" />
                    Eligibility Status
                  </h3>
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
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className={`text-sm ${selectedResident.residencyMonths >= 6 ? 'text-green-500' : 'text-red-500'}`} />
                            Minimum Residency: {selectedResident.residencyMonths >= 6 ? 'Met' : 'Not Met'}
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className={`text-sm ${!selectedResident.hasObligations ? 'text-green-500' : 'text-red-500'}`} />
                            No Obligations: {!selectedResident.hasObligations ? 'Yes' : 'No'}
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
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Clearance Details (BR13, BR14)</h3>
                  
                  <div className="space-y-4">
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
                        <option value="marriage">Marriage</option>
                        <option value="business">Business Opportunity</option>
                        <option value="family">Family Reasons</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destination Address *
                        </label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="destination"
                            value={clearanceForm.destination}
                            onChange={handleFormChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Destination address"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destination Kebele
                        </label>
                        <input
                          type="text"
                          name="destinationKebele"
                          value={clearanceForm.destinationKebele}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Destination Kebele ID"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        name="urgency"
                        value={clearanceForm.urgency}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="emergency">Emergency</option>
                      </select>
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
                        disabled={isSubmitting || !clearanceForm.reason || !clearanceForm.destination || !clearanceForm.effectiveDate}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <FaStamp />
                        {isSubmitting ? "Processing..." : "Approve & Issue Certificate"}
                      </button>
                      <p className="text-xs text-gray-500 text-center">
                        This will generate an official clearance certificate with digital signature and verification code
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

                      {approvalStatus.approved ? (
                        <div className="space-y-3">
                          <div className="text-sm space-y-1">
                            <div><strong>Certificate No:</strong> {approvalStatus.certificateNumber}</div>
                            <div><strong>Verification Code:</strong> {approvalStatus.certificateData.verificationCode}</div>
                            <div><strong>Issued Date:</strong> {approvalStatus.issuedDate}</div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handlePrintCertificate()}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <FaPrint />
                              Print
                            </button>
                            <button
                              onClick={() => handleDownloadCertificate()}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <FaDownload />
                              Download
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
                      ) : (
                        <div className="text-sm">
                          <div className="font-medium mb-2">Reasons for denial:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {approvalStatus.reasons.map((reason, index) => (
                              <li key={index}>{reason}</li>
                            ))}
                          </ul>
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
                  <th className="text-left p-3 font-medium">House No</th>
                  <th className="text-left p-3 font-medium">Reason</th>
                  <th className="text-left p-3 font-medium">Destination</th>
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
                      <div className="text-xs text-gray-500">{certificate.verificationCode}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{certificate.residentName}</div>
                      <div className="text-sm text-gray-500">{certificate.kebeleId}</div>
                    </td>
                    <td className="p-3 text-sm">{certificate.houseNumber}</td>
                    <td className="p-3 text-sm">{certificate.reason}</td>
                    <td className="p-3 text-sm">
                      <div>{certificate.destination}</div>
                      <div className="text-xs text-gray-500">{certificate.destinationKebele}</div>
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
                          onClick={() => handlePrintCertificate(certificate)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Print Certificate"
                        >
                          <FaPrint />
                        </button>
                        <button
                          onClick={() => handleDownloadCertificate(certificate)}
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
          <div className="p-8 border-2 border-gray-800">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">KEBELE CLEARANCE CERTIFICATE</h1>
              <p className="text-lg">Woldia Kebele Administration</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p><strong>Certificate No:</strong> {approvalStatus.certificateNumber}</p>
                  <p><strong>Issue Date:</strong> {approvalStatus.issuedDate}</p>
                </div>
                <div>
                  <p><strong>Verification Code:</strong> {approvalStatus.certificateData.verificationCode}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">RESIDENT INFORMATION</h2>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Full Name:</strong> {approvalStatus.certificateData.residentName}</p>
                <p><strong>Kebele ID:</strong> {approvalStatus.certificateData.kebeleId}</p>
                <p><strong>House Number:</strong> {approvalStatus.certificateData.houseNumber}</p>
                <p><strong>Effective Date:</strong> {approvalStatus.certificateData.effectiveDate}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">CLEARANCE DETAILS</h2>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Reason:</strong> {approvalStatus.certificateData.reason}</p>
                <p><strong>Type:</strong> {approvalStatus.certificateData.type}</p>
                <p><strong>Destination:</strong> {approvalStatus.certificateData.destination}</p>
                <p><strong>Destination Kebele:</strong> {approvalStatus.certificateData.destinationKebele}</p>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex justify-between">
                <div>
                  <p className="border-t pt-8">_________________________</p>
                  <p><strong>Chairman Signature</strong></p>
                  <p>Woldia Kebele</p>
                </div>
                <div>
                  <p className="border-t pt-8">_________________________</p>
                  <p><strong>Official Stamp</strong></p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepareClearance;