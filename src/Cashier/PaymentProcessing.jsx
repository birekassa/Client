import React, { useState } from 'react';
import { FaMoneyBillWave, FaPrint, FaSearch, FaUser, FaHome, FaIdCard, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

const PaymentProcessing = () => {
  const [activeTab, setActiveTab] = useState('new-payment');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [paymentData, setPaymentData] = useState({
    customerId: '',
    customerName: '',
    serviceType: '',
    amount: '',
    paymentMethod: 'cash',
    description: ''
  });
  const [recentPayments, setRecentPayments] = useState([
    {
      id: 'PAY001',
      customer: 'Alemu Bekele',
      service: 'ID Card',
      amount: 50,
      date: '2024-01-15 10:30',
      status: 'completed',
      receiptNo: 'RCP001'
    },
    {
      id: 'PAY002',
      customer: 'Meron Tesfaye',
      service: 'Birth Certificate',
      amount: 25,
      date: '2024-01-15 11:15',
      status: 'completed',
      receiptNo: 'RCP002'
    },
    {
      id: 'PAY003',
      customer: 'Kebede Hailu',
      service: 'House Rent',
      amount: 500,
      date: '2024-01-14 09:45',
      status: 'completed',
      receiptNo: 'RCP003'
    }
  ]);

  const serviceTypes = [
    { id: 'id-card', name: 'ID Card', amount: 50, icon: FaIdCard, color: 'blue' },
    { id: 'birth-certificate', name: 'Birth Certificate', amount: 25, icon: FaFileAlt, color: 'green' },
    { id: 'marriage-certificate', name: 'Marriage Certificate', amount: 30, icon: FaFileAlt, color: 'purple' },
    { id: 'clearance', name: 'Clearance Certificate', amount: 40, icon: FaFileAlt, color: 'orange' },
    { id: 'house-rent', name: 'House Rent', amount: 500, icon: FaHome, color: 'red' },
    { id: 'other', name: 'Other Services', amount: 100, icon: FaMoneyBillWave, color: 'gray' }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: FaMoneyBillWave },
    { id: 'mobile-banking', name: 'Mobile Banking', icon: FaMoneyBillWave },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: FaMoneyBillWave }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service.id);
    setPaymentData({
      ...paymentData,
      serviceType: service.name,
      amount: service.amount
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    
    // Generate receipt data
    const newPayment = {
      id: `PAY${String(recentPayments.length + 1).padStart(3, '0')}`,
      customer: paymentData.customerName || 'Walk-in Customer',
      service: paymentData.serviceType,
      amount: parseInt(paymentData.amount),
      date: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'completed',
      receiptNo: `RCP${String(recentPayments.length + 1).padStart(3, '0')}`,
      paymentMethod: paymentData.paymentMethod
    };

    // Add to recent payments
    setRecentPayments([newPayment, ...recentPayments]);
    
    // Reset form
    setPaymentData({
      customerId: '',
      customerName: '',
      serviceType: '',
      amount: '',
      paymentMethod: 'cash',
      description: ''
    });
    setSelectedService('');

    // Show success message
    alert(`Payment processed successfully!\nReceipt Number: ${newPayment.receiptNo}\nAmount: ETB ${newPayment.amount}`);
  };

  const handlePrintReceipt = (payment) => {
    // In a real application, this would open a print dialog with formatted receipt
    const receiptContent = `
      KEBELE MANAGEMENT SYSTEM
      --------------------------
      RECEIPT: ${payment.receiptNo}
      DATE: ${payment.date}
      --------------------------
      Customer: ${payment.customer}
      Service: ${payment.service}
      Amount: ETB ${payment.amount}
      Payment Method: ${payment.paymentMethod}
      Status: ${payment.status}
      --------------------------
      Thank you for your payment!
    `;
    
    alert(`Printing Receipt:\n\n${receiptContent}`);
  };

  const filteredPayments = recentPayments.filter(payment =>
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Payment Processing</h2>
            <p className="text-gray-600">Process payments for various kebele services</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('new-payment')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'new-payment'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              New Payment
            </button>
            <button
              onClick={() => setActiveTab('recent-payments')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'recent-payments'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Payments
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* New Payment Tab */}
          {activeTab === 'new-payment' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Service Selection */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Service</h3>
                <div className="space-y-3">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`w-full text-left p-4 border rounded-lg transition-all ${
                          selectedService === service.id
                            ? 'border-green-500 bg-green-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${service.color}-100 rounded-lg`}>
                              <Icon className={`text-${service.color}-600`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{service.name}</h4>
                              <p className="text-sm text-gray-600">ETB {service.amount}</p>
                            </div>
                          </div>
                          {selectedService === service.id && (
                            <FaCheckCircle className="text-green-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Form */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
                <form onSubmit={handleProcessPayment} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer ID
                      </label>
                      <input
                        type="text"
                        name="customerId"
                        value={paymentData.customerId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter customer ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={paymentData.customerName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter customer name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Type
                      </label>
                      <input
                        type="text"
                        name="serviceType"
                        value={paymentData.serviceType}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="Select a service first"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (ETB)
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                              paymentData.paymentMethod === method.id
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentData.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="text-green-500 focus:ring-green-500"
                            />
                            <div className="flex items-center gap-2 ml-3">
                              <Icon className="text-gray-600" />
                              <span className="font-medium">{method.name}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={paymentData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Additional notes about this payment..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={!paymentData.serviceType || !paymentData.amount}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaMoneyBillWave />
                      Process Payment
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentData({
                          customerId: '',
                          customerName: '',
                          serviceType: '',
                          amount: '',
                          paymentMethod: 'cash',
                          description: ''
                        });
                        setSelectedService('');
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Recent Payments Tab */}
          {activeTab === 'recent-payments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Payments</h3>
                <span className="text-sm text-gray-600">
                  Total: {filteredPayments.length} payments
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Receipt No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.receiptNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          ETB {payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handlePrintReceipt(payment)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <FaPrint />
                            Print
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredPayments.length === 0 && (
                  <div className="text-center py-8">
                    <FaMoneyBillWave className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-500">No payments found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">ETB 18,200</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FaMoneyBillWave className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Transactions</p>
              <p className="text-2xl font-bold text-gray-900">52</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaUser className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Receipts</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FaFileAlt className="text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaCheckCircle className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;