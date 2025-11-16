import React from "react";

const SidebarItem = ({ item, active, setActive }) => {
  const isActive = active === item;
  
  return (
    <div
      style={{
        ...styles.menuItem,
        backgroundColor: isActive ? "#3498db" : "transparent",
        color: isActive ? "#fff" : "#bdc3c7",
        borderLeft: isActive ? "4px solid #2980b9" : "4px solid transparent",
      }}
      onClick={() => setActive(item)}
    >
      {getIcon(item)} {item}
    </div>
  );
};

const getIcon = (item) => {
  switch (item) {
    case "Home":
      return "🏠";
    case "Evaluate Performance":
      return "📊";
    case "Review Reports":
      return "📋";
    case "Settings":
      return "⚙️";
    case "Logout":
      return "🚪";
    default:
      return "📄";
  }
};

const styles = {
  menuItem: {
    padding: "15px 20px",
    marginBottom: "8px",
    borderRadius: "0 8px 8px 0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

export default SidebarItem;