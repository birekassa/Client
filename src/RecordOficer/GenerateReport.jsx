// src/components/recordOfficer/GenerateReport.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  FaChartBar, FaCalendarAlt, FaFilePdf, FaFileExcel, FaPrint, FaDownload, FaUsers, FaHome, FaIdCard, FaMale, FaFemale
} from 'react-icons/fa';

const GenerateReport = () => {
  const [reportType, setReportType] = useState('population');
  const [dateRange, setDateRange] = useState('last30days');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample Data (Replace with API in production)
  const populationData = [
    { name: 'ወንድ', value: 2850, fill: '#3b82f6' },
    { name: 'ሴት', value: 3120, fill: '#ec4899' }
  ];

  const registrationTrend = [
    { month: 'መስከረም', count: 145 },
    { month: 'ጥቅምት', count: 189 },
    { month: 'ህዳር', count: 210 },
    { month: 'ታህሳስ', count: 198 },
    { month: 'ጥር', count: 175 }
  ];

  const housingData = [
    { zone: 'ዞን 01', houses: 420, residents: 1850 },
    { zone: 'ዞን 02', houses: 380, residents: 1720 },
    { zone: 'ዞን 03', houses: 450, residents: 2010 },
    { zone: 'ዞን 04', houses: 390, residents: 1680 }
  ];

  const demographicData = [
    { age: '0-18', male: 820, female: 790 },
    { age: '19-35', male: 1050, female: 1180 },
    { age: '36-50', male: 680, female: 720 },
    { age: '51+', male: 300, female: 430 }
  ];

  const reportTypes = [
    { value: 'population', label: 'የሕዝብ ብዛት ስታቲስቲክስ', icon: FaUsers },
    { value: 'housing', label: 'የቤት ሪፖርት', icon: FaHome },
    { value: 'registration', label: 'የመመዝገቢያ ማጠቃለያ', icon: FaIdCard },
    { value: 'demographics', label: 'የህዝብ ትንታኔ', icon: FaChartBar }
  ];

  const handleExport = (format) => {
    setLoading(true);
    setTimeout(() => {
      alert(`${format.toUpperCase()} ሪፖርት ተዘጋጅቷል!`);
      setLoading(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getReportTitle = () => {
    const type = reportTypes.find(t => t.value === reportType);
    return type ? type.label : 'ሪፖርት';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 p-6 print:bg-white print:p-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100 print:border-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-xl print:hidden">
                  <FaChartBar className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">ሪፖርት ማመንጨት</h1>
                  <p className="text-gray-600 mt-1">Generate Report - Woldia Kebele Administration</p>
                </div>
              </div>
              <div className="text-right print:hidden">
                <p className="text-sm text-gray-500">ቀን: {format(new Date(), 'dd MMMM yyyy')}</p>
                <p className="text-sm text-gray-500">ጊዜ: {format(new Date(), 'hh:mm a')}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-gray-200 print:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">የሪፖርት አይነት</label>
                <div className="grid grid-cols-2 gap-3">
                  {reportTypes.map(type => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setReportType(type.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          reportType === type.value
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        <Icon className="text-xl" />
                        <span className="font-medium">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FaCalendarAlt /> የጊዜ ክልል
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="today">ዛሬ</option>
                  <option value="last7days">ያለፉት 7 ቀናት</option>
                  <option value="last30days">ያለፉት 30 ቀናት</option>
                  <option value="thisMonth">በዚህ ወር</option>
                  <option value="lastMonth">ባለፈው ወር</option>
                  <option value="custom">ብጁ ክልል</option>
                </select>
              </div>

              {dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl"
                    placeholder="ጀምር"
                  />
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl"
                    placeholder="ጨርስ"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => handleExport('pdf')}
                disabled={loading}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
              >
                <FaFilePdf /> PDF
              </button>
              <button
                onClick={() => handleExport('excel')}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
              >
                <FaFileExcel /> Excel
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all print:hidden"
              >
                <FaPrint /> አትም
              </button>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <div className="mb-8 print:mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{getReportTitle()}</h2>
              <p className="text-gray-600">
                ከ {dateRange === 'custom' ? `${customStart} እስከ ${customEnd}` : dateRange === 'today' ? 'ዛሬ' : dateRange === 'last7days' ? 'ያለፉት 7 ቀናት' : dateRange === 'last30days' ? 'ያለፉት 30 ቀናት' : dateRange}
              </p>
            </div>

            {/* Population Report */}
            {reportType === 'population' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">ጠቅላላ ህዝብ</p>
                        <p className="text-3xl font-bold">5,970</p>
                      </div>
                      <FaUsers className="text-4xl opacity-80" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">ወንድ</p>
                        <p className="text-3xl font-bold">2,850</p>
                      </div>
                      <FaMale className="text-4xl opacity-80" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100">ሴት</p>
                        <p className="text-3xl font-bold">3,120</p>
                      </div>
                      <FaFemale className="text-4xl opacity-80" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-800 mb-4">በፆታ መሰረት</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={populationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {populationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-800 mb-4">የመመዝገቢያ አዝማሚያ</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={registrationTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Housing Report */}
            {reportType === 'housing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {housingData.map((zone, i) => (
                    <div key={i} className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-5 rounded-xl">
                      <p className="text-teal-100 text-sm">{zone.zone}</p>
                      <p className="text-2xl font-bold">{zone.houses}</p>
                      <p className="text-teal-100 text-xs">ቤቶች / {zone.residents} ነዋሪዎች</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-4">በዞን የቤት ስርጭት</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={housingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="zone" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="houses" fill="#14b8a6" />
                      <Bar dataKey="residents" fill="#06b6d4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Registration Summary */}
            {reportType === 'registration' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
                    <p className="text-indigo-100">በዚህ ወር</p>
                    <p className="text-3xl font-bold">198</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                    <p className="text-purple-100">ያለፈው ወር</p>
                    <p className="text-3xl font-bold">175</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                    <p className="text-orange-100">አማካኝ/ቀን</p>
                    <p className="text-3xl font-bold">6.6</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={registrationTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Demographics */}
            {reportType === 'demographics' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-4">በእድሜ ቡድን</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={demographicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#3b82f6" />
                      <Bar dataKey="female" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

         
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page { margin: 1cm; }
          body { -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default GenerateReport;