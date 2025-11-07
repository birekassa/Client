import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 Static user data
  const users = {
    chairman: { password: "chairman", role: "chairman", path: "/chairman" },
    recordofficer: { password: "record", role: "recordOfficer", path: "/record-officer" },
    admin: { password: "admin", role: "admin", path: "/admin" },
    casher: { password: "casher", role: "cashier", path: "/cashier" },
    socialJustice: { password: "socialJustice", role: "socialJustice", path: "/social-justice" },
    kebeleCounci: { password: "kebeleCounci", role: "kebeleCouncil", path: "/kebele-council" },
  };

  // ✅ Fixed: Safe CSS animation insertion
  useEffect(() => {
    const addCSSRules = () => {
      try {
        // Method 1: Try to use existing stylesheet
        const sheets = document.styleSheets;
        let targetSheet;

        // Find first available stylesheet
        for (let i = 0; i < sheets.length; i++) {
          if (sheets[i] && sheets[i].insertRule) {
            targetSheet = sheets[i];
            break;
          }
        }

        // Method 2: Create new stylesheet if none exist
        if (!targetSheet) {
          const style = document.createElement('style');
          document.head.appendChild(style);
          targetSheet = style.sheet;
        }

        // Insert animations
        if (targetSheet) {
          targetSheet.insertRule(`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `, targetSheet.cssRules.length);

          targetSheet.insertRule(`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `, targetSheet.cssRules.length);
        }
      } catch (error) {
        console.warn('Could not insert CSS rules:', error);
      }
    };

    addCSSRules();
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

  const handleClose = () => {
    navigate("/");
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.popupContainer}>
        <div style={styles.popup}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>🏛️</div>
              <h2 style={styles.title}>Kebele Management</h2>
            </div>
            <button 
              onClick={handleClose}
              style={styles.closeButton}
              aria-label="Close login"
            >
              ×
            </button>
          </div>

          {/* Login Form */}
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h3 style={styles.loginTitle}>Sign In</h3>
              <p style={styles.loginSubtitle}>Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="Enter username"
                  autoFocus
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="Enter password"
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

            {/* Demo Credentials */}
            <div style={styles.demoSection}>
              <p style={styles.demoTitle}>Demo Credentials</p>
              <div style={styles.usersGrid}>
                <div style={styles.userCard}>
                  <strong style={styles.userRole}>Chairman</strong>
                  <div style={styles.credential}>user: <code>chairman</code></div>
                  <div style={styles.credential}>pass: <code>chairman</code></div>
                </div>
                <div style={styles.userCard}>
                  <strong style={styles.userRole}>Admin</strong>
                  <div style={styles.credential}>user: <code>admin</code></div>
                  <div style={styles.credential}>pass: <code>admin</code></div>
                </div>
                <div style={styles.userCard}>
                  <strong style={styles.userRole}>Record Officer</strong>
                  <div style={styles.credential}>user: <code>recordofficer</code></div>
                  <div style={styles.credential}>pass: <code>record</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  popupContainer: {
    width: "100%",
    maxWidth: "420px",
    animation: "slideIn 0.3s ease-out"
  },
  popup: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    border: "1px solid #e2e8f0"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 24px 0 24px",
    backgroundColor: "#1e40af",
    color: "white"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  logoIcon: {
    fontSize: "2rem"
  },
  title: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "600"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "2rem",
    cursor: "pointer",
    padding: "0",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease"
  },
  formContainer: {
    padding: "32px 24px 24px 24px"
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "32px"
  },
  loginTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1a202c",
    margin: "0 0 8px 0"
  },
  loginSubtitle: {
    color: "#64748b",
    fontSize: "0.875rem",
    margin: 0
  },
  form: {
    width: "100%"
  },
  inputGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#374151",
    fontSize: "0.875rem"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#f8fafc"
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #fecaca"
  },
  errorIcon: {
    marginRight: "8px",
    fontSize: "1rem"
  },
  errorText: {
    color: "#dc2626",
    fontWeight: "500",
    fontSize: "0.875rem"
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1e40af",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  submitButtonLoading: {
    opacity: "0.7",
    cursor: "not-allowed"
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  demoSection: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0"
  },
  demoTitle: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "16px",
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
    padding: "12px",
    borderRadius: "8px",
    fontSize: "0.75rem",
    border: "1px solid #e2e8f0",
    lineHeight: "1.4"
  },
  userRole: {
    display: "block",
    marginBottom: "4px",
    fontSize: "0.7rem",
    color: "#1e40af",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  credential: {
    marginBottom: "2px",
    fontFamily: "monospace",
    fontSize: "0.7rem"
  }
};

export default Login;