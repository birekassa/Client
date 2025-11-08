// src/components/RegisterResident/RegisterResident.jsx
import React, { useState, useEffect } from 'react';
import ResidentForm from './ResidentForm.jsx';
import ResidentList from './ResidentList.jsx';
import { residentService } from '../../services/residentService';

const RegisterResident = () => {
  const [residents, setResidents] = useState([]);
  const [editingResident, setEditingResident] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('list'); // 'list' or 'form'

  // Mock data for demonstration - remove this when you have real backend
  const mockResidents = [
    {
      id: '1',
      resident_name: 'John Smith',
      gender: 'Male',
      age: '35',
      occupation: 'Teacher',
      id_number: 'ET001234',
      issued_date: '2023-01-15'
    },
    {
      id: '2', 
      resident_name: 'Mary Johnson',
      gender: 'Female',
      age: '28',
      occupation: 'Nurse',
      id_number: 'ET001235',
      issued_date: '2023-02-20'
    }
  ];

  // Load residents on component mount
  useEffect(() => {
    loadResidents();
  }, []);

  const loadResidents = async () => {
    try {
      setLoading(true);
      // For now, use mock data. Replace with actual API call later
      // const data = await residentService.getResidents();
      setResidents(mockResidents);
    } catch (error) {
      console.error('Error loading residents:', error);
      // Fallback to mock data if API fails
      setResidents(mockResidents);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResident = async (residentData) => {
    try {
      if (editingResident) {
        // Update existing resident
        // await residentService.updateResident(editingResident.id, residentData);
        console.log('Updating resident:', residentData);
        
        // Update local state for demo
        setResidents(prev => prev.map(r => 
          r.id === editingResident.id ? { ...residentData, id: editingResident.id } : r
        ));
      } else {
        // Add new resident
        // await residentService.addResident(residentData);
        console.log('Adding new resident:', residentData);
        
        // Add to local state for demo
        const newResident = {
          ...residentData,
          id: Date.now().toString() // Generate temporary ID
        };
        setResidents(prev => [...prev, newResident]);
      }
      
      // await loadResidents(); // Uncomment when using real API
      setView('list');
      setEditingResident(null);
    } catch (error) {
      console.error('Error saving resident:', error);
      throw error;
    }
  };

  const handleEditResident = (resident) => {
    setEditingResident(resident);
    setView('form');
  };

  const handleDeleteResident = async (id) => {
    if (window.confirm('Are you sure you want to delete this resident?')) {
      try {
        // await residentService.deleteResident(id);
        console.log('Deleting resident:', id);
        
        // Update local state for demo
        setResidents(prev => prev.filter(r => r.id !== id));
        // await loadResidents(); // Uncomment when using real API
      } catch (error) {
        console.error('Error deleting resident:', error);
      }
    }
  };

  const handleNewResident = () => {
    setEditingResident(null);
    setView('form');
  };

  const handleCancelForm = () => {
    setView('list');
    setEditingResident(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Action Bar - Only show when in list view */}
        {view === 'list' && (
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleNewResident}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Register New Resident
              </button>
              <button
                onClick={loadResidents}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow">
              Total Residents: <span className="font-semibold text-blue-600">{residents.length}</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {view === 'list' ? (
            /* Residents List */
            <ResidentList
              residents={residents}
              loading={loading}
              onEdit={handleEditResident}
              onDelete={handleDeleteResident}
            />
          ) : (
            /* Resident Form - Inline */
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingResident ? 'Edit Resident' : 'Register New Resident'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {editingResident 
                    ? 'Update resident information below' 
                    : 'Fill in the resident details below to register a new resident'
                  }
                </p>
              </div>
              
              {/* The form will now display inline here */}
              <ResidentForm
                resident={editingResident}
                onSubmit={handleAddResident}
                onCancel={handleCancelForm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterResident;