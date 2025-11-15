import React, { useState, useRef } from "react";

const Header = ({ active, setSidebarOpen, handleLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
      }
    }
    // Reset the file input
    event.target.value = '';
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
  };

  return (
    <header className="theme-header shadow-sm border-b theme-header-border">
      <div className="flex items-center justify-between p-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors theme-text-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page info */}
          <div>
            <h1 className="text-xl lg:text-2xl font-bold theme-header-text">
              {getPageTitle(active)}
            </h1>
            <p className="theme-text-secondary text-sm hidden sm:block">
              {getPageDescription(active)}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors theme-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-7.5 1 1 0 00-1.16-1.16 5.97 5.97 0 01-7.5 4.66 1 1 0 00-1.16 1.16 5.97 5.97 0 014.66 7.5 1 1 0 001.16 1.16 5.97 5.97 0 017.5-4.66 1 1 0 001.16-1.16z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors theme-text-primary"
            >
              <div 
                className="w-8 h-8 theme-bg-primary rounded-full flex items-center justify-center text-white font-semibold overflow-hidden relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProfileImageClick();
                }}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "CM"
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium theme-header-text">Council Member</p>
                <p className="text-xs theme-text-secondary">Administrator</p>
              </div>
              <svg 
                className={`w-4 h-4 theme-text-secondary transition-transform ${profileOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 theme-card theme-border py-2 z-50">
                <div className="px-4 py-2 border-b theme-border">
                  <p className="text-sm font-medium theme-text-primary">Council Member</p>
                  <p className="text-xs theme-text-secondary">council@kebele.gov.et</p>
                </div>
                
                <button 
                  onClick={handleProfileImageClick}
                  className="w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-surface flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Change Profile Picture
                </button>
                
                {profileImage && (
                  <button 
                    onClick={handleRemoveProfileImage}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:theme-bg-surface flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Profile Picture
                  </button>
                )}
                
                <button className="w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-surface flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </button>
                
                <button className="w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-surface flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </button>
                
                <div className="border-t theme-border my-1"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:theme-bg-surface flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper functions
const getPageTitle = (active) => {
  switch (active) {
    case "Overview":
      return "Council Overview";
    case "Evaluate Performance":
      return "Performance Evaluation";
    case "Review Reports":
      return "Report Review";
    case "Certificate Management":
      return "Certificate Management";
    default:
      return active;
  }
};

const getPageDescription = (active) => {
  switch (active) {
    case "Overview":
      return "Comprehensive overview of kebele council activities and metrics";
    case "Evaluate Performance":
      return "Check performance metrics and generate evaluation reports";
    case "Review Reports":
      return "Analyze departmental reports and council activities";
    case "Certificate Management":
      return "Issue and manage official certificates and confirmation letters";
    case "Settings":
      return "Manage your account and system preferences";
    default:
      return "Kebele Council Administrative Dashboard";
  }
};

export default Header;