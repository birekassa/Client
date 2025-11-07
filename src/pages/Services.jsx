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
  FaCalendarCheck
} from 'react-icons/fa';

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
      color: "blue",
      category: "documents",
      duration: "15-20 min",
      popularity: 4.8,
      requirements: ["2 Passport Photos", "Birth Certificate", "Application Form"],
      link: "/services/id-card"
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
      link: "/services/birth-certificate"
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
      link: "/services/residence-certificate"
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
      link: "/services/clearance"
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
      link: "/services/housing-registration"
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
      link: "/services/property-transfer"
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
      link: "/services/business-license"
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
      link: "/services/trade-registration"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="font-semibold">{services.length}+ Services</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="font-semibold">24/7 Online Access</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="font-semibold">Secure & Verified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search services... (e.g., ID Card, Birth Certificate)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="lg:w-80">
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white text-lg"
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
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => {
              const ServiceIcon = service.icon;
              
              return (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer group"
                  onClick={() => window.location.href = service.link}
                >
                  {/* Service Header with Icon */}
                  <div className={`p-6 ${colorClasses[service.color]} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 ${colorClasses[service.color]} rounded-xl w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <ServiceIcon className="text-2xl" />
                      </div>
                      <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="text-sm font-semibold text-gray-700">{service.popularity}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaClock className="mr-2" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    
                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
                      <div className="space-y-1">
                        {service.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <FaCheckCircle className="text-green-500 mr-2 text-xs" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className={`flex items-center justify-between p-3 rounded-lg ${colorClasses[service.color]} group-hover:${colorHoverClasses[service.color]} transition-all duration-300`}>
                      <span className="font-semibold">Access Service</span>
                      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No Results Message */}
          {filteredServices.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No services found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search terms or select a different category to find the service you need.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;