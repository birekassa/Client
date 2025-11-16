// src/components/cashier/PaymentProcessing.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaUser,
  FaMoneyBillWave,
  FaReceipt,
  FaPrint,
  FaEnvelope,
  FaMobileAlt,
  FaCreditCard,
  FaCashRegister,
  FaCheckCircle,
  FaSpinner,
  FaHistory,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaIdCard,
  FaCertificate,
  FaHome,
  FaFileAlt,
  FaTimes
} from 'react-icons/fa';

// Mock data with updated services
const mockResidents = [
  {
    id: 'RES-2024-001',
    name: 'የሕይወት መስፍን',
    phone: '+251912345678',
    email: 'yehywet@email.com',
    address: 'መንገድ 12, ቤት 45, ወልዲያ',
    balance: 2500,
    outstandingPayments: [
      { id: 'INV-001', type: 'id_card', description: 'የመለያ ካርድ ክፍያ', amount: 150, dueDate: '2024-01-15' },
      { id: 'INV-002', type: 'birth_certificate', description: 'የልደት ሰርተፊኬት ክፍያ', amount: 200, dueDate: '2024-01-10' },
      { id: 'INV-003', type: 'house_rent', description: 'የቤት ኪራይ', amount: 1200, dueDate: '2024-01-20' }
    ],
    paymentHistory: [
      { id: 'RCPT-2023-045', date: '2023-12-15', description: 'የንጹህነት ማስረጃ', amount: 300, method: 'cash' },
      { id: 'RCPT-2023-046', date: '2023-11-20', description: 'የመለያ ካርድ እድሳት', amount: 100, method: 'telebirr' },
      { id: 'RCPT-2023-047', date: '2023-10-10', description: 'የቤት ኪራይ', amount: 1200, method: 'bank' }
    ]
  },
  {
    id: 'RES-2024-002',
    name: 'ሰላም አለማየሁ',
    phone: '+251911234567',
    email: 'selam@email.com',
    address: 'መንገድ 8, ቤት 23, ወልዲያ',
    balance: 1500,
    outstandingPayments: [
      { id: 'INV-004', type: 'marriage_certificate', description: 'የጋብቻ ሰርተፊኬት ክፍያ', amount: 250, dueDate: '2024-01-25' },
      { id: 'INV-005', type: 'clearance_certificate', description: 'የንጹህነት ማስረጃ ክፍያ', amount: 300, dueDate: '2024-01-18' }
    ],
    paymentHistory: [
      { id: 'RCPT-2023-048', date: '2023-12-10', description: 'የልደት ሰርተፊኬት', amount: 200, method: 'cash' },
      { id: 'RCPT-2023-049', date: '2023-11-15', description: 'የቤት ኪራይ', amount: 1200, method: 'telebirr' }
    ]
  },
  {
    id: 'RES-2024-003',
    name: 'ማርያም ገብረመድህን',
    phone: '+251913456789',
    email: 'mariam@email.com',
    address: 'መንገድ 15, ቤት 67, ወልዲያ',
    balance: 3200,
    outstandingPayments: [
      { id: 'INV-006', type: 'id_card', description: 'የመለያ ካርድ ክፍያ', amount: 150, dueDate: '2024-01-12' },
      { id: 'INV-007', type: 'other_service', description: 'የቤት ማሻሻያ ፈቃድ', amount: 500, dueDate: '2024-01-18' },
      { id: 'INV-008', type: 'house_rent', description: 'የቤት ኪራይ', amount: 1200, dueDate: '2024-01-22' }
    ],
    paymentHistory: [
      { id: 'RCPT-2023-050', date: '2023-12-05', description: 'የጋብቻ ሰርተፊኬት', amount: 250, method: 'bank' },
      { id: 'RCPT-2023-051', date: '2023-11-12', description: 'የንጹህነት ማስረጃ', amount: 300, method: 'cash' },
      { id: 'RCPT-2023-052', date: '2023-10-20', description: 'የቤት ኪራይ', amount: 1200, method: 'telebirr' }
    ]
  },
  {
    id: 'RES-2024-004',
    name: 'መንግሥቱ አለማየሁ',
    phone: '+251914567890',
    email: 'mengistu@email.com',
    address: 'መንገድ 5, ቤት 89, ወልዲያ',
    balance: 800,
    outstandingPayments: [
      { id: 'INV-009', type: 'birth_certificate', description: 'የልደት ሰርተፊኬት ክፍያ', amount: 200, dueDate: '2024-01-14' },
      { id: 'INV-010', type: 'clearance_certificate', description: 'የንጹህነት ማስረጃ ክፍያ', amount: 300, dueDate: '2024-01-28' }
    ],
    paymentHistory: [
      { id: 'RCPT-2023-053', date: '2023-12-20', description: 'የመለያ ካርድ', amount: 150, method: 'telebirr' },
      { id: 'RCPT-2023-054', date: '2023-11-25', description: 'የቤት ኪራይ', amount: 1200, method: 'cash' }
    ]
  }
];

// Updated payment types with correct services
const paymentTypes = [
  { id: 'id_card', name: 'የመለያ ካርድ ክፍያ', category: 'service', icon: FaIdCard, amount: 150 },
  { id: 'birth_certificate', name: 'የልደት ሰርተፊኬት ክፍያ', category: 'service', icon: FaCertificate, amount: 200 },
  { id: 'marriage_certificate', name: 'የጋብቻ ሰርተፊኬት ክፍያ', category: 'service', icon: FaCertificate, amount: 250 },
  { id: 'clearance_certificate', name: 'የንጹህነት ማስረጃ ክፍያ', category: 'service', icon: FaFileAlt, amount: 300 },
  { id: 'house_rent', name: 'የቤት ኪራይ', category: 'rent', icon: FaHome, amount: 1200 },
  { id: 'other_service', name: 'ሌሎች አገልግሎቶች', category: 'service', icon: FaFileInvoiceDollar, amount: 0 }
];

const paymentMethods = [
  { id: 'cash', name: 'Cash', icon: FaCashRegister, color: 'green' },
  { id: 'telebirr', name: 'Telebirr', icon: FaMobileAlt, color: 'blue' },
  { id: 'mpesa', name: 'M-Pesa', icon: FaMobileAlt, color: 'purple' },
  { id: 'bank', name: 'Bank Transfer', icon: FaCreditCard, color: 'indigo' }
];

const PaymentProcessing = () => {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState(null);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [newService, setNewService] = useState({ type: '', customAmount: '', description: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [mobileRef, setMobileRef] = useState('');
  const [bankRef, setBankRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  // Search residents
  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = mockResidents.filter(resident =>
        resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.phone.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const selectResident = (resident) => {
    setSelectedResident(resident);
    setSearchTerm('');
    setSearchResults([]);
    setStep(2);
  };

  const togglePaymentSelection = (payment) => {
    setSelectedPayments(prev => {
      const isSelected = prev.find(p => p.id === payment.id);
      if (isSelected) {
        return prev.filter(p => p.id !== payment.id);
      } else {
        return [...prev, payment];
      }
    });
  };

  const addNewService = () => {
    if (newService.type && newService.customAmount) {
      const paymentType = paymentTypes.find(pt => pt.id === newService.type);
      const newPayment = {
        id: `NEW-${Date.now()}`,
        type: newService.type,
        description: newService.description || paymentType?.name || 'ሌላ አገልግሎት',
        amount: parseFloat(newService.customAmount),
        dueDate: new Date().toISOString().split('T')[0],
        isNew: true
      };
      
      setSelectedPayments(prev => [...prev, newPayment]);
      setNewService({ type: '', customAmount: '', description: '' });
    }
  };

  const removePayment = (paymentId) => {
    setSelectedPayments(prev => prev.filter(p => p.id !== paymentId));
  };

  const calculateTotal = () => {
    return selectedPayments.reduce((total, payment) => total + payment.amount, 0);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const receiptData = {
      id: `RCPT-${Date.now()}`,
      date: new Date().toISOString(),
      resident: selectedResident,
      payments: selectedPayments,
      total: calculateTotal(),
      method: paymentMethod,
      cashier: {
        name: 'AGUMAS BIRHANU',
        id: 'WDU1304903'
      },
      reference: paymentMethod === 'cash' ? null : 
                 paymentMethod === 'telebirr' || paymentMethod === 'mpesa' ? mobileRef : bankRef
    };
    
    setReceipt(receiptData);
    setIsProcessing(false);
    setStep(4);
  };

  const resetProcess = () => {
    setStep(1);
    setSelectedResident(null);
    setSelectedPayments([]);
    setNewService({ type: '', customAmount: '', description: '' });
    setPaymentMethod('');
    setCashAmount('');
    setMobileRef('');
    setBankRef('');
    setReceipt(null);
    setShowPaymentHistory(false);
  };

  const printReceipt = () => {
    window.print();
  };

  const sendEmailReceipt = () => {
    alert(`Receipt sent to ${selectedResident.email}`);
  };

  const sendSMSReceipt = () => {
    alert(`SMS receipt sent to ${selectedResident.phone}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Payment Processing</h2>
          <p className="text-gray-600">Process resident payments efficiently and accurately</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Cashier</div>
            <div className="font-semibold text-blue-600">AGUMAS BIRHANU</div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= stepNumber 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {step > stepNumber ? (
                  <FaCheckCircle className="text-sm" />
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`ml-2 font-medium ${
                step >= stepNumber ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {stepNumber === 1 && 'Find Resident'}
                {stepNumber === 2 && 'Select Services'}
                {stepNumber === 3 && 'Process Payment'}
                {stepNumber === 4 && 'Receipt'}
              </span>
              {stepNumber < 4 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Find Resident */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Find Resident</h3>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, resident ID, or phone number..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 max-h-96 overflow-y-auto"
              >
                {searchResults.map((resident) => (
                  <motion.div
                    key={resident.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => selectResident(resident)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{resident.name}</h4>
                          <p className="text-sm text-gray-600">ID: {resident.id} • {resident.phone}</p>
                          <p className="text-xs text-gray-500">{resident.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Outstanding</div>
                        <div className="font-semibold text-red-600">ETB {resident.balance}</div>
                        <div className="text-xs text-gray-500">
                          {resident.outstandingPayments.length} pending
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {searchTerm && searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaSearch className="text-3xl mx-auto mb-3 text-gray-300" />
              <p>No residents found</p>
              <p className="text-sm">Try different search terms</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Step 2: Select Services */}
      {step === 2 && selectedResident && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Select Services</h3>
              <p className="text-gray-600">for {selectedResident.name}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentHistory(!showPaymentHistory)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaHistory />
                <span>{showPaymentHistory ? 'Hide History' : 'Show History'}</span>
              </button>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Change Resident
              </button>
            </div>
          </div>

          {/* Resident Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-blue-700">Resident ID</label>
                <p className="font-semibold">{selectedResident.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">Phone</label>
                <p className="font-semibold">{selectedResident.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">Outstanding Balance</label>
                <p className="font-semibold text-red-600">ETB {selectedResident.balance}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">Pending Payments</label>
                <p className="font-semibold">{selectedResident.outstandingPayments.length}</p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          {showPaymentHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <FaHistory className="mr-2 text-blue-500" />
                Recent Payment History
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-3">
                  {selectedResident.paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <div className="font-medium text-gray-800">{payment.description}</div>
                        <div className="text-sm text-gray-600">
                          {payment.date} • {payment.method}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">ETB {payment.amount}</div>
                        <div className="text-xs text-gray-500">{payment.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Outstanding Payments */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-800">Outstanding Payments</h4>
            {selectedResident.outstandingPayments.length > 0 ? (
              selectedResident.outstandingPayments.map((payment) => {
                const paymentType = paymentTypes.find(pt => pt.id === payment.type);
                const Icon = paymentType?.icon || FaFileInvoiceDollar;
                const isSelected = selectedPayments.find(p => p.id === payment.id);
                
                return (
                  <div
                    key={payment.id}
                    onClick={() => togglePaymentSelection(payment)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={isSelected ? 'text-blue-600' : 'text-gray-400'} />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">{payment.description}</h5>
                          <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">ETB {payment.amount}</div>
                        {isSelected && (
                          <div className="text-sm text-blue-600 flex items-center">
                            <FaCheckCircle className="mr-1" /> Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaCheckCircle className="text-3xl mx-auto mb-3 text-green-400" />
                <p>No outstanding payments</p>
                <p className="text-sm">All payments are up to date</p>
              </div>
            )}
          </div>

          {/* Add New Service */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Add New Service</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  value={newService.type}
                  onChange={(e) => setNewService({...newService, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select service...</option>
                  {paymentTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (ETB)
                </label>
                <input
                  type="number"
                  value={newService.customAmount}
                  onChange={(e) => setNewService({...newService, customAmount: e.target.value})}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Service description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={addNewService}
              disabled={!newService.type || !newService.customAmount}
              className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Service
            </button>
          </div>

          {/* Selected Payments Summary */}
          {selectedPayments.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Selected Services</h4>
              <div className="space-y-2">
                {selectedPayments.map((payment) => (
                  <div key={payment.id} className="flex justify-between items-center p-2 bg-white rounded">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-800">{payment.description}</span>
                      {payment.isNew && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">New</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-800">ETB {payment.amount}</span>
                      <button
                        onClick={() => removePayment(payment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-green-700">ETB {calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Total and Actions */}
          {selectedPayments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-green-700">Total Amount</div>
                  <div className="text-2xl font-bold text-green-800">ETB {calculateTotal()}</div>
                  <div className="text-sm text-green-600">
                    {selectedPayments.length} service(s) selected
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Step 3: Process Payment */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Process Payment</h3>
              <p className="text-gray-600">Complete the payment transaction</p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Services
            </button>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Payment Summary</h4>
            <div className="space-y-2">
              {selectedPayments.map((payment) => (
                <div key={payment.id} className="flex justify-between text-sm">
                  <span>{payment.description}</span>
                  <span>ETB {payment.amount}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span className="text-lg">ETB {calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Select Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const colorMap = {
                  green: 'border-green-500 bg-green-50 text-green-600',
                  blue: 'border-blue-500 bg-blue-50 text-blue-600',
                  purple: 'border-purple-500 bg-purple-50 text-purple-600',
                  indigo: 'border-indigo-500 bg-indigo-50 text-indigo-600'
                };
                
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      paymentMethod === method.id
                        ? colorMap[method.color]
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`text-2xl mb-2`} />
                    <div className="font-semibold text-gray-800">{method.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <h4 className="font-semibold text-gray-800 mb-4">Payment Details</h4>
              
              {paymentMethod === 'cash' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount Received
                    </label>
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="Enter amount received"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {cashAmount && calculateTotal() > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex justify-between text-sm">
                        <span>Change to give back:</span>
                        <span className="font-semibold">
                          ETB {(parseFloat(cashAmount) - calculateTotal()).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(paymentMethod === 'telebirr' || paymentMethod === 'mpesa') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Reference Number
                  </label>
                  <input
                    type="text"
                    value={mobileRef}
                    onChange={(e) => setMobileRef(e.target.value)}
                    placeholder="Enter transaction reference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Reference Number
                  </label>
                  <input
                    type="text"
                    value={bankRef}
                    onChange={(e) => setBankRef(e.target.value)}
                    placeholder="Enter bank reference number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing || 
                  (paymentMethod === 'cash' && (!cashAmount || parseFloat(cashAmount) < calculateTotal())) ||
                  ((paymentMethod === 'telebirr' || paymentMethod === 'mpesa') && !mobileRef) ||
                  (paymentMethod === 'bank' && !bankRef)
                }
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  `Complete Payment - ETB ${calculateTotal()}`
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Step 4: Receipt */}
      {step === 4 && receipt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="text-center mb-6">
            <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
            <p className="text-gray-600">Transaction completed successfully</p>
          </div>

          {/* Receipt */}
          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-6 print:border-2 print:border-black">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-gray-800">OFFICIAL RECEIPT</h4>
              <p className="text-sm text-gray-600">ወልዲያ ኬበሌ</p>
              <p className="text-xs text-gray-500">Woldia Kebele Administration</p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Receipt No:</span>
                <span className="font-semibold">{receipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date(receipt.date).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resident:</span>
                <span className="font-semibold">{receipt.resident.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resident ID:</span>
                <span>{receipt.resident.id}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="font-semibold mb-2">Payment Details:</div>
                {receipt.payments.map((payment) => (
                  <div key={payment.id} className="flex justify-between text-sm">
                    <span>{payment.description}</span>
                    <span>ETB {payment.amount}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Paid:</span>
                  <span className="text-lg">ETB {receipt.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="capitalize">{receipt.method}</span>
                </div>
                {receipt.reference && (
                  <div className="flex justify-between">
                    <span>Reference:</span>
                    <span className="font-mono">{receipt.reference}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-2 text-center">
                <p className="text-xs text-gray-500">Cashier: {receipt.cashier.name} ({receipt.cashier.id})</p>
                <p className="text-xs text-gray-500">Thank you for your payment!</p>
                <p className="text-xs text-gray-400 mt-2">This is an official receipt from Woldia Kebele</p>
              </div>
            </div>
          </div>

          {/* Receipt Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={printReceipt}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
            >
              <FaPrint className="mr-2" />
              Print Receipt
            </button>
            <button
              onClick={sendEmailReceipt}
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
            >
              <FaEnvelope className="mr-2" />
              Email Receipt
            </button>
            <button
              onClick={sendSMSReceipt}
              className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center"
            >
              <FaMobileAlt className="mr-2" />
              SMS Receipt
            </button>
            <button
              onClick={resetProcess}
              className="bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              + Add Payment
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentProcessing;