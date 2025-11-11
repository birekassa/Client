// src/components/recordOfficer/RegisterResident.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  FaUser, FaIdCard, FaVenusMars, FaBriefcase, FaCalendarAlt, FaHome,
  FaCheckCircle, FaExclamationTriangle, FaPrint, FaUserCheck, FaArrowRight, FaBuilding
} from 'react-icons/fa';

const RegisterResident = () => {
  const [step, setStep] = useState(1);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [verification, setVerification] = useState({
    nationalId: '',
    houseNumber: '',
    leaderConfirmed: false
  });
  const [formData, setFormData] = useState({
    id: '',
    resident_name: '',
    gender: '',
    age: '',
    occupation: '',
    id_number: '',
    issued_date: format(new Date(), 'yyyy-MM-dd')
  });

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
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>የነዋሪ መመዝገቢያ ቅጽ</title>
      <style>
        body { font-family: 'Arial', sans-serif; padding: 40px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; }
        h1 { color: #1e40af; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 12px; text-align: left; }
        th { background: #dbeafe; }
        .status { background: #d1fae5; color: #065f46; text-align: center; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
      </style></head><body>
      <div class="header">
        <h1>ወልዲያ ከተማ አስተዳደር - ኬበሌ</h1>
        <h2>የነዋሪ መመዝገቢያ ቅጽ</h2>
        <p><strong>ቀን:</strong> ${format(new Date(), 'dd MMMM yyyy')} | <strong>ጊዜ:</strong> ${format(new Date(), 'hh:mm a')} EAT</p>
      </div>
      <table>
        <tr><th>ተ.ቁ (ID)</th><td>${formData.id}</td></tr>
        <tr><th>ሙሉ ስም</th><td>${formData.resident_name}</td></tr>
        <tr><th>ፆታ</th><td>${formData.gender}</td></tr>
        <tr><th>እድሜ</th><td>${formData.age}</td></tr>
        <tr><th>ሥራ</th><td>${formData.occupation}</td></tr>
        <tr><th>መታወቂያ ቁጥር</th><td>${formData.id_number}</td></tr>
        <tr><th>የተሰጠበት ቀን</th><td>${formData.issued_date}</td></tr>
        <tr><th class="status" colspan="2">ሁኔታ: ተመዝግቧል (Registered)</th></tr>
      </table>
      <div class="footer">
        <p>© 2025 Woldia Kebele • Group 4 • AGUMAS BIRHANU • WDU1304903</p>
      </div>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 p-6">
      <div className="max-w-5xl mx-auto">
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
        </div>

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

        {/* Step 1: Verification */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-xl p-8 border border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-600" /> ደረጃ 1: የነዋሪ ማረጋገጫ
            </h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaIdCard className="text-red-600" /> የመንግስት መታወቂያ ቁጥር
                </label>
                <input type="text" name="nationalId" value={verification.nationalId} onChange={handleVerification} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="e.g. 1234567890" required />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaHome className="text-blue-600" /> የቤት ቁጥር
                </label>
                <input type="text" name="houseNumber" value={verification.houseNumber} onChange={handleVerification} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="e.g. H-045" required />
              </div>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl">
                <input type="checkbox" name="leaderConfirmed" checked={verification.leaderConfirmed} onChange={handleVerification} className="w-5 h-5 text-indigo-600" />
                <label className="text-sm font-medium text-gray-700">
                  የአካባቢ አመራር ፊርማ ተረጋግጧል
                </label>
              </div>
              <button onClick={proceedToRegistration} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <FaCheckCircle /> ወደ መመዝገብ ቀጥል
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {step === 2 && !showNextSteps && (
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaUser className="text-green-600" /> ደረጃ 2: የነዋሪ መረጃ መመዝገብ
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl flex items-center gap-2">
                  <FaPrint /> መዝግብ እና አትም
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
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                © 2025 Woldia Kebele • Group 4 • AGUMAS BIRHANU • WDU1304903
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterResident;