// src/SocialJustice/components/cases/CaseForm.jsx
import React, { useState } from 'react';
import { 
  FaSave, 
  FaPaperPlane, 
  FaUser, 
  FaIdCard, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaFileAlt,
  FaCalendar,
  FaExclamationTriangle,
  FaUpload
} from 'react-icons/fa';

const CaseForm = ({ onSubmitCase }) => {
  const [formData, setFormData] = useState({
    caseNumber: `CASE-${Date.now().toString().slice(-6)}`,
    applicantName: '',
    applicantId: '',
    contactNumber: '',
    email: '',
    address: '',
    caseType: '',
    description: '',
    dateOfIncident: '',
    location: '',
    urgencyLevel: 'medium',
    supportingDocuments: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'CASE TYPE', icon: FaFileAlt },
    { number: 2, title: 'APPLICANT INFO', icon: FaUser },
    { number: 3, title: 'CASE DETAILS', icon: FaCalendar },
    { number: 4, title: 'REVIEW & SUBMIT', icon: FaPaperPlane }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      supportingDocuments: [...prev.supportingDocuments, ...files]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.caseType) newErrors.caseType = 'CASE TYPE IS REQUIRED';
    }
    
    if (step === 2) {
      if (!formData.applicantName.trim()) newErrors.applicantName = 'FULL NAME IS REQUIRED';
      if (!formData.applicantId.trim()) newErrors.applicantId = 'ID NUMBER IS REQUIRED';
      if (!formData.contactNumber.trim()) newErrors.contactNumber = 'CONTACT NUMBER IS REQUIRED';
    }
    
    if (step === 3) {
      if (!formData.description.trim()) newErrors.description = 'CASE DESCRIPTION IS REQUIRED';
      if (!formData.dateOfIncident) newErrors.dateOfIncident = 'DATE OF INCIDENT IS REQUIRED';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmitCase(formData);
      alert('CASE SUBMITTED SUCCESSFULLY! PROCEEDING TO VERIFICATION...');
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'low': return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-700';
      case 'high': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-700';
      case 'critical': return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-700';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaFileAlt className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4">CASE INFORMATION</h3>
              <p className="text-gray-600 text-xl font-semibold">SELECT THE TYPE OF CASE YOU WANT TO REGISTER</p>
            </div>

            <div>
              <label className="block text-xl font-black text-gray-700 mb-6">
                CASE TYPE <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { value: 'civil', label: 'CIVIL DISPUTE', description: 'Property, contract, or civil rights issues', color: 'from-blue-500 to-blue-600' },
                  { value: 'criminal', label: 'CRIMINAL CASE', description: 'Theft, assault, or criminal offenses', color: 'from-red-500 to-red-600' },
                  { value: 'family', label: 'FAMILY MATTER', description: 'Marriage, divorce, or family disputes', color: 'from-green-500 to-green-600' },
                  { value: 'property', label: 'PROPERTY DISPUTE', description: 'Land, housing, or property conflicts', color: 'from-purple-500 to-purple-600' },
                  { value: 'labor', label: 'LABOR ISSUE', description: 'Employment or workplace disputes', color: 'from-orange-500 to-orange-600' },
                  { value: 'other', label: 'OTHER', description: 'Other types of legal matters', color: 'from-gray-500 to-gray-600' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, caseType: type.value }))}
                    className={`p-6 border-4 rounded-2xl text-left transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 ${
                      formData.caseType === type.value
                        ? `bg-gradient-to-r ${type.color} text-white border-transparent`
                        : 'bg-white border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-black text-lg mb-2">{type.label}</div>
                    <div className={`text-sm ${formData.caseType === type.value ? 'text-white/90' : 'text-gray-600'} font-semibold`}>{type.description}</div>
                  </button>
                ))}
              </div>
              {errors.caseType && (
                <p className="text-red-500 text-lg font-bold mt-4 flex items-center">
                  <FaExclamationTriangle className="mr-3" />
                  {errors.caseType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xl font-black text-gray-700 mb-4">
                URGENCY LEVEL
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  { level: 'low', color: 'from-green-500 to-green-600' },
                  { level: 'medium', color: 'from-yellow-500 to-yellow-600' },
                  { level: 'high', color: 'from-orange-500 to-orange-600' },
                  { level: 'critical', color: 'from-red-500 to-red-600' }
                ].map(({ level, color }) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgencyLevel: level }))}
                    className={`px-8 py-4 rounded-2xl border-4 font-black text-lg capitalize transition-all shadow-lg hover:shadow-xl transform hover:scale-110 ${
                      formData.urgencyLevel === level
                        ? `bg-gradient-to-r ${color} text-white border-transparent`
                        : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaUser className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4">APPLICANT INFORMATION</h3>
              <p className="text-gray-600 text-xl font-semibold">TELL US ABOUT THE PERSON FILING THIS CASE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xl font-black text-gray-700 mb-4 flex items-center">
                  <FaUser className="mr-3 text-blue-500 text-2xl" />
                  FULL NAME <span className="text-red-500 ml-2">*</span>
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-4 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all ${
                    errors.applicantName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ENTER FULL LEGAL NAME"
                />
                {errors.applicantName && (
                  <p className="text-red-500 text-lg font-bold mt-3 flex items-center">
                    <FaExclamationTriangle className="mr-3" />
                    {errors.applicantName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xl font-black text-gray-700 mb-4 flex items-center">
                  <FaIdCard className="mr-3 text-blue-500 text-2xl" />
                  ID NUMBER <span className="text-red-500 ml-2">*</span>
                </label>
                <input
                  type="text"
                  name="applicantId"
                  value={formData.applicantId}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-4 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all ${
                    errors.applicantId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ENTER GOVERNMENT ID NUMBER"
                />
                {errors.applicantId && (
                  <p className="text-red-500 text-lg font-bold mt-3 flex items-center">
                    <FaExclamationTriangle className="mr-3" />
                    {errors.applicantId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xl font-black text-gray-700 mb-4 flex items-center">
                  <FaPhone className="mr-3 text-blue-500 text-2xl" />
                  CONTACT NUMBER <span className="text-red-500 ml-2">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-4 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+251 ___ ______"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-lg font-bold mt-3 flex items-center">
                    <FaExclamationTriangle className="mr-3" />
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xl font-black text-gray-700 mb-4 flex items-center">
                  <FaEnvelope className="mr-3 text-blue-500 text-2xl" />
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all"
                  placeholder="EMAIL@EXAMPLE.COM"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xl font-black text-gray-700 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-blue-500 text-2xl" />
                  COMPLETE ADDRESS
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-6 py-4 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all"
                  placeholder="ENTER YOUR COMPLETE RESIDENTIAL ADDRESS"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaCalendar className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4">CASE DETAILS</h3>
              <p className="text-gray-600 text-xl font-semibold">PROVIDE DETAILED INFORMATION ABOUT THE CASE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xl font-black text-gray-700 mb-4">
                  DATE OF INCIDENT <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfIncident"
                  value={formData.dateOfIncident}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-4 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all ${
                    errors.dateOfIncident ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfIncident && (
                  <p className="text-red-500 text-lg font-bold mt-3 flex items-center">
                    <FaExclamationTriangle className="mr-3" />
                    {errors.dateOfIncident}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xl font-black text-gray-700 mb-4">
                  LOCATION OF INCIDENT
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all"
                  placeholder="WHERE DID IT HAPPEN?"
                />
              </div>
            </div>

            <div>
              <label className="block text-xl font-black text-gray-700 mb-4">
                CASE DESCRIPTION <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                className={`w-full px-6 py-4 border-4 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="PROVIDE A DETAILED DESCRIPTION OF WHAT HAPPENED, INCLUDING RELEVANT DATES, PEOPLE INVOLVED, AND ANY SUPPORTING EVIDENCE..."
              />
              {errors.description && (
                <p className="text-red-500 text-lg font-bold mt-3 flex items-center">
                  <FaExclamationTriangle className="mr-3" />
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xl font-black text-gray-700 mb-6">
                SUPPORTING DOCUMENTS
              </label>
              <div className="border-4 border-dashed border-gray-400 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors bg-gray-50">
                <FaUpload className="text-gray-500 text-4xl mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all font-black text-lg shadow-lg hover:shadow-xl inline-block"
                >
                  CHOOSE FILES
                </label>
                <p className="text-gray-600 text-lg font-semibold mt-4">
                  UPLOAD RELEVANT DOCUMENTS (PHOTOS, CONTRACTS, EVIDENCE, ETC.)
                </p>
                {formData.supportingDocuments.length > 0 && (
                  <div className="mt-6">
                    <p className="text-lg font-black text-gray-700 mb-4">SELECTED FILES:</p>
                    <div className="space-y-3">
                      {formData.supportingDocuments.map((file, index) => (
                        <div key={index} className="text-lg text-gray-700 bg-white p-4 rounded-xl border-2 border-gray-300 font-semibold">
                          📄 {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaPaperPlane className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4">REVIEW & SUBMIT</h3>
              <p className="text-gray-600 text-xl font-semibold">REVIEW YOUR INFORMATION BEFORE SUBMITTING</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 space-y-6 border-4 border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-black text-2xl text-gray-700 mb-4">CASE INFORMATION</h4>
                  <div className="space-y-3 text-lg">
                    <p><span className="font-black">CASE NUMBER:</span> {formData.caseNumber}</p>
                    <p><span className="font-black">CASE TYPE:</span> {formData.caseType.toUpperCase()}</p>
                    <p><span className="font-black">URGENCY:</span> 
                      <span className={`ml-3 px-4 py-2 rounded-xl text-sm font-black ${getUrgencyColor(formData.urgencyLevel)}`}>
                        {formData.urgencyLevel.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-2xl text-gray-700 mb-4">APPLICANT INFORMATION</h4>
                  <div className="space-y-3 text-lg">
                    <p><span className="font-black">NAME:</span> {formData.applicantName}</p>
                    <p><span className="font-black">ID:</span> {formData.applicantId}</p>
                    <p><span className="font-black">CONTACT:</span> {formData.contactNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-black text-2xl text-gray-700 mb-4">CASE DETAILS</h4>
                <div className="space-y-3 text-lg">
                  <p><span className="font-black">INCIDENT DATE:</span> {formData.dateOfIncident}</p>
                  <p><span className="font-black">LOCATION:</span> {formData.location || 'NOT SPECIFIED'}</p>
                  <p><span className="font-black">DESCRIPTION:</span> {formData.description}</p>
                </div>
              </div>

              {formData.supportingDocuments.length > 0 && (
                <div>
                  <h4 className="font-black text-2xl text-gray-700 mb-4">DOCUMENTS</h4>
                  <div className="text-lg font-black">
                    {formData.supportingDocuments.length} FILE(S) ATTACHED
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-blue-200 border-4 border-blue-300 rounded-2xl p-6">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-blue-600 text-2xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-blue-800 text-xl mb-2">BEFORE YOU SUBMIT</h4>
                  <p className="text-blue-700 text-lg font-semibold">
                    PLEASE ENSURE ALL INFORMATION IS ACCURATE. ONCE SUBMITTED, THIS CASE WILL BE 
                    REVIEWED BY THE SOCIAL JUSTICE COUNCIL. YOU WILL RECEIVE A CONFIRMATION AND 
                    CASE TRACKING NUMBER.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            
            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-2xl ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white'
                      : isCurrent
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-600 text-white'
                      : 'bg-white border-gray-400 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <FaPaperPlane className="text-lg" />
                    ) : (
                      <StepIcon className="text-lg" />
                    )}
                  </div>
                  <span className={`text-sm mt-3 font-black ${
                    isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-2 mx-4 rounded-full ${
                    currentStep > step.number 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-4">NEW CASE REGISTRATION</h1>
              <p className="text-blue-100 text-xl font-semibold">STEP {currentStep} OF {steps.length}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono font-black">{formData.caseNumber}</div>
              <div className="text-blue-200 text-lg font-semibold">CASE REFERENCE</div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-10 mt-10 border-t-4 border-gray-300">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-3 px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transform hover:scale-105'
                }`}
              >
                <span>PREVIOUS</span>
              </button>

              <div className="flex space-x-6">
                <button
                  type="button"
                  className="flex items-center space-x-3 px-10 py-5 border-4 border-gray-400 text-gray-700 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <FaSave className="text-xl" />
                  <span>SAVE DRAFT</span>
                </button>

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-black text-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    <span>NEXT STEP</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-black text-xl hover:from-green-600 hover:to-green-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    <FaPaperPlane className="text-xl" />
                    <span>SUBMIT CASE</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseForm;