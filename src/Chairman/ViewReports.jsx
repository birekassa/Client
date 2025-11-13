// src/components/chairman/ViewReports.jsx
import React from "react";
import { FaFileAlt, FaDownload, FaPrint, FaChartBar } from "react-icons/fa";

const ViewReports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">View Reports</h2>
        <div className="text-gray-600 mt-1">Administrative reports and document issuance statistics</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Report cards would go here */}
      </div>
    </div>
  );
};

export default ViewReports;