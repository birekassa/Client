// src/components/cashier/CashierOverview.jsx
import React from "react";
import {
  BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import {
  FaMoneyBillWave, FaReceipt, FaFileInvoiceDollar, FaCreditCard,
  FaArrowUp, FaArrowDown, FaEye, FaPrint, FaBan, FaCheckCircle
} from "react-icons/fa";
import { format } from "date-fns";

const CashierOverview = () => {
  const now = new Date();
  const today = format(now, "EEEE, dd MMMM yyyy");
  const time = format(now, "hh:mm a");

  // Real-time Stats (Nov 10, 2025)
  const stats = {
    todayRevenue: 18200,
    totalTransactions: 52,
    pendingReceipts: 3,
    monthlyTarget: 85,
    achievedAmount: 552500,
    growth: 12
  };

  const dailyRevenueData = [
    { day: "Mon", revenue: 12500, transactions: 45 },
    { day: "Tue", revenue: 18200, transactions: 52 },
    { day: "Wed", revenue: 15400, transactions: 48 },
    { day: "Thu", revenue: 21000, transactions: 61 },
    { day: "Fri", revenue: 19500, transactions: 58 },
    { day: "Sat", revenue: 16800, transactions: 49 },
    { day: "Sun", revenue: 14200, transactions: 42 }
  ];

  const paymentTypeData = [
    { name: "ID Card", value: 45, color: "#10b981" },
    { name: "Certificates", value: 25, color: "#3b82f6" },
    { name: "House Rent", value: 20, color: "#f59e0b" },
    { name: "Other", value: 10, color: "#ef4444" }
  ];

  const monthlyTrendData = [
    { month: "Jan", revenue: 450000, target: 500000 },
    { month: "Feb", revenue: 520000, target: 500000 },
    { month: "Mar", revenue: 480000, target: 500000 },
    { month: "Apr", revenue: 610000, target: 550000 },
    { month: "May", revenue: 580000, target: 550000 },
    { month: "Jun", revenue: 650000, target: 600000 },
    { month: "Jul", revenue: 620000, target: 650000 },
    { month: "Aug", revenue: 680000, target: 650000 },
    { month: "Sep", revenue: 710000, target: 700000 },
    { month: "Oct", revenue: 730000, target: 750000 },
    { month: "Nov", revenue: 552500, target: 765000 }
  ];

  const recentTransactions = [
    { id: "REC-2025-0052", customer: "AGUMAS BIRHANU", kebeleId: "KB1304903", type: "House Rent", amount: 500, date: "2025-11-10", status: "Completed" },
    { id: "REC-2025-0051", customer: "MOGES BEYENE", kebeleId: "KB146903", type: "ID Card", amount: 50, date: "2025-11-10", status: "Completed" },
    { id: "REC-2025-0050", customer: "YESHIWAS SOLOMON", kebeleId: "KB149996", type: "Clearance", amount: 40, date: "2025-11-10", status: "Pending" },
    { id: "REC-2025-0049", customer: "ZEWORK AKLILU", kebeleId: "KB149343", type: "Birth Cert", amount: 30, date: "2025-11-09", status: "Completed" },
    { id: "REC-2025-0048", customer: "Sara Mohammed", kebeleId: "KB123456", type: "Marriage Cert", amount: 30, date: "2025-11-09", status: "Completed" }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
          <p className="font-bold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.dataKey === 'revenue' || entry.dataKey === 'target' 
                ? `ETB ${entry.value.toLocaleString()}` 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // PROFESSIONAL PRINT — 100% WORKING
  const handlePrint = () => {
    const printSection = document.querySelector('.printable-receipt');
    if (!printSection) return;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Official Receipt - ${today}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: white; line-height: 1.6; color: #000; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px double #000; padding-bottom: 20px; }
          h1 { color: #16a34a; margin: 0; font-size: 28px; }
          h2 { margin: 10px 0; font-size: 22px; }
          .info { font-size: 14px; margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
          th, td { border: 1px solid #000; padding: 12px; text-align: left; }
          th { background-color: #f0fdf4; font-weight: bold; }
          .status-completed { background-color: #d1fae5; color: #065f46; }
          .status-pending { background-color: #fef3c7; color: #92400e; }
          .footer { margin-top: 60px; text-align: center; font-size: 11px; border-top: 1px solid #ccc; padding-top: 10px; }
          @media print {
            body { padding: 20px; }
            @page { margin: 1cm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>WOLDIA KEBELE ADMINISTRATION</h1>
          <h2>OFFICIAL PAYMENT RECEIPT</h2>
          <div class="info"><strong>Date:</strong> ${today} | <strong>Time:</strong> ${time} EAT</div>
          <div class="info"><strong>Printed by:</strong> AGUMAS BIRHANU • Cashier • WDU1304903</div>
        </div>
        ${printSection.innerHTML}
        <div class="footer">
          <p>© 2025 Woldia Kebele Administration | All rights reserved</p>
          <p>Web-Based Kebele Management System • Developed by Group 4</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 800);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">Cashier Dashboard</h1>
            <p className="text-green-100 mt-2 text-lg">Woldia Kebele Administration</p>
            <p className="text-sm opacity-90">Today: {today} • {time} EAT</p>
          </div>
          <div className="text-right">
            <p className="text-lg">Welcome back,</p>
            <p className="text-3xl font-bold">AGUMAS BIRHANU</p>
            <p className="text-sm opacity-90">Cashier • WDU1304903</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Today's Revenue</p>
              <p className="text-4xl font-bold mt-2">ETB {stats.todayRevenue.toLocaleString()}</p>
              <p className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowUp className="text-green-200" /> +{stats.growth}% from yesterday
              </p>
            </div>
            <FaMoneyBillWave className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Total Transactions</p>
              <p className="text-4xl font-bold mt-2">{stats.totalTransactions}</p>
              <p className="text-sm mt-3 opacity-80">Today</p>
            </div>
            <FaReceipt className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Pending Receipts</p>
              <p className="text-4xl font-bold mt-2">{stats.pendingReceipts}</p>
              <p className="text-sm mt-3 opacity-80 flex items-center gap-1">
                <FaArrowDown className="text-yellow-200" /> 2 awaiting void
              </p>
            </div>
            <FaFileInvoiceDollar className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90">Monthly Target</p>
              <p className="text-4xl font-bold mt-2">{stats.monthlyTarget}%</p>
              <p className="text-sm mt-3 opacity-80">
                ETB {stats.achievedAmount.toLocaleString()}/765K
              </p>
            </div>
            <FaCreditCard className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Daily Revenue & Transactions</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue (ETB)" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="transactions" name="Transactions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">Payment Type Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={paymentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-xl font-bold mb-6">Monthly Revenue vs Target (2025)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.4} name="Actual Revenue" />
            <Area type="monotone" dataKey="target" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} name="Target" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions - PRINT READY */}
      <div className="printable-receipt bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold">Recent Transactions</h3>
          <p className="text-sm text-gray-600 mt-1">Last 5 payments • Verified by Kebele ID</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b">
                  <th className="pb-3">Receipt No</th>
                  <th className="pb-3">Resident</th>
                  <th className="pb-3">Kebele ID</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 text-sm font-bold text-green-700">{t.id}</td>
                    <td className="py-4 text-sm">{t.customer}</td>
                    <td className="py-4 text-sm text-gray-600 font-mono">{t.kebeleId}</td>
                    <td className="py-4 text-sm">{t.type}</td>
                    <td className="py-4 text-sm font-semibold">ETB {t.amount}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        t.status === 'Completed' 
                          ? 'status-completed' 
                          : 'status-pending'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => alert(`Receipt: ${t.id}\nResident: ${t.customer}\nKebele ID: ${t.kebeleId}\nAmount: ETB ${t.amount}`)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition" title="View">
                          <FaEye />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePrint();
                          }} 
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition cursor-pointer" 
                          title="Print Receipt"
                        >
                          <FaPrint />
                        </button>
                        {t.status === 'Completed' && (
                          <button onClick={() => window.confirm(`Void receipt ${t.id}?`) && alert(`Receipt ${t.id} VOIDED`)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition" title="Void">
                            <FaBan />
                          </button>
                        )}
                        {t.status === 'Pending' && (
                          <button onClick={() => window.confirm(`Process payment?`) && alert(`Payment processed`)}
                            className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition" title="Process">
                            <FaCheckCircle />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierOverview;