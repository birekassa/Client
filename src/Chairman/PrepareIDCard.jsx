// src/components/chairman/PrepareIDCard.jsx
import React, { useState, useRef } from "react";
import {
  FaSearch, FaCheckCircle, FaTimesCircle, FaPrint, FaUserCheck,
  FaIdCard, FaHome, FaCalendarAlt, FaUser, FaUsers,
  FaMoneyBillWave, FaSignature, FaStamp, FaEye, FaDownload,
  FaArrowLeft, FaSync, FaQrcode, FaShieldAlt, FaCertificate
} from "react-icons/fa";

const PrepareIDCard = () => {
  const [houseNumber, setHouseNumber] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);
  const [familyProfile, setFamilyProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [issuedIDCards, setIssuedIDCards] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [currentStep, setCurrentStep] = useState(1); // 1: Search, 2: Select, 3: Issue
  const [issuedCard, setIssuedCard] = useState(null);

  const printRef = useRef();

  // Mock Family Data
  const mockFamilyData = {
    "H-045": [
      {
        id: "RES-001",
        fullName: "AGUMAS BIRHANU",
        age: 28,
        relation: "Head of Household",
        idStatus: "not_given",
        registrationDate: "2022-03-15",
        residencyMonths: 32,
        photo: "/api/placeholder/80/80",
        occupation: "Teacher",
        phone: "+251-91-123-4567"
      },
      {
        id: "RES-009",
        fullName: "BEYENE TADESSE",
        age: 25,
        relation: "Spouse",
        idStatus: "not_given",
        registrationDate: "2022-03-15",
        residencyMonths: 32,
        photo: "/api/placeholder/80/80",
        occupation: "Teacher",
        phone: "+251-92-234-5678"
      },
      {
        id: "RES-011",
        fullName: "LIJ AGUMAS",
        age: 16,
        relation: "Child",
        idStatus: "not_given",
        registrationDate: "2022-03-15",
        residencyMonths: 32,
        photo: "/api/placeholder/80/80",
        occupation: "Student"
      }
    ],
    "H-112": [
      {
        id: "RES-002",
        fullName: "MOGES BEYENE",
        age: 35,
        relation: "Head of Household",
        idStatus: "not_given",
        registrationDate: "2023-06-01",
        residencyMonths: 18,
        photo: "/api/placeholder/80/80",
        occupation: "Farmer",
        phone: "+251-93-345-6789"
      }
    ],
    "H-078": [
      {
        id: "RES-003",
        fullName: "YESHIWAS SOLOMON",
        age: 17,
        relation: "Head of Household",
        idStatus: "not_given",
        registrationDate: "2024-01-15",
        residencyMonths: 5,
        photo: "/api/placeholder/80/80",
        occupation: "Student"
      }
    ]
  };

  // Mock issued ID cards history
  const mockIssuedIDs = [
    {
      id: "ID-001",
      cardNumber: "WLD-ID-2024-001",
      residentName: "ALEMU KASSA",
      houseNumber: "H-089",
      issueDate: "2024-01-15",
      status: "Issued",
      printed: true,
      paid: true,
      verificationCode: "VER-A1B2C3D4"
    }
  ];

  const handleHouseNumberSearch = (e) => {
    e.preventDefault();
    setSearchError("");
    setFamilyProfile([]);
    setSelectedResident(null);
    setVerificationResult(null);

    if (!houseNumber.trim()) {
      setSearchError("Please enter a house number");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const family = mockFamilyData[houseNumber];
      
      if (family) {
        setFamilyProfile(family);
        setSearchError("");
        setCurrentStep(2);
      } else {
        setSearchError("House number not found in the database");
        setFamilyProfile([]);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectResident = (resident) => {
    setSelectedResident(resident);
    
    // Check eligibility
    const isEligible = resident.age >= 18 && resident.residencyMonths >= 6;
    setVerificationResult({
      eligible: isEligible,
      message: isEligible 
        ? "Resident meets all requirements for ID card issuance"
        : resident.age < 18 
          ? "Age requirement not met (must be 18+ years)"
          : "Minimum 6 months residency not met"
    });
    
    setCurrentStep(3);
  };

  const handleIssueIDCard = () => {
    if (!selectedResident || !verificationResult?.eligible) return;

    setIsPrinting(true);
    
    setTimeout(() => {
      const cardNumber = `WLD-ID-${new Date().getFullYear()}-${String(issuedIDCards.length + mockIssuedIDs.length + 1).padStart(3, '0')}`;
      const issueDate = new Date().toISOString().split('T')[0];
      const verificationCode = `VER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const newIDCard = {
        id: cardNumber,
        cardNumber,
        residentName: selectedResident.fullName,
        houseNumber: houseNumber,
        issueDate: issueDate,
        status: "Issued",
        printed: false,
        paid: false,
        residentAge: selectedResident.age,
        residencyMonths: selectedResident.residencyMonths,
        verificationCode: verificationCode,
        occupation: selectedResident.occupation,
        phone: selectedResident.phone
      };

      setIssuedCard(newIDCard);
      setIssuedIDCards(prev => [newIDCard, ...prev]);
      
      // Update family profile
      setFamilyProfile(prev => 
        prev.map(member => 
          member.id === selectedResident.id 
            ? { ...member, idStatus: "issued", idNumber: cardNumber }
            : member
        )
      );

      setIsPrinting(false);
    }, 1500);
  };

  const handleRealPrint = () => {
    if (!issuedCard) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print ID Card - ${issuedCard.cardNumber}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 20px;
              background: white;
            }
            .id-card {
              width: 85mm;
              height: 54mm;
              border: 2px solid #1e40af;
              border-radius: 12px;
              padding: 15px;
              background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
              color: white;
              position: relative;
              box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            }
            .id-header {
              text-align: center;
              border-bottom: 2px solid rgba(255,255,255,0.3);
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            .id-header h1 {
              margin: 0;
              font-size: 14px;
              font-weight: bold;
            }
            .id-header p {
              margin: 2px 0 0 0;
              font-size: 10px;
              opacity: 0.9;
            }
            .id-content {
              display: flex;
              gap: 12px;
              align-items: flex-start;
            }
            .id-photo {
              width: 25mm;
              height: 30mm;
              background: #e5e7eb;
              border: 1px solid #9ca3af;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 8px;
              color: #6b7280;
            }
            .id-details {
              flex: 1;
              font-size: 9px;
            }
            .id-detail-row {
              margin-bottom: 3px;
              display: flex;
              align-items: center;
            }
            .id-detail-label {
              font-weight: bold;
              min-width: 35px;
              color: #dbeafe;
            }
            .id-detail-value {
              flex: 1;
            }
            .id-footer {
              position: absolute;
              bottom: 10px;
              left: 15px;
              right: 15px;
              border-top: 1px solid rgba(255,255,255,0.3);
              padding-top: 6px;
              font-size: 7px;
              text-align: center;
              opacity: 0.8;
            }
            .id-verification {
              position: absolute;
              top: 10px;
              right: 10px;
              background: white;
              color: #1e40af;
              padding: 2px 4px;
              border-radius: 3px;
              font-size: 6px;
              font-weight: bold;
            }
            @media print {
              body { margin: 0; }
              .id-card { 
                margin: 0;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="id-card">
            <div class="id-verification">${issuedCard.verificationCode}</div>
            <div class="id-header">
              <h1>WOLDIA KEBELE ID CARD</h1>
              <p>Official Identification Card</p>
            </div>
            <div class="id-content">
              <div class="id-photo">PHOTO</div>
              <div class="id-details">
                <div class="id-detail-row">
                  <span class="id-detail-label">ID:</span>
                  <span class="id-detail-value">${issuedCard.cardNumber}</span>
                </div>
                <div class="id-detail-row">
                  <span class="id-detail-label">Name:</span>
                  <span class="id-detail-value">${issuedCard.residentName}</span>
                </div>
                <div class="id-detail-row">
                  <span class="id-detail-label">House:</span>
                  <span class="id-detail-value">${issuedCard.houseNumber}</span>
                </div>
                <div class="id-detail-row">
                  <span class="id-detail-label">Age:</span>
                  <span class="id-detail-value">${issuedCard.residentAge} years</span>
                </div>
                <div class="id-detail-row">
                  <span class="id-detail-label">Since:</span>
                  <span class="id-detail-value">${issuedCard.residencyMonths} months</span>
                </div>
                <div class="id-detail-row">
                  <span class="id-detail-label">Occupation:</span>
                  <span class="id-detail-value">${issuedCard.occupation || 'Not specified'}</span>
                </div>
                <div class="id-detail-row">
                  <span class="id-detail-label">Issued:</span>
                  <span class="id-detail-value">${issuedCard.issueDate}</span>
                </div>
              </div>
            </div>
            <div class="id-footer">
              Valid for all Kebele services • ${issuedCard.verificationCode}
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    // Update card status to printed
    setIssuedIDCards(prev => 
      prev.map(card => 
        card.id === issuedCard.id 
          ? { ...card, printed: true }
          : card
      )
    );
  };

  const handleDownloadIDCard = (card) => {
    const element = document.createElement("a");
    const content = `
WOLDIA KEBELE ID CARD - DIGITAL COPY
=====================================

Card Number: ${card.cardNumber}
Verification Code: ${card.verificationCode}
Issue Date: ${card.issueDate}

RESIDENT INFORMATION:
• Name: ${card.residentName}
• House Number: ${card.houseNumber}
• Age: ${card.residentAge} years
• Residency: ${card.residencyMonths} months
• Occupation: ${card.occupation || 'Not specified'}
• Phone: ${card.phone || 'Not provided'}

STATUS: Officially Issued
This digital copy is for reference purposes.

Issued by: Chairman - Woldia Kebele
Date: ${new Date().toLocaleDateString()}
    `;
    
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `id-card-${card.cardNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleNewIDCard = () => {
    setHouseNumber("");
    setSelectedResident(null);
    setFamilyProfile([]);
    setVerificationResult(null);
    setIssuedCard(null);
    setCurrentStep(1);
  };

  const handleBackToSearch = () => {
    setSelectedResident(null);
    setVerificationResult(null);
    setCurrentStep(2);
  };

  const handleBackToFamily = () => {
    setSelectedResident(null);
    setVerificationResult(null);
    setCurrentStep(1);
  };

  // Progress Steps
  const steps = [
    { number: 1, title: "Search House", active: currentStep >= 1 },
    { number: 2, title: "Select Resident", active: currentStep >= 2 },
    { number: 3, title: "Issue ID Card", active: currentStep >= 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaIdCard className="text-2xl text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prepare ID Card</h1>
                <p className="text-gray-600">Issue official Kebele identification cards (UC-002)</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("new")}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeTab === "new" 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <FaIdCard />
                New ID Card
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeTab === "history" 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <FaUsers />
                Issued IDs
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {issuedIDCards.length + mockIssuedIDs.length}
                </span>
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          {activeTab === "new" && (
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className={`flex flex-col items-center ${step.active ? 'text-blue-600' : 'text-gray-400'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                        step.active 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white border-gray-300'
                      }`}>
                        {step.active ? <FaCheckCircle /> : step.number}
                      </div>
                      <span className="text-xs mt-2 font-medium">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 ${step.active ? 'bg-blue-600' : 'bg-gray-300'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* NEW ID CARD TAB */}
        {activeTab === "new" && (
          <div className="space-y-6">
            {/* Step 1: House Search */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaHome className="text-3xl text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Search by House Number</h2>
                    <p className="text-gray-600">Enter the house number to view family members</p>
                  </div>

                  <form onSubmit={handleHouseNumberSearch} className="space-y-6">
                    <div className="relative">
                      <FaHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="text"
                        placeholder="Enter House Number (e.g., H-045, H-112)..."
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value.toUpperCase())}
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        autoFocus
                      />
                    </div>
                    
                    {searchError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-3 text-red-800">
                          <FaTimesCircle className="text-red-500" />
                          <span className="font-medium">{searchError}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !houseNumber.trim()}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <FaSync className="animate-spin" />
                          Searching Database...
                        </>
                      ) : (
                        <>
                          <FaSearch />
                          Search Family Profile
                        </>
                      )}
                    </button>

                    {/* Quick Test Links */}
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                        <FaShieldAlt />
                        Test with Sample Data:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setHouseNumber("H-045")}
                          className="p-3 text-left bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                        >
                          <div className="font-medium text-blue-900">H-045</div>
                          <div className="text-sm text-blue-700">AGUMAS BIRHANU</div>
                          <div className="text-xs text-green-600">Eligible</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHouseNumber("H-112")}
                          className="p-3 text-left bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                        >
                          <div className="font-medium text-blue-900">H-112</div>
                          <div className="text-sm text-blue-700">MOGES BEYENE</div>
                          <div className="text-xs text-green-600">Eligible</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHouseNumber("H-078")}
                          className="p-3 text-left bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                        >
                          <div className="font-medium text-blue-900">H-078</div>
                          <div className="text-sm text-blue-700">YESHIWAS SOLOMON</div>
                          <div className="text-xs text-red-600">Not Eligible</div>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Step 2: Family Profile */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleBackToFamily}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FaArrowLeft />
                    Back to Search
                  </button>
                  <div className="text-lg font-semibold text-gray-900">
                    House: <span className="text-blue-600">{houseNumber}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Family Member</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {familyProfile.map((member) => (
                    <div
                      key={member.id}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] ${
                        member.age >= 18 && member.residencyMonths >= 6
                          ? 'border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white hover:shadow-md'
                          : 'border-red-200 hover:border-red-400 bg-gradient-to-br from-red-50 to-white hover:shadow-md'
                      }`}
                      onClick={() => handleSelectResident(member)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                          <FaUser className="text-gray-500 text-xl" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-900">{member.fullName}</div>
                          <div className="text-sm text-gray-600">{member.relation}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Age:</span>
                          <span className={`font-semibold ${member.age >= 18 ? 'text-green-600' : 'text-red-600'}`}>
                            {member.age} years
                            {member.age >= 18 ? ' ✓' : ' ✗'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Residency:</span>
                          <span className={`font-semibold ${member.residencyMonths >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                            {member.residencyMonths} months
                            {member.residencyMonths >= 6 ? ' ✓' : ' ✗'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status:</span>
                          <span className="text-orange-600 font-semibold">No ID</span>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          member.age >= 18 && member.residencyMonths >= 6
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}>
                          {member.age >= 18 && member.residencyMonths >= 6 ? 'Select for ID' : 'Not Eligible'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Issue ID Card */}
            {currentStep === 3 && selectedResident && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resident Details & Eligibility */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handleBackToSearch}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <FaArrowLeft />
                        Back to Family
                      </button>
                      <div className="text-lg font-semibold text-blue-600">Step 3 of 3</div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaUser className="text-3xl text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedResident.fullName}</h2>
                      <p className="text-gray-600">{selectedResident.relation} • House {houseNumber}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Age</div>
                          <div className={`font-semibold ${selectedResident.age >= 18 ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedResident.age} years
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Residency</div>
                          <div className={`font-semibold ${selectedResident.residencyMonths >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedResident.residencyMonths} months
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Occupation</div>
                          <div className="font-semibold text-gray-900">{selectedResident.occupation}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-600">Status</div>
                          <div className="font-semibold text-green-600">Active Resident</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Status */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FaCertificate className="text-blue-600" />
                      Eligibility Verification
                    </h3>
                    <div className={`p-4 rounded-xl border-2 ${
                      verificationResult?.eligible
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800'
                        : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300 text-red-800'
                    }`}>
                      <div className="flex items-center gap-4">
                        {verificationResult?.eligible ? (
                          <FaCheckCircle className="text-3xl text-green-500 flex-shrink-0" />
                        ) : (
                          <FaTimesCircle className="text-3xl text-red-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-lg">
                            {verificationResult?.eligible ? 'APPROVED FOR ID CARD' : 'NOT ELIGIBLE'}
                          </div>
                          <div className="mt-1">{verificationResult?.message}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ID Card Generation & Actions */}
                <div className="space-y-6">
                  {!verificationResult?.eligible ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                      <div className="text-center py-8">
                        <FaTimesCircle className="mx-auto text-5xl text-red-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Not Eligible</h3>
                        <p className="text-gray-600 mb-6">{verificationResult?.message}</p>
                        <button
                          onClick={handleBackToSearch}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Select Different Resident
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* ID Card Generation */}
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Issue</h3>
                        
                        {!issuedCard ? (
                          <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                              <div className="flex items-center gap-3 text-green-800">
                                <FaCheckCircle className="text-green-500 text-xl" />
                                <div>
                                  <div className="font-semibold">All requirements verified</div>
                                  <div className="text-sm">Ready to generate official ID card</div>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={handleIssueIDCard}
                              disabled={isPrinting}
                              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3"
                            >
                              {isPrinting ? (
                                <>
                                  <FaSync className="animate-spin" />
                                  Generating ID Card...
                                </>
                              ) : (
                                <>
                                  <FaIdCard />
                                  Generate ID Card
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {/* Success Message */}
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                              <div className="flex items-center gap-3 text-green-800">
                                <FaCheckCircle className="text-green-500 text-xl" />
                                <div>
                                  <div className="font-semibold">ID Card Generated Successfully!</div>
                                  <div className="text-sm">Card Number: {issuedCard.cardNumber}</div>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                onClick={handleRealPrint}
                                className="py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                              >
                                <FaPrint />
                                Print ID Card
                              </button>
                              <button
                                onClick={() => handleDownloadIDCard(issuedCard)}
                                className="py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                              >
                                <FaDownload />
                                Download Copy
                              </button>
                            </div>

                            {/* Next Steps */}
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                <FaMoneyBillWave />
                                Next Steps:
                              </h4>
                              <div className="space-y-2 text-sm text-blue-800">
                                <div>1. <strong>Print the ID card</strong> using the button above</div>
                                <div>2. <strong>Instruct resident</strong> to pay at cashier office</div>
                                <div>3. <strong>Provide signature and official stamp</strong></div>
                                <div>4. <strong>Hand over</strong> the finalized ID card</div>
                              </div>
                            </div>

                            <button
                              onClick={handleNewIDCard}
                              className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                              Issue Another ID Card
                            </button>
                          </div>
                        )}
                      </div>

                      {/* ID Card Preview */}
                      {issuedCard && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">ID Card Preview</h3>
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-blue-200">
                            <div className="text-center text-sm text-blue-800 mb-2">
                              This is a preview. Click "Print ID Card" for actual printing.
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-blue-300">
                              <div className="text-center font-bold text-blue-900 mb-2">
                                WOLDIA KEBELE ID CARD
                              </div>
                              <div className="text-xs space-y-1">
                                <div><strong>ID:</strong> {issuedCard.cardNumber}</div>
                                <div><strong>Name:</strong> {issuedCard.residentName}</div>
                                <div><strong>House:</strong> {issuedCard.houseNumber}</div>
                                <div><strong>Verification:</strong> {issuedCard.verificationCode}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ISSUED ID CARDS HISTORY TAB */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Issued ID Cards</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-blue-600">{issuedIDCards.length + mockIssuedIDs.length}</span> cards
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{issuedIDCards.length + mockIssuedIDs.length}</div>
                <div className="text-sm text-blue-800">Total Issued</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {[...issuedIDCards, ...mockIssuedIDs].filter(c => c.paid).length}
                </div>
                <div className="text-sm text-green-800">Payment Completed</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">
                  {[...issuedIDCards, ...mockIssuedIDs].filter(c => c.printed).length}
                </div>
                <div className="text-sm text-purple-800">Printed</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {[...issuedIDCards, ...mockIssuedIDs].filter(c => !c.paid).length}
                </div>
                <div className="text-sm text-orange-800">Pending Payment</div>
              </div>
            </div>

            {/* ID Cards Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Card Number</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Resident Name</th>
                    <th className="text-left p-4 font-semibold text-gray-900">House No</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Issue Date</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[...issuedIDCards, ...mockIssuedIDs].map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-blue-600">{card.cardNumber}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <FaQrcode />
                          {card.verificationCode}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-900">{card.residentName}</td>
                      <td className="p-4 text-gray-600">{card.houseNumber}</td>
                      <td className="p-4 text-gray-600">{card.issueDate}</td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            card.printed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {card.printed ? 'Printed' : 'Not Printed'}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            card.paid 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {card.paid ? 'Paid' : 'Payment Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownloadIDCard(card)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download ID Card"
                          >
                            <FaDownload />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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

            {issuedIDCards.length === 0 && mockIssuedIDs.length === 0 && (
              <div className="text-center py-12">
                <FaIdCard className="mx-auto text-4xl text-gray-300 mb-4" />
                <div className="text-lg font-medium text-gray-900 mb-2">No ID cards issued yet</div>
                <p className="text-gray-600">Issued ID cards will appear in this history</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrepareIDCard;