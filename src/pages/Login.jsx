import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 Static user data
  const users = {
    chairman: { password: "chairman", role: "chairman", path: "/chairman" },
    recordofficer: { password: "record", role: "recordOfficer", path: "/record-officer" },
    admin: { password: "admin", role: "admin", path: "/admin" },
    casher: { password: "casher", role: "cashier", path: "/cashier" },
    socialJustice: { password: "socialJustice", role: "socialJustice", path: "/social-justice" },
    kebeleCounci: { password: "kebeleCounci", role: "kebeleCouncil", path: "/kebele-council" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      const user = users[username];

      if (user && user.password === password) {
        // ✅ Store user info
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);

        // ✅ Redirect to their dashboard
        navigate(user.path);
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    navigate("/");
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl animate-slide-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Branding */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-800 to-indigo-800 text-white p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-3xl bg-white bg-opacity-20 p-2 rounded-xl">🏛️</div>
              <div>
                <h2 className="text-xl font-bold">Kebele Management</h2>
                <p className="text-blue-200 text-sm">Administrative System</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">✓</div>
                <span>Secure Access Portal</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">✓</div>
                <span>Role-based Dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">✓</div>
                <span>Real-time Management</span>
              </div>
            </div>

            <div className="mt-8 text-center lg:text-left">
              <p className="text-blue-200 text-sm">
                Government Administration System
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-3/5 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
                <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close login"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your username"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-200 outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span className="text-red-700 font-medium text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-4 bg-blue-600 text-white rounded-lg font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 ${
                  isLoading 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02]'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-4 text-center uppercase tracking-wide">
                Demo Credentials
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-2">
                {Object.entries(users).map(([key, user]) => (
                  <div 
                    key={key}
                    className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-xs leading-relaxed hover:bg-blue-100 transition-colors duration-200"
                  >
                    <strong className="block text-blue-800 text-xs uppercase tracking-wide mb-1">
                      {user.role.replace(/([A-Z])/g, ' $1').trim()}
                    </strong>
                    <div className="font-mono text-xs text-gray-700 mb-1">
                      <span className="text-gray-500">user:</span> <code className="text-blue-700">{key}</code>
                    </div>
                    <div className="font-mono text-xs text-gray-700">
                      <span className="text-gray-500">pass:</span> <code className="text-blue-700">{user.password}</code>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Scroll to view all available roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;