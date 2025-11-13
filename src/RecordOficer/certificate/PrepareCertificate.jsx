// src/components/recordOfficer/certificate/PrepareCertificate.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSave, 
  FaFileAlt, 
  FaUser, 
  FaCalendar, 
  FaIdCard, 
  FaMapMarkerAlt,
  FaUsers,
  FaHospital,
  FaRing,
  FaUserFriends,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

const PrepareCertificate = ({ onCertificateCreated }) => {
  const [certificateType, setCertificateType] = useState('birth');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Common fields
    applicant_name: '',
    resident_id: '',
    phone_number: '',
    email: '',
    address: '',
    
    // Birth certificate fields
    date_of_birth: '',
    place_of_birth: '',
    father_name: '',
    mother_name: '',
    hospital_record_number: '',
    attending_physician: '',
    birth_weight: '',
    birth_time: '',
    
    // Marriage certificate fields
    date_of_marriage: '',
    place_of_marriage: '',
    spouse_name: '',
    spouse_resident_id: '',
    marriage_officer: '',
    marriage_registration_number: '',
    witness_1: '',
    witness_2: '',
    marriage_type: 'civil'
  });

  const certificateTypes = [
    { id: 'birth', name: 'የልደት ሰርተፊኬት', icon: FaUser, color: 'green' },
    { id: 'marriage', name: 'የጋብቻ ሰርተፊኬት', icon: FaRing, color: 'blue' },
    { id: 'death', name: 'የሞት ሰርተፊኬት', icon: FaUsers, color: 'gray' },
    { id: 'residence', name: 'የነዋሪነት ሰርተፊኬት', icon: FaIdCard, color: 'purple' }
  ];

  const steps = [
    { number: 1, name: 'የሰርተፊኬት አይነት', icon: FaFileAlt },
    { number: 2, name: 'የማመልከቻ መረጃ', icon: FaUser },
    { number: 3, name: 'ዝርዝር መረጃ', icon: FaCalendar },
    { number: 4, name: 'ማረጋገጫ', icon: FaCheckCircle }
  ];

  // Auto-generate certificate numbers
  useEffect(() => {
    const generateCertificateNumber = () => {
      const prefix = certificateType === 'birth' ? 'BIRTH' : 'MARR';
      const timestamp = Date.now().toString().slice(-6);
      return `${prefix}-${timestamp}`;
    };

    setFormData(prev => ({
      ...prev,
      certificate_number: generateCertificateNumber()
    }));
  }, [certificateType]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!certificateType) {
        newErrors.certificateType = 'እባክዎ የሰርተፊኬት አይነት ይምረጡ';
      }
    }

    if (step === 2) {
      if (!formData.applicant_name.trim()) {
        newErrors.applicant_name = 'የማመልከቻ ስም ያስፈልጋል';
      }
      if (!formData.resident_id.trim()) {
        newErrors.resident_id = 'የነዋሪ መለያ ያስፈልጋል';
      }
      if (!formData.phone_number.trim()) {
        newErrors.phone_number = 'ስልክ ቁጥር ያስፈልጋል';
      }
    }

    if (step === 3) {
      if (certificateType === 'birth') {
        if (!formData.date_of_birth) newErrors.date_of_birth = 'የልደት ቀን ያስፈልጋል';
        if (!formData.place_of_birth.trim()) newErrors.place_of_birth = 'የልደት ቦታ ያስፈልጋል';
        if (!formData.father_name.trim()) newErrors.father_name = 'የአባት ስም ያስፈልጋል';
        if (!formData.mother_name.trim()) newErrors.mother_name = 'የእናት ስም ያስፈልጋል';
      } else {
        if (!formData.date_of_marriage) newErrors.date_of_marriage = 'የጋብቻ ቀን ያስፈልጋል';
        if (!formData.place_of_marriage.trim()) newErrors.place_of_marriage = 'የጋብቻ ቦታ ያስፈልጋል';
        if (!formData.spouse_name.trim()) newErrors.spouse_name = 'የባል/ሚስት ስም ያስፈልጋል';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Certificate created:', {
        ...formData,
        certificate_type: certificateType,
        created_at: new Date().toISOString(),
        status: 'pending'
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        resetForm();
        onCertificateCreated?.();
      }, 3000);
      
    } catch (error) {
      console.error('Error creating certificate:', error);
      setErrors({ submit: 'አይነተኛ ስህተት ተፈጥሯል' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      applicant_name: '',
      resident_id: '',
      phone_number: '',
      email: '',
      address: '',
      date_of_birth: '',
      place_of_birth: '',
      father_name: '',
      mother_name: '',
      hospital_record_number: '',
      attending_physician: '',
      birth_weight: '',
      birth_time: '',
      date_of_marriage: '',
      place_of_marriage: '',
      spouse_name: '',
      spouse_resident_id: '',
      marriage_officer: '',
      marriage_registration_number: '',
      witness_1: '',
      witness_2: '',
      marriage_type: 'civil'
    });
    setCurrentStep(1);
    setErrors({});
  };

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            Icon ? 'pl-10' : ''
          } ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
      </div>
      {errors[name] && (
        <p className="text-red-600 text-sm flex items-center">
          <FaExclamationTriangle className="mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">አዲስ ሰርተፊኬት ፍጠር</h2>
          <p className="text-gray-600">የሚፈልጉትን ሰርተፊኬት ይመረጡ እና መረጃውን ያሟሉ</p>
        </div>
        
        {/* Certificate Number Preview */}
        <div className="text-right">
          <div className="text-sm text-gray-500">የሰርተፊኬት ቁጥር</div>
          <div className="font-mono font-bold text-green-600">{formData.certificate_number}</div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <FaCheckCircle className="text-sm" />
                ) : (
                  <step.icon className="text-sm" />
                )}
              </div>
              <span className={`ml-2 font-medium ${
                currentStep >= step.number ? 'text-green-600' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Certificate Type Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {certificateTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = certificateType === type.id;
                return (
                  <motion.button
                    key={type.id}
                    type="button"
                    onClick={() => setCertificateType(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? `bg-${type.color}-50 border-${type.color}-500 shadow-md`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                        isSelected ? `bg-${type.color}-100 text-${type.color}-600` : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon className="text-xl" />
                      </div>
                      <h3 className={`mt-3 font-semibold ${
                        isSelected ? `text-${type.color}-700` : 'text-gray-700'
                      }`}>
                        {type.name}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        isSelected ? `text-${type.color}-600` : 'text-gray-500'
                      }`}>
                        {type.id === 'birth' && 'የልደት ማረጋገጫ'}
                        {type.id === 'marriage' && 'የጋብቻ ማረጋገጫ'}
                        {type.id === 'death' && 'የሞት ማረጋገጫ'}
                        {type.id === 'residence' && 'የነዋሪነት ማረጋገጫ'}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* Step 2: Applicant Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                የማመልከቻ መረጃ
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="ሙሉ ስም"
                  name="applicant_name"
                  placeholder="የሕይወት መስፍን"
                  icon={FaUser}
                  required
                />
                
                <InputField
                  label="የነዋሪ መለያ"
                  name="resident_id"
                  placeholder="RES-2024-00123"
                  icon={FaIdCard}
                  required
                />
                
                <InputField
                  label="ስልክ ቁጥር"
                  name="phone_number"
                  type="tel"
                  placeholder="+251 91 234 5678"
                  icon={FaUser}
                  required
                />
                
                <InputField
                  label="ኢሜይል"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  icon={FaUser}
                />
              </div>
              
              <InputField
                label="አድራሻ"
                name="address"
                placeholder="የት/ቤት ቁጥር, ከተማ, ክልል"
                icon={FaMapMarkerAlt}
                required
              />
            </motion.div>
          )}

          {/* Step 3: Detailed Information */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                {certificateType === 'birth' ? 'የልደት ዝርዝር መረጃ' : 'የጋብቻ ዝርዝር መረጃ'}
              </h3>

              {certificateType === 'birth' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="የልደት ቀን"
                    name="date_of_birth"
                    type="date"
                    icon={FaCalendar}
                    required
                  />
                  
                  <InputField
                    label="የልደት ሰዓት"
                    name="birth_time"
                    type="time"
                    icon={FaCalendar}
                  />
                  
                  <InputField
                    label="የልደት ቦታ"
                    name="place_of_birth"
                    placeholder="ሆስፒታል ወይም የቤት አድራሻ"
                    icon={FaMapMarkerAlt}
                    required
                  />
                  
                  <InputField
                    label="የልደት ክብደት (ኪ.ግ)"
                    name="birth_weight"
                    type="number"
                    step="0.1"
                    placeholder="3.2"
                    icon={FaHospital}
                  />
                  
                  <InputField
                    label="የአባት ስም"
                    name="father_name"
                    placeholder="የአባት ሙሉ ስም"
                    icon={FaUser}
                    required
                  />
                  
                  <InputField
                    label="የእናት ስም"
                    name="mother_name"
                    placeholder="የእናት ሙሉ ስም"
                    icon={FaUser}
                    required
                  />
                  
                  <InputField
                    label="የሆስፒታል መመዝገቢያ ቁጥር"
                    name="hospital_record_number"
                    placeholder="HOS-2024-00123"
                    icon={FaHospital}
                    required
                  />
                  
                  <InputField
                    label="የህክምና ባለሙያ"
                    name="attending_physician"
                    placeholder="ዶ/ር ስም"
                    icon={FaUserFriends}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="የጋብቻ ቀን"
                    name="date_of_marriage"
                    type="date"
                    icon={FaCalendar}
                    required
                  />
                  
                  <InputField
                    label="የጋብቻ ቦታ"
                    name="place_of_marriage"
                    placeholder="የጋብቻ ቦታ"
                    icon={FaMapMarkerAlt}
                    required
                  />
                  
                  <InputField
                    label="የባል/ሚስት ስም"
                    name="spouse_name"
                    placeholder="ባል/ሚስት ሙሉ ስም"
                    icon={FaUser}
                    required
                  />
                  
                  <InputField
                    label="የባል/ሚስት ነዋሪ መለያ"
                    name="spouse_resident_id"
                    placeholder="RES-2024-00124"
                    icon={FaIdCard}
                  />
                  
                  <InputField
                    label="የጋብቻ ባለሙያ"
                    name="marriage_officer"
                    placeholder="የጋብቻ ባለሙያ ስም"
                    icon={FaUserFriends}
                    required
                  />
                  
                  <InputField
                    label="የጋብቻ መመዝገቢያ ቁጥር"
                    name="marriage_registration_number"
                    placeholder="MARR-2024-00123"
                    icon={FaFileAlt}
                    required
                  />
                  
                  <InputField
                    label="የመጀመሪያ ምስክር"
                    name="witness_1"
                    placeholder="የመጀመሪያ ምስክር ስም"
                    icon={FaUsers}
                  />
                  
                  <InputField
                    label="የሁለተኛ ምስክር"
                    name="witness_2"
                    placeholder="የሁለተኛ ምስክር ስም"
                    icon={FaUsers}
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      የጋብቻ አይነት
                    </label>
                    <select
                      name="marriage_type"
                      value={formData.marriage_type}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="civil">ሲቪል ጋብቻ</option>
                      <option value="religious">ሃይማኖታዊ ጋብቻ</option>
                      <option value="traditional">ባሕላዊ ጋብቻ</option>
                    </select>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Review and Submit */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                መረጃዎችን ያረጋግጡ
              </h3>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-2xl text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">ሁሉም መረጃዎች ተሟልተዋል!</h4>
                    <p className="text-green-600 text-sm">
                      ከታች ያሉትን መረጃዎች ያረጋግጡ እና ሰርተፊኬቱን ለመፍጠር ይቅርቡ።
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">የማመልከቻ መረጃ</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ስም:</span>
                      <span className="font-medium">{formData.applicant_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ነዋሪ መለያ:</span>
                      <span className="font-medium">{formData.resident_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ስልክ:</span>
                      <span className="font-medium">{formData.phone_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">አድራሻ:</span>
                      <span className="font-medium">{formData.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">
                    {certificateType === 'birth' ? 'የልደት መረጃ' : 'የጋብቻ መረጃ'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    {certificateType === 'birth' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የልደት ቀን:</span>
                          <span className="font-medium">{formData.date_of_birth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የልደት ቦታ:</span>
                          <span className="font-medium">{formData.place_of_birth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የአባት ስም:</span>
                          <span className="font-medium">{formData.father_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የእናት ስም:</span>
                          <span className="font-medium">{formData.mother_name}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የጋብቻ ቀን:</span>
                          <span className="font-medium">{formData.date_of_marriage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የባል/ሚስት ስም:</span>
                          <span className="font-medium">{formData.spouse_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የጋብቻ ቦታ:</span>
                          <span className="font-medium">{formData.place_of_marriage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">የጋብቻ አይነት:</span>
                          <span className="font-medium">
                            {formData.marriage_type === 'civil' && 'ሲቪል ጋብቻ'}
                            {formData.marriage_type === 'religious' && 'ሃይማኖታዊ ጋብቻ'}
                            {formData.marriage_type === 'traditional' && 'ባሕላዊ ጋብቻ'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 flex items-center">
                    <FaExclamationTriangle className="mr-2" />
                    {errors.submit}
                  </p>
                </div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                >
                  <FaCheckCircle className="text-4xl text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-800 text-lg mb-2">
                    ሰርተፊኬት በትክክል ተፈጥሯል!
                  </h4>
                  <p className="text-green-600">
                    ሰርተፊኬት {formData.certificate_number} በተሳካ ሁኔታ ተፈጥሯል። ለማረጋገጫ ወደ ማረጋገጫ ክፍል ይላካል።
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ወደ ኋላ
          </button>

          <div className="flex space-x-4">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <span>ወደ አስቀጣሚ</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || success}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>በመፍጠር ላይ...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>ሰርተፊኬት ፍጠር</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrepareCertificate;