// src/components/recordOfficer/certificate/CertificateOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCertificate, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle,
  FaChartLine,
  FaUsers,
  FaBuilding
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CertificateOverview = ({ stats }) => {
  const chartData = [
    { name: 'የተረጋገጡ', value: stats.verified, color: '#10B981' },
    { name: 'በመጠባበቅ ላይ', value: stats.pending, color: '#F59E0B' },
    { name: 'የተቀበሩ', value: stats.rejected, color: '#EF4444' }
  ];

  const monthlyData = [
    { month: 'ጃን', birth: 12, marriage: 8 },
    { month: 'ፈብ', birth: 15, marriage: 10 },
    { month: 'ማር', birth: 18, marriage: 12 },
    { month: 'ኤፕር', birth: 14, marriage: 9 },
    { month: 'ሜይ', birth: 20, marriage: 15 },
    { month: 'ጁን', birth: 22, marriage: 18 }
  ];

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        </div>
        <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-').split('-')[0] + '-100'}`}>
          <Icon className={`text-2xl ${color}`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">የሰርተፊኬት አጠቃላይ እይታ</h2>
        <p className="text-gray-600">የቅርብ ጊዜ የስራ አፈጻጸም</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="ጠቅላላ ሰርተፊኬቶች"
          value={stats.total}
          icon={FaCertificate}
          color="text-blue-600"
          description="ከዓመት መጀመሪያ ጀምሮ"
        />
        <StatCard
          title="የተረጋገጡ"
          value={stats.verified}
          icon={FaCheckCircle}
          color="text-green-600"
          description="በማህበራዊ ፍትህ ምክር ቤት"
        />
        <StatCard
          title="በመጠባበቅ ላይ"
          value={stats.pending}
          icon={FaClock}
          color="text-yellow-600"
          description="ለማረጋገጫ በመጠባበቅ ላይ"
        />
        <StatCard
          title="የተቀበሩ"
          value={stats.rejected}
          icon={FaTimesCircle}
          color="text-red-600"
          description="ያልተሟሉ ማስረጃዎች"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaChartLine className="mr-2 text-blue-600" />
            ወርሃዊ እድገት
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="birth" name="የልደት ሰርተፊኬቶች" fill="#3B82F6" />
              <Bar dataKey="marriage" name="የጋብቻ ሰርተፊኬቶች" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaUsers className="mr-2 text-green-600" />
            የሁኔታ ስርጭት
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-2xl text-white"
      >
        <h3 className="text-xl font-bold mb-4">ፈጣን እርምጃዎች</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white text-green-600 py-3 px-4 rounded-xl font-semibold hover:bg-green-50 transition-colors">
            አዲስ ሰርተፊኬት ፍጠር
          </button>
          <button className="bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            ሰርተፊኬቶችን አረጋግጥ
          </button>
          <button className="bg-white text-purple-600 py-3 px-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
            ሪፖርት አውጣ
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateOverview;