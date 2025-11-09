import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { 
  FaSignInAlt, 
  FaHome, 
  FaIdCard, 
  FaCertificate, 
  FaFileAlt, 
  FaChartBar,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaInfoCircle,
  FaEnvelope,
  FaCogs
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items with proper paths
  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Blogs", path: "/blogs", icon: FaChartBar },
    { name: "Services", path: "/services", icon: FaCogs },
    { name: "Contact Us", path: "/contact", icon: FaEnvelope },
    { name: "About Us", path: "/about", icon: FaInfoCircle },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-r from-blue-800 to-blue-900'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
              ${isScrolled 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                : 'bg-white/20 text-white'
              }
            `}>
              <FaShieldAlt className="text-lg" />
            </div>
            <div>
              <h1 className={`
                text-xl font-bold transition-colors duration-300
                ${isScrolled ? 'text-gray-800' : 'text-white'}
              `}>
                ደፈርጌ ኪቢቃሎ ቀበሌ
              </h1>
              <p className={`
                text-xs transition-colors duration-300
                ${isScrolled ? 'text-gray-600' : 'text-blue-200'}
              `}>
                Digital Kebele Management System
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                    ${isActive 
                      ? isScrolled 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'bg-white/20 text-white border border-white/30'
                      : isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="text-sm" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Login Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                ${isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                }
              `}
            >
              <FaSignInAlt className="text-sm" />
              <span className="hidden sm:block">Login</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className={`
                md:hidden p-2 rounded-lg transition-colors duration-200
                ${isScrolled 
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' 
                  : 'text-white hover:text-blue-200 hover:bg-white/10'
                }
              `}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.path);
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMenu}
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 font-medium
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="text-blue-500" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Login Option */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaSignInAlt className="text-blue-500" />
                  <span>User Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;