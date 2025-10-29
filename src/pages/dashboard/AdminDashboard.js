import React, { useState } from "react";

function AdminDashboard() {
  const [active, setActive] = useState("Home");

  const menuItems = [
    "Home",
    "Manage Users",
    "Create Account",
    "System Settings",
    "Reports",
    "Logout",
  ];

  return (
    <div style={styles.container}>
      {/* 🟦 Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Kebele Admin</h2>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item}
              style={{
                ...styles.menuItem,
                backgroundColor:
                  active === item ? "#007bff" : "transparent",
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
            <p>Welcome Admin! Use the sidebar to manage the kebele system.</p>
          )}
          {active === "Manage Users" && (
            <p>Here you can add, edit, and remove user accounts.</p>
          )}
          {active === "Create Account" && (
            <p>Fill in details to create a new user account.</p>
          )}
          {active === "System Settings" && (
            <p>Adjust system configurations and preferences here.</p>
          )}
          {active === "Reports" && (
            <p>View all system activity and performance reports.</p>
          )}
          {active === "Logout" && (
            <p>You have logged out successfully. (You can add navigation logic later.)</p>
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
    color: "#007bff",
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

export default AdminDashboard;
