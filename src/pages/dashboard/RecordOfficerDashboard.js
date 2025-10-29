import React, { useState } from "react";

function RecordOfficerDashboard() {
  const [active, setActive] = useState("Home");

  const menuItems = [
    "Home",
    "Register Population",
    "Register Houses",
    "Generate Reports",
    "Settings",
    "Logout",
  ];

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
        </header>

        <section style={styles.content}>
          {active === "Home" && (
            <p>Welcome Record Officer! Manage population and housing records efficiently.</p>
          )}
          {active === "Register Population" && (
            <p>Here you can register new residents into the system.</p>
          )}
          {active === "Register Houses" && (
            <p>Record and manage house registrations in the kebele.</p>
          )}
          {active === "Generate Reports" && (
            <p>Generate population, housing, and other related reports.</p>
          )}
          {active === "Settings" && <p>Update your profile or system settings here.</p>}
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
    color: "#17a2b8",
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
