import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaFileInvoiceDollar,
  FaCreditCard
} from "react-icons/fa";

const CashierOverview = () => {
  // Mock data for charts and reports
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
    { name: "ID Card", value: 45, color: "#0088FE" },
    { name: "Certificates", value: 25, color: "#00C49F" },
    { name: "House Rent", value: 20, color: "#FFBB28" },
    { name: "Other Services", value: 10, color: "#FF8042" }
  ];

  const monthlyTrendData = [
    { month: "Jan", revenue: 450000, target: 500000 },
    { month: "Feb", revenue: 520000, target: 500000 },
    { month: "Mar", revenue: 480000, target: 500000 },
    { month: "Apr", revenue: 610000, target: 550000 },
    { month: "May", revenue: 580000, target: 550000 },
    { month: "Jun", revenue: 650000, target: 600000 }
  ];

  const recentTransactions = [
    { id: "T001", customer: "Alemu Bekele", type: "ID Card", amount: 50, date: "2024-01-15", status: "Completed" },
    { id: "T002", customer: "Meron Tesfaye", type: "Birth Certificate", amount: 25, date: "2024-01-15", status: "Completed" },
    { id: "T003", customer: "Kebede Hailu", type: "House Rent", amount: 500, date: "2024-01-14", status: "Completed" },
    { id: "T004", customer: "Sara Mohammed", type: "Marriage Cert", amount: 30, date: "2024-01-14", status: "Pending" },
    { id: "T005", customer: "Daniel Girma", type: "Clearance", amount: 40, date: "2024-01-13", status: "Completed" }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.dataKey === 'revenue' ? `ETB ${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, icon: Icon, trend, description, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-${trend.isPositive ? 'green' : 'red'}-600 text-sm mt-2`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value} {trend.unit || '%'} {trend.from}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 bg-${color}-50 rounded-lg`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Revenue"
          value="ETB 18,200"
          icon={FaMoneyBillWave}
          trend={{ isPositive: true, value: 12, from: "from yesterday" }}
          description="52 transactions today"
          color="green"
        />
        
        <StatCard
          title="Total Transactions"
          value="52"
          icon={FaReceipt}
          trend={{ isPositive: true, value: 8, from: "from yesterday", unit: 'more' }}
          description="Today's count"
          color="blue"
        />
        
        <StatCard
          title="Pending Receipts"
          value="3"
          icon={FaFileInvoiceDollar}
          trend={{ isPositive: false, value: 2, from: "awaiting processing", unit: '' }}
          description="Require attention"
          color="yellow"
        />
        
        <StatCard
          title="Monthly Target"
          value="85%"
          icon={FaCreditCard}
          trend={{ isPositive: true, value: 15, from: "of target achieved" }}
          description="ETB 650K/765K"
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue (ETB)" fill="#8884d8" />
                <Bar dataKey="transactions" name="Transactions" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
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
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue vs Target</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Actual Revenue" />
              <Area type="monotone" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Revenue Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-600 mt-1">Latest payment activities</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ETB {transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
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