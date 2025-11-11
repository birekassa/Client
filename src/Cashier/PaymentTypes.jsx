import React, { useState } from 'react';
import { FaCreditCard, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const PaymentTypes = () => {
  const [paymentTypes, setPaymentTypes] = useState([
    { id: 'cash', name: 'Cash', description: 'Physical currency transactions', status: 'active' },
    { id: 'mobile', name: 'Mobile Banking', description: 'Mobile banking & digital wallets', status: 'active' },
    { id: 'bank', name: 'Bank Transfer', description: 'Direct bank transactions', status: 'active' },
  ]);
  const [newType, setNewType] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (editingId) {
      setPaymentTypes(paymentTypes.map(pt => pt.id === editingId ? { ...pt, ...newType } : pt));
      setEditingId(null);
    } else {
      const newId = `pt${paymentTypes.length + 1}`;
      setPaymentTypes([...paymentTypes, { id: newId, ...newType, status: 'active' }]);
    }
    setNewType({ name: '', description: '' });
  };

  const handleEdit = (pt) => {
    setNewType({ name: pt.name, description: pt.description });
    setEditingId(pt.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment type?')) {
      setPaymentTypes(paymentTypes.filter(pt => pt.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Payment Types</h2>
        <p className="text-gray-600">Manage available payment types</p>
      </div>

      {/* Form for Add/Edit */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{editingId ? 'Edit' : 'Add'} Payment Type</h3>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={newType.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter payment type name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={newType.description}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter description"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <FaPlus />
            {editingId ? 'Update' : 'Add'} Type
          </button>
        </form>
      </div>

      {/* List of Payment Types */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Payment Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentTypes.map((pt) => (
            <div key={pt.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaCreditCard className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{pt.name}</h3>
                  <p className="text-sm text-gray-600">{pt.description}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(pt)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(pt.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentTypes;