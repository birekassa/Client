import React, { useState } from "react";
import { 
  FaUsers, 
  FaFileAlt, 
  FaHome, 
  FaMoneyBill, 
  FaChartBar,
  FaDownload,
  FaPrint,
  FaSync,
  FaEye,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaIdCard,
  FaBaby,
  FaRing,
  FaLandmark,
  FaStore
} from "react-icons/fa";
import { useTranslation } from './useTranslation';

const Overview = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const { t, language } = useTranslation();
  
  // Mock data
  const dashboardData = {
    population: {
      total: 13150,
      growth: 2.3,
      byAge: [
        { range: '0-14', count: 3200, percentage: 24.3, color: 'bg-pink-500' },
        { range: '15-24', count: 2800, percentage: 21.3, color: 'bg-blue-500' },
        { range: '25-44', count: 4100, percentage: 31.2, color: 'bg-yellow-500' },
        { range: '45-64', count: 2200, percentage: 16.7, color: 'bg-teal-500' },
        { range: '65+', count: 800, percentage: 6.1, color: 'bg-purple-500' }
      ]
    },
    services: {
      total: 324,
      growth: 15,
      monthly: [45, 52, 38, 65, 72, 58, 75, 68, 82, 65, 78, 85],
      categories: [
        { name: t.idCards || 'ID Cards', count: 125, icon: FaIdCard, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { name: t.birthCertificates || 'Birth Certificates', count: 85, icon: FaBaby, color: 'text-green-600', bgColor: 'bg-green-100' },
        { name: t.marriageCertificates || 'Marriage Certificates', count: 45, icon: FaRing, color: 'text-pink-600', bgColor: 'bg-pink-100' },
        { name: t.landCertificates || 'Land Certificates', count: 52, icon: FaLandmark, color: 'text-amber-600', bgColor: 'bg-amber-100' },
        { name: t.businessLicenses || 'Business Licenses', count: 17, icon: FaStore, color: 'text-purple-600', bgColor: 'bg-purple-100' }
      ]
    },
    revenue: {
      total: 625000,
      growth: 8.7,
      quarterly: [125000, 143000, 168000, 189000],
      sources: [
        { name: t.propertyTax || 'Property Tax', amount: 285000, percentage: 45.6 },
        { name: t.businessFees || 'Business Fees', amount: 156000, percentage: 25.0 },
        { name: t.serviceCharges || 'Service Charges', amount: 124000, percentage: 19.8 },
        { name: t.other || 'Other', amount: 60000, percentage: 9.6 }
      ]
    },
    housing: {
      total: 2847,
      growth: 3.1,
      types: [
        { type: t.residential || 'Residential', count: 2340, percentage: 82.2 },
        { type: t.commercial || 'Commercial', count: 387, percentage: 13.6 },
        { type: t.public || 'Public', count: 120, percentage: 4.2 }
      ]
    }
  };

  const recentRequests = [
    { id: 'REQ-001', type: t.idCards || 'ID Card', applicant: 'Abebe Bikila', date: '2024-01-15', status: t.completed || 'completed', priority: t.normal || 'normal' },
    { id: 'REQ-002', type: t.birthCertificates || 'Birth Certificate', applicant: 'Meskel Haile', date: '2024-01-16', status: t.processing || 'processing', priority: t.high || 'high' },
    { id: 'REQ-003', type: t.landCertificates || 'Land Certificate', applicant: 'Tirunesh Dibaba', date: '2024-01-14', status: t.pending || 'pending', priority: t.normal || 'normal' },
    { id: 'REQ-004', type: t.businessLicenses || 'Business License', applicant: 'Kenenisa Bekele', date: '2024-01-17', status: t.completed || 'completed', priority: t.low || 'low' },
    { id: 'REQ-005', type: t.marriageCertificates || 'Marriage Certificate', applicant: 'Derartu Tulu', date: '2024-01-13', status: t.processing || 'processing', priority: t.normal || 'normal' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      [t.completed]: 'bg-green-100 text-green-800 border-green-200',
      [t.processing]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      [t.pending]: 'bg-red-100 text-red-800 border-red-200'
    };
    return `px-3 py-1 text-xs font-semibold rounded-full border ${styles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      [t.high]: 'bg-red-500',
      [t.normal]: 'bg-blue-500',
      [t.low]: 'bg-gray-400'
    };
    return `w-2 h-2 rounded-full ${styles[priority] || 'bg-gray-400'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{t.kebeleCouncilDashboard || "Kebele Council Dashboard"}</h1>
              <p className="text-blue-100 text-lg">{t.comprehensiveOverview || "Comprehensive overview of administrative operations and community services"}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div className="text-right">
                <p className="text-blue-200">{t.lastUpdated || "Last Updated"}</p>
                <p className="font-semibold">Jan 17, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-1">
          {[t.daily, t.weekly, t.monthly, t.yearly].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Statistical Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Population Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg`}>
              <FaUsers className="text-2xl text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{dashboardData.population.growth}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{t.totalPopulation || "Total Population"}</h3>
          <p className="text-3xl font-bold text-gray-800 mb-4">{dashboardData.population.total.toLocaleString()}</p>
          <div className="flex space-x-1">
            {dashboardData.population.byAge.map((age, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${age.color} transition-all hover:opacity-80`}
                style={{ width: `${age.percentage}%` }}
                title={t.populationCount?.replace('{count}', age.count.toLocaleString()).replace('{percentage}', age.percentage) || `${age.count.toLocaleString()} people (${age.percentage}%)`}
              ></div>
            ))}
          </div>
        </div>

        {/* Service Requests Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg`}>
              <FaFileAlt className="text-2xl text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{dashboardData.services.growth}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{t.serviceRequests || "Service Requests"}</h3>
          <p className="text-3xl font-bold text-gray-800 mb-4">{dashboardData.services.total}</p>
          <div className="flex space-x-1">
            {dashboardData.services.monthly.slice(-6).map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-green-200 rounded-full hover:bg-green-300 transition-colors"
                style={{ height: `${(value / 100) * 8}px` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg`}>
              <FaMoneyBill className="text-2xl text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{dashboardData.revenue.growth}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{t.revenueCollected || "Revenue Collected"}</h3>
          <p className="text-3xl font-bold text-gray-800 mb-4">₦{(dashboardData.revenue.total / 1000).toFixed(0)}K</p>
          <div className="w-full bg-amber-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>

        {/* Housing Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg`}>
              <FaHome className="text-2xl text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{dashboardData.housing.growth}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{t.housingUnits || "Housing Units"}</h3>
          <p className="text-3xl font-bold text-gray-800 mb-4">{dashboardData.housing.total.toLocaleString()}</p>
          <div className="flex space-x-2 text-xs">
            {dashboardData.housing.types.map((type, index) => (
              <div key={index} className="text-center">
                <div className="font-semibold text-gray-800">{type.percentage}%</div>
                <div className="text-gray-500">{type.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Population Distribution Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">{t.populationDistribution || "Population Distribution"}</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <FaDownload />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <FaPrint />
              </button>
            </div>
          </div>
          <div className="h-80">
            <div className="flex items-end justify-between h-64 px-4 bg-gradient-to-b from-blue-50 to-white rounded-xl border">
              {dashboardData.population.byAge.map((age, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div 
                    className={`w-12 lg:w-16 rounded-t-xl transition-all duration-500 hover:shadow-lg ${age.color} relative`}
                    style={{ height: `${(age.count / 5000) * 200}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {t.populationCount?.replace('{count}', age.count.toLocaleString()).replace('{percentage}', age.percentage) || `${age.count.toLocaleString()} people (${age.percentage}%)`}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-2">
                    {t.ageRange?.replace('{range}', age.range) || `${age.range} years`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Categories Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">{t.serviceCategories || "Service Categories"}</h3>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <FaSync />
            </button>
          </div>
          <div className="h-80">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
              {dashboardData.services.categories.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${service.bgColor} ${service.color}`}>
                        <IconComponent className="text-lg" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{service.name}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">{service.count}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${service.bgColor.replace('bg-', 'bg-').replace('-100', '-500')} transition-all duration-1000`}
                        style={{ width: `${(service.count / 324) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Recent Requests Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Sources */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{t.revenueSources || "Revenue Sources"}</h3>
          <div className="space-y-4">
            {dashboardData.revenue.sources.map((source, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{source.name}</span>
                  <span className="text-sm font-bold text-gray-800">₦{(source.amount / 1000).toFixed(0)}K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-1000 group-hover:from-amber-600 group-hover:to-amber-700"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Service Requests */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">{t.recentServiceRequests || "Recent Service Requests"}</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
              <FaEye className="text-sm" />
              <span>{t.viewAll || "View All"}</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t.requestID || "Request ID"}</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t.serviceType || "Service Type"}</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t.applicant || "Applicant"}</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t.date || "Date"}</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t.status || "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentRequests.map((request, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={getPriorityBadge(request.priority)}></div>
                        <span className="font-medium text-gray-900">{request.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{request.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{request.applicant}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-500 text-sm">{request.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={getStatusBadge(request.status)}>{request.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold">{dashboardData.services.categories[0].count}</div>
            <div className="text-blue-200 text-sm">{t.idCardsIssued || "ID Cards Issued"}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98%</div>
            <div className="text-blue-200 text-sm">{t.serviceSatisfaction || "Service Satisfaction"}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24h</div>
            <div className="text-blue-200 text-sm">{t.avgResponseTime || "Avg. Response Time"}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-blue-200 text-sm">{t.activeCases || "Active Cases"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;