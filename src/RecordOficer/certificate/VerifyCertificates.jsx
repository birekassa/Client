// src/components/recordOfficer/certificate/VerifyCertificates.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCertificate, 
  FaSearch, 
  FaCheckCircle, 
  FaPlus,
  FaChartBar,
  FaGlobe,
  FaFileAlt
} from 'react-icons/fa';
import PrepareCertificate from './PrepareCertificate';
import VerifyCertificateList from './VerifyCertificateList';
import CertificateSearch from './CertificateSearch';
import PublicVerification from './PublicVerification';

const VerifyCertificates = () => {
  const [activeTab, setActiveTab] = useState('prepare');
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    rejected: 0
  });

  const tabs = [
    { id: 'prepare', name: 'ሰርተፊኬት መፍጠር', icon: FaPlus },
    { id: 'verify', name: 'ሰርተፊኬት ማረጋገጫ', icon: FaCheckCircle },
    { id: 'search', name: 'ፍለጋ & ሪፖርት', icon: FaSearch },
    { id: 'public', name: 'የህዝብ ማረጋገጫ', icon: FaGlobe }
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Mock data - replace with actual API call
      setStats({
        total: 156,
        verified: 120,
        pending: 25,
        rejected: 11
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'prepare':
        return <PrepareCertificate onCertificateCreated={fetchStats} />;
      case 'verify':
        return <VerifyCertificateList onVerificationComplete={fetchStats} />;
      case 'search':
        return <CertificateSearch />;
      case 'public':
        return <PublicVerification />;
      default:
        return <PrepareCertificate onCertificateCreated={fetchStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-700 text-white p-6 shadow-lg rounded-2xl mx-4 mt-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-xl">
              <FaCertificate className="text-3xl text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">የሰርተፊኬት አስተዳደር</h1>
              <p className="text-blue-100">ሰርተፊኬት መፍጠር እና ማረጋገጫ ስርዓት</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <div className="text-center bg-white bg-opacity-20 p-3 rounded-lg">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm">ጠቅላላ</div>
            </div>
            <div className="text-center bg-white bg-opacity-20 p-3 rounded-lg">
              <div className="text-2xl font-bold">{stats.pending}</div>
              <div className="text-sm">በመጠባበቅ ላይ</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaFileAlt className="mr-2" />
                  ማስሰናዶች
                </h2>
              </div>
              <nav className="p-2 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-green-100 text-green-800 border border-green-300 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <Icon className={`text-lg ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="font-medium">{tab.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaChartBar className="mr-2" />
                ፈጣን ስታቲስቲክስ
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ጠቅላላ ሰርተፊኬቶች</span>
                  <span className="font-bold text-blue-600">{stats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">የተረጋገጡ</span>
                  <span className="font-bold text-green-600">{stats.verified}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">በመጠባበቅ ላይ</span>
                  <span className="font-bold text-yellow-600">{stats.pending}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">የተቀበሩ</span>
                  <span className="font-bold text-red-600">{stats.rejected}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-3/4"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {renderTabContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificates;