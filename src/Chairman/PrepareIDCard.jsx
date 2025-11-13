// src/components/chairman/PrepareIDCard.jsx
import React, { useState } from "react";
import {
  FaSearch, FaCheckCircle, FaTimesCircle, FaPrint, FaUserCheck,
  FaIdCard, FaHome, FaCalendarAlt
} from "react-icons/fa";

const PrepareIDCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Prepare ID Card</h2>
        <p className="text-gray-600 mt-1">Verify 6-month residency and issue official Kebele ID (UC-003)</p>
      </div>

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
    </div>
  );
};

export default PrepareIDCard;