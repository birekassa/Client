import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaWater, FaUsers, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, 
  FaHome, FaFileAlt, FaChartBar, FaShieldAlt, FaCertificate,
  FaUserCheck, FaUserShield, FaRocket, FaClock, FaCogs
} from "react-icons/fa";
import Header from '../components/../layout/Header';
import Footer from '../components/../layout/Footer';
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
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
    <>
      <Header />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50"
        initial="hidden"
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
<motion.section className="mb-20" variants={itemVariants}>
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
    <motion.h2
      className="text-4xl font-bold text-gray-900"
      variants={itemVariants}
    >
      Community Announcements
    </motion.h2>
    <div className="flex flex-wrap gap-3">
      {['all', 'utility', 'community', 'service'].map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-6 py-3 rounded-xl capitalize transition-all duration-300 font-semibold text-lg border-2 ${
            activeFilter === filter
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg border-emerald-500 transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-emerald-400 hover:shadow-md'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  </div>
  
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
    <AnimatePresence>
      {filteredAnnouncements.map((announcement, index) => {
        const AnnouncementIcon = announcement.icon;
        return (
          <motion.div
            key={announcement.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            layout
          >
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl group-hover:from-emerald-600 group-hover:to-teal-700 transition-all duration-300 shadow-lg transform group-hover:scale-110">
                <AnnouncementIcon className="text-white text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors duration-300 leading-tight">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg font-semibold border border-gray-200">
                      {announcement.date}
                    </span>
                    <span className={`text-sm px-3 py-2 rounded-full font-semibold border ${
                      announcement.type === 'utility' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      announcement.type === 'community' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-teal-50 text-teal-700 border-teal-200'
                    }`}>
                      {announcement.type}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {announcement.content}
                </p>
                
                {/* Read More Link */}
                <div className="mt-6 flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                  <span>Read more</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
</motion.section>

{/* Community Statistics Section */}
<motion.section className="mb-20" variants={itemVariants}>
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
    
    {/* Floating Elements */}
    <div className="absolute top-10 right-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
    <div className="absolute bottom-10 left-10 w-16 h-16 bg-teal-500/10 rounded-full blur-xl"></div>
    
    <motion.h2
      className="text-4xl font-bold text-center text-white mb-16 relative"
      variants={itemVariants}
    >
      Community Statistics
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-4"></div>
    </motion.h2>
    
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative"
      variants={containerVariants}
    >
      {Object.entries(stats).map(([key, value], index) => (
        <motion.div
          key={key}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center hover:bg-white/15 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          variants={cardVariants}
          whileHover="hover"
          custom={index}
        >
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          
          {/* Icon Container */}
          <div className="relative mb-4 flex justify-center">
            <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Stat Value */}
          <motion.div
            className="text-3xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors duration-300 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 100 }}
          >
            {value}
          </motion.div>
          
          {/* Stat Label */}
          <p className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 capitalize leading-relaxed">
            {key.replace('_', ' ')}
          </p>
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-0.5">
            <div className="absolute inset-0 rounded-2xl bg-gray-900 m-0.5"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
    
    {/* Footer Text */}
    <motion.div 
      className="text-center mt-12"
      variants={itemVariants}
    >
      <p className="text-gray-400 text-lg font-medium">
        Growing together, building stronger communities
      </p>
    </motion.div>
  </div>
</motion.section>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default Home;