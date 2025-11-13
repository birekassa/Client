// src/components/recordOfficer/certificate/CertificateDetailModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaCheckCircle, FaCertificate, FaCalendar, FaUser, FaBook } from 'react-icons/fa';

const CertificateDetailModal = ({ certificate, onClose, onVerify }) => {
  const handleReject = () => {
    const reason = prompt('የመቀበያ ምክንያት ያስገቡ:');
    if (reason) {
      onVerify(certificate.id, 'rejected', reason);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">የሰርተፊኬት ዝርዝር መረጃ</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimesCircle className="text-xl" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Certificate Header */}
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCertificate className="text-2xl text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-blue-800 text-lg">{certificate.id}</h4>
              <p className="text-blue-600">የትምህርት ሚኒስቴር</p>
            </div>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FaUser className="mr-2 text-blue-500" />
                የተማሪ መረጃ
              </h4>
              <div>
                <label className="text-sm font-medium text-gray-600">ሙሉ ስም</label>
                <p className="text-gray-800 font-medium text-lg">{certificate.studentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">የተማሪ መለያ</label>
                <p className="text-gray-800 font-mono">{certificate.studentId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FaBook className="mr-2 text-green-500" />
                የትምህርት መረጃ
              </h4>
              <div>
                <label className="text-sm font-medium text-gray-600">ፕሮግራም</label>
                <p className="text-gray-800">{certificate.program}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ደረጃ</label>
                <p className="text-gray-800 font-bold text-lg">{certificate.grade}</p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 flex items-center">
                <FaCalendar className="mr-1 text-purple-500" />
                የመጠናከሪያ ቀን
              </label>
              <p className="text-gray-800">{certificate.issueDate}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">ክሬዲቶች</label>
              <p className="text-gray-800 font-semibold">{certificate.credits}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">ሁኔታ</label>
              <p className={`font-medium text-sm px-3 py-1 rounded-full ${
                certificate.status === 'verified' 
                  ? 'bg-green-100 text-green-800' 
                  : certificate.status === 'rejected' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {certificate.status === 'verified' ? 'የተረጋገጠ' :
                 certificate.status === 'rejected' ? 'የተቀበረ' : 'በመጠባበቅ ላይ'}
              </p>
            </div>
          </div>

          {/* Verified Date */}
          {certificate.verifiedDate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <label className="text-sm font-medium text-green-700">የተረጋገጠበት ቀን</label>
              <p className="text-green-800 font-semibold">{certificate.verifiedDate}</p>
            </div>
          )}

          {/* Rejection Reason */}
          {certificate.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <label className="text-sm font-medium text-red-700">የተቀበረበት ምክንያት</label>
              <p className="text-red-700 mt-1">{certificate.rejectionReason}</p>
            </div>
          )}

          {/* Action Buttons */}
          {certificate.status === 'pending' && (
            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  onVerify(certificate.id, 'verified');
                  onClose();
                }}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-medium"
              >
                <FaCheckCircle className="mr-2" />
                ሰርተፊኬቱን አረጋግጥ
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium"
              >
                <FaTimesCircle className="mr-2" />
                አትቀበል
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateDetailModal;