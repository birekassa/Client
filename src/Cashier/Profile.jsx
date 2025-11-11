import React, { useState } from 'react';
import { FaUserCircle, FaSave, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Cashier User',
    email: 'cashier@kebele.gov.et',
    phone: '+251 91 234 5678',
    position: 'Senior Cashier',
    address: 'Kebele Office, Woldia',
    dob: '1985-05-15',
  });
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
      <div className="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={profileData.fullName} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={profileData.email} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={profileData.phone} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input 
              type="text" 
              name="position"
              value={profileData.position} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              name="address"
              value={profileData.address} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="date" 
              name="dob"
              value={profileData.dob} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!editing}
            />
          </div>
          {editing ? (
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;