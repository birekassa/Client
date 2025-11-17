// src/Chairman/PrepareClearance.jsx
import React, { useState, useRef } from "react";
import { FaCamera, FaUser, FaPaperPlane } from "react-icons/fa";

const PrepareIDCard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    photo: null,
    photoPreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      const imageDataUrl = canvasRef.current.toDataURL('image/png');
      setFormData(prev => ({
        ...prev,
        photo: imageDataUrl,
        photoPreview: imageDataUrl
      }));
      
      stopCamera();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      alert("Please enter full name");
      return;
    }

    if (!formData.photo) {
      alert("Please capture a photo");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call to record officer
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Clearance request submitted:', {
        fullName: formData.fullName,
        photo: formData.photo ? 'Photo captured' : 'No photo'
      });
      
      alert('Clearance request sent successfully to record officer!');
      
      // Reset form
      setFormData({
        fullName: "",
        photo: null,
        photoPreview: null
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: null,
      photoPreview: null
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Prepare Clearance</h1>
          <p className="text-blue-100 mt-2">Submit clearance request to record officer</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Photo Capture Section */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Photo Capture *
              </label>
              
              {/* Photo Preview */}
              {formData.photoPreview ? (
                <div className="mb-4 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-blue-200 shadow-md">
                      <img 
                        src={formData.photoPreview} 
                        alt="Captured" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition duration-200"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-green-600 text-sm mt-2">Photo captured ✓</p>
                </div>
              ) : (
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <FaCamera className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">No photo captured</p>
                </div>
              )}

              {/* Camera Button */}
              <button
                type="button"
                onClick={showCamera ? stopCamera : startCamera}
                className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2 ${
                  showCamera 
                    ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}
              >
                <FaCamera />
                {showCamera ? 'Stop Camera' : 'Capture Photo'}
              </button>
            </div>

            {/* Camera View */}
            {showCamera && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="relative">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    className="w-full h-64 object-cover rounded-lg bg-black"
                  ></video>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition duration-200"
                  >
                    <FaCamera className="text-gray-700 text-xl" />
                  </button>
                </div>
                <p className="text-center text-gray-600 mt-2 text-sm">
                  Position yourself and click the camera icon to capture
                </p>
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.fullName || !formData.photo}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 flex items-center justify-center gap-2 ${
                isSubmitting || !formData.fullName || !formData.photo
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send to Record Officer
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center text-gray-500 text-sm">
          <p>Clearance request will be processed by record officer</p>
        </div>
      </div>
    </div>
  );
};

export default PrepareIDCard;