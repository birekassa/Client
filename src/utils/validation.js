// src/utils/validation.js
export const validateResident = (data) => {
  const errors = {};

  // Required fields validation
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const birthDate = new Date(data.dateOfBirth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 0 || age > 120) {
      errors.dateOfBirth = 'Please enter a valid date of birth';
    }
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  if (!data.houseNumber?.trim()) {
    errors.houseNumber = 'House number is required';
  }

  if (!data.clearanceDoc && !data.id) {
    errors.clearanceDoc = 'Clearance document is required for new residents';
  }

  // Phone validation (if provided)
  if (data.phoneNumber && !/^\+?[\d\s-()]{10,}$/.test(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  return errors;
};