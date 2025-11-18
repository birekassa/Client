// src/Chairman/PrepareClearance.jsx
import React, { useState, useRef } from 'react';

const PrepareIDCard = () => {
  const [fullName, setFullName] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCapturing, setIsCapturing] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!capturedImage) {
      newErrors.capturedImage = 'Photo capture is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Logic to send request to record officer
      console.log('Sending request to record officer...', {
        fullName,
        capturedImage
      });
      alert('Request successfully sent to record officer!');
    } else {
      alert('Please fill all required fields correctly');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', // Front camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        // Clear camera error when camera starts
        if (errors.capturedImage) {
          setErrors(prev => ({ ...prev, capturedImage: '' }));
        }
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setErrors(prev => ({ 
        ...prev, 
        capturedImage: 'Unable to access camera. Please check camera permissions.' 
      }));
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      
      setTimeout(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Add flash effect
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = '0.8';
        flash.style.zIndex = '1000';
        flash.style.transition = 'opacity 0.3s';
        document.body.appendChild(flash);
        
        // Remove flash after animation
        setTimeout(() => {
          flash.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(flash);
            setIsCapturing(false);
          }, 300);
        }, 200);
        
        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
        
        // Stop camera
        stopCamera();
        
        // Clear camera error after successful capture
        if (errors.capturedImage) {
          setErrors(prev => ({ ...prev, capturedImage: '' }));
        }
      }, 100);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    
    // Real-time validation for full name
    if (value.trim() && errors.fullName) {
      setErrors(prev => ({ ...prev, fullName: '' }));
    }
  };

  // Check if form is valid for button enabling
  const isFormValid = fullName.trim().length >= 2 && capturedImage;

  return (
    <div className="prepare-clearance-form">
      <form onSubmit={handleSubmit}>
        {/* Input for fullname */}
        <div className="input-group">
          <label htmlFor="fullname">Full Name *</label>
          <input
            id="fullname"
            type="text"
            placeholder="Enter full name..."
            value={fullName}
            onChange={handleFullNameChange}
            required
            className={`input-field ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        {/* Camera section for capturing user photo */}
        <div className="camera-section">
          <label>Photo Capture *</label>
          
          {!capturedImage ? (
            <div className="camera-container">
              <div className="camera-frame">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="camera-preview"
                  style={{ display: isCameraActive ? 'block' : 'none' }}
                />
                {isCameraActive && (
                  <div className="camera-overlay">
                    <div className="capture-guide">
                      <div className="face-outline"></div>
                      <div className="instruction-text">
                        Position your face within the frame
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {!isCameraActive ? (
                <button type="button" onClick={startCamera} className="camera-button">
                  📷 Start Camera
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={captureImage} 
                  className="capture-button"
                  disabled={isCapturing}
                >
                  {isCapturing ? '📸 Capturing...' : '📸 Capture Photo'}
                </button>
              )}
            </div>
          ) : (
            <div className="captured-image-container">
              <div className="success-badge">✅ Photo Captured</div>
              <img src={capturedImage} alt="Captured" className="captured-image" />
              <button type="button" onClick={retakePhoto} className="retake-button">
                🔄 Retake Photo
              </button>
            </div>
          )}
          
          {errors.capturedImage && (
            <span className="error-message">{errors.capturedImage}</span>
          )}
          
          {/* Hidden canvas for capturing frames */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        {/* Button to send request to record officer */}
        <button 
          type="submit" 
          className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
          disabled={!isFormValid}
        >
          ✅ Send Request to Record Officer
        </button>
      </form>

      <style jsx>{`
        .prepare-clearance-form {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .input-group {
          margin-bottom: 25px;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #333;
          font-size: 16px;
        }
        
        .input-field {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }
        
        .input-field.error {
          border-color: #e74c3c;
          box-shadow: 0 0 8px rgba(231, 76, 60, 0.2);
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 14px;
          margin-top: 6px;
          display: block;
          font-weight: 500;
        }
        
        .camera-section {
          margin: 25px 0;
        }
        
        .camera-section label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #333;
          font-size: 16px;
        }
        
        .camera-container, .captured-image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-top: 15px;
        }
        
        .camera-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 300px;
          border: 3px solid #3498db;
          border-radius: 12px;
          overflow: hidden;
          background: #f8f9fa;
        }
        
        .camera-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .camera-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .capture-guide {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        
        .face-outline {
          width: 200px;
          height: 250px;
          border: 3px dashed #3498db;
          border-radius: 45% 45% 50% 50%;
          margin: 0 auto 15px;
          background: rgba(52, 152, 219, 0.1);
        }
        
        .instruction-text {
          color: white;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          font-size: 14px;
          background: rgba(0,0,0,0.6);
          padding: 8px 12px;
          border-radius: 20px;
        }
        
        .captured-image {
          width: 100%;
          max-width: 400px;
          height: 300px;
          border: 3px solid #27ae60;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .success-badge {
          background: #27ae60;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
        }
        
        .camera-button, .capture-button, .retake-button {
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all 0.3s;
          min-width: 180px;
        }
        
        .camera-button, .capture-button {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
          box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
        }
        
        .capture-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .retake-button {
          background: linear-gradient(135deg, #e67e22, #d35400);
          color: white;
          box-shadow: 0 4px 8px rgba(230, 126, 34, 0.3);
        }
        
        .submit-button {
          background: linear-gradient(135deg, #27ae60, #229954);
          color: white;
          width: 100%;
          margin-top: 25px;
          padding: 15px;
          font-size: 18px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
        }
        
        .submit-button.disabled {
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .submit-button:not(.disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
        }
        
        button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
        }
        
        .input-field.error:focus {
          border-color: #e74c3c;
          box-shadow: 0 0 8px rgba(231, 76, 60, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PrepareIDCard;