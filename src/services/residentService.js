// src/services/residentService.js
const API_BASE_URL = 'http://localhost:8000/api'; // Adjust based on your backend

export const residentService = {
  // Get all residents
  async getResidents() {
    const response = await fetch(`${API_BASE_URL}/residents`);
    if (!response.ok) throw new Error('Failed to fetch residents');
    return response.json();
  },

  // Add new resident
  async addResident(residentData) {
    const formData = new FormData();
    
    // Append all form data
    Object.keys(residentData).forEach(key => {
      if (residentData[key] !== null && residentData[key] !== undefined) {
        formData.append(key, residentData[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/residents`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to add resident');
    return response.json();
  },

  // Update resident
  async updateResident(id, residentData) {
    const formData = new FormData();
    
    Object.keys(residentData).forEach(key => {
      if (residentData[key] !== null && residentData[key] !== undefined) {
        formData.append(key, residentData[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/residents/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to update resident');
    return response.json();
  },

  // Delete resident
  async deleteResident(id) {
    const response = await fetch(`${API_BASE_URL}/residents/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete resident');
    return response.json();
  },

  // Check if resident exists
  async checkExistingResident(data) {
    const response = await fetch(`${API_BASE_URL}/residents/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
      }),
    });

    if (!response.ok) throw new Error('Failed to check resident');
    return response.json();
  }
};