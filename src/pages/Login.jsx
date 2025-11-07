// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 Static user data (temporary)
  const users = {
    chairman: { password: "chairman", role: "chairman", path: "/chairman" },
    recordofficer: { password: "record", role: "recordOfficer", path: "/record-officer" },
    admin: { password: "admin", role: "admin", path: "/admin" },
    casher: { password: "casher", role: "cashier", path: "/cashier" },
    socialJustice: { password: "socialJustice", role: "socialJustice", path: "/social-justice" },
    kebeleCounci: { password: "kebeleCounci", role: "kebeleCouncil", path: "/kebele-council" },
  };

  useEffect(() => {
    // Add CSS animation for spinner safely
    const spinnerStyle = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = spinnerStyle;
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      const user = users[username];

      if (user && user.password === password) {
        // ✅ Store user info
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);

        // ✅ Redirect to their dashboard
        navigate(user.path);
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
            alt="Community Administration" 
            style={styles.backgroundImage}
          />
          <div style={styles.imageOverlay}>
            <div style={styles.imageContent}>
              <div style={styles.logo}>
                <div style={styles.logoIcon}>🏛️</div>
                <h2 style={styles.systemTitle}>Kebele Management System</h2>
              </div>
              <h3 style={styles.welcomeText}>Welcome Back</h3>
              <p style={styles.subtitle}>Streamlined Community Administration</p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  Secure Role-based Access
                </div>
                <div style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  Real-time Data Management
                </div>
                <div style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  Comprehensive Dashboard
                </div>
                <div style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  Multi-department Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.loginForm}>
          <div style={styles.formHeader}>
            <h2 style={styles.loginTitle}>Sign In </h2>
            <p style={styles.loginSubtitle}>Enter your credentials to access the management system</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1e40af";
                  e.target.style.boxShadow = "0 0 0 3px rgba(30, 64, 175, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
                required
                style={styles.input}
                placeholder="Enter your username"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1e40af";
                  e.target.style.boxShadow = "0 0 0 3px rgba(30, 64, 175, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
                required
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div style={styles.errorContainer}>
                <span style={styles.errorIcon}>⚠️</span>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonLoading : {})
              }}
              onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#1e3a8a")}
              onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#1e40af")}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div style={styles.testUsers}>
            <p style={styles.testUsersTitle}>Demo Credentials</p>
            <div style={styles.usersGrid}>
              <div style={styles.userCard}>
                <strong style={styles.userRole}>Chairman</strong>
                <div style={styles.credential}>user: <code>chairman</code></div>
                <div style={styles.credential}>pass: <code>chairman</code></div>
              </div>
              <div style={styles.userCard}>
                <strong style={styles.userRole}>Record Officer</strong>
                <div style={styles.credential}>user: <code>recordofficer</code></div>
                <div style={styles.credential}>pass: <code>record</code></div>
              </div>
              <div style={styles.userCard}>
                <strong style={styles.userRole}>Administrator</strong>
                <div style={styles.credential}>user: <code>admin</code></div>
                <div style={styles.credential}>pass: <code>admin</code></div>
              </div>
              <div style={styles.userCard}>
                <strong style={styles.userRole}>Cashier</strong>
                <div style={styles.credential}>user: <code>casher</code></div>
                <div style={styles.credential}>pass: <code>casher</code></div>
              </div>
              <div style={styles.userCard}>
                <strong style={styles.userRole}>Social Justice</strong>
                <div style={styles.credential}>user: <code>socialJustice</code></div>
                <div style={styles.credential}>pass: <code>socialJustice</code></div>
              </div>
              <div style={styles.userCard}>
                <strong style={styles.userRole}>Kebele Council</strong>
                <div style={styles.credential}>user: <code>kebeleCounci</code></div>
                <div style={styles.credential}>pass: <code>kebeleCounci</code></div>
              </div>
            </div>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>Kebele Management System v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8fafc"
  },
  leftPanel: {
    flex: 1,
    position: "relative",
    overflow: "hidden"
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.9)"
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //backgroundColor: "rgba(30, 175, 175, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px"
  },
  imageContent: {
    textAlign: "center",
    color: "white",
    maxWidth: "600px"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "40px"
  },
  logoIcon: {
    fontSize: "3rem",
    marginRight: "15px"
  },
  systemTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
  },
  welcomeText: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "20px",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
  },
  subtitle: {
    fontSize: "1.4rem",
    opacity: "0.95",
    marginBottom: "50px",
    fontWeight: "300"
  },
  featureList: {
    textAlign: "left",
    fontSize: "1.2rem",
    lineHeight: "1.8"
  },
  featureItem: {
    marginBottom: "20px",
    opacity: "0.95",
    display: "flex",
    alignItems: "center"
  },
  checkIcon: {
    marginRight: "12px",
    fontSize: "1.4rem",
    fontWeight: "bold"
  },
  rightPanel: {
    flex: "0 0 50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#ffffff"
  },
  loginForm: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "white",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    border: "1px solid #f1f5f9"
  },
  formHeader: {
    marginBottom: "40px",
    textAlign: "center"
  },
  loginTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "12px"
  },
  loginSubtitle: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.5"
  },
  form: {
    width: "100%"
  },
  inputGroup: {
    marginBottom: "24px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#374151",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "16px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#f8fafc"
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    padding: "14px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #fecaca"
  },
  errorIcon: {
    marginRight: "10px",
    fontSize: "16px"
  },
  errorText: {
    color: "#dc2626",
    fontWeight: "500",
    fontSize: "14px"
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#1e40af",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px"
  },
  submitButtonLoading: {
    opacity: "0.7",
    cursor: "not-allowed"
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid transparent",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginRight: "10px"
  },
  testUsers: {
    marginTop: "40px",
    paddingTop: "30px",
    borderTop: "1px solid #e2e8f0"
  },
  testUsersTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "20px",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  usersGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },
  userCard: {
    backgroundColor: "#f8fafc",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "11px",
    border: "1px solid #e2e8f0",
    lineHeight: "1.4",
    transition: "all 0.2s ease"
  },
  userRole: {
    display: "block",
    marginBottom: "6px",
    fontSize: "10px",
    color: "#1e40af",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  credential: {
    marginBottom: "3px",
    fontFamily: "monospace"
  },
  footer: {
    marginTop: "30px",
    textAlign: "center"
  },
  footerText: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "500"
  }
};

export default Login;