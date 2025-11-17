// src/components/chairman/PrepareIDCard.jsx
import React, { useState, useRef } from "react";
import {
  FaSearch, FaCheckCircle, FaTimesCircle, FaPrint, FaUserCheck,
  FaIdCard, FaHome, FaCalendarAlt, FaUser, FaUsers,
  FaMoneyBillWave, FaSignature, FaStamp, FaEye, FaDownload,
  FaArrowLeft, FaSync, FaQrcode, FaShieldAlt, FaCertificate,
  FaEdit, FaTrash, FaFilePdf, FaCopy, FaReceipt
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
  const [currentStep, setCurrentStep] = useState(1);
  const [issuedCard, setIssuedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);

  const printRef = useRef();

  // Enhanced Mock Family Data with comprehensive information
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
        occupation: "High School Teacher",
        phone: "+251-91-123-4567",
        email: "agumas.birhanu@email.com",
        education: "Bachelor's Degree",
        maritalStatus: "Married",
        children: 2,
        bloodType: "A+",
        emergencyContact: "+251-92-999-8888",
        address: "H-045, Woldia Kebele",
        birthDate: "1995-08-15",
        gender: "Male",
        religion: "Orthodox Christian",
        disability: "None"
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
        occupation: "Registered Nurse",
        phone: "+251-92-234-5678",
        email: "beyene.tadesse@email.com",
        education: "Diploma in Nursing",
        maritalStatus: "Married",
        children: 2,
        bloodType: "O+",
        emergencyContact: "+251-91-123-4567",
        address: "H-045, Woldia Kebele",
        birthDate: "1998-03-22",
        gender: "Female",
        religion: "Orthodox Christian",
        disability: "None"
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
        occupation: "Student",
        education: "Grade 10",
        school: "Woldia Secondary School",
        bloodType: "A+",
        address: "H-045, Woldia Kebele",
        birthDate: "2007-11-30",
        gender: "Male",
        religion: "Orthodox Christian",
        disability: "None"
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
        occupation: "Commercial Farmer",
        phone: "+251-93-345-6789",
        email: "moges.beyene@email.com",
        education: "Secondary School",
        maritalStatus: "Single",
        landSize: "5 hectares",
        crops: ["Teff", "Maize", "Wheat"],
        bloodType: "B+",
        emergencyContact: "+251-91-777-6666",
        address: "H-112, Woldia Kebele",
        birthDate: "1988-12-03",
        gender: "Male",
        religion: "Protestant Christian",
        disability: "None"
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
        occupation: "Student",
        education: "Grade 11",
        school: "Woldia Preparatory School",
        phone: "+251-94-567-8901",
        bloodType: "O-",
        address: "H-078, Woldia Kebele",
        birthDate: "2006-09-08",
        gender: "Male",
        religion: "Orthodox Christian",
        disability: "None",
        guardian: "SOLOMON TADESSE (Uncle)",
        guardianPhone: "+251-91-888-9999"
      }
    ],
    "H-093": [
      {
        id: "RES-004",
        fullName: "ZEWORK AKLILU",
        age: 42,
        relation: "Head of Household",
        idStatus: "issued",
        idNumber: "WLD-ID-2022-078",
        registrationDate: "2020-08-12",
        residencyMonths: 42,
        photo: "/api/placeholder/80/80",
        occupation: "Business Owner",
        phone: "+251-92-111-2222",
        email: "zework.aklilu@email.com",
        education: "College Diploma",
        maritalStatus: "Married",
        children: 3,
        business: "General Store",
        bloodType: "AB+",
        emergencyContact: "+251-91-333-4444",
        address: "H-093, Woldia Kebele",
        birthDate: "1981-05-25",
        gender: "Male",
        religion: "Muslim",
        disability: "None"
      },
      {
        id: "RES-005",
        fullName: "ELENI ZEWORK",
        age: 38,
        relation: "Spouse",
        idStatus: "issued",
        idNumber: "WLD-ID-2022-079",
        registrationDate: "2020-08-12",
        residencyMonths: 42,
        photo: "/api/placeholder/80/80",
        occupation: "Housewife",
        phone: "+251-93-555-6666",
        education: "Secondary School",
        maritalStatus: "Married",
        children: 3,
        bloodType: "A+",
        emergencyContact: "+251-92-111-2222",
        address: "H-093, Woldia Kebele",
        birthDate: "1985-10-12",
        gender: "Female",
        religion: "Muslim",
        disability: "None"
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
      expiryDate: "2029-01-15",
      status: "Active",
      printed: true,
      paid: true,
      verificationCode: "VER-A1B2C3D4",
      age: 32,
      occupation: "Merchant",
      phone: "+251-94-456-7890"
    },
    {
      id: "ID-002", 
      cardNumber: "WLD-ID-2024-002",
      residentName: "TIGIST HAILE",
      houseNumber: "H-067",
      issueDate: "2024-01-10",
      expiryDate: "2029-01-10", 
      status: "Active",
      printed: true,
      paid: false,
      verificationCode: "VER-E5F6G7H8",
      age: 29,
      occupation: "Teacher",
      phone: "+251-91-987-6543"
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
      const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0];
      const verificationCode = `VER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const newIDCard = {
        id: cardNumber,
        cardNumber,
        residentName: selectedResident.fullName,
        houseNumber: houseNumber,
        issueDate: issueDate,
        expiryDate: expiryDate,
        status: "Active",
        printed: false,
        paid: false,
        residentAge: selectedResident.age,
        residencyMonths: selectedResident.residencyMonths,
        verificationCode: verificationCode,
        occupation: selectedResident.occupation,
        phone: selectedResident.phone,
        email: selectedResident.email
      };

      setIssuedCard(newIDCard);
      setIssuedIDCards(prev => [newIDCard, ...prev]);
      
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
Expiry Date: ${card.expiryDate}

RESIDENT INFORMATION:
• Name: ${card.residentName}
• House Number: ${card.houseNumber}
• Age: ${card.residentAge} years
• Residency: ${card.residencyMonths} months
• Occupation: ${card.occupation || 'Not specified'}
• Phone: ${card.phone || 'Not provided'}
• Email: ${card.email || 'Not provided'}

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

  const handleViewCardDetails = (card) => {
    setSelectedCard(card);
    setShowCardModal(true);
  };

  const handleMarkAsPaid = (cardId) => {
    setIssuedIDCards(prev => 
      prev.map(card => 
        card.id === cardId 
          ? { ...card, paid: true }
          : card
      )
    );
  };

  const handleMarkAsPrinted = (cardId) => {
    setIssuedIDCards(prev => 
      prev.map(card => 
        card.id === cardId 
          ? { ...card, printed: true }
          : card
      )
    );
  };

  const handleDuplicateCard = (card) => {
    const newCardNumber = `WLD-ID-${new Date().getFullYear()}-${String(issuedIDCards.length + mockIssuedIDs.length + 1).padStart(3, '0')}`;
    const newVerificationCode = `VER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const duplicatedCard = {
      ...card,
      id: newCardNumber,
      cardNumber: newCardNumber,
      verificationCode: newVerificationCode,
      issueDate: new Date().toISOString().split('T')[0],
      printed: false,
      paid: false
    };

    setIssuedIDCards(prev => [duplicatedCard, ...prev]);
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

  const allCards = [...issuedIDCards, ...mockIssuedIDs];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FaIdCard className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ID Card Management</h1>
                <p className="text-gray-600">Issue and manage official Kebele identification cards</p>
              </div>
            </div>
            
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("new")}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeTab === "new" 
                    ? "bg-white text-blue-600 shadow-md border border-blue-200" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <FaIdCard />
                New ID Card
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeTab === "history" 
                    ? "bg-white text-blue-600 shadow-md border border-blue-200" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <FaUsers />
                Issued IDs
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-6">
                  {allCards.length}
                </span>
              </button>
            </div>
          </div>

          {activeTab === "new" && (
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className={`flex flex-col items-center ${step.active ? 'text-blue-600' : 'text-gray-400'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold transition-all ${
                        step.active 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 shadow-lg' 
                          : 'bg-white border-gray-300 shadow'
                      }`}>
                        {step.active ? <FaCheckCircle className="text-lg" /> : step.number}
                      </div>
                      <span className="text-sm mt-2 font-medium">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 rounded-full transition-all ${
                        step.active ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                      }`} />
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <FaHome className="text-4xl text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Search by House Number</h2>
                    <p className="text-gray-600 text-lg">Enter the house number to view family members and their eligibility</p>
                  </div>

                  <form onSubmit={handleHouseNumberSearch} className="space-y-6">
                    <div className="relative">
                      <FaHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl z-10" />
                      <input
                        type="text"
                        placeholder="Enter House Number (e.g., H-045, H-112)..."
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value.toUpperCase())}
                        className="w-full pl-14 pr-4 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        autoFocus
                      />
                    </div>
                    
                    {searchError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 text-red-800">
                          <FaTimesCircle className="text-red-500 text-lg" />
                          <span className="font-medium">{searchError}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !houseNumber.trim()}
                      className="w-full py-5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg"
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
                    <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-sm">
                      <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-3">
                        <FaShieldAlt className="text-blue-600" />
                        Test with Sample Data:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { number: "H-045", name: "AGUMAS BIRHANU", status: "Eligible", color: "green" },
                          { number: "H-112", name: "MOGES BEYENE", status: "Eligible", color: "green" },
                          { number: "H-078", name: "YESHIWAS SOLOMON", status: "Not Eligible", color: "red" }
                        ].map((test) => (
                          <button
                            key={test.number}
                            type="button"
                            onClick={() => setHouseNumber(test.number)}
                            className="p-4 text-left bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-md"
                          >
                            <div className="font-semibold text-blue-900">{test.number}</div>
                            <div className="text-sm text-blue-700 mt-1">{test.name}</div>
                            <div className={`text-xs mt-2 ${
                              test.color === 'green' ? 'text-green-600' : 'text-red-600'
                            } font-medium`}>
                              {test.status}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Step 2: Family Profile */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                  <button
                    onClick={handleBackToFamily}
                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors mb-4 sm:mb-0"
                  >
                    <FaArrowLeft />
                    Back to Search
                  </button>
                  <div className="text-center sm:text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      House: <span className="text-blue-600">{houseNumber}</span>
                    </div>
                    <div className="text-gray-600 mt-1">
                      {familyProfile.length} family member{familyProfile.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                </div>

                {/* Family Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {familyProfile.map((member) => {
                    const isEligible = member.age >= 18 && member.residencyMonths >= 6;
                    const eligibilityStatus = isEligible ? 'eligible' : 
                                            member.age < 18 ? 'underage' : 'insufficient_residency';
                    
                    return (
                      <div
                        key={member.id}
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${
                          isEligible 
                            ? 'border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white' 
                            : 'border-red-200 hover:border-red-400 bg-gradient-to-br from-red-50 to-white'
                        }`}
                        onClick={() => handleSelectResident(member)}
                      >
                        {/* Member Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-inner">
                              <FaUser className="text-gray-500 text-xl" />
                            </div>
                            {isEligible ? (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <FaCheckCircle className="text-white text-xs" />
                              </div>
                            ) : (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <FaTimesCircle className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                              {member.fullName}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <span>{member.relation}</span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <span className={`font-medium ${
                                isEligible ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {isEligible ? 'Eligible' : 'Not Eligible'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Member Details */}
                        <div className="space-y-3 text-sm">
                          {/* Age */}
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                            <span className="text-gray-600 flex items-center gap-2">
                              <FaCalendarAlt className="text-gray-400" />
                              Age
                            </span>
                            <span className={`font-semibold ${
                              member.age >= 18 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {member.age} years
                              {member.age >= 18 ? (
                                <FaCheckCircle className="inline ml-1 text-green-500" />
                              ) : (
                                <FaTimesCircle className="inline ml-1 text-red-500" />
                              )}
                            </span>
                          </div>

                          {/* Residency */}
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                            <span className="text-gray-600 flex items-center gap-2">
                              <FaHome className="text-gray-400" />
                              Residency
                            </span>
                            <span className={`font-semibold ${
                              member.residencyMonths >= 6 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {member.residencyMonths} months
                              {member.residencyMonths >= 6 ? (
                                <FaCheckCircle className="inline ml-1 text-green-500" />
                              ) : (
                                <FaTimesCircle className="inline ml-1 text-red-500" />
                              )}
                            </span>
                          </div>

                          {/* Additional Info */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {member.occupation && (
                              <div className="p-2 bg-blue-50 rounded-lg text-blue-700">
                                <div className="font-medium">Occupation</div>
                                <div>{member.occupation}</div>
                              </div>
                            )}
                            {member.phone && (
                              <div className="p-2 bg-purple-50 rounded-lg text-purple-700">
                                <div className="font-medium">Phone</div>
                                <div>{member.phone}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Eligibility Status */}
                        <div className={`mt-4 p-3 rounded-xl border ${
                          isEligible 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800' 
                            : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200 text-red-800'
                        }`}>
                          <div className="flex items-center gap-2">
                            {isEligible ? (
                              <FaCheckCircle className="text-green-500 flex-shrink-0" />
                            ) : (
                              <FaTimesCircle className="text-red-500 flex-shrink-0" />
                            )}
                            <div className="text-sm font-medium">
                              {eligibilityStatus === 'eligible' 
                                ? 'Meets all ID card requirements'
                                : eligibilityStatus === 'underage'
                                ? 'Must be 18+ years old for ID card'
                                : 'Minimum 6 months residency required'
                              }
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                          <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                            isEligible
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                              : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-60'
                          }`}>
                            {isEligible ? (
                              <div className="flex items-center justify-center gap-2">
                                <FaIdCard />
                                Select for ID Card
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <FaTimesCircle />
                                Not Eligible
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions Footer */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        ID Card Eligibility Requirements
                      </h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div>• Must be <strong>18 years or older</strong></div>
                        <div>• Minimum <strong>6 months residency</strong> in Kebele</div>
                        <div>• Must be <strong>registered resident</strong> with complete documentation</div>
                      </div>
                    </div>
                    <button
                      onClick={handleBackToFamily}
                      className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 transition-colors font-semibold whitespace-nowrap"
                    >
                      Search Different House
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Issue ID Card */}
            {currentStep === 3 && selectedResident && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resident Details & Eligibility */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handleBackToSearch}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors px-4 py-2"
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
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-gray-600">Age</div>
                          <div className={`font-semibold ${selectedResident.age >= 18 ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedResident.age} years
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-gray-600">Residency</div>
                          <div className={`font-semibold ${selectedResident.residencyMonths >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedResident.residencyMonths} months
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-gray-600">Occupation</div>
                          <div className="font-semibold text-gray-900">{selectedResident.occupation}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-gray-600">Status</div>
                          <div className="font-semibold text-green-600">Active Resident</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Status */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
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
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
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
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
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
                              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
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
                                className="py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
                              >
                                <FaPrint />
                                Print ID Card
                              </button>
                              <button
                                onClick={() => handleDownloadIDCard(issuedCard)}
                                className="py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
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
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">ID Card Preview</h3>
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-blue-200">
                            <div className="text-center text-sm text-blue-800 mb-2">
                              This is a preview. Click "Print ID Card" for actual printing.
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-blue-300 shadow-inner">
                              <div className="text-center font-bold text-blue-900 mb-2">
                                WOLDIA KEBELE ID CARD
                              </div>
                              <div className="text-xs space-y-1">
                                <div><strong>ID:</strong> {issuedCard.cardNumber}</div>
                                <div><strong>Name:</strong> {issuedCard.residentName}</div>
                                <div><strong>House:</strong> {issuedCard.houseNumber}</div>
                                <div><strong>Age:</strong> {issuedCard.residentAge} years</div>
                                <div><strong>Residency:</strong> {issuedCard.residencyMonths} months</div>
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
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: "Total Issued", 
                  value: allCards.length, 
                  color: "blue",
                  icon: FaIdCard
                },
                { 
                  title: "Active Cards", 
                  value: allCards.filter(c => c.status === "Active").length, 
                  color: "green",
                  icon: FaCheckCircle
                },
                { 
                  title: "Pending Payment", 
                  value: allCards.filter(c => !c.paid).length, 
                  color: "orange",
                  icon: FaMoneyBillWave
                },
                { 
                  title: "Ready for Print", 
                  value: allCards.filter(c => !c.printed).length, 
                  color: "purple",
                  icon: FaPrint
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600 mt-1">{stat.title}</div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200`}>
                      <stat.icon className={`text-2xl text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ID Cards Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden backdrop-blur-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Issued ID Cards</h2>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <FaFilePdf />
                      Export PDF
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <FaSync />
                      Refresh
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">Card Details</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Resident Info</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Dates</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allCards.map((card) => (
                      <tr key={card.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="p-4">
                          <div className="font-semibold text-blue-600 group-hover:text-blue-700">{card.cardNumber}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            <FaQrcode className="text-gray-400" />
                            {card.verificationCode}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">House: {card.houseNumber}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{card.residentName}</div>
                          <div className="text-sm text-gray-600">{card.occupation}</div>
                          <div className="text-xs text-gray-500">{card.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="text-gray-900">Issued: {card.issueDate}</div>
                            <div className="text-gray-500">Expires: {card.expiryDate}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                card.printed 
                                  ? 'bg-green-100 text-green-800 border border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                              }`}>
                                {card.printed ? 'Printed' : 'Not Printed'}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                card.paid 
                                  ? 'bg-green-100 text-green-800 border border-green-200' 
                                  : 'bg-orange-100 text-orange-800 border border-orange-200'
                              }`}>
                                {card.paid ? 'Paid' : 'Pending Payment'}
                              </span>
                            </div>
                            {!card.paid && (
                              <button
                                onClick={() => handleMarkAsPaid(card.id)}
                                className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                              >
                                <FaCheckCircle />
                                Mark as Paid
                              </button>
                            )}
                            {!card.printed && (
                              <button
                                onClick={() => handleMarkAsPrinted(card.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                              >
                                <FaPrint />
                                Mark as Printed
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewCardDetails(card)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group/tooltip relative"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleDownloadIDCard(card)}
                              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Download"
                            >
                              <FaDownload />
                            </button>
                            <button
                              onClick={() => handleDuplicateCard(card)}
                              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Duplicate"
                            >
                              <FaCopy />
                            </button>
                            <button
                              onClick={handleRealPrint}
                              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Print"
                            >
                              <FaPrint />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {allCards.length === 0 && (
                <div className="text-center py-16">
                  <FaIdCard className="mx-auto text-5xl text-gray-300 mb-4" />
                  <div className="text-xl font-medium text-gray-900 mb-2">No ID cards issued yet</div>
                  <p className="text-gray-600 mb-6">Start by issuing your first ID card using the "New ID Card" tab</p>
                  <button
                    onClick={() => setActiveTab("new")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Issue First ID Card
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Card Details Modal */}
        {showCardModal && selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">ID Card Details</h3>
                  <button
                    onClick={() => setShowCardModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimesCircle className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                    <div className="text-lg font-semibold text-blue-600">{selectedCard.cardNumber}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Verification Code</label>
                    <div className="text-lg font-mono text-gray-900">{selectedCard.verificationCode}</div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Resident Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <div className="font-medium">{selectedCard.residentName}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">House Number</label>
                      <div className="font-medium">{selectedCard.houseNumber}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Occupation</label>
                      <div className="font-medium">{selectedCard.occupation}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <div className="font-medium">{selectedCard.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Card Status</h4>
                  <div className="flex gap-4">
                    <div className={`px-4 py-2 rounded-lg ${
                      selectedCard.paid ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      Payment: {selectedCard.paid ? 'Completed' : 'Pending'}
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      selectedCard.printed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      Print: {selectedCard.printed ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="flex gap-3">
                  <button
                    onClick={handleRealPrint}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPrint />
                    Print ID Card
                  </button>
                  <button
                    onClick={() => handleDownloadIDCard(selectedCard)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrepareIDCard;