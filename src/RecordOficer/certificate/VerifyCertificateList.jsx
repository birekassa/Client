// src/components/recordOfficer/VerifyCertificateList.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCheckCircle, FaTimesCircle, FaEye, FaSpinner } from 'react-icons/fa';
import CertificateDetailModal from './CertificateDetailModal';

// Mock data for certificates
const mockCertificates = [
  {
    id: 'CERT-001',
    studentName: 'የሕይወት መስፍን',
    studentId: 'STU-2024-001',
    program: 'ኮምፒውተር ሳይንስ',
    issueDate: '2024-01-15',
    status: 'pending',
    grade: 'A',
    credits: 120
  },
  {
    id: 'CERT-002',
    studentName: 'ሰላም አለማየሁ',
    studentId: 'STU-2024-002',
    program: 'ቢዝነስ አስተዳደር',
    issueDate: '2024-01-14',
    status: 'verified',
    grade: 'B+',
    credits: 118
  },
  {
    id: 'CERT-003',
    studentName: 'ማርያም ገብረመድህን',
    studentId: 'STU-2024-003',
    program: 'ህግ',
    issueDate: '2024-01-13',
    status: 'rejected',
    grade: 'C',
    credits: 115,
    rejectionReason: 'ያልተሟሉ ክፍሎች'
  }
];

const VerifyCertificateList = ({ onVerificationComplete }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setCertificates(mockCertificates);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setLoading(false);
    }
  };

  const handleVerify = async (certificateId, status, rejectionReason = '') => {
    try {
      // Simulate API call
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === certificateId 
            ? { 
                ...cert, 
                status, 
                verifiedDate: new Date().toISOString().split('T')[0],
                ...(rejectionReason && { rejectionReason })
              }
            : cert
        )
      );
      onVerificationComplete?.();
    } catch (error) {
      console.error('Error verifying certificate:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'በመጠባበቅ ላይ' },
      verified: { color: 'bg-green-100 text-green-800', label: 'የተረጋገጠ' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'የተቀበረ' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <FaSpinner className="animate-spin text-3xl text-blue-600" />
        <span className="ml-2 text-gray-600">ሰርተፊኬቶች በማምጣት ላይ...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">ለማረጋገጫ የቀረቡ ሰርተፊኬቶች</h2>
        <div className="text-sm text-gray-500">
          {certificates.length} ሰርተፊኬቶች ተገኝተዋል
        </div>
      </div>

      <div className="space-y-4">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaCertificate className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{certificate.studentName}</h3>
                    <p className="text-sm text-gray-600">{certificate.program}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">ID: {certificate.studentId}</span>
                      <span className="text-xs text-gray-500">ቀን: {certificate.issueDate}</span>
                      <span className="text-xs text-gray-500">ደረጃ: {certificate.grade}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {getStatusBadge(certificate.status)}
                
                {certificate.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleVerify(certificate.id, 'verified')}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center"
                    >
                      <FaCheckCircle className="mr-1" />
                      አረጋግጥ
                    </button>
                    <button
                      onClick={() => setSelectedCertificate(certificate)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center"
                    >
                      <FaTimesCircle className="mr-1" />
                      አትቀበል
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCertificate(certificate)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FaEye className="mr-1" />
                  ይመልከቱ
                </button>
              </div>
            </div>

            {certificate.rejectionReason && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>የተቀበረበት ምክንያት:</strong> {certificate.rejectionReason}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <CertificateDetailModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          onVerify={handleVerify}
        />
      )}
    </div>
  );
};

export default VerifyCertificateList;