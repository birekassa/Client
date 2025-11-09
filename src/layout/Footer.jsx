import React, { useState, useEffect } from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaYoutube, 
  FaTelegram, 
  FaArrowUp, 
  FaMapMarkerAlt,
  FaShieldAlt 
} from "react-icons/fa";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { icon: FaFacebook, url: "#", color: "hover:bg-blue-600" },
    { icon: FaTwitter, url: "#", color: "hover:bg-blue-400" },
    { icon: FaInstagram, url: "#", color: "hover:bg-pink-600" },
    { icon: FaTelegram, url: "#", color: "hover:bg-blue-500" },
    { icon: FaYoutube, url: "#", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ደፈርጌ ኪቢቃሎ ቀበሌ</h3>
                <p className="text-blue-200 text-sm">Digital Kebele Management</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4">
              ዲጂታል ቀበሌ አገልግሎት | Digital Kebele Service
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">ግንኙነት</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start text-blue-100">
                <FaMapMarkerAlt className="mr-3 text-blue-300" />
                <span>ደፈርጌ ኪቢቃሎ ቀበሌ</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-blue-100">
                <FaPhone className="mr-3 text-green-300" />
                <a href="tel:+251465510001" className="hover:text-white transition-colors">
                  +251 46 551 0001
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start text-blue-100">
                <FaEnvelope className="mr-3 text-blue-300" />
                <a href="mailto:info@kebele.gov.et" className="hover:text-white transition-colors">
                  info@kebele.gov.et
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">ፈጣን አገናኞች</h4>
            <div className="space-y-2">
              <a href="/services" className="block text-blue-100 hover:text-white transition-colors">
                አገልግሎቶች
              </a>
              <a href="/about" className="block text-blue-100 hover:text-white transition-colors">
                ስለ እኛ
              </a>
              <a href="/contact" className="block text-blue-100 hover:text-white transition-colors">
                ያግኙን
              </a>
              <a href="/blogs" className="block text-blue-100 hover:text-white transition-colors">
                ዜና
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
            <div className="mb-2 md:mb-0">
              © {new Date().getFullYear()} ደፈርጌ ኪቢቃሎ ቀበሌ. ሁሉም መብቶች የተጠበቁ ናቸው.
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;