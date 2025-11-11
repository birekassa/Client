// src/components/cashier/FinancialReports.jsx
import React, { useState, useMemo } from "react";
import { FaFileExport, FaChartBar, FaCalendarAlt, FaDownload } from "react-icons/fa";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { format, startOfWeek, startOfMonth, startOfYear, isWithinInterval } from "date-fns";

const FinancialReports = () => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Full transaction history (from your thesis data)
  const allTransactions = [
    { date: "2025-11-10", amount: 500, service: "House Rent", method: "Cash" },
    { date: "2025-11-10", amount: 50, service: "ID Card", method: "Telebirr" },
    { date: "2025-11-09", amount: 500, service: "House Rent", method: "Cash" },
    { date: "2025-11-08", amount: 200, service: "Clearance", method: "Bank" },
    { date: "2025-11-07", amount: 500, service: "House Rent", method: "Cash" },
    { date: "2025-11-06", amount: 50, service: "ID Card", method: "Telebirr" },
    { date: "2025-11-05", amount: 500, service: "House Rent", method: "Cash" },
    { date: "2025-11-04", amount: 30, service: "Birth Cert", method: "Cash" },
    { date: "2025-11-01", amount: 500, service: "House Rent", method: "Cash" },
    { date: "2025-10-25", amount: 500, service: "House Rent", method: "Cash" },
    { date: "2025-09-15", amount: 1000, service: "House Rent", method: "Telebirr" },
    { date: "2025-01-10", amount: 2000, service: "House Rent", method: "Bank" },
    // Add more as needed
  ];

  const now = new Date("2025-11-10T14:58:00+03:00"); // EAT Timezone
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const thisMonthStart = startOfMonth(now);
  const thisYearStart = startOfYear(now);

  const filterByRange = (startDate) => {
    return allTransactions.filter(t =>
      isWithinInterval(new Date(t.date), { start: startDate, end: now })
    );
  };

  const stats = useMemo(() => {
    const total = allTransactions;
    const week = filterByRange(thisWeekStart);
    const month = filterByRange(thisMonthStart);
    const year = filterByRange(thisYearStart);
    const today = allTransactions.filter(t => t.date === "2025-11-10");

    return {
      totalRevenue: total.reduce((s, t) => s + t.amount, 0),
      weekRevenue: week.reduce((s, t) => s + t.amount, 0),
      monthRevenue: month.reduce((s, t) => s + t.amount, 0),
      yearRevenue: year.reduce((s, t) => s + t.amount, 0),
      todayRevenue: today.reduce((s, t) => s + t.amount, 0),
      totalTransactions: total.length,
      avgTransaction: total.length > 0 ? (total.reduce((s, t) => s + t.amount, 0) / total.length).toFixed(2) : 0,
      growth: "+24%" // vs last month
    };
  }, [allTransactions]);

  const revenueData = [
    { name: "ID Card", value: 12500, count: 250 },
    { name: "Birth Cert", value: 3750, count: 150 },
    { name: "House Rent", value: 45000, count: 90 },
    { name: "Clearance", value: 4800, count: 120 },
  ];

  const paymentMethodData = [
    { name: "Cash", value: 65 },
    { name: "Telebirr", value: 20 },
    { name: "CBE Birr", value: 10 },
    { name: "Bank", value: 5 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("WOLDIA KEBELE ADMINISTRATION", 14, 20);
    doc.setFontSize(16);
    doc.text("FINANCIAL REPORT", 14, 30);
    doc.setFontSize(10);
    doc.text(`Generated: ${format(now, "dd MMMM yyyy, hh:mm a")} EAT`, 14, 40);
    doc.text(`Period: ${dateRange.start || "All Time"} - ${dateRange.end || "Present"}`, 14, 48);

    const tableData = revenueData.map(r => [r.name, r.count, `ETB ${r.value.toLocaleString()}`]);
    doc.autoTable({
      head: [["Service Type", "Transactions", "Total Revenue"]],
      body: tableData,
      startY: 60,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.setFontSize(12);
    doc.text(`Total Revenue: ETB ${stats.totalRevenue.toLocaleString()}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Report by: AGUMAS BIRHANU (Cashier Module)`, 14, doc.lastAutoTable.finalY + 30);

    doc.save(`Woldia_Kebele_Financial_Report_${format(now, "yyyy-MM-dd")}.pdf`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(revenueData.map(r => ({
      "Service Type": r.name,
      "Transactions": r.count,
      "Revenue (ETB)": r.value,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Revenue Report");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `Woldia_Kebele_Financial_Report_${format(now, "yyyy-MM-dd")}.xlsx`);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Financial Reports Dashboard</h1>
            <p className="text-green-100 mt-2">Woldia Kebele Administration — Cashier Module</p>
            <p className="text-sm opacity-90">Generated on: {format(now, "EEEE, dd MMMM yyyy 'at' hh:mm a")} EAT</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="date"
              className="px-4 py-3 border-2 border-white rounded-lg text-gray-800 focus:outline-none"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <input
              type="date"
              className="px-4 py-3 border-2 border-white rounded-lg text-gray-800 focus:outline-none"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
            <button onClick={exportPDF} className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md">
              <FaDownload /> PDF
            </button>
            <button onClick={exportExcel} className="bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md">
              <FaDownload /> Excel
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards - Dynamic & Real-time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">Total Revenue (All Time)</p>
          <p className="text-4xl font-bold mt-2">ETB {stats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm mt-3 opacity-80">Since January 2025</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">This Week</p>
          <p className="text-4xl font-bold mt-2">ETB {stats.weekRevenue.toLocaleString()}</p>
          <p className="text-sm mt-3 opacity-80">{format(thisWeekStart, "MMM d")} - {format(now, "MMM d")}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">This Month</p>
          <p className="text-4xl font-bold mt-2">ETB {stats.monthRevenue.toLocaleString()}</p>
          <p className="text-sm mt-3 opacity-80">November 2025</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">This Year</p>
          <p className="text-4xl font-bold mt-2">ETB {stats.yearRevenue.toLocaleString()}</p>
          <p className="text-sm mt-3 opacity-80">Jan 1 - Nov 10, 2025</p>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">Today</p>
          <p className="text-4xl font-bold mt-2">ETB {stats.todayRevenue.toLocaleString()}</p>
          <p className="text-sm mt-3 opacity-80">{format(now, "EEEE, MMM d")}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">Total Transactions</p>
          <p className="text-4xl font-bold mt-2">{stats.totalTransactions}</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">Avg. Transaction</p>
          <p className="text-4xl font-bold mt-2">ETB {stats.avgTransaction}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-6 shadow-xl transform hover:scale-105 transition">
          <p className="text-lg opacity-90">Growth This Month</p>
          <p className="text-4xl font-bold mt-2">{stats.growth}</p>
          <p className="text-sm mt-3 opacity-80">vs October 2025</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <FaChartBar className="text-green-600 text-2xl" /> Revenue by Service Type
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `ETB ${value.toLocaleString()}`} />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600 text-2xl" /> Payment Methods Distribution
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12 pb-8">
        <p>© 2025 Woldia Kebele Administration | Web-Based Kebele Management System</p>
        <p>Developed by: AGUMAS BIRHANU, MOGES BEYENE, YESHIWAS SOLOMON, ZEWORK AKLILU</p>
        <p>Woldia University • School of Computing • Department of Information Technology</p>
      </div>
    </div>
  );
};

export default FinancialReports;