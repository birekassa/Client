// src/components/recordOfficer/CertificateSearch.jsx
import React, { useState } from 'react';
import { FaSearch, FaDownload, FaCertificate, FaSpinner, FaTimesCircle } from 'react-icons/fa';

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
  }
];

const CertificateSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      // Simulate API search
      setTimeout(() => {
        const results = mockCertificates.filter(cert =>
          cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error searching certificates:', error);
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
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

  const handleDownload = (certificate) => {
    // Simulate download
    console.log('Downloading certificate:', certificate.id);
    alert(`ሰርተፊኬት ${certificate.id} እየተራዘመ ነው...`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">ሰርተፊኬት ፍለጋ እና ሪፖርት</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="በተማሪ ስም፣ መለያ ወይም የሰርተፊኬት ቁጥር ይፈልጉ..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSearch className="mr-2" />
            {loading ? 'በፍለጋ ላይ...' : 'ፈልግ'}
          </button>
        </div>
      </form>

      {/* Search Results */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
          <span className="ml-2 text-gray-600">በፍለጋ ላይ...</span>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              <strong>{searchResults.length}</strong> የተገኙ ሰርተፊኬቶች
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm">
              <FaDownload className="mr-2" />
              ሪፖርት አውርድ
            </button>
          </div>
          {searchResults.map((certificate) => (
            <div
              key={certificate.id}
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
                        <span className="text-xs text-gray-500">ሰርተፊኬት: {certificate.id}</span>
                        <span className="text-xs text-gray-500">ቀን: {certificate.issueDate}</span>
                        <span className="text-xs text-gray-500">ደረጃ: {certificate.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(certificate.status)}
                  <button 
                    onClick={() => handleDownload(certificate)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center"
                  >
                    <FaDownload className="mr-1" />
                    አውርድ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <div className="text-center py-12 text-gray-500">
          <FaSearch className="text-4xl mx-auto mb-3 text-gray-300" />
          <p>ምንም የተገኘ ሰርተፊኬት የለም</p>
          <p className="text-sm mt-1">የፍለጋውን ቃል ይቀይሩ እና እንደገና ይሞክሩ</p>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <FaSearch className="text-4xl mx-auto mb-3 text-gray-300" />
          <p>ለመፈለግ በላይኛው ሳጥን ውስጥ ይተይቡ</p>
          <p className="text-sm mt-1">በተማሪ ስም፣ መለያ ወይም የሰርተፊኬት ቁጥር መፈለግ ይችላሉ</p>
        </div>
      )}
    </div>
  );
};

export default CertificateSearch;