// src/components/cashier/ReceiptManagement.jsx
import React, { useState } from "react";
import { FaSearch, FaPrint, FaTrash, FaEye, FaExclamationTriangle } from "react-icons/fa";
import PrintReceiptModal from "./PrintReceiptModal";

const ReceiptManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showVoidModal, setShowVoidModal] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      receiptNumber: "REC-2025-0001",
      residentName: "AGUMAS BIRHANU",
      kebeleId: "KB1304903",
      service: "ID Card Payment",
      amount: 50,
      paymentMethod: "Cash",
      date: "10/11/2025",
      status: "completed",
    },
    {
      id: 2,
      receiptNumber: "REC-2025-0002",
      residentName: "MOGES BEYENE",
      kebeleId: "KB146903",
      service: "House Rent",
      amount: 500,
      paymentMethod: "Telebirr",
      date: "09/11/2025",
      status: "completed",
    },
  ]);

  const handleVoid = () => {
    if (!voidReason.trim()) return alert("Void reason is required");
    setReceipts(receipts.map(r =>
      r.id === selectedReceipt.id
        ? { ...r, status: "voided", voidReason, voidDate: new Date().toLocaleDateString() }
        : r
    ));
    setShowVoidModal(false);
    setVoidReason("");
    setSelectedReceipt(null);
    alert(`Receipt ${selectedReceipt.receiptNumber} voided successfully.`);
  };

  const filtered = receipts.filter(r => {
    const matchesSearch = r.receiptNumber.includes(searchTerm) ||
      r.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.kebeleId.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Receipt Management</h2>
            <p className="text-gray-600">Search, reprint, or void receipts</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Receipt No, Name, Kebele ID..."
                className="pl-10 pr-4 py-3 border rounded-lg w-80 focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="voided">Voided</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resident</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-bold text-green-700">{r.receiptNumber}</td>
                  <td className="px-6 py-4 text-sm">
                    <div>
                      <p className="font-medium">{r.residentName}</p>
                      <p className="text-xs text-gray-500">ID: {r.kebeleId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{r.service}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">ETB {r.amount}</td>
                  <td className="px-6 py-4 text-sm">{r.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedReceipt(r);
                          setShowPrint(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FaPrint /> Reprint
                      </button>
                      {r.status === "completed" && (
                        <button
                          onClick={() => {
                            setSelectedReceipt(r);
                            setShowVoidModal(true);
                          }}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <FaTrash /> Void
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Void Modal */}
      {showVoidModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <FaExclamationTriangle className="text-3xl" />
              <h3 className="text-xl font-bold">Void Receipt</h3>
            </div>
            <p className="text-gray-700 mb-4">
              You are about to void receipt <strong>{selectedReceipt?.receiptNumber}</strong>.
              This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason for Voiding *</label>
              <textarea
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                rows="4"
                placeholder="e.g. Wrong amount entered, duplicate payment..."
                value={voidReason}
                onChange={(e) => setVoidReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleVoid}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
              >
                Confirm Void
              </button>
              <button
                onClick={() => {
                  setShowVoidModal(false);
                  setVoidReason("");
                  setSelectedReceipt(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Modal */}
      {showPrint && selectedReceipt && (
        <PrintReceiptModal
          receipt={{
            receiptNumber: selectedReceipt.receiptNumber,
            residentName: selectedReceipt.residentName,
            kebeleId: selectedReceipt.kebeleId,
            service: selectedReceipt.service,
            amount: selectedReceipt.amount,
            paymentMethod: selectedReceipt.paymentMethod,
            date: selectedReceipt.date,
          }}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default ReceiptManagement;