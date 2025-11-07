// src/pages/Dashboard.js
import React from "react";
import ChairmanDashboard from "./dashboard/ChairmanDashboard";
import RecordOfficerDashboard from "./dashboard/RecordOfficerDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import CashierDashboard from "./dashboard/CashierDashboard";
import SocialJusticeDashboard from "./dashboard/SocialJusticeDashboard";
import KebeleCouncilDashboard from "./dashboard/KebeleCouncilDashboard";

function Dashboard() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "chairman":
      return <ChairmanDashboard />;
    case "recordOfficer":
      return <RecordOfficerDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "cashier":
      return <CashierDashboard />;
    case "socialJustice":
      return <SocialJusticeDashboard />;
    case "kebeleCouncil":
      return <KebeleCouncilDashboard />;
    default:
      return <p>No dashboard found. Please log in again.</p>;
  }
}

export default Dashboard;
