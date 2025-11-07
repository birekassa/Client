// src/components/RegisterResident/ResidentForm.jsx
import React, { useState, useEffect } from 'react';
import { validateResident } from '../../utils/validation';

const ResidentForm = ({ resident, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    resident_name: '',
    gender: '',
    age: '',
    occupation: '',
    id_number: '',
    issued_date: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (resident) {
      setFormData({
        id: resident.id || '',
        resident_name: resident.resident_name || '',
        gender: resident.gender || '',
        age: resident.age || '',
        occupation: resident.occupation || '',
        id_number: resident.id_number || '',
        issued_date: resident.issued_date || ''
      });
    }
  }, [resident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    const validationErrors = validateResident(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out";
    const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50";
    const normalClasses = "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-gray-400";
    
    return `${baseClasses} ${errors[fieldName] ? errorClasses : normalClasses}`;
  };

  const getLabelClasses = (fieldName) => {
    return `block text-sm font-semibold text-gray-800 mb-2 ${errors[fieldName] ? 'text-red-600' : ''}`;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ተ.ቁ (ID) */}
          <div>
            <label className={getLabelClasses('id')}>
              <span className="text-gray-600">ተ.ቁ</span>
              <span className="text-gray-400 ml-1">(ID)</span>
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              placeholder="Auto-generated"
              readOnly
            />
          </div>

          {/* የነዋሪ ስም (Resident Name) */}
          <div>
            <label className={getLabelClasses('resident_name')}>
              <span className="text-gray-600">የነዋሪ ስም</span>
              <span className="text-gray-400 ml-1">(Resident Name)</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="resident_name"
              value={formData.resident_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses('resident_name')}
              placeholder="Enter resident name"
            />
            {errors.resident_name && touched.resident_name && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.resident_name}
              </div>
            )}
          </div>

          {/* ፆታ (Gender) */}
          <div>
            <label className={getLabelClasses('gender')}>
              <span className="text-gray-600">ፆታ</span>
              <span className="text-gray-400 ml-1">(Gender)</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses('gender')}
            >
              <option value="" className="text-gray-400">Select gender</option>
              <option value="Male" className="text-gray-700">Male</option>
              <option value="Female" className="text-gray-700">Female</option>
            </select>
            {errors.gender && touched.gender && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.gender}
              </div>
            )}
          </div>

          {/* እድሜ (Age) */}
          <div>
            <label className={getLabelClasses('age')}>
              <span className="text-gray-600">እድሜ</span>
              <span className="text-gray-400 ml-1">(Age)</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              max="120"
              className={getInputClasses('age')}
              placeholder="Enter age"
            />
            {errors.age && touched.age && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.age}
              </div>
            )}
          </div>

          {/* ሥራ (Occupation) */}
          <div>
            <label className={getLabelClasses('occupation')}>
              <span className="text-gray-600">ሥራ</span>
              <span className="text-gray-400 ml-1">(Occupation)</span>
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses('occupation')}
              placeholder="Enter occupation"
            />
          </div>

          {/* የመታወቂያ ቁጥር (ID Number) */}
          <div>
            <label className={getLabelClasses('id_number')}>
              <span className="text-gray-600">የመታወቂያ ቁጥር</span>
              <span className="text-gray-400 ml-1">(ID Number)</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="id_number"
              value={formData.id_number}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses('id_number')}
              placeholder="Enter ID number"
            />
            {errors.id_number && touched.id_number && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.id_number}
              </div>
            )}
          </div>

          {/* የተሰጠበት ቀን (Issued Date) */}
          <div>
            <label className={getLabelClasses('issued_date')}>
              <span className="text-gray-600">የተሰጠበት ቀን</span>
              <span className="text-gray-400 ml-1">(Issued Date)</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              name="issued_date"
              value={formData.issued_date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses('issued_date')}
            />
            {errors.issued_date && touched.issued_date && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.issued_date}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {resident ? 'Update Resident' : 'Save'}
              </>
            )}
          </button>
        </div>

        {/* Required Fields Note */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResidentForm;