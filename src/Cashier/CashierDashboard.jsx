import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaMoneyBillWave, FaReceipt, FaFileInvoiceDollar, FaCreditCard, FaUserCircle, FaSignOutAlt, FaMoneyBill } from "react-icons/fa";
import CashierOverview from "./CashierOverview";

function CashierDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt, path: "/cashier" },
    { id: "payment-processing", label: "Payment Processing", icon: FaMoneyBillWave, path: "/cashier/payment-processing" },
    { id: "receipt-management", label: "Receipt Management", icon: FaReceipt, path: "/cashier/receipt-management" },
    { id: "financial-reports", label: "Financial Reports", icon: FaFileInvoiceDollar, path: "/cashier/financial-reports" },
    { id: "payment-types", label: "Payment Types", icon: FaCreditCard, path: "/cashier/payment-types" },
    { id: "profile", label: "My Profile", icon: FaUserCircle, path: "/cashier/profile" },
    { id: "logout", label: "Sign Out", icon: FaSignOutAlt, path: "/login" }
  ];

  const getActiveLabel = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : "Dashboard";
  };

  const handleNavigation = (path) => {
    if (path === "/login") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
            <FaMoneyBillWave />
            Cashier Portal
          </h2>
          <p className="text-sm text-gray-500 mt-1">Kebele Management System</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon className={isActive ? 'text-green-600' : 'text-gray-500'} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              CU
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm">Cashier User</p>
              <p className="text-xs text-gray-500">Last login: Today 08:30 AM</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{getActiveLabel()}</h1>
          <p className="text-gray-600">Cashier Management System</p>
        </header>

        <Routes>
          <Route path="/" element={<CashierOverview />} />
          <Route path="/payment-processing" element={<PaymentProcessing />} />
          <Route path="/financial-reports" element={<FinancialReports />} />
          <Route path="/receipt-management" element={<ReceiptManagement />} />
          <Route path="/payment-types" element={<PaymentTypes />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

// PaymentProcessing Component - Defined locally
const PaymentProcessing = () => {
  const paymentTypes = [
    { id: "id-card", name: "ID Card Payments", amount: 50, description: "Process ID card application fees" },
    { id: "certificates", name: "Certificate Payments", amount: 25, description: "Birth, marriage, and other certificates" },
    { id: "house-rent", name: "House Rent Collection", amount: 500, description: "Monthly house rent payments" },
    { id: "clearance", name: "Clearance Fees", amount: 40, description: "Residential clearance processing" },
    { id: "other", name: "Other Services", amount: 100, description: "Miscellaneous service payments" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Processing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentTypes.map((type) => (
          <div key={type.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-green-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaMoneyBill className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{type.name}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">{type.description}</p>
            <p className="text-lg font-bold text-green-600 mb-4">ETB {type.amount}</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
              Process Payment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Other components remain the same...
const FinancialReports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Reports</h2>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            Export Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            Print Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-800">ETB 2,456,000</p>
            <p className="text-xs text-blue-600">This quarter</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Successful Transactions</p>
            <p className="text-2xl font-bold text-green-800">1,248</p>
            <p className="text-xs text-green-600">98.5% success rate</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-600">Average Transaction</p>
            <p className="text-2xl font-bold text-purple-800">ETB 1,968</p>
            <p className="text-xs text-purple-600">Per transaction</p>
          </div>
        </div>

        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Detailed financial reports will be generated here</p>
          <p className="text-sm text-gray-400 mt-2">Select date range and click export to generate reports</p>
        </div>
      </div>
    </div>
  );
};

const ReceiptManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Receipt Management</h2>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <FaMoneyBillWave />
            Generate New Receipt
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            Reprint Receipt
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Void Transaction
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Receipts</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">Receipt #R00{item}</p>
                  <p className="text-sm text-gray-600">ETB 150 • Jan 15, 2024</p>
                </div>
                <button className="text-green-600 hover:text-green-800 font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentTypes = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaMoneyBill className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Cash Payments</h3>
              <p className="text-sm text-gray-600">Physical currency transactions</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">Process cash transactions and generate physical receipts for immediate customer service.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800 font-medium">Most common payment method</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCreditCard className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Digital Payments</h3>
              <p className="text-sm text-gray-600">Mobile banking & digital wallets</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">Handle mobile banking, CBE Birr, Telebirr, and other digital wallet transactions with instant verification.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium">Growing popularity</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaFileInvoiceDollar className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Bank Transfers</h3>
              <p className="text-sm text-gray-600">Direct bank transactions</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">Process bank transfer payments with reference number verification and manual confirmation procedures.</p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-sm text-purple-800 font-medium">For large transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
      <div className="max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              defaultValue="Cashier User" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              defaultValue="cashier@kebele.gov.et" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              defaultValue="+251 91 234 5678" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              defaultValue="Senior Cashier" 
              readOnly
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashierDashboard;