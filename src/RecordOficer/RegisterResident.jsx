// src/components/recordOfficer/RegisterResident.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  FaUser, FaIdCard, FaVenusMars, FaBriefcase, FaCalendarAlt, FaHome,
  FaCheckCircle, FaExclamationTriangle, FaPrint, FaUserCheck, FaArrowRight, 
  FaBuilding, FaClock, FaList, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaUserShield, FaHandshake, FaFileSignature
} from 'react-icons/fa';

const RegisterResident = () => {
  const [step, setStep] = useState(1);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'register'
  
  // Mock data for chairman requests
  const [chairmanRequests, setChairmanRequests] = useState([
    {
      id: 'REQ-001',
      residentName: 'MESERET KEBEDE',
      nationalId: '1234567890',
      houseNumber: 'H-124',
      requestDate: '2024-01-15',
      status: 'pending',
      reason: 'New resident registration - Employment transfer',
      contactPhone: '+251-91-777-8888',
      previousKebele: 'Addis Ababa',
      urgency: 'high',
      documents: ['National ID', 'Employment Letter', 'Previous Clearance']
    },
    {
      id: 'REQ-002',
      residentName: 'TEWODROS MULATU',
      nationalId: '0987654321',
      houseNumber: 'H-089',
      requestDate: '2024-01-14',
      status: 'pending',
      reason: 'Family relocation - Marriage',
      contactPhone: '+251-92-999-0000',
      previousKebele: 'Bahir Dar',
      urgency: 'medium',
      documents: ['National ID', 'Marriage Certificate', 'Family Documents']
    },
    {
      id: 'REQ-003',
      residentName: 'ELENI GIRMA',
      nationalId: '1122334455',
      houseNumber: 'H-067',
      requestDate: '2024-01-13',
      status: 'approved',
      reason: 'Student transfer - University admission',
      contactPhone: '+251-93-888-7777',
      previousKebele: 'Dire Dawa',
      urgency: 'medium',
      documents: ['National ID', 'University Admission Letter', 'Student ID']
    }
  ]);

  const [verification, setVerification] = useState({
    nationalId: '',
    houseNumber: '',
    leaderConfirmed: false,
    requestId: ''
  });

  const [formData, setFormData] = useState({
    id: '',
    resident_name: '',
    gender: '',
    age: '',
    occupation: '',
    id_number: '',
    issued_date: format(new Date(), 'yyyy-MM-dd'),
    house_number: '',
    phone: '',
    email: '',
    emergency_contact: '',
    marital_status: '',
    education_level: '',
    previous_address: ''
  });

  // Load request data when a request is selected
  const loadRequestData = (request) => {
    setVerification(prev => ({
      ...prev,
      nationalId: request.nationalId,
      houseNumber: request.houseNumber,
      leaderConfirmed: true,
      requestId: request.id
    }));

    setFormData(prev => ({
      ...prev,
      resident_name: request.residentName,
      house_number: request.houseNumber,
      phone: request.contactPhone
    }));

    // Mark request as processed
    setChairmanRequests(prev => 
      prev.map(req => 
        req.id === request.id 
          ? { ...req, status: 'processing' }
          : req
      )
    );

    setActiveTab('register');
    setStep(2);
  };

  const handleVerification = (e) => {
    const { name, value, type, checked } = e.target;
    setVerification(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const proceedToRegistration = () => {
    if (verification.nationalId && verification.houseNumber && verification.leaderConfirmed) {
      setStep(2);
    } else {
      alert('ሁሉንም የማረጋገጫ መረጃዎች ይሙሉ!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePrint();
    setShowNextSteps(true);

    // Mark request as completed
    if (verification.requestId) {
      setChairmanRequests(prev => 
        prev.map(req => 
          req.id === verification.requestId 
            ? { ...req, status: 'completed' }
            : req
        )
      );
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return `px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`;
  };

  const getUrgencyBadge = (urgency) => {
    const styles = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-orange-100 text-orange-800 border-orange-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return `px-2 py-1 rounded-full text-xs font-medium border ${styles[urgency]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <FaUserCheck className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">አዲስ ነዋሪ መመዝገብ</h1>
                <p className="text-gray-600 mt-1">Woldia Kebele Administration - Record Officer</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">ቀን: {format(new Date(), 'dd MMMM yyyy')}</p>
              <p className="text-sm text-gray-500">ጊዜ: {format(new Date(), 'hh:mm a')}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl mt-4">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'requests' 
                  ? "bg-white text-blue-600 shadow-md border border-blue-200" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <FaList />
              የአመራር ጥያቄዎች
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {chairmanRequests.filter(req => req.status === 'pending').length}
              </span>
            </button>
          
          </div>
        </div>

        {/* Chairman Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">
                  {chairmanRequests.filter(req => req.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">በጥበቃ</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {chairmanRequests.filter(req => req.status === 'processing').length}
                </div>
                <div className="text-sm text-gray-600">በሂደት</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {chairmanRequests.filter(req => req.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">የተጠናቀቀ</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">
                  {chairmanRequests.length}
                </div>
                <div className="text-sm text-gray-600">ጠቅላላ</div>
              </div>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaUserShield className="text-blue-600" />
                የአመራር የነዋሪ ምዝገባ ጥያቄዎች
              </h2>

              <div className="space-y-4">
                {chairmanRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{request.residentName}</h3>
                          <span className={getStatusBadge(request.status)}>
                            {request.status}
                          </span>
                      
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <FaIdCard className="text-gray-400" />
                            <span>መታወቂያ: {request.nationalId}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaHome className="text-gray-400" />
                            <span>ቤት: {request.houseNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-gray-400" />
                            <span>{request.contactPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="text-gray-400" />
                            <span>{request.requestDate}</span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-gray-600 text-sm">
                            <strong>ሙሉ ስም:</strong> {request.previousKebele}
                          </p>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">የቀረቡ ሰነዶች:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <img src="" alt="mamelkecha" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {request.status === 'pending' && (
                          <button
                            onClick={() => loadRequestData(request)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                          >
                            <FaHandshake />
                            መመዝገብ ጀምር
                          </button>
                        )}
                        {request.status === 'processing' && (
                          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            በሂደት ላይ...
                          </span>
                        )}
                        {request.status === 'completed' && (
                          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                            ተጠናቋል ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {chairmanRequests.length === 0 && (
                <div className="text-center py-12">
                  <FaUserShield className="mx-auto text-4xl text-gray-300 mb-4" />
                  <div className="text-lg font-medium text-gray-900 mb-2">ምንም ጥያቄዎች የሉም</div>
                  <p className="text-gray-600">የአመራር ጥያቄዎች እዚህ ይታያሉ</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registration Tab */}
        {activeTab === 'register' && (
          <>
            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-green-600 text-white'}`}>
                  1
                </div>
                <div className="w-24 h-1 bg-gray-300"></div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  2
                </div>
              </div>
            </div>

            {/* Step 2: Registration Form */}
            {step === 2 && !showNextSteps && (
              <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
                {verification.requestId && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-800">
                      <FaFileSignature className="text-blue-600" />
                      <span className="font-semibold">የአመራር ጥያቄ ቁጥር: {verification.requestId}</span>
                    </div>
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaUser className="text-green-600" /> ደረጃ 2: የነዋሪ መረጃ መመዝገብ
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaIdCard className="text-indigo-600" /> ተ.ቁ (ID)
                      </label>
                      <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="RES-2025-001" required />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaUser className="text-green-600" /> የነዋሪ ስም
                      </label>
                      <input type="text" name="resident_name" value={formData.resident_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="የሙሉ ስም" required />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaVenusMars className="text-purple-600" /> ፆታ
                      </label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required>
                        <option value="">-- ይምረጡ --</option>
                        <option value="ወንድ">ወንድ</option>
                        <option value="ሴት">ሴት</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaCalendarAlt className="text-orange-600" /> እድሜ
                      </label>
                      <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" max="120" className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="በዓመት" required />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaBriefcase className="text-teal-600" /> ሥራ
                      </label>
                      <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="መምህር, ገበሬ" required />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaIdCard className="text-red-600" /> መታወቂያ ቁጥር
                      </label>
                      <input type="text" name="id_number" value={formData.id_number} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="KB1304903" required />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaHome className="text-blue-600" /> የቤት ቁጥር
                      </label>
                      <input type="text" name="house_number" value={formData.house_number} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="H-045" required />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaPhone className="text-green-600" /> ስልክ
                      </label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="+251-91-123-4567" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaEnvelope className="text-purple-600" /> ኢሜይል
                      </label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="example@email.com" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <button type="submit" className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl flex items-center gap-2">
                      <FaPrint /> መዝግብ እና ላክ
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* After Print: Next Steps */}
            {showNextSteps && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-xl p-8 border border-green-200">
                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> ተጠናቀቀ! የሚቀጥለው እርምጃ
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FaBuilding className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">1. ወደ ኬበሌ አመራር ቢሮ ይሂዱ</h3>
                      <p className="text-gray-600">የታተመውን ቅጽ ይዘው ይሂዱ → ፊርማ ያገኛሉ</p>
                    </div>
                    <FaArrowRight className="text-gray-400 mt-2" />
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FaIdCard className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">2. የመታወቂያ ካርድ ይውሰዱ</h3>
                      <p className="text-gray-600">ፎቶ ይነሱ → ካርድ ይታተማሉ → ይቀበላሉ</p>
                    </div>
                    <FaArrowRight className="text-gray-400 mt-2" />
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FaHome className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">3. ወደ ቤት ይመለሱ</h3>
                      <p className="text-gray-600">ሁሉም አገልግሎት ዝግጁ ነው!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterResident;