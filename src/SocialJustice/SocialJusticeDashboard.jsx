// src/SocialJustice/SocialJusticeDashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const SocialJusticeDashboard = () => {
  const [active, setActive] = useState("Overview");
  const [user, setUser] = useState({
    name: "Council Member",
    role: "council",
    email: "council.member@justice.gov.et",
    phone: "+251 91 234 5678"
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert("You have been logged out successfully!");
    }
  };

  const handleProfileChange = () => {
    const newName = prompt("Enter your name:", user.name);
    if (newName) {
      setUser(prev => ({ ...prev, name: newName }));
      alert("Profile updated successfully!");
    }
  };

  const handleThemeChange = (isDarkMode) => {
    setDarkMode(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  };

  const handleCaseSubmit = (caseData) => {
    console.log('Case submitted:', caseData);
    setActive("Verify Cases");
    // Close sidebar on mobile after navigation
    if (isMobile) setSidebarOpen(false);
  };

  const handleVerificationComplete = () => {
    console.log('Verification completed');
    setActive("Confirmation");
    // Close sidebar on mobile after navigation
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (section) => {
    setActive(section);
    // Close sidebar on mobile after navigation
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-200 bg-white relative`}>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Responsive behavior */}
      <div className={`
        flex-shrink-0 
        transition-transform duration-300 ease-in-out
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'relative'
        }
      `}>
        <Sidebar 
          active={active}
          setActive={handleNavigation}
          user={user}
          onLogout={handleLogout}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        <Header 
          active={active}
          user={user}
          onProfileChange={handleProfileChange}
          onLogout={handleLogout}
          onThemeChange={handleThemeChange}
          isMobile={isMobile}
          onMenuToggle={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        
        <MainContent 
          active={active}
          user={user}
          onCaseSubmit={handleCaseSubmit}
          onVerificationComplete={handleVerificationComplete}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default SocialJusticeDashboard;