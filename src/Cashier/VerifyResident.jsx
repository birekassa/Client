// src/components/cashier/VerifyResident.jsx
import React, { useState } from 'react';
import { FaSearch, FaUserCheck, FaIdCard, FaHome, FaPhone, FaHeartbeat, FaArrowRight } from 'react-icons/fa';

const mockResidents = [
  { kebeleId: "KB03-2025-001", fullName: "Alemu Bekele Tadesse", gender: "Male", birthDate: "1987-03-15", phone: "+251911234567", houseNumber: "H-045", zone: "Zone 02", maritalStatus: "Married", bloodType: "O+" },
  { kebeleId: "KB03-2025-002", fullName: "Fatuma Ahmed Ali", gender: "Female", birthDate: "1992-07-22", phone: "+251922345678", houseNumber: "H-112", zone: "Zone 01", maritalStatus: "Single", bloodType: "A-" },
  { kebeleId: "KB03-2025-003", fullName: "Getachew Kebede Worku", gender: "Male", birthDate: "1975-11-30", phone: "+251933456789", houseNumber: "H-078", zone: "Zone 03", maritalStatus: "Married", bloodType: "B+" },
  { kebeleId: "KB03-2025-004", fullName: "Meron Solomon Desta", gender: "Female", birthDate: "1998-05-18", phone: "+251944567890", houseNumber: "H-203", zone: "Zone 02", maritalStatus: "Single", bloodType: "AB+" },
  { kebeleId: "KB03-2025-005", fullName: "Tadesse Muluneh Abebe", gender: "Male", birthDate: "1980-09-10", phone: "+251955678901", houseNumber: "H-156", zone: "Zone 04", maritalStatus: "Divorced", bloodType: "O-" },
  { kebeleId: "KB03-2025-006", fullName: "Selamawit Yohannes Kidane", gender: "Female", birthDate: "1995-01-25", phone: "+251966789012", houseNumber: "H-089", zone: "Zone 01", maritalStatus: "Married", bloodType: "A+" },
  { kebeleId: "KB03-2025-007", fullName: "Birhanu Tesfaye Mamo", gender: "Male", birthDate: "1983-06-12", phone: "+251977890123", houseNumber: "H-234", zone: "Zone 03", maritalStatus: "Married", bloodType: "B-" },
  { kebeleId: "KB03-2025-008", fullName: "Eyerusalem Haile Giorgis", gender: "Female", birthDate: "2000-12-05", phone: "+251988901234", houseNumber: "H-167", zone: "Zone 02", maritalStatus: "Single", bloodType: "O+" },
  { kebeleId: "KB03-2025-009", fullName: "Yonas Assefa Lemma", gender: "Male", birthDate: "1978-08-20", phone: "+251999012345", houseNumber: "H-301", zone: "Zone 04", maritalStatus: "Widowed", bloodType: "A+" },
  { kebeleId: "KB03-2025-010", fullName: "Zewditu Kebede Negash", gender: "Female", birthDate: "1990-04-14", phone: "+251911345678", houseNumber: "H-098", zone: "Zone 01", maritalStatus: "Married", bloodType: "AB-" }
];

const VerifyResident = ({ onVerify }) => {
  const [searchId, setSearchId] = useState('');
  const [foundResident, setFoundResident] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    setFoundResident(null);

    const resident = mockResidents.find(r => r.kebeleId === searchId.trim());
    
    if (resident) {
      setFoundResident(resident);
      onVerify(resident); // Auto-verify
    } else {
      setError('Resident not found. Please check Kebele ID.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Blood Type Color Mapping
  const getBloodTypeColor = (type) => {
    const colors = {
      'O+': 'bg-red-100 text-red-700 border-red-300',
      'O-': 'bg-red-100 text-red-700 border-red-300',
      'A+': 'bg-blue-100 text-blue-700 border-blue-300',
      'A-': 'bg-blue-100 text-blue-700 border-blue-300',
      'B+': 'bg-green-100 text-green-700 border-green-300',
      'B-': 'bg-green-100 text-green-700 border-green-300',
      'AB+': 'bg-purple-100 text-purple-700 border-purple-300',
      'AB-': 'bg-purple-100 text-purple-700 border-purple-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600" />
          <input
            type="text"
            placeholder="Enter Kebele ID (e.g., KB03-2025-001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <FaUserCheck /> Verify
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* VERIFIED RESIDENT CARD */}
      {foundResident && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
              <FaUserCheck className="text-green-600" /> Resident Verified Successfully
            </h3>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {foundResident.zone}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PHOTO */}
            <div className="md:col-span-1 text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 border-4 border-dashed rounded-xl flex items-center justify-center mb-3">
                <FaIdCard className="text-4xl text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Photo ID</p>
            </div>

            {/* DETAILS */}
            <div className="md:col-span-2 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Kebele ID</p>
                  <p className="font-bold text-indigo-700 text-lg">{foundResident.kebeleId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-bold text-gray-800">{foundResident.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-bold">{foundResident.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Birth Date</p>
                  <p className="font-bold">{new Date(foundResident.birthDate).toLocaleDateString('en-GB')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <FaPhone /> Phone
                  </p>
                  <p className="font-bold">{foundResident.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <FaHome /> House No.
                  </p>
                  <p className="font-bold">{foundResident.houseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marital Status</p>
                  <p className="font-bold">{foundResident.maritalStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <FaHeartbeat /> Blood Type
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full font-bold text-sm border ${getBloodTypeColor(foundResident.bloodType)}`}>
                    {foundResident.bloodType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CONTINUE TO PAYMENT BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => onVerify(foundResident)}
              className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-3 transition-all transform hover:scale-105"
            >
              Continue to Payment <FaArrowRight className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyResident;