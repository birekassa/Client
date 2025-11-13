// src/components/recordOfficer/PublicVerification.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaCheckCircle, FaTimesCircle, FaSpinner, FaCertificate } from 'react-icons/fa';

// Mock data for certificates
const mockCertificates = [
  {
    id: 'CERT-001',
    studentName: 'የሕይወት መስፍን',
    studentId: 'STU-2024-001',
    program: 'ኮምፒውተር ሳይንስ',
    issueDate: '2024-01-15',
    status: 'verified',
    grade: 'A',
    credits: 120,
    verifiedDate: '2024-01-16'
  },
  {
    id: 'CERT-002',
    studentName: 'ሰላም አለማየሁ',
    studentId: 'STU-2024-002',
    program: 'ቢዝነስ አስተዳደር',
    issueDate: '2024-01-14',
    status: 'verified',
    grade: 'B+',
    credits: 118,
    verifiedDate: '2024-01-15'
  }
];

const PublicVerification = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setLoading(true);
    setVerificationResult(null);
    
    try {
      // Simulate API verification
      setTimeout(() => {
        const certificate = mockCertificates.find(cert => cert.id === certificateId);
        setVerificationResult(certificate || { error: 'ሰርተፊኬት አልተገኘም' });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setVerificationResult({ error: 'የማረጋገጫ ስህተት' });
      setLoading(false);
    }
  };

  const clearVerification = () => {
    setCertificateId('');
    setVerificationResult(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">የህዝብ ሰርተፊኬት ማረጋገጫ</h2>

      {/* Information Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3">
          <FaGlobe className="text-2xl text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-800">ሰርተፊኬትዎን ያረጋግጡ</h3>
            <p className="text-blue-600 text-sm">
              የሰርተፊኬትዎን ቁጥር በማስገባት እውነተኛነቱን ያረጋግጡ. ይህ አገልግሎት ለሁሉም ሰው ክፍት ነው።
            </p>
          </div>
        </div>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleVerify} className="mb-6">
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="የሰርተፊኬት ቁጥር ያስገቡ (ለምሳሌ: CERT-001)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !certificateId.trim()}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaCheckCircle className="mr-2" />
            {loading ? 'በማረጋገጥ ላይ...' : 'አረጋግጥ'}
          </button>
        </div>
      </form>

      {/* Verification Result */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
          <span className="ml-2 text-gray-600">ሰርተፊኬት በማረጋገጥ ላይ...</span>
        </div>
      )}

      {verificationResult && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-xl p-6 ${
            verificationResult.error 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
          }`}
        >
          {verificationResult.error ? (
            <div className="text-center">
              <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-red-700 mb-2">ሰርተፊኬት አልተገኘም</h3>
              <p className="text-red-600">
                ከተጠቀሱት ቁጥሮች ጋር የሚመሳሰል ሰርተፊኬት አልተገኘም። እባክዎ ቁጥሩን ያረጋግጡ እና እንደገና ይሞክሩ።
              </p>
              <button
                onClick={clearVerification}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                እንደገና ይሞክሩ
              </button>
            </div>
          ) : (
            <div className="text-center">
              <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-700 mb-4">ሰርተፊኬት ተረጋግጧል!</h3>
              
              <div className="bg-white rounded-lg p-4 border border-green-200 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <FaCertificate className="text-green-600" />
                  <h4 className="font-bold text-green-800">{verificationResult.id}</h4>
                </div>
                
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">የተማሪ ስም:</span>
                    <span className="font-medium">{verificationResult.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ፕሮግራም:</span>
                    <span className="font-medium">{verificationResult.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">የመጠናከሪያ ቀን:</span>
                    <span className="font-medium">{verificationResult.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">የማረጋገጫ ቀን:</span>
                    <span className="font-medium">{verificationResult.verifiedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ሁኔታ:</span>
                    <span className="font-medium text-green-600">የተረጋገጠ</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>ይህ ሰርተፊኬት በይፋ ተረጋግጧል እና ትክክለኛ ነው።</p>
              </div>

              <button
                onClick={clearVerification}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                ሌላ ሰርተፊኬት ያረጋግጡ
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Help Information */}
      {!verificationResult && !loading && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3">እገዛ</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• የሰርተፊኬት ቁጥር በትክክል እንዳስገቡ ያረጋግጡ (ለምሳሌ: CERT-001)</p>
            <p>• የሰርተፊኬት ቁጥር በሰርተፊኬትዎ ላይ በተፃፈው በትክክል ይመሳሰላል</p>
            <p>• ማንኛውም ችግር ካጋጠመዎት ከአስተዳዳሪ ጋር ያነጋግሩ</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicVerification;