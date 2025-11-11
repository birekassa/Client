// src/components/cashier/PaymentProcessing.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaMoneyBillWave, FaPrint, FaSearch, FaUser, FaHome, 
  FaIdCard, FaFileAlt, FaCheckCircle, FaArrowLeft, FaCalendarDay,
  FaBuilding, FaFlag
} from 'react-icons/fa';
import VerifyResident from "./VerifyResident";
import PrintReceiptModal from "./PrintReceiptModal";

const PaymentProcessing = () => {
  // === STATE ===
  const [activeTab, setActiveTab] = useState('new-payment');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [verifiedResident, setVerifiedResident] = useState(null);

  const [paymentData, setPaymentData] = useState({
    customerId: '', customerName: '', serviceType: '', amount: '',
    paymentMethod: 'cash', description: ''
  });

  const [recentPayments, setRecentPayments] = useState([
    {
      id: 'PAY001', customer: 'Alemu Bekele', service: 'ID Card',
      amount: 50, date: '11 Nov 2025, 10:30 AM', status: 'completed',
      receiptNo: 'RCP001', paymentMethod: 'cash'
    }
  ]);

  // === CONFIG ===
  const serviceTypes = [
    { id: 'id-card', name: 'ID Card', amount: 50, icon: FaIdCard, color: 'indigo' },
    { id: 'birth-certificate', name: 'Birth Certificate', amount: 25, icon: FaFileAlt, color: 'green' },
    { id: 'marriage-certificate', name: 'Marriage Certificate', amount: 30, icon: FaFileAlt, color: 'purple' },
    { id: 'clearance', name: 'Clearance Certificate', amount: 40, icon: FaFileAlt, color: 'yellow' },
    { id: 'house-rent', name: 'House Rent', amount: 500, icon: FaHome, color: 'red' },
    { id: 'other', name: 'Other Services', amount: 0, icon: FaMoneyBillWave, color: 'gray' }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: FaMoneyBillWave },
    { id: 'cbe-birr', name: 'CBE Birr', icon: FaMoneyBillWave },
    { id: 'telebirr', name: 'TeleBirr', icon: FaMoneyBillWave }
  ];

  // === EFFECTS ===
  useEffect(() => {
    if (verifiedResident) {
      setPaymentData(prev => ({
        ...prev,
        customerId: verifiedResident.kebeleId,
        customerName: verifiedResident.fullName
      }));
    }
  }, [verifiedResident]);

  // === HANDLERS ===
  const handleServiceSelect = (service) => {
    setSelectedService(service.id);
    setPaymentData(prev => ({
      ...prev,
      serviceType: service.name,
      amount: service.amount
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!verifiedResident) return alert('Verify resident first!');

    const newPayment = {
      id: `PAY${String(recentPayments.length + 1).padStart(3, '0')}`,
      customer: verifiedResident.fullName,
      service: paymentData.serviceType,
      amount: parseFloat(paymentData.amount),
      date: new Date().toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }),
      status: 'completed',
      receiptNo: `RCP${String(recentPayments.length + 1).padStart(3, '0')}`,
      paymentMethod: paymentData.paymentMethod,
      amountWords: numberToWords(parseFloat(paymentData.amount))
    };

    setCurrentReceipt(newPayment);
    setRecentPayments([newPayment, ...recentPayments]);
    setShowReceipt(true);
    setActiveTab('recent-payments');

    setPaymentData({ customerId: '', customerName: '', serviceType: '', amount: '', paymentMethod: 'cash', description: '' });
    setSelectedService('');
  };

  const filteredPayments = recentPayments.filter(p =>
    p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // === RENDER ===
  return (
    <>
      {showReceipt && currentReceipt && (
        <PrintReceiptModal receipt={currentReceipt} onClose={() => setShowReceipt(false)} />
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto p-4 space-y-6">

          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  <FaFlag />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">ወልዲያ ከተማ አስተዳደር</h1>
                  <p className="text-sm text-gray-600">Kebele 03 • Woldia City Administration</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Date: {new Date().toLocaleDateString('en-GB')}</p>
                <p className="text-xs text-gray-500">Time: {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-indigo-700">Payment Processing System</h2>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
            </div>
          </div>

          {/* VERIFICATION */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 shadow-lg">
            <VerifyResident onVerify={setVerifiedResident} />
            {verifiedResident && (
              <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-xl flex items-center gap-3">
                <FaCheckCircle className="text-yellow-400" />
                <span className="font-bold">Verified: {verifiedResident.fullName}</span>
                <span className="text-sm">({verifiedResident.kebeleId})</span>
              </div>
            )}
          </div>

          {/* TABS */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('new-payment')}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                    activeTab === 'new-payment'
                      ? 'bg-indigo-50 text-indigo-700 border-b-4 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  +Add New Payment
                </button>
                <button
                  onClick={() => setActiveTab('recent-payments')}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                    activeTab === 'recent-payments'
                      ? 'bg-indigo-50 text-indigo-700 border-b-4 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Recent Payments ({recentPayments.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* NEW PAYMENT */}
              {activeTab === 'new-payment' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaIdCard className="text-indigo-600" /> Select Service
                    </h3>
                    <div className="space-y-3">
                      {serviceTypes.map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                              selectedService === service.id
                                ? 'border-indigo-600 bg-indigo-50 shadow-md'
                                : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 bg-${service.color}-100 rounded-lg`}>
                                  <Icon className={`text-${service.color}-700`} />
                                </div>
                                <div>
                                  <p className="font-semibold">{service.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {service.amount > 0 ? `ETB ${service.amount}` : 'Custom'}
                                  </p>
                                </div>
                              </div>
                              {selectedService === service.id && <FaCheckCircle className="text-indigo-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h3>
                    <form onSubmit={handleProcessPayment} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Kebele ID</label>
                          <input type="text" value={paymentData.customerId} readOnly className="w-full px-4 py-2 border rounded-xl bg-gray-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name</label>
                          <input type="text" value={paymentData.customerName} readOnly className="w-full px-4 py-2 border rounded-xl bg-gray-50" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Service</label>
                          <input type="text" value={paymentData.serviceType} readOnly className="w-full px-4 py-2 border rounded-xl bg-gray-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Amount (ETB)</label>
                          <input
                            type="number" name="amount" value={paymentData.amount}
                            onChange={handleInputChange} required min="1"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Payment Method</label>
                        <div className="grid grid-cols-3 gap-3">
                          {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            return (
                              <label
                                key={method.id}
                                className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                                  paymentData.paymentMethod === method.id
                                    ? 'border-indigo-600 bg-indigo-50'
                                    : 'border-gray-200 hover:border-indigo-300'
                                }`}
                              >
                                <input type="radio" name="paymentMethod" value={method.id} checked={paymentData.paymentMethod === method.id} onChange={handleInputChange} />
                                <div className="flex items-center gap-2 ml-2">
                                  <Icon className="text-gray-700" />
                                  <span className="font-medium">{method.name}</span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={!verifiedResident || !paymentData.serviceType}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <FaMoneyBillWave /> PROCESS & PRINT RECEIPT
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('recent-payments')}
                          className="px-6 py-3 border-2 border-indigo-600 text-indigo-700 rounded-xl hover:bg-indigo-50 flex items-center gap-2 font-medium"
                        >
                          <FaArrowLeft /> View Recent
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* RECENT PAYMENTS */}
              {activeTab === 'recent-payments' && (
                <div>
                  <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full">
                      <thead className="bg-indigo-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase">Receipt</th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase">Service</th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredPayments.map((p) => (
                          <tr key={p.id} className="hover:bg-indigo-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-indigo-700">{p.receiptNo}</td>
                            <td className="px-6 py-4">{p.customer}</td>
                            <td className="px-6 py-4">{p.service}</td>
                            <td className="px-6 py-4 font-bold text-green-600">ETB {p.amount}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{p.date}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => { setCurrentReceipt(p); setShowReceipt(true); }}
                                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                              >
                                <FaPrint /> Reprint
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Today's Revenue", value: "ETB 18,200", icon: FaMoneyBillWave, color: "indigo" },
              { label: "Transactions", value: "52", icon: FaCalendarDay, color: "blue" },
              { label: "Pending", value: "3", icon: FaFileAlt, color: "yellow" },
              { label: "Success Rate", value: "98.5%", icon: FaCheckCircle, color: "green" }
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{s.label}</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{s.value}</p>
                    </div>
                    <div className={`p-3 bg-${s.color}-100 rounded-xl`}>
                      <Icon className={`text-${s.color}-700 text-xl`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  if (num === 0) return 'Zero Ethiopian Birr Only';
  if (num < 10) return ones[num] + ' Ethiopian Birr Only';
  return 'Custom Amount';
};

export default PaymentProcessing;