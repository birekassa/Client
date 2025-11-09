import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEye, 
  FaCodeBranch, 
  FaUsers, 
  FaHeart, 
  FaAward, 
  FaHandshake, 
  FaRocket, 
  FaShieldAlt, 
  FaBullseye, 
  FaGlobe, 
  FaUserTie, 
  FaMobileAlt,
  FaChartLine,
  FaCogs,
  FaLightbulb,
  FaNetworkWired
} from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
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
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const teamMembers = [
    {
      name: "Alemayehu Tesfaye",
      role: "Project Lead",
      expertise: "Digital Governance & System Architecture",
      avatar: "AT",
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Meron Getachew",
      role: "Technical Director",
      expertise: "Full-Stack Development & Security",
      avatar: "MG",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Kaleb Assefa",
      role: "UX/UI Designer",
      expertise: "User Experience & Interface Design",
      avatar: "KA",
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Sara Mohammed",
      role: "Community Manager",
      expertise: "Stakeholder Engagement & Training",
      avatar: "SM",
      color: "from-orange-500 to-amber-600"
    }
  ];

  const acknowledgments = [
    {
      entity: "Ethiopian Digital Government Agency",
      contribution: "Strategic partnership and guidance in digital transformation initiatives",
      icon: FaGlobe
    },
    {
      entity: "Addis Ababa City Administration",
      contribution: "Infrastructure support and logistical coordination for implementation",
      icon: FaNetworkWired
    },
    {
      entity: "Local Community Leaders",
      contribution: "Valuable insights and continuous user feedback for improvement",
      icon: FaUsers
    },
    {
      entity: "Development Partners",
      contribution: "Technical assistance and strategic funding for digital initiatives",
      icon: FaHandshake
    }
  ];

  const stats = [
    { icon: FaUsers, value: "10,000+", label: "Active Users" },
    { icon: FaChartLine, value: "98%", label: "Satisfaction Rate" },
    { icon: FaCogs, value: "50+", label: "Services Offered" },
    { icon: FaMobileAlt, value: "24/7", label: "Platform Availability" }
  ];

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
              About ደፈርጌ ኪቢቃሎ ቀበሌ
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-emerald-100 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Pioneering digital transformation in local governance through innovative 
              technology solutions that serve our community with excellence and integrity.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-3xl shadow-2xl p-8 text-center group hover:shadow-3xl transition-all duration-500"
                >
                  <div className={`bg-gradient-to-r from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Vision & Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid xl:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Enhanced Vision */}
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-3xl shadow-2xl p-10 group hover:shadow-3xl transition-all duration-500"
              >
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                    <FaEye className="text-white text-3xl" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                  To become Ethiopia's leading digital kebele platform, transforming traditional 
                  public services into seamless digital experiences that empower every citizen 
                  and foster sustainable community development through innovation and technology.
                </p>
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-l-4 border-emerald-500">
                  <p className="text-emerald-800 text-lg font-semibold italic">
                    "Building a digitally inclusive society where technology serves humanity with compassion and efficiency"
                  </p>
                </div>
              </motion.div>

              {/* Enhanced Mission */}
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-3xl shadow-2xl p-10 group hover:shadow-3xl transition-all duration-500"
              >
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                    <FaBullseye className="text-white text-3xl" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                  To revolutionize local governance by providing accessible, efficient, and 
                  transparent digital services that simplify administrative processes, 
                  enhance citizen engagement, and improve quality of life in our community.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: FaRocket, label: "Innovation", color: "from-emerald-500 to-teal-600" },
                    { icon: FaShieldAlt, label: "Security", color: "from-blue-500 to-indigo-600" },
                    { icon: FaLightbulb, label: "Excellence", color: "from-amber-500 to-orange-600" },
                    { icon: FaUsers, label: "Community", color: "from-purple-500 to-pink-600" }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 group-hover:border-emerald-300 transition-colors duration-300">
                      <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <item.icon className="text-white text-lg" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Version & System Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">System Information</h2>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto">Our commitment to continuous improvement and technological excellence</p>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, white 2%, transparent 2.5%)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              <div className="flex items-center justify-center mb-10 relative z-10">
                <FaCodeBranch className="text-4xl mr-6" />
                <h3 className="text-4xl font-bold">Platform Version & Performance</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 group hover:bg-white/25 transition-all duration-300">
                  <div className="text-5xl font-bold mb-4">v2.1</div>
                  <p className="text-emerald-100 text-lg mb-4">Current Release</p>
                  <div className="mt-6 text-lg text-green-300 font-semibold flex items-center justify-center">
                    <span className="animate-pulse mr-2">●</span> Live & Stable
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 group hover:bg-white/25 transition-all duration-300">
                  <div className="text-3xl font-bold mb-4">Q4 2024</div>
                  <p className="text-emerald-100 text-lg mb-4">Next Update</p>
                  <div className="mt-6 text-lg text-yellow-300">
                    Enhanced Security Features
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 group hover:bg-white/25 transition-all duration-300">
                  <div className="text-3xl font-bold mb-4">99.2%</div>
                  <p className="text-emerald-100 text-lg mb-4">Uptime</p>
                  <div className="mt-6 text-lg text-green-300">
                    Reliable Service
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center relative z-10">
                <p className="text-emerald-100 text-xl">
                  Built with modern technologies including React, Node.js, and secure cloud infrastructure
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Team Members */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                Dedicated professionals committed to digital excellence and community service
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-3xl shadow-2xl p-8 text-center group hover:shadow-3xl transition-all duration-500"
                >
                  <div className={`bg-gradient-to-r ${member.color} w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {member.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-lg font-semibold text-emerald-600 mb-4">{member.role}</p>
                  <p className="text-gray-700 text-base leading-relaxed mb-6">{member.expertise}</p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <FaUserTie className="text-emerald-500 text-xl mx-auto" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Acknowledgments */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Acknowledgments</h2>
              <div className="flex justify-center mb-6">
                <FaHandshake className="text-5xl text-emerald-600" />
              </div>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                We gratefully acknowledge our partners and supporters who make our mission possible
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {acknowledgments.map((ack, index) => (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-3xl shadow-2xl p-8 border-l-0 border-t-4 border-emerald-500 transform hover:shadow-3xl transition-all duration-500"
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl mr-6">
                      <ack.icon className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{ack.entity}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{ack.contribution}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Enhanced Final Message */}
            <motion.div 
              variants={cardVariants}
              className="mt-20 text-center bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-12 text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%)`,
                  backgroundSize: '50px 50px'
                }} />
              </div>
              
              <FaHeart className="text-5xl mx-auto mb-6 text-red-300 relative z-10" />
              <h3 className="text-4xl font-bold mb-6 relative z-10">Thank You for Believing in Our Mission</h3>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed relative z-10">
                Together, we are building a digital future that serves every member of our 
                community with dignity, efficiency, and transparency. Your trust and support 
                drive us to innovate and excel in serving you better every day.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;