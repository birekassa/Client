import React from "react";

const Logout = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🚪</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Logout Successful</h2>
        
        <p className="text-gray-600 mb-8">
          You have been logged out of the Kebele Council Dashboard successfully. 
          Thank you for using our administrative system.
        </p>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
            Return to Login Page
          </button>
          
          <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors">
            Back to Dashboard
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Session ended securely. For security reasons, please close your browser.
        </p>
      </div>
    </div>
  );
};

export default Logout;