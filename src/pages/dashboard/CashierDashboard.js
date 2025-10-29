import React, { useState } from "react";

function CashierDashboard() {
  const [active, setActive] = useState("Home");

  const menuItems = [
    "Home",
    "Collect Payments",
    "Payment Reports",
    "Settings",
    "Logout",
  ];

  return (
    <div style={styles.container}>
      {/* 🟦 Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>💰 Cashier</h2>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item}
              style={{
                ...styles.menuItem,
                backgroundColor:
                  active === item ? "#28a745" : "transparent",
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
              Welcome Cashier! Use this dashboard to manage payments and reports.
            </p>
          )}
          {active === "Collect Payments" && (
            <p>
              Here you can record new payments from residents.
            </p>
          )}
          {active === "Payment Reports" && (
            <p>
              Generate and view reports for all collected payments.
            </p>
          )}
          {active === "Settings" && (
            <p>Update your cashier account settings here.</p>
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

export default CashierDashboard;
