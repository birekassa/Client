import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaIdCard, 
  FaCertificate, 
  FaFileAlt, 
  FaHome, 
  FaUserTie, 
  FaShieldAlt, 
  FaArrowRight, 
  FaClock, 
  FaCheckCircle, 
  FaStar, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaPhone, 
  FaCalendarCheck,
  FaUsers,
  FaClipboardList,
  FaLayerGroup,
  FaBolt
} from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Add missing serviceColors object
  const serviceColors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-purple-500 to-indigo-600',
    orange: 'from-orange-500 to-amber-600',
    red: 'from-red-500 to-pink-600',
    indigo: 'from-indigo-500 to-purple-600'
  };

  const serviceCategories = [
    { id: 'all', name: 'All Services', count: 8 },
    { id: 'documents', name: 'Document Services', count: 4 },
    { id: 'housing', name: 'Housing & Property', count: 2 },
    { id: 'business', name: 'Business Services', count: 2 }
  ];

  const services = [
    {
      title: "Digital ID Card",
      description: "Apply for or renew your national ID card with our streamlined digital process. Fast, secure, and convenient.",
      icon: FaIdCard,
      color: "green",
      category: "documents",
      duration: "15-20 min",
      popularity: 4.8,
      requirements: ["2 Passport Photos", "Birth Certificate", "Application Form"],
      link: "/services/id-card",
      usage: 1250
    },
    {
      title: "Birth Certificate",
      description: "Obtain official birth certificates for you or your family members with our efficient online system.",
      icon: FaCertificate,
      color: "green",
      category: "documents",
      duration: "10-15 min",
      popularity: 4.6,
      requirements: ["Parent's ID", "Hospital Record", "Witness Statement"],
      link: "/services/birth-certificate",
      usage: 890
    },
    {
      title: "Residence Certificate",
      description: "Get your proof of residence certificate for various official purposes and applications.",
      icon: FaHome,
      color: "purple",
      category: "documents",
      duration: "5-10 min",
      popularity: 4.7,
      requirements: ["Rental Agreement", "Utility Bill", "ID Card"],
      link: "/services/residence-certificate",
      usage: 1560
    },
    {
      title: "Document Clearance",
      description: "Official clearance and verification services for various documents and certificates.",
      icon: FaFileAlt,
      color: "orange",
      category: "documents",
      duration: "20-25 min",
      popularity: 4.5,
      requirements: ["Original Document", "Application Fee", "ID Verification"],
      link: "/services/clearance",
      usage: 720
    },
    {
      title: "Housing Registration",
      description: "Register your property and update housing information in our official database.",
      icon: FaHome,
      color: "red",
      category: "housing",
      duration: "25-30 min",
      popularity: 4.9,
      requirements: ["Property Deed", "Owner's ID", "Tax Clearance"],
      link: "/services/housing-registration",
      usage: 430
    },
    {
      title: "Property Transfer",
      description: "Facilitate smooth property ownership transfers with our guided digital process.",
      icon: FaUserTie,
      color: "indigo",
      category: "housing",
      duration: "30-40 min",
      popularity: 4.4,
      requirements: ["Sale Agreement", "Both Parties ID", "Tax Receipts"],
      link: "/services/property-transfer",
      usage: 290
    },
    {
      title: "Business License",
      description: "Apply for new business licenses or renew existing ones through our online portal.",
      icon: FaCertificate,
      color: "green",
      category: "business",
      duration: "20-25 min",
      popularity: 4.7,
      requirements: ["Business Plan", "Owner's ID", "Location Proof"],
      link: "/services/business-license",
      usage: 680
    },
    {
      title: "Trade Registration",
      description: "Register your trade business and get official recognition from local authorities.",
      icon: FaShieldAlt,
      color: "blue",
      category: "business",
      duration: "15-20 min",
      popularity: 4.6,
      requirements: ["Business Name", "Owner Details", "Location Information"],
      link: "/services/trade-registration",
      usage: 540
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  const colorHoverClasses = {
    blue: 'hover:bg-blue-600 hover:text-white',
    green: 'hover:bg-green-600 hover:text-white',
    purple: 'hover:bg-purple-600 hover:text-white',
    orange: 'hover:bg-orange-600 hover:text-white',
    red: 'hover:bg-red-600 hover:text-white',
    indigo: 'hover:bg-indigo-600 hover:text-white'
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-20">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-r from-emerald-700 to-teal-800 text-white py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Our Services
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-emerald-100 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Comprehensive digital services for the ደፈርጌ ኪቢቃሎ community. Fast, reliable, and accessible to all.
            </motion.p>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {[
                { label: `${services.length}+ Services`, icon: FaLayerGroup },
                { label: '24/7 Online Access', icon: FaClock },
                { label: 'Secure & Verified', icon: FaShieldAlt },
                { label: 'Quick Processing', icon: FaBolt }
              ].map((item, index) => (
                <div key={item.label} className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-white/30">
                  <item.icon className="text-emerald-200 text-xl" />
                  <span className="font-semibold text-lg">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Search and Filter Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col xl:flex-row gap-8 items-center">
                {/* Enhanced Search Bar */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="text"
                      placeholder="Search services... (e.g., ID Card, Birth Certificate, Utility Bills)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    />
                  </div>
                </div>
                
                {/* Enhanced Category Filter */}
                <div className="xl:w-96">
                  <div className="relative">
                    <FaFilter className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-16 pr-6 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none bg-gray-50/50 hover:bg-white"
                    >
                      {serviceCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Quick Access Tags */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Quick Access:</h4>
                <div className="flex flex-wrap gap-3">
                  {['ID Card', 'Birth Certificate', 'Utility Payment', 'Business License', 'Housing', 'Emergency'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-base font-medium hover:bg-emerald-100 hover:text-emerald-800 transition-all duration-300 border border-emerald-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Services Grid */}
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredServices.map((service, index) => {
                const ServiceIcon = service.icon;
                const serviceColor = serviceColors[service.color] || 'from-emerald-500 to-teal-600';
                
                return (
                  <motion.div
                    key={service.title}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 cursor-pointer group hover:shadow-3xl transition-all duration-500"
                    onClick={() => window.location.href = service.link}
                  >
                    {/* Enhanced Service Header */}
                    <div className={`bg-gradient-to-br ${serviceColor} p-8 relative overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 20px 20px, white 2%, transparent 2.5%)`,
                          backgroundSize: '40px 40px'
                        }} />
                      </div>
                      
                      <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ServiceIcon className="text-2xl text-white" />
                        </div>
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
                          <FaStar className="text-yellow-500 text-lg" />
                          <span className="text-lg font-bold text-gray-800">{service.popularity}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{service.title}</h3>
                      <div className="flex items-center text-white/90 text-lg">
                        <FaClock className="mr-3 text-lg" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    {/* Enhanced Service Content */}
                    <div className="p-8">
                      <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">{service.description}</p>
                      
                      {/* Requirements Section */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <FaClipboardList className="mr-3 text-emerald-600" />
                          Requirements:
                        </h4>
                        <div className="space-y-3">
                          {service.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center text-base text-gray-700">
                              <FaCheckCircle className="text-emerald-500 mr-3 text-lg flex-shrink-0" />
                              <span className="leading-relaxed">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Action Button */}
                      <div className={`flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${serviceColor} group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300 cursor-pointer`}>
                        <span className="font-bold text-white text-lg">Access Service</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white/90 text-sm">Get Started</span>
                          <FaArrowRight className="text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaUsers className="mr-2" />
                          {service.usage}+ users this month
                        </span>
                        <span className="flex items-center">
                          <FaCheckCircle className="mr-2 text-emerald-500" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Enhanced No Results Message */}
            {filteredServices.length === 0 && (
              <motion.div 
                className="text-center py-20 bg-white rounded-3xl shadow-2xl border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-4xl text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No services found</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
                  Try adjusting your search terms or select a different category to find the service you need.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View All Services
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Services;