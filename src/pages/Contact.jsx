import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaTelegram, 
  FaTwitter, 
  FaPaperPlane, 
  FaUser, 
  FaComment, 
  FaCheckCircle,
  FaWhatsapp,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import Header from '../components/../layout/Header';
import Footer from '../components/../layout/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
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
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Office',
      details: ['ደፈርጌ ኪቢቃሎ ቀበሌ', 'Weldiya Town', 'North Wello Zone', 'Amhara Region, Ethiopia'],
      link: 'https://maps.google.com/?q=Weldiya+Town+North+Wello+Ethiopia',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: ['+251 91 234 5678', '+251 92 345 6789'],
      link: 'tel:+251912345678',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['info@kebele.gov.et', 'support@kebele.gov.et'],
      link: 'mailto:info@kebele.gov.et',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: ['Mon - Fri: 8:30 AM - 5:30 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
      color: 'from-orange-500 to-amber-600'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, name: 'Facebook', link: '#', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: FaTelegram, name: 'Telegram', link: '#', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: FaTwitter, name: 'Twitter', link: '#', color: 'bg-sky-500 hover:bg-sky-600' },
    { icon: FaWhatsapp, name: 'WhatsApp', link: '#', color: 'bg-green-500 hover:bg-green-600' }
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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-emerald-100 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Get in touch with ደፈርጌ ኪቢቃሎ ቀበሌ. We're here to serve our community with digital excellence.
            </motion.p>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {[
                { label: '24/7 Support', icon: FaHeadset },
                { label: 'Quick Response', icon: FaPaperPlane },
                { label: 'Secure Communication', icon: FaShieldAlt },
                { label: 'Multiple Channels', icon: FaComment }
              ].map((item, index) => (
                <div key={item.label} className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-white/30">
                  <item.icon className="text-emerald-200 text-xl" />
                  <span className="font-semibold text-lg">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid xl:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Enhanced Contact Information */}
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    We're committed to providing excellent service to our community members. 
                    Reach out to us through any of the following channels for prompt assistance.
                  </p>
                </motion.div>

                {/* Enhanced Contact Cards */}
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-white rounded-3xl shadow-2xl p-8 border-l-0 border-t-4 border-gradient group hover:shadow-3xl transition-all duration-500 cursor-pointer"
                      style={{ 
                        borderImage: `linear-gradient(to right, ${item.color.replace('from-', '').replace('to-', '').replace('-500', '-600').replace('-600', '-700')}) 1`,
                        borderTop: '4px solid'
                      }}
                    >
                      <div className="flex items-start">
                        <div className={`bg-gradient-to-r ${item.color} p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="text-white text-2xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 text-lg mb-2 font-medium">{detail}</p>
                          ))}
                          {item.link && (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                              View on Map →
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Media Links */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white p-4 rounded-2xl text-xl hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
                      >
                        <social.icon />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Contact Form & Map */}
              <div className="space-y-8">
                {/* Enhanced Google Map */}
                <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                  <div className="h-80 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                    <div className="text-center text-white relative z-10">
                      <FaMapMarkerAlt className="text-6xl mx-auto mb-6 text-white/90" />
                      <h3 className="text-3xl font-bold mb-4">ደፈርጌ ኪቢቃሎ ቀበሌ</h3>
                      <p className="text-xl mb-6 text-white/90">Weldiya Town, North Wello, Ethiopia</p>
                      <a 
                        href="https://maps.google.com/?q=Weldiya+Town+North+Wello+Ethiopia"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Contact Form */}
                <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-2xl p-10 group hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                  
                  {isSubmitted && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-5 rounded-2xl mb-8"
                    >
                      <div className="flex items-center text-lg font-semibold">
                        <FaCheckCircle className="mr-3 text-2xl" />
                        Thank you! Your message has been sent successfully.
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="flex items-center text-gray-900 font-bold text-lg mb-4">
                          <FaUser className="mr-3 text-emerald-600 text-xl" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-gray-900 font-bold text-lg mb-4">
                          <FaEnvelope className="mr-3 text-emerald-600 text-xl" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center text-gray-900 font-bold text-lg mb-4">
                        <FaComment className="mr-3 text-emerald-600 text-xl" />
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                        placeholder="Enter message subject"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center text-gray-900 font-bold text-lg mb-4">
                        <FaComment className="mr-3 text-emerald-600 text-xl" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-gray-50/50 hover:bg-white resize-vertical"
                        placeholder="Type your message here..."
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
                    >
                      <FaPaperPlane className="mr-3 text-xl group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Emergency Contact Banner */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h3 
              className="text-4xl font-bold mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Emergency Contact
            </motion.h3>
            <motion.p 
              className="text-2xl mb-8 text-red-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              For urgent matters outside office hours
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center gap-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <p className="text-lg opacity-90 mb-2">Emergency Hotline</p>
                <p className="text-4xl font-bold">+251 91 000 0000</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <p className="text-lg opacity-90 mb-2">24/7 Support</p>
                <p className="text-4xl font-bold">911</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;