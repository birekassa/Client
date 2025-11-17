import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './KebeleCouncil/LanguageContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import ContactUs from './pages/Contact';
import AboutUs from './pages/About';
import Services from './pages/Services';
import PrivateRoute from './components/PrivateRoute'; 
import AdminDashboard from './AdminFolder/AdminDashboard';
import ChairmanDashboard from './Chairman/ChairmanDashboard';
import RecordOfficerDashboard from './RecordOficer/RecordOfficerDashboard';
import CashierDashboard from './Cashier/CashierDashboard';
import SocialJusticeDashboard from './SocialJustice/SocialJusticeDashboard';
import KebeleCouncilDashboard from './KebeleCouncil/KebeleCouncilDashboard';
import './globals.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          <Router>
            <main style={{ minHeight: "80vh" }}>
              <Routes>
                {/* 🌍 Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/services" element={<Services />} />

                {/* 🧭 Dashboards by Role */}
                <Route
                  path="/admin/*"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chairman/*"
                  element={
                    <PrivateRoute>
                      <ChairmanDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/record-officer/*"
                  element={
                    <PrivateRoute>
                      <RecordOfficerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cashier/*"
                  element={
                    <PrivateRoute>
                      <CashierDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/social-justice/*"
                  element={
                    <PrivateRoute>
                      <SocialJusticeDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/kebele-council/*"
                  element={
                    <PrivateRoute>
                      <KebeleCouncilDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </Router>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;