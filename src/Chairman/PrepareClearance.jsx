// src/components/chairman/PrepareClearance.jsx
import React, { useState } from "react";
import { FaSearch, FaFileAlt, FaStamp, FaPrint } from "react-icons/fa";

const PrepareClearance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Prepare Clearance Certificate</h2>
        <div className="text-gray-600 mt-1">Process relocation clearance requests</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resident Information</h3>
          {/* Resident search and details form */}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Clearance Details</h3>
          {/* Clearance form and approval */}
        </div>
      </div>
    </div>
  );
};

export default PrepareClearance;