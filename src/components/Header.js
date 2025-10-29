// src/components/Header.js
import React from "react";
// Import necessary hooks from react-router-dom
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { FaSignInAlt } from "react-icons/fa"; 

function Header() {
  // Initialize hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle the double-click event
  const handleDoubleClick = () => {
    // Check the current path to decide where to navigate
    if (location.pathname === "/Login") {
      // If currently on the Login page, navigate to the Home page
      navigate("/");
    } else {
      // If currently on the Home page (or any other page), navigate to the Login page
      navigate("/Login");
    }
  };

  return (
    <header 
      style={{
        padding: "10px 20px",
        backgroundColor: "#004aad",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer" // Optional: gives a visual cue that the header is interactive
      }}
      // Attach the double-click handler to the header
      onDoubleClick={handleDoubleClick}
    >
      <h2>ደፈርጌ ኪቢቃሎ ቀበሌ</h2>

      <nav>
          <>
            <Link 
              to="/Login" 
              style={{ color: "white", marginRight: "15px" }}
              aria-label="Login" 
              title="Login" 
            >
              <FaSignInAlt size={20} /> 
            </Link>
          </>
      </nav>
    </header>
  );
}

export default Header;