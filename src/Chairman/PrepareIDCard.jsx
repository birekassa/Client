// src/components/chairman/PrepareIDCard.jsx
import React, { useState } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaPrint, FaUserCheck } from "react-icons/fa";

const PrepareIDCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyResident = () => {
    // Mock verification logic
    const isEligible = Math.random() > 0.3; // 70% chance of eligibility
    setVerificationResult({
      eligible: isEligible,
      message: isEligible 
        ? "Resident meets 6-month residency requirement" 
        : "Resident does not meet 6-month residency requirement"
    });
  };

  const handlePrintID = () => {
    // Mock print functionality
    alert("ID Card sent to printer successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Prepare ID Card</h2>
        <div className="text-gray-600 mt-1">Verify resident eligibility and issue identification cards</div>
      </div>

      {/* Search and Verification Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resident Search</h3>
          <div className="space-y-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resident by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleVerifyResident}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <FaUserCheck className="text-sm" />
              Verify Residency Eligibility
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Verification Result</h3>
          {verificationResult ? (
            <div className={`p-4 rounded-xl border-2 ${
              verificationResult.eligible 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-3">
                {verificationResult.eligible ? (
                  <FaCheckCircle className="text-2xl text-green-600" />
                ) : (
                  <FaTimesCircle className="text-2xl text-red-600" />
                )}
                <div>
                  <div className="font-bold">{verificationResult.eligible ? 'Eligible' : 'Not Eligible'}</div>
                  <div className="text-sm mt-1">{verificationResult.message}</div>
                </div>
              </div>
              
              {verificationResult.eligible && (
                <button
                  onClick={handlePrintID}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <FaPrint className="text-sm" />
                  Print ID Card
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FaUserCheck className="mx-auto text-3xl text-gray-300 mb-2" />
              <div>Search and verify a resident to see results</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrepareIDCard;