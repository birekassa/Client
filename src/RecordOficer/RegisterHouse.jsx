// src/components/recordOfficer/RegisterHouse.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  FaHome, FaMapMarkerAlt, FaRulerCombined, FaBuilding, FaUser, FaPhone,
  FaCheckCircle, FaPrint, FaArrowRight, FaBuilding as FaOffice
} from 'react-icons/fa';

const RegisterHouse = () => {
  const [step, setStep] = useState(1);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [formData, setFormData] = useState({
    houseNumber: '',
    houseType: 'Kebele',
    ownerName: '',
    ownerPhone: '',
    location: '',
    area: '',
    rooms: '',
    status: 'Occupied'
  });

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
      <html><head><title>የቤት መመዝገቢያ ቅጽ</title>
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
        <h2>የቤት መመዝገቢያ ቅጽ</h2>
        <p><strong>ቀን:</strong> ${format(new Date(), 'dd MMMM yyyy')} | <strong>ጊዜ:</strong> ${format(new Date(), 'hh:mm a')} EAT</p>
      </div>
      <table>
        <tr><th>ቤት ቁጥር</th><td>${formData.houseNumber}</td></tr>
        <tr><th>የቤት አይነት</th><td>${formData.houseType}</td></tr>
        <tr><th>ባለቤት ስም</th><td>${formData.ownerName}</td></tr>
        <tr><th>ስልክ</th><td>${formData.ownerPhone}</td></tr>
        <tr><th>አካባቢ</th><td>${formData.location}</td></tr>
        <tr><th>ቦታ (m²)</th><td>${formData.area}</td></tr>
        <tr><th>ክፍሎች</th><td>${formData.rooms}</td></tr>
        <tr><th>ሁኔታ</th><td>${formData.status}</td></tr>
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
              <div className="p-3 bg-green-600 rounded-xl">
                <FaHome className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">አዲስ ቤት መመዝገብ</h1>
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
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className="w-24 h-1 bg-gray-300"></div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${showNextSteps ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>

        {/* Step 1: Form */}
        {!showNextSteps && (
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaHome className="text-green-600" /> የቤት መረጃ መመዝገብ
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaHome className="text-green-600" /> ቤት ቁጥር
                  </label>
                  <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="KB03-H001" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaBuilding className="text-blue-600" /> የቤት አይነት
                  </label>
                  <select name="houseType" value={formData.houseType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required>
                    <option value="Kebele">የኬበሌ</option>
                    <option value="Private">የግል</option>
                    <option value="Rental">የኪራይ</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaUser className="text-indigo-600" /> ባለቤት ስም
                  </label>
                  <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaPhone className="text-red-600" /> ስልክ
                  </label>
                  <input type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaMapMarkerAlt className="text-purple-600" /> አካባቢ
                  </label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="ዞን 01, አቅራቢያ ገበያ" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaRulerCombined className="text-orange-600" /> ቦታ (m²)
                  </label>
                  <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="120" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaBuilding className="text-teal-600" /> የክፍል ብዛት
                  </label>
                  <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="4" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <FaCheckCircle className="text-green-600" /> ሁኔታ
                  </label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required>
                    <option value="Occupied">ተይዟል</option>
                    <option value="Vacant">ባዶ</option>
                    <option value="Under Construction">በግንባታ</option>
                  </select>
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
                  <FaOffice className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">1. ወደ ኬበሌ አመራር ቢሮ ይሂዱ</h3>
                  <p className="text-gray-600">የታተመውን ቅጽ ይዘው ይሂዱ → ፊርማ ያገኛሉ</p>
                </div>
                <FaArrowRight className="text-gray-400 mt-2" />
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaHome className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">2. የቤት መረጃ ይመዘገባል</h3>
                  <p className="text-gray-600">በፊዚካል መዝገብ ይገባል → ለቀጣይ አገልግሎት</p>
                </div>
                <FaArrowRight className="text-gray-400 mt-2" />
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterHouse;