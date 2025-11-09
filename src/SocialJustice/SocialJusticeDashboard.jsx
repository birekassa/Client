import React, { useState } from "react";

function SocialJusticeDashboard() {
  const [active, setActive] = useState("Home");

  const menuItems = [
    "Home",
    "Verify Cases",
    "Write Letters",
    "Reports",
    "Settings",
    "Logout",
  ];

  return (
    <div style={styles.container}>
      {/* 🟦 Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>⚖️ Social Justice</h2>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item}
              style={{
                ...styles.menuItem,
                backgroundColor: active === item ? "#6f42c1" : "transparent",
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
        </header>

        <section style={styles.content}>
          {active === "Home" && (
            <p>
              Welcome Social Justice Council! Manage community cases and communicate decisions.
            </p>
          )}
          {active === "Verify Cases" && (
            <p>Review and verify community cases submitted for consideration.</p>
          )}
          {active === "Write Letters" && (
            <p>Prepare official letters to inform the concerned individuals.</p>
          )}
          {active === "Reports" && (
            <p>View reports on cases and council activities.</p>
          )}
          {active === "Settings" && (
            <p>Update your profile and system preferences here.</p>
          )}
          {active === "Logout" && (
            <p>You have logged out successfully. (Add redirect logic later.)</p>
          )}
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
    color: "#6f42c1",
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

export default SocialJusticeDashboard;
