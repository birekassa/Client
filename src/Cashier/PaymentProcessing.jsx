// src/Cashier/PaymentProcessing.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  FaMoneyBillWave, FaReceipt, FaCheckCircle, FaClock,
  FaSearch, FaFilter, FaPrint, FaDownload, FaUser,
  FaHome, FaIdCard, FaCalendar, FaDollarSign,
  FaCreditCard, FaMobile, FaBuilding
} from 'react-icons/fa';

const PaymentProcessing = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock data for payment requests from Register Office
  const [paymentRequests, setPaymentRequests] = useState([
    {
      id: 'PAY-001',
      residentId: 'RES-2025-001',
      residentName: 'MESERET KEBEDE',
      nationalId: '1234567890',
      houseNumber: 'H-124',
      requestDate: '2024-01-15',
      paymentDate: '2024-01-16',
      amount: 250,
      serviceType: 'New Resident Registration',
      status: 'pending',
      requestedBy: 'Record Officer - Alemayehu',
      contactPhone: '+251-91-777-8888',
      urgency: 'high',
      paymentMethod: '',
      transactionId: '',
      receiptNumber: ''
    },
    {
      id: 'PAY-002',
      residentId: 'RES-2025-002',
      residentName: 'TEWODROS MULATU',
      nationalId: '0987654321',
      houseNumber: 'H-089',
      requestDate: '2024-01-14',
      paymentDate: '2024-01-16',
      amount: 150,
      serviceType: 'Family Registration',
      status: 'pending',
      requestedBy: 'Record Officer - Sofia',
      contactPhone: '+251-92-999-0000',
      urgency: 'medium',
      paymentMethod: '',
      transactionId: '',
      receiptNumber: ''
    },
    {
      id: 'PAY-003',
      residentId: 'RES-2025-003',
      residentName: 'ELENI GIRMA',
      nationalId: '1122334455',
      houseNumber: 'H-067',
      requestDate: '2024-01-13',
      paymentDate: '2024-01-15',
      amount: 100,
      serviceType: 'Student Registration',
      status: 'completed',
      requestedBy: 'Record Officer - Daniel',
      contactPhone: '+251-93-888-7777',
      urgency: 'low',
      paymentMethod: 'Cash',
      transactionId: 'TXN-789012',
      receiptNumber: 'RC-2025-003'
    },
    {
      id: 'PAY-004',
      residentId: 'RES-2025-004',
      residentName: 'ABEBE BIKILA',
      nationalId: '5566778899',
      houseNumber: 'H-045',
      requestDate: '2024-01-16',
      paymentDate: '2024-01-16',
      amount: 200,
      serviceType: 'Business Registration',
      status: 'processing',
      requestedBy: 'Record Officer - Hanna',
      contactPhone: '+251-94-111-2222',
      urgency: 'high',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-345678',
      receiptNumber: 'RC-2025-004'
    }
  ]);

  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: '',
    transactionId: '',
    receiptNumber: '',
    notes: ''
  });

  const filteredPayments = paymentRequests.filter(payment => {
    const matchesSearch = payment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.residentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.houseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' ? true : payment.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleProcessPayment = (payment) => {
    setSelectedPayment(payment);
    setPaymentForm({
      paymentMethod: payment.paymentMethod || '',
      transactionId: payment.transactionId || '',
      receiptNumber: payment.receiptNumber || '',
      notes: ''
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Update payment status
    setPaymentRequests(prev => 
      prev.map(payment => 
        payment.id === selectedPayment.id 
          ? { 
              ...payment, 
              status: 'completed',
              paymentMethod: paymentForm.paymentMethod,
              transactionId: paymentForm.transactionId,
              receiptNumber: paymentForm.receiptNumber,
              paymentDate: format(new Date(), 'yyyy-MM-dd')
            }
          : payment
      )
    );

    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200',
      processing: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
      completed: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200'
    };
    return `px-4 py-2 rounded-full text-sm font-semibold border ${styles[status]}`;
  };

  const getUrgencyBadge = (urgency) => {
    const styles = {
      high: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
      medium: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
      low: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200'
    };
    return `px-3 py-1 rounded-full text-xs font-semibold border ${styles[urgency]}`;
  };

  const stats = {
    pending: paymentRequests.filter(p => p.status === 'pending').length,
    processing: paymentRequests.filter(p => p.status === 'processing').length,
    completed: paymentRequests.filter(p => p.status === 'completed').length,
    total: paymentRequests.length,
    totalAmount: paymentRequests.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <FaMoneyBillWave className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-emerald-700 bg-clip-text text-transparent">
                  የክፍያ ሂደት
                </h1>
                <p className="text-gray-600 mt-1 font-medium">Woldia Kebele Administration - Cashier</p>
              </div>
            </div>
            <div className="text-right bg-white/50 rounded-xl p-3 border border-gray-100">
              <p className="text-sm text-gray-600 font-medium">ቀን: {format(new Date(), 'dd MMMM yyyy')}</p>
              <p className="text-sm text-gray-600 font-medium">ጊዜ: {format(new Date(), 'hh:mm a')}</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200/50">
              <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
              <div className="text-sm font-semibold text-amber-700">በጥበቃ</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200/50">
              <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
              <div className="text-sm font-semibold text-blue-700">በሂደት</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200/50">
              <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
              <div className="text-sm font-semibold text-emerald-700">የተጠናቀቀ</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200/50">
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-sm font-semibold text-purple-700">ጠቅላላ</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200/50">
              <div className="text-2xl font-bold text-green-600">${stats.totalAmount}</div>
              <div className="text-sm font-semibold text-green-700">ጠቅላላ ክፍያ</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="በነዋሪ ስም፣ ቁጥር ወይም ቤት ቁጥር ይፈልጉ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-gradient-to-r from-gray-100 to-blue-100 p-2 rounded-2xl border border-gray-200/50">
              {[
                { key: 'pending', label: 'በጥበቃ', icon: FaClock, count: stats.pending },
                { key: 'processing', label: 'በሂደት', icon: FaReceipt, count: stats.processing },
                { key: 'completed', label: 'የተጠናቀቀ', icon: FaCheckCircle, count: stats.completed },
                { key: 'all', label: 'ሁሉም', icon: FaFilter, count: stats.total }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.key 
                      ? "bg-white text-blue-700 shadow-lg border border-blue-200/50 transform scale-105" 
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/70 hover:scale-105"
                  }`}
                >
                  <tab.icon className={activeTab === tab.key ? 'text-blue-600' : 'text-gray-500'} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Requests List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <FaReceipt className="text-white text-xl" />
            </div>
            የክፍያ ጥያቄዎች
          </h2>

          <div className="space-y-6">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="bg-gradient-to-r from-white to-gray-50/80 rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-800 transition-colors">
                          {payment.residentName}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{payment.residentId}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={getStatusBadge(payment.status)}>
                          {payment.status}
                        </span>
                        <span className={getUrgencyBadge(payment.urgency)}>
                          {payment.urgency}
                        </span>
                        <div className="text-2xl font-bold text-green-600">
                          ${payment.amount}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                      <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 border border-gray-100">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FaIdCard className="text-blue-600 text-sm" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">መታወቂያ</div>
                          <div className="font-semibold text-gray-800">{payment.nationalId}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 border border-gray-100">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FaHome className="text-green-600 text-sm" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">ቤት ቁጥር</div>
                          <div className="font-semibold text-gray-800">{payment.houseNumber}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 border border-gray-100">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FaUser className="text-purple-600 text-sm" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">የጠየቀ</div>
                          <div className="font-semibold text-gray-800">{payment.requestedBy}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3 border border-gray-100">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <FaCalendar className="text-orange-600 text-sm" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">ቀን</div>
                          <div className="font-semibold text-gray-800">{payment.requestDate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <p className="text-sm font-semibold text-blue-800 mb-2">የአገልግሎት አይነት</p>
                      <p className="text-gray-700 font-medium">{payment.serviceType}</p>
                    </div>

                    {payment.status === 'completed' && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                          <div className="text-xs text-green-600 font-semibold">የክፍያ ዘዴ</div>
                          <div className="font-medium text-green-800">{payment.paymentMethod}</div>
                        </div>
                        <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                          <div className="text-xs text-green-600 font-semibold">የትራንዛክሽን ቁጥር</div>
                          <div className="font-medium text-green-800">{payment.transactionId}</div>
                        </div>
                        <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                          <div className="text-xs text-green-600 font-semibold">የራሲት ቁጥር</div>
                          <div className="font-medium text-green-800">{payment.receiptNumber}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 ml-6">
                    {payment.status === 'pending' && (
                      <button
                        onClick={() => handleProcessPayment(payment)}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <FaMoneyBillWave className="group-hover:scale-110 transition-transform" />
                        ክፍያ ተቀበል
                      </button>
                    )}
                    {payment.status === 'processing' && (
                      <span className="px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-xl font-semibold border border-blue-300 text-center">
                        በሂደት ላይ...
                      </span>
                    )}
                    {payment.status === 'completed' && (
                      <div className="flex flex-col gap-2">
                        <span className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 rounded-xl font-semibold border border-green-300 text-center">
                          ተጠናቅቋል ✓
                        </span>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-lg font-semibold border border-blue-200 hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                          <FaPrint />
                          ራሲት
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-gray-300">
              <FaReceipt className="mx-auto text-5xl text-gray-300 mb-4" />
              <div className="text-xl font-bold text-gray-700 mb-2">ምንም የክፍያ ጥያቄዎች የሉም</div>
              <p className="text-gray-500">የክፍያ ጥያቄዎች ከምዝገባ ቢሮ እዚህ ይታያሉ</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaMoneyBillWave />
                ክፍያ ተቀበል
              </h2>
              <p className="text-green-100 mt-1">{selectedPayment.residentName} - {selectedPayment.serviceType}</p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">ጠቅላላ መጠን</div>
                  <div className="text-3xl font-bold text-green-600">${selectedPayment.amount}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">የአገልግሎት አይነት</div>
                  <div className="text-lg font-semibold text-gray-800">{selectedPayment.serviceType}</div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <FaCreditCard className="text-blue-600" />
                  የክፍያ ዘዴ *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Cash', 'Bank Transfer', 'Mobile Money', 'Credit Card'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentForm(prev => ({ ...prev, paymentMethod: method }))}
                      className={`p-3 border-2 rounded-xl font-semibold transition-all duration-200 ${
                        paymentForm.paymentMethod === method
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    የትራንዛክሽን ቁጥር
                  </label>
                  <input
                    type="text"
                    value={paymentForm.transactionId}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, transactionId: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="TXN-123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    የራሲት ቁጥር *
                  </label>
                  <input
                    type="text"
                    value={paymentForm.receiptNumber}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, receiptNumber: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="RC-2025-001"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ማስታወሻ
                </label>
                <textarea
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="ማንኛውም ተጨማሪ መረጃ..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  ይቅር
                </button>
                <button
                  type="submit"
                  disabled={!paymentForm.paymentMethod || !paymentForm.receiptNumber}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  ክፍያ አረጋግጥ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;