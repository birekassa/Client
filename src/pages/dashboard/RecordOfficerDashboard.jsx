import React, { useState } from "react";
import RegisterResident from "../../components/RegisterResident/RegisterResident";
// import HouseRegistration from "../../components/houses/HouseRegistration";
// import ReportGenerator from "../../components/reports/ReportGenerator";
import Overview from "../../components/Overview/Overview";

function RecordOfficerDashboard() {
  const [active, setActive] = useState("Overview");

  const menuItems = [
    "Overview",
    "Register Population",
    "Register Houses",
    "Generate Reports",
    "Settings",
    "Logout",
  ];

  const renderContent = () => {
    switch (active) {
      case "Overview":
        return <Overview setActive={setActive} />;

      case "Register Population":
        return <RegisterResident />;

      // case "Register Houses":
      //   return <HouseRegistration />;

      // case "Generate Reports":
      //   return <ReportGenerator />;

      case "Settings":
        return (
          <div style={styles.settingsContent}>
            <h2>Settings</h2>
            <div style={styles.settingsSection}>
              <h3>Profile Settings</h3>
              <form style={styles.settingsForm}>
                <div style={styles.formGroup}>
                  <label>Full Name</label>
                  <input type="text" style={styles.input} placeholder="Enter your full name" />
                </div>
                <div style={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" style={styles.input} placeholder="Enter your email" />
                </div>
                <div style={styles.formGroup}>
                  <label>Phone Number</label>
                  <input type="tel" style={styles.input} placeholder="Enter your phone number" />
                </div>
                <button type="submit" style={styles.saveButton}>Save Changes</button>
              </form>
            </div>
          </div>
        );

      case "Logout":
        return (
          <div style={styles.logoutContent}>
            <h2>Logout</h2>
            <p>You have been logged out successfully.</p>
            <button style={styles.loginButton} onClick={() => window.location.href = '/login'}>
              Return to Login
            </button>
          </div>
        );

      default:
        return <p>Select an option from the menu</p>;
    }
  };

  return (
    <div style={styles.container}>
      {/* 🟦 Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>📝 Record Officer</h2>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item}
              style={{
                ...styles.menuItem,
                backgroundColor: active === item ? "#17a2b8" : "transparent",
                color: active === item ? "#fff" : "#333",
              }}
              onClick={() => setActive(item)}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* 🟩 Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h1>{active}</h1>
          <div style={styles.userInfo}>
            <span>Welcome, Record Officer</span>
            <div style={styles.notificationIcon}>🔔</div>
          </div>
        </header>

        <section style={styles.content}>
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    padding: "20px 10px",
  },
  logo: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#28a745",
    marginBottom: "30px",
  },
  menuItem: {
    padding: "12px 20px",
    marginBottom: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s, color 0.3s",
  },
  main: {
    flex: 1,
    padding: "20px 30px",
  },
  header: {
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default RecordOfficerDashboard;