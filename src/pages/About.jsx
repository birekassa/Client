import React from 'react';
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
  FaMobileAlt
} from 'react-icons/fa';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Alemayehu Tesfaye",
      role: "Project Lead",
      expertise: "Digital Governance & System Architecture",
      avatar: "AT"
    },
    {
      name: "Meron Getachew",
      role: "Technical Director",
      expertise: "Full-Stack Development & Security",
      avatar: "MG"
    },
    {
      name: "Kaleb Assefa",
      role: "UX/UI Designer",
      expertise: "User Experience & Interface Design",
      avatar: "KA"
    },
    {
      name: "Sara Mohammed",
      role: "Community Manager",
      expertise: "Stakeholder Engagement & Training",
      avatar: "SM"
    }
  ];

  const acknowledgments = [
    {
      entity: "Ethiopian Digital Government Agency",
      contribution: "Strategic partnership and guidance"
    },
    {
      entity: "Addis Ababa City Administration",
      contribution: "Infrastructure and logistical support"
    },
    {
      entity: "Local Community Leaders",
      contribution: "Valuable insights and user feedback"
    },
    {
      entity: "Development Partners",
      contribution: "Technical assistance and funding"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About ደፈርጌ ኪቢቃሎ ቀበሌ</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Pioneering digital transformation in local governance through innovative 
              technology solutions that serve our community.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaEye className="text-blue-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become Ethiopia's leading digital kebele platform, transforming traditional 
                public services into seamless digital experiences that empower every citizen 
                and foster sustainable community development.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 font-semibold italic">
                  "Building a digitally inclusive society where technology serves humanity"
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaBullseye className="text-green-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To revolutionize local governance by providing accessible, efficient, and 
                transparent digital services that simplify administrative processes, 
                enhance citizen engagement, and improve quality of life in our community.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <FaRocket className="text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-800">Innovation</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <FaShieldAlt className="text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-800">Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version & System Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">System Information</h2>
            <p className="text-xl text-gray-600">Our commitment to continuous improvement</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <FaCodeBranch className="text-3xl mr-4" />
              <h3 className="text-3xl font-bold">Platform Version</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">v2.1</div>
                <p className="text-blue-100">Current Release</p>
                <div className="mt-4 text-sm text-green-300 font-semibold">
                  <span className="animate-pulse">●</span> Live & Stable
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-2xl font-bold mb-2">Q4 2024</div>
                <p className="text-blue-100">Next Update</p>
                <div className="mt-4 text-sm text-yellow-300">
                  Enhanced Security Features
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-xl font-bold mb-2">99.2%</div>
                <p className="text-blue-100">Uptime</p>
                <div className="mt-4 text-sm text-green-300">
                  Reliable Service
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-blue-100">
                Built with modern technologies including React, Node.js, and secure cloud infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals committed to digital excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <FaUserTie className="text-blue-500 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Acknowledgments</h2>
            <div className="flex justify-center mb-6">
              <FaHandshake className="text-4xl text-green-600" />
            </div>
            <p className="text-xl text-gray-600">
              We gratefully acknowledge our partners and supporters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {acknowledgments.map((ack, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start">
                  <FaAward className="text-green-600 text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{ack.entity}</h3>
                    <p className="text-gray-600">{ack.contribution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Final Message */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
            <FaHeart className="text-4xl mx-auto mb-4 text-red-300" />
            <h3 className="text-2xl font-bold mb-4">Thank You for Believing in Our Mission</h3>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Together, we are building a digital future that serves every member of our 
              community with dignity, efficiency, and transparency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;