import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaWater, FaUsers, FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaIdCard, FaHome, FaFileAlt, FaChartBar, FaShieldAlt, FaCertificate,
  FaUserCheck, FaUserShield, FaRocket, FaClock, FaCogs
} from "react-icons/fa";

// Custom Chevron Icons with larger size
const ChevronLeftIcon = ({ size = 32, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = ({ size = 32, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

function Home() {
  // Enhanced slideshow data with better images and descriptions
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Digital Kebele Management System",
      subtitle: "Modernizing Community Services",
      description: "Transitioning from paper-based to digital workflows for enhanced efficiency and service delivery",
      icon: FaRocket,
      color: "blue"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Resident Registration & Management",
      subtitle: "Comprehensive Population Database",
      description: "Secure registration system for residents with validation and verification processes",
      icon: FaUserCheck,
      color: "green"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1563017256-6c4b9adc8c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "ID Card & Certificate Management",
      subtitle: "Digital Document Issuance",
      description: "Automated ID card, birth certificate, and marriage certificate processing with eligibility validation",
      icon: FaIdCard,
      color: "purple"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      title: "House Registration System",
      subtitle: "Property Management Solution",
      description: "Complete house registration for both Kebele-owned and private properties with occupancy tracking",
      icon: FaHome,
      color: "orange"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Security & Access Control",
      subtitle: "Role-Based Authorization",
      description: "Secure authentication system with role-based access control for different user types",
      icon: FaUserShield,
      color: "red"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Reporting & Analytics",
      subtitle: "Data-Driven Insights",
      description: "Comprehensive reporting system for population statistics, service usage, and administrative insights",
      icon: FaChartBar,
      color: "indigo"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  // Enhanced announcements based on project scope
  const announcements = [
    { 
      id: 1, 
      title: "Water Supply Maintenance", 
      content: "Scheduled water maintenance on Monday from 9am to 5pm in Bench-Sheko Zone.", 
      icon: FaWater,
      date: "2024-12-15",
      type: "utility"
    },
    { 
      id: 2, 
      title: "Community Town Hall Meeting", 
      content: "Monthly community meeting at Kebele hall on Friday at 3pm. All residents welcome.", 
      icon: FaUsers,
      date: "2024-12-20",
      type: "community"
    },
    { 
      id: 3, 
      title: "ID Card Issuance Update", 
      content: "New digital ID card system now available. Apply through the online portal.", 
      icon: FaIdCard,
      date: "2024-12-18",
      type: "service"
    },
    { 
      id: 4, 
      title: "Birth Certificate Registration", 
      content: "Streamlined birth certificate registration process now implemented.", 
      icon: FaCertificate,
      date: "2024-12-22",
      type: "service"
    }
  ];

  // Enhanced resident statistics based on project requirements
  const stats = {
    total: 250,
    male: 120,
    female: 130,
    children: 50,
    teenagers: 40,
    adults: 130,
    aged: 30,
    registered_houses: 180,
    pending_requests: 15,
    cleared_cases: 45
  };

  // Circular motion slide variants
  const circularSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      y: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      y: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 45 : -45,
    })
  };

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
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const filteredAnnouncements = activeFilter === "all" 
    ? announcements 
    : announcements.filter(announcement => announcement.type === activeFilter);

  // Get current slide data
  const currentSlideData = slides[currentSlide];
  const CurrentIcon = currentSlideData.icon;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Slideshow Section with Circular Motion */}
      <section className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={circularSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.7 },
              scale: { type: "spring", stiffness: 300, damping: 30 },
              rotate: { type: "spring", stiffness: 200, damping: 20 },
            }}
            className="absolute inset-0"
          >
            {/* Background image with parallax effect */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentSlideData.image})`
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Content overlay with semi-transparent background for readability */}
            <div className="relative h-full flex items-center justify-center">
              <motion.div 
                className="text-center max-w-4xl px-4 bg-opacity-40 rounded-3xl p-8 backdrop-blur-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  initial={{ y: 50, opacity: 0, rotate: -10 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="mb-6 text-white"
                >
                  <motion.div 
                    className="bg-white bg-opacity-20 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white border-opacity-30"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  >
                    <CurrentIcon className="text-4xl text-white" />
                  </motion.div>
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                  >
                    {currentSlideData.title}
                  </motion.h1>
                  <motion.h2 
                    className="text-2xl md:text-3xl mb-6 opacity-90"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
                  >
                    {currentSlideData.subtitle}
                  </motion.h2>
                  <motion.p 
                    className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
                  >
                    {currentSlideData.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows with hover animations */}
        <motion.button
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition-all z-10 backdrop-blur-sm border border-white border-opacity-30"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeftIcon size={32} />
        </motion.button>

        <motion.button
          aria-label="Next Slide"
          onClick={nextSlide}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition-all z-10 backdrop-blur-sm border border-white border-opacity-30"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRightIcon size={32} />
        </motion.button>

        {/* Slide Indicators with bounce animation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              animate={index === currentSlide ? { 
                scale: [1, 1.2, 1],
                transition: { duration: 2, repeat: Infinity } 
              } : {}}
            />
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Announcements Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              className="text-3xl font-bold text-gray-800"
              variants={itemVariants}
            >
              Announcements
            </motion.h2>
            <div className="flex space-x-2">
              {['all', 'utility', 'community', 'service'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredAnnouncements.map((announcement, index) => {
                const AnnouncementIcon = announcement.icon;
                return (
                  <motion.div
                    key={announcement.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={index}
                    layout
                  >
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg mr-4">
                        <AnnouncementIcon className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {announcement.date}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          announcement.type === 'utility' ? 'bg-orange-100 text-orange-800' :
                          announcement.type === 'community' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {announcement.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{announcement.content}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Residents Statistics */}
        <motion.section className="mb-16" variants={itemVariants}>
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            Community Statistics
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={containerVariants}
          >
            {Object.entries(stats).map(([key, value], index) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div
                  className="text-3xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 100 }}
                >
                  {value}
                </motion.div>
                <p className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace('_', ' ')}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default Home;