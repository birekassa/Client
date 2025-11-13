// src/components/recordOfficer/VerifyCertificates.jsx
import React, { useState } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaCertificate,
  FaUserCheck,
  FaPrint,
  FaDownload,
  FaHistory,
  FaClock,
  FaEye,
  FaStamp,
  FaSync
} from "react-icons/fa";

const VerifyCertificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [certificateType, setCertificateType] = useState("birth");
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock certificate data
  const mockCertificates = [
    {
      id: "BC-2024-001",
      type: "birth",
      fullName: "MESERET KEBEDE",
      fatherName: "KEBEDE HAILE",
      motherName: "ELENI MULATU",
      dateOfBirth: "2024-01-15",
      placeOfBirth: "Woldia General Hospital",
      registrationDate: "2024-01-20",
      status: "verified",
      verifiedBy: "AGUMAS BIRHANU",
      verificationDate: "2024-01-25",
      requestDate: "2024-01-22"
    },
    {
      id: "MC-2024-015",
      type: "marriage",
      groomName: "TEWODROS MULATU",
      brideName: "SELAM AWEL",
      marriageDate: "2024-01-10",
      placeOfMarriage: "Woldia Kebele Office",
      registrationDate: "2024-01-12",
      status: "pending",
      verifiedBy: null,
      verificationDate: null,
      requestDate: "2024-01-18"
    },
    {
      id: "BC-2024-002",
      type: "birth",
      fullName: "DAWIT HAILE",
      fatherName: "HAILE GIRMA",
      motherName: "YESHIWORK SOLOMON",
      dateOfBirth: "2024-01-08",
      placeOfBirth: "Woldia Health Center",
      registrationDate: "2024-01-15",
      status: "pending",
      verifiedBy: null,
      verificationDate: null,
      requestDate: "2024-01-20"
    },
    {
      id: "MC-2024-016",
      type: "marriage",
      groomName: "MOGES BEYENE",
      brideName: "TIGIST HAILE",
      marriageDate: "2024-01-05",
      placeOfMarriage: "Woldia Kebele Office",
      registrationDate: "2024-01-08",
      status: "rejected",
      verifiedBy: "AGUMAS BIRHANU",
      verificationDate: "2024-01-19",
      requestDate: "2024-01-15",
      rejectionReason: "Incomplete documentation"
    }
  ];

  const handleSearch = (certificateId) => {
    setLoading(true);
    setSearchTerm(certificateId);
    
    // Simulate API call
    setTimeout(() => {
      const certificate = mockCertificates.find(cert => cert.id === certificateId);
      if (certificate) {
        setSelectedCertificate(certificate);
        setVerificationResult({
          found: true,
          status: certificate.status,
          message: `Certificate ${certificate.id} found in system records`
        });
        
        // Add to verification history
        if (!verificationHistory.find(h => h.id === certificate.id)) {
          setVerificationHistory(prev => [certificate, ...prev.slice(0, 4)]);
        }
      } else {
        setSelectedCertificate(null);
        setVerificationResult({
          found: false,
          status: "not_found",
          message: "Certificate not found in system records"
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleVerifyCertificate = (status, reason = "") => {
    if (!selectedCertificate) return;

    setLoading(true);
    
    // Simulate verification process
    setTimeout(() => {
      const updatedCertificate = {
        ...selectedCertificate,
        status: status,
        verifiedBy: "AGUMAS BIRHANU",
        verificationDate: new Date().toISOString().split('T')[0],
        rejectionReason: reason
      };

      setSelectedCertificate(updatedCertificate);
      setVerificationResult({
        found: true,
        status: status,
        message: `Certificate ${status === "verified" ? "verified" : "rejected"} successfully`
      });

      // Update in mock data and history
      const updatedHistory = verificationHistory.map(cert =>
        cert.id === updatedCertificate.id ? updatedCertificate : cert
      );
      setVerificationHistory(updatedHistory);

      setLoading(false);
    }, 1000);
  };

  const handleViewDetails = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { color: "bg-green-100 text-green-800", icon: FaCheckCircle },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: FaClock },
      rejected: { color: "bg-red-100 text-red-800", icon: FaTimesCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredCertificates = mockCertificates.filter(cert =>
    cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert.type === "birth" ? cert.fullName.toLowerCase().includes(searchTerm.toLowerCase()) :
     `${cert.groomName} ${cert.brideName}`.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Verify Certificates</h2>
            <div className="text-gray-600 mt-1">Verify birth and marriage certificates against official records</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaHistory className="text-gray-400" />
            <span>Last verification: Today, 14:30</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Total Certificates</div>
              <div className="text-4xl font-bold mt-2">{mockCertificates.length}</div>
            </div>
            <FaCertificate className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Verified</div>
              <div className="text-4xl font-bold mt-2">
                {mockCertificates.filter(c => c.status === "verified").length}
              </div>
            </div>
            <FaCheckCircle className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Pending</div>
              <div className="text-4xl font-bold mt-2">
                {mockCertificates.filter(c => c.status === "pending").length}
              </div>
            </div>
            <FaClock className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Rejected</div>
              <div className="text-4xl font-bold mt-2">
                {mockCertificates.filter(c => c.status === "rejected").length}
              </div>
            </div>
            <FaTimesCircle className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Verification Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Search Certificate</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Type
                  </label>
                  <select
                    value={certificateType}
                    onChange={(e) => setCertificateType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="birth">Birth Certificate</option>
                    <option value="marriage">Marriage Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate ID
                  </label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter certificate ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleSearch(searchTerm)}
                disabled={!searchTerm || loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaSearch className="text-sm" />
                )}
                {loading ? "Searching..." : "Search Certificate"}
              </button>
            </div>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Verification Result</h3>
              <div className={`p-4 rounded-xl border-2 ${
                verificationResult.status === "verified" 
                  ? 'bg-green-50 border-green-200' 
                  : verificationResult.status === "rejected"
                  ? 'bg-red-50 border-red-200'
                  : verificationResult.status === "not_found"
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center gap-3">
                  {verificationResult.status === "verified" && <FaCheckCircle className="text-2xl text-green-600" />}
                  {verificationResult.status === "rejected" && <FaTimesCircle className="text-2xl text-red-600" />}
                  {verificationResult.status === "not_found" && <FaTimesCircle className="text-2xl text-gray-600" />}
                  {verificationResult.status === "pending" && <FaClock className="text-2xl text-yellow-600" />}
                  
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">
                      {verificationResult.status === "verified" && "Certificate Verified"}
                      {verificationResult.status === "rejected" && "Certificate Rejected"}
                      {verificationResult.status === "not_found" && "Certificate Not Found"}
                      {verificationResult.status === "pending" && "Verification Pending"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{verificationResult.message}</div>
                  </div>
                </div>

                {selectedCertificate && verificationResult.status === "pending" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleVerifyCertificate("verified")}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <FaCheckCircle className="text-sm" />
                      Verify Certificate
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt("Enter rejection reason:");
                        if (reason) handleVerifyCertificate("rejected", reason);
                      }}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <FaTimesCircle className="text-sm" />
                      Reject Certificate
                    </button>
                  </div>
                )}

                {selectedCertificate && verificationResult.status === "verified" && (
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <FaPrint className="text-sm" />
                      Print Verification
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      <FaDownload className="text-sm" />
                      Download Copy
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Certificates */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Recent Certificate Requests</h3>
              <div className="text-sm text-gray-600 mt-1">Latest certificate verification requests</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCertificates.map((certificate) => (
                    <tr key={certificate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{certificate.id}</div>
                          <div className="text-sm text-gray-500">
                            {certificate.type === "birth" ? certificate.fullName : `${certificate.groomName} & ${certificate.brideName}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          certificate.type === "birth" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-pink-100 text-pink-800"
                        }`}>
                          {certificate.type === "birth" ? "Birth" : "Marriage"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(certificate.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {certificate.requestDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(certificate)}
                          className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded-lg hover:bg-blue-50"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Verification History */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Verification History</h3>
              <div className="text-sm text-gray-600 mt-1">Recent certificate verifications</div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {verificationHistory.length > 0 ? (
                verificationHistory.map((certificate) => (
                  <div key={certificate.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg border-b border-gray-100 last:border-b-0">
                    <div className={`p-2 rounded-lg ${
                      certificate.status === "verified" ? "bg-green-100 text-green-600" :
                      certificate.status === "rejected" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-600"
                    }`}>
                      {certificate.status === "verified" ? <FaCheckCircle /> :
                       certificate.status === "rejected" ? <FaTimesCircle /> : <FaClock />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{certificate.id}</div>
                      <div className="text-xs text-gray-500">
                        {certificate.type === "birth" ? "Birth Certificate" : "Marriage Certificate"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {certificate.verificationDate || "Pending verification"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaHistory className="mx-auto text-3xl text-gray-300 mb-2" />
                  <div>No verification history yet</div>
                  <div className="text-sm">Search and verify certificates to see history</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                  <FaFileAlt className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">New Certificate</div>
                  <div className="text-sm text-gray-500">Register new certificate</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all group">
                <div className="p-2 bg-green-100 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
                  <FaStamp className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-green-600">Bulk Verify</div>
                  <div className="text-sm text-gray-500">Multiple certificates</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
                  <FaPrint className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 group-hover:text-purple-600">Print Reports</div>
                  <div className="text-sm text-gray-500">Verification summary</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details Modal */}
      {showDetailsModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Certificate Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimesCircle className="text-lg" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Certificate Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate ID:</span>
                      <span className="font-medium">{selectedCertificate.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{selectedCertificate.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span>{getStatusBadge(selectedCertificate.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Date:</span>
                      <span className="font-medium">{selectedCertificate.registrationDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Verification Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Request Date:</span>
                      <span className="font-medium">{selectedCertificate.requestDate}</span>
                    </div>
                    {selectedCertificate.verifiedBy && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verified By:</span>
                        <span className="font-medium">{selectedCertificate.verifiedBy}</span>
                      </div>
                    )}
                    {selectedCertificate.verificationDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verification Date:</span>
                        <span className="font-medium">{selectedCertificate.verificationDate}</span>
                      </div>
                    )}
                    {selectedCertificate.rejectionReason && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rejection Reason:</span>
                        <span className="font-medium text-red-600">{selectedCertificate.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Certificate Specific Details */}
              {selectedCertificate.type === "birth" ? (
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Birth Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Full Name</div>
                      <div className="font-medium">{selectedCertificate.fullName}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Date of Birth</div>
                      <div className="font-medium">{selectedCertificate.dateOfBirth}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Father's Name</div>
                      <div className="font-medium">{selectedCertificate.fatherName}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Mother's Name</div>
                      <div className="font-medium">{selectedCertificate.motherName}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-600">Place of Birth</div>
                      <div className="font-medium">{selectedCertificate.placeOfBirth}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Marriage Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Groom's Name</div>
                      <div className="font-medium">{selectedCertificate.groomName}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Bride's Name</div>
                      <div className="font-medium">{selectedCertificate.brideName}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Marriage Date</div>
                      <div className="font-medium">{selectedCertificate.marriageDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Place of Marriage</div>
                      <div className="font-medium">{selectedCertificate.placeOfMarriage}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
                {selectedCertificate.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleVerifyCertificate("verified");
                        setShowDetailsModal(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <FaCheckCircle className="text-sm" />
                      Verify
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt("Enter rejection reason:");
                        if (reason) {
                          handleVerifyCertificate("rejected", reason);
                          setShowDetailsModal(false);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                    >
                      <FaTimesCircle className="text-sm" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificates;