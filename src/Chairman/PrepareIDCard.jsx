// src/components/chairman/PrepareIDCard.jsx
import React, { useState } from "react";
import {
  FaSearch, FaCheckCircle, FaTimesCircle, FaPrint, FaUserCheck,
  FaIdCard, FaHome, FaCalendarAlt, FaFileUpload, FaPaperclip,
  FaUserEdit, FaEnvelope, FaCamera
} from "react-icons/fa";

const PrepareIDCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [activeTab, setActiveTab] = useState("search"); // "search" or "scan"
  
  // Memleketcha Scan Form State
  const [scanForm, setScanForm] = useState({
    fullName: "",
    kebeleId: "",
    houseNumber: "",
    description: "",
    documentType: "memleketcha",
    urgency: "normal",
    scannedDocument: null,
    documentPreview: null
  });

  // Mock Residents
  const mockResidents = [
    {
      id: "RES-001",
      fullName: "AGUMAS BIRHANU",
      kebeleId: "WLD-KB-1304903",
      houseNumber: "H-045",
      registrationDate: "2025-03-15",
      residencyMonths: 8,
      photo: "/api/placeholder/150/150",
      status: "Active"
    },
    {
      id: "RES-002",
      fullName: "MOGES BEYENE",
      kebeleId: "WLD-KB-146903",
      houseNumber: "H-112",
      registrationDate: "2025-06-01",
      residencyMonths: 5,
      photo: "/api/placeholder/150/150",
      status: "Active"
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
      setVerificationResult(null);
      setIsLoading(false);
    }, 800);
  };

  const handleVerifyResident = () => {
    if (!selectedResident) return;
    setIsLoading(true);
    setTimeout(() => {
      const isEligible = selectedResident.residencyMonths >= 6;
      setVerificationResult({
        eligible: isEligible,
        message: isEligible
          ? `Resident has lived in Kebele for ${selectedResident.residencyMonths} months ≥ 6 months required`
          : `Only ${selectedResident.residencyMonths} months registered. Need 6+ months.`
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePrintID = () => {
    window.print();
  };

  // Memleketcha Scan Handlers
  const handleScanFormChange = (e) => {
    const { name, value } = e.target;
    setScanForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentScan = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setScanForm(prev => ({
        ...prev,
        scannedDocument: file,
        documentPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    if (!scanForm.fullName || !scanForm.kebeleId || !scanForm.scannedDocument) {
      alert('Please fill all required fields and scan the document');
      return;
    }

    // Simulate API call to send request to record officer
    setIsLoading(true);
    setTimeout(() => {
      console.log('Request submitted to record officer:', {
        ...scanForm,
        requestId: `REQ-${Date.now()}`,
        timestamp: new Date().toISOString(),
        chairmanId: "CHAIR-001"
      });
      
      alert('Request successfully sent to Record Officer!');
      
      // Reset form
      setScanForm({
        fullName: "",
        kebeleId: "",
        houseNumber: "",
        description: "",
        documentType: "memleketcha",
        urgency: "normal",
        scannedDocument: null,
        documentPreview: null
      });
      setIsLoading(false);
    }, 1500);
  };

  const removeScannedDocument = () => {
    if (scanForm.documentPreview) {
      URL.revokeObjectURL(scanForm.documentPreview);
    }
    setScanForm(prev => ({
      ...prev,
      scannedDocument: null,
      documentPreview: null
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Prepare ID Card</h2>
        <p className="text-gray-600 mt-1">Verify 6-month residency and issue official Kebele ID (UC-003)</p>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab("search")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "search" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaSearch className="inline mr-2" />
            Search Resident
          </button>
          <button
            onClick={() => setActiveTab("scan")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "scan" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaCamera className="inline mr-2" />
            Scan Memleketcha
          </button>
        </div>
      </div>

      {/* Search Resident Tab */}
      {activeTab === "search" && (
        <>
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Search Resident</h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Name, Kebele ID, or Resident ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {searchError && <p className="text-red-500 text-xs mt-1">{searchError}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <FaUserCheck /> {isLoading ? "Searching..." : "Search Resident"}
              </button>
            </form>
          </div>

          {/* Resident Info & Verification */}
          {selectedResident && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resident Profile */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Resident Profile</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl" />
                    <div>
                      <p className="font-bold text-lg">{selectedResident.fullName}</p>
                      <p className="text-sm text-gray-600">ID: {selectedResident.id}</p>
                      <p className="text-sm text-purple-600">Kebele: {selectedResident.kebeleId}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2"><FaHome className="text-gray-500" /> <span>{selectedResident.houseNumber}</span></div>
                    <div className="flex items-center gap-2"><FaCalendarAlt className="text-gray-500" /> <span>{selectedResident.registrationDate}</span></div>
                    <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> <span>{selectedResident.status}</span></div>
                  </div>
                </div>
              </div>

              {/* Verification & Print */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Eligibility Verification</h3>
                <button
                  onClick={handleVerifyResident}
                  disabled={isLoading || verificationResult}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaIdCard /> Verify 6-Month Residency
                </button>

                {verificationResult ? (
                  <div className={`p-4 rounded-xl border-2 ${
                    verificationResult.eligible
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}>
                    <div className="flex items-center gap-3">
                      {verificationResult.eligible ? (
                        <FaCheckCircle className="text-2xl text-green-600" />
                      ) : (
                        <FaTimesCircle className="text-2xl text-red-600" />
                      )}
                      <div>
                        <div className="font-bold">{verificationResult.eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}</div>
                        <div className="text-sm mt-1">{verificationResult.message}</div>
                      </div>
                    </div>
                    {verificationResult.eligible && (
                      <button
                        onClick={handlePrintID}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors print:hidden"
                      >
                        <FaPrint /> Print ID Card
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaIdCard className="mx-auto text-3xl text-gray-300 mb-2" />
                    <div>Click "Verify Residency" to check eligibility</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Print Preview */}
          {verificationResult?.eligible && (
            <div className="print:block hidden">
              <div className="p-8 bg-white border-2 border-gray-800 rounded-lg">
                <h1 className="text-center text-2xl font-bold mb-4">WOLDIA KEBELE ID CARD</h1>
                <div className="flex justify-between items-start">
                  <div>
                    <p><strong>Name:</strong> {selectedResident.fullName}</p>
                    <p><strong>ID:</strong> {selectedResident.id}</p>
                    <p><strong>Kebele ID:</strong> {selectedResident.kebeleId}</p>
                    <p><strong>House:</strong> {selectedResident.houseNumber}</p>
                    <p><strong>Issue Date:</strong> {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="w-32 h-32 bg-gray-200 border-2 border-dashed rounded" />
                </div>
                <p className="text-center mt-6 text-sm">Valid for official Kebele services</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Scan Memleketcha Tab */}
      {activeTab === "scan" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Scan Memleketcha & Request Service</h3>
          <p className="text-gray-600 mb-6">Scan resident's memleketcha document and submit request to Record Officer</p>

          <form onSubmit={handleSubmitRequest} className="space-y-6">
            {/* Resident Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={scanForm.fullName}
                  onChange={handleScanFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter resident's full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kebele ID *
                </label>
                <input
                  type="text"
                  name="kebeleId"
                  value={scanForm.kebeleId}
                  onChange={handleScanFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="WLD-KB-XXXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House Number
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={scanForm.houseNumber}
                  onChange={handleScanFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="H-XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  name="documentType"
                  value={scanForm.documentType}
                  onChange={handleScanFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="memleketcha">Memleketcha</option>
                  <option value="birth_certificate">Birth Certificate</option>
                  <option value="other_id">Other ID Document</option>
                </select>
              </div>
            </div>

            {/* Document Scan Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scan Memleketcha Document *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {scanForm.documentPreview ? (
                  <div className="space-y-4">
                    <div className="mx-auto max-w-xs">
                      <img 
                        src={scanForm.documentPreview} 
                        alt="Scanned document preview" 
                        className="w-full h-auto border rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeScannedDocument}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove Document
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <FaFileUpload className="mx-auto text-3xl text-gray-400" />
                    <div className="text-gray-600">
                      <p>Click to scan or upload memleketcha document</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, PDF (Max 5MB)</p>
                    </div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
                      <FaCamera />
                      Scan Document
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleDocumentScan}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Description & Notes
              </label>
              <textarea
                name="description"
                value={scanForm.description}
                onChange={handleScanFormChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe the service needed, any special requirements, or additional notes for the record officer..."
              />
            </div>

            {/* Urgency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Urgency
              </label>
              <div className="flex gap-4">
                {[
                  { value: "low", label: "Low", color: "gray" },
                  { value: "normal", label: "Normal", color: "blue" },
                  { value: "high", label: "High", color: "orange" },
                  { value: "urgent", label: "Urgent", color: "red" }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value={option.value}
                      checked={scanForm.urgency === option.value}
                      onChange={handleScanFormChange}
                      className="mr-2"
                    />
                    <span className={`px-3 py-2 rounded-lg ${
                      scanForm.urgency === option.value
                        ? `bg-${option.color}-100 text-${option.color}-800 border border-${option.color}-300`
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <FaEnvelope /> 
              {isLoading ? "Submitting Request..." : "Send Request to Record Officer"}
            </button>
          </form>

          {/* Request Information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">About this Process</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Chairman scans memleketcha and fills resident information</li>
              <li>• Request is sent to Record Officer for verification</li>
              <li>• Record Officer will process the request and update status</li>
              <li>• You can track request status in the "Service Requests" section</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepareIDCard;