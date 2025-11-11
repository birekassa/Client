// src/components/cashier/VerifyResident.jsx
import React, { useState } from "react";
import { FaSearch, FaUserCheck, FaUserTimes, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VerifyResident = () => {
  const [kebeleId, setKebeleId] = useState("");
  const [resident, setResident] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const residentsDB = {
    "KB1304903": { name: "AGUMAS BIRHANU", phone: "0912345678", address: "Kebele 03", photo: "agumas.jpg" },
    "KB146903": { name: "MOGES BEYENE", phone: "0923456789", address: "Kebele 02", photo: "moges.jpg" },
    "KB149996": { name: "YESHIWAS SOLOMON", phone: "0934567890", address: "Kebele 01", photo: "yesh.jpg" },
    "KB149343": { name: "ZEWORK AKLILU", phone: "0945678901", address: "Kebele 04", photo: "zework.jpg" }
  };

  const handleVerify = () => {
    if (!kebeleId) {
      setError("Please enter Kebele ID");
      return;
    }

    const found = residentsDB[kebeleId.toUpperCase()];
    if (found) {
      setResident(found);
      setError("");

      // AUTO REDIRECT TO PAYMENT PROCESSING WITH DATA
      setTimeout(() => {
        navigate("/cashier/payment-processing", {
          state: { resident: { ...found, kebeleId } }
        });
      }, 1500);
    } else {
      setResident(null);
      setError("Resident not found! Please register first.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 border-4 border-green-500">
      <h3 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-3">
        <FaUserCheck /> Verify Resident Identity
      </h3>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Kebele ID (e.g., KB1304903)"
          value={kebeleId}
          onChange={(e) => setKebeleId(e.target.value.toUpperCase())}
          className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none text-xl font-mono tracking-wider"
          onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
        />
        <button
          onClick={handleVerify}
          className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition flex items-center gap-3 text-lg font-bold shadow-lg"
        >
          <FaSearch /> VERIFY NOW
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-400 text-red-800 p-6 rounded-xl flex items-center gap-4 text-lg">
          <FaUserTimes className="text-3xl" />
          <div>
            <p className="font-bold">{error}</p>
            <p className="text-sm mt-1">Contact Registrar to add resident first.</p>
          </div>
        </div>
      )}

      {resident && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-400 rounded-xl p-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="bg-gray-200 border-4 border-dashed rounded-2xl w-32 h-32" />
              <div>
                <p className="text-4xl font-bold text-green-800">{resident.name}</p>
                <p className="text-2xl font-mono text-green-700 mt-2">ID: {kebeleId}</p>
                <p className="text-xl">Phone: {resident.phone}</p>
                <p className="text-xl">Address: {resident.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-5xl">Verified</p>
              <p className="text-green-600 flex items-center gap-3 mt-4 text-xl font-bold">
                <FaArrowRight className="animate-bounce" />
                Redirecting to Payment...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyResident;