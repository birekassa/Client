// src/components/admin/RolePermissions.jsx
import React, { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
  FaEye,
  FaTimes,
  FaKey,
  FaUserShield
} from "react-icons/fa";

const RolePermissions = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const permissionsList = [
    { id: "user_management", name: "User Management", category: "Administration" },
    { id: "role_management", name: "Role Management", category: "Administration" },
    { id: "audit_logs_view", name: "View Audit Logs", category: "Security" },
    { id: "backup_restore", name: "Backup & Restore", category: "System" },
    { id: "system_settings", name: "System Settings", category: "System" },
    { id: "reports_generate", name: "Generate Reports", category: "Reports" },
    { id: "announcements_manage", name: "Manage Announcements", category: "Communication" },
    { id: "resident_register", name: "Register Residents", category: "Records" },
    { id: "house_register", name: "Register Houses", category: "Records" },
    { id: "payment_process", name: "Process Payments", category: "Finance" },
    { id: "receipt_manage", name: "Manage Receipts", category: "Finance" },
    { id: "data_export", name: "Export Data", category: "Reports" }
  ];

  // Group permissions by category
  const permissionsByCategory = permissionsList.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  useEffect(() => {
    const mockRoles = [
      {
        id: "R001",
        name: "System Administrator",
        description: "Full system access with all permissions",
        userCount: 1,
        permissions: permissionsList.map(p => p.id),
        createdAt: "2024-01-01",
        isDefault: true
      },
      {
        id: "R002",
        name: "Record Officer",
        description: "Manage resident and house records, generate reports",
        userCount: 2,
        permissions: ["resident_register", "house_register", "reports_generate", "data_export"],
        createdAt: "2024-01-01",
        isDefault: true
      },
      {
        id: "R003",
        name: "Cashier",
        description: "Process payments and manage receipts",
        userCount: 2,
        permissions: ["payment_process", "receipt_manage", "reports_generate"],
        createdAt: "2024-01-01",
        isDefault: true
      },
      {
        id: "R004",
        name: "View Only",
        description: "Read-only access to reports and data",
        userCount: 0,
        permissions: ["reports_generate"],
        createdAt: "2024-01-10",
        isDefault: false
      }
    ];

    setRoles(mockRoles);
    setFilteredRoles(mockRoles);
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [searchTerm, roles]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Role name is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (formData.permissions.length === 0) errors.permissions = "At least one permission is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle permission toggle
  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
    
    // Clear permissions error
    if (formErrors.permissions) {
      setFormErrors(prev => ({
        ...prev,
        permissions: ""
      }));
    }
  };

  // Select all permissions in category
  const handleSelectAllInCategory = (category) => {
    const categoryPermissions = permissionsByCategory[category].map(p => p.id);
    const allSelected = categoryPermissions.every(p => formData.permissions.includes(p));
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(p => !categoryPermissions.includes(p))
        : [...new Set([...prev.permissions, ...categoryPermissions])]
    }));
  };

  // Add new role
  const handleAddRole = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRole = {
        id: `R${String(roles.length + 1).padStart(3, '0')}`,
        ...formData,
        userCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isDefault: false
      };
      
      setRoles(prev => [newRole, ...prev]);
      setSubmitting(false);
      setShowAddModal(false);
      resetForm();
      
      alert(`Role "${formData.name}" created successfully!`);
    }, 1500);
  };

  // Edit role
  const handleEditRole = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setRoles(prev => prev.map(role =>
        role.id === selectedRole.id
          ? { ...role, ...formData }
          : role
      ));
      
      setSubmitting(false);
      setShowEditModal(false);
      resetForm();
      
      alert(`Role "${formData.name}" updated successfully!`);
    }, 1500);
  };

  // Delete role
  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    if (role.isDefault) {
      alert("Default roles cannot be deleted.");
      return;
    }

    if (role.userCount > 0) {
      alert("Cannot delete role that has assigned users. Please reassign users first.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`)) return;
    
    setRoles(roles.filter(role => role.id !== roleId));
  };

  // View role details
  const handleViewRole = (role) => {
    setSelectedRole(role);
    setShowViewModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: []
    });
    setFormErrors({});
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (role) => {
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const getPermissionColor = (permission) => {
    const colors = {
      user_management: "bg-red-100 text-red-800 border-red-200",
      role_management: "bg-purple-100 text-purple-800 border-purple-200",
      system_settings: "bg-orange-100 text-orange-800 border-orange-200",
      resident_register: "bg-blue-100 text-blue-800 border-blue-200",
      house_register: "bg-indigo-100 text-indigo-800 border-indigo-200",
      payment_process: "bg-green-100 text-green-800 border-green-200",
      receipt_manage: "bg-emerald-100 text-emerald-800 border-emerald-200",
      reports_generate: "bg-cyan-100 text-cyan-800 border-cyan-200",
      data_export: "bg-teal-100 text-teal-800 border-teal-200",
      audit_logs_view: "bg-amber-100 text-amber-800 border-amber-200",
      backup_restore: "bg-gray-100 text-gray-800 border-gray-200",
      announcements_manage: "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colors[permission] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPermissionName = (permissionId) => {
    const permission = permissionsList.find(p => p.id === permissionId);
    return permission ? permission.name : permissionId.replace(/_/g, ' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Role & Permissions Management</h2>
            <div className="text-gray-600 mt-1">Manage system roles and their permissions (UC-003)</div>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <FaPlus className="text-sm" />
            Add New Role
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Total Roles</div>
              <div className="text-4xl font-bold mt-2">{roles.length}</div>
            </div>
            <FaShieldAlt className="text-6xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Default Roles</div>
              <div className="text-4xl font-bold mt-2">
                {roles.filter(r => r.isDefault).length}
              </div>
            </div>
            <FaUsers className="text-6xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Custom Roles</div>
              <div className="text-4xl font-bold mt-2">
                {roles.filter(r => !r.isDefault).length}
              </div>
            </div>
            <FaPlus className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{role.name}</h3>
                    {role.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm">{role.description}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewRole(role)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title="View Role"
                  >
                    <FaEye className="text-sm" />
                  </button>
                  <button
                    onClick={() => openEditModal(role)}
                    className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                    title="Edit Role"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                  {!role.isDefault && (
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Role"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <FaUsers className="text-gray-400" />
                    {role.userCount} users
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FaKey className="text-gray-400" />
                    {role.permissions.length} permissions
                  </span>
                </div>
                <span className="text-xs text-gray-400">Created: {role.createdAt}</span>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Key Permissions:</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.slice(0, 6).map((permission) => (
                    <span
                      key={permission}
                      className={`text-xs px-3 py-1.5 rounded-full border ${getPermissionColor(permission)}`}
                    >
                      {getPermissionName(permission)}
                    </span>
                  ))}
                  {role.permissions.length > 6 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                      +{role.permissions.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Create New Role</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <form onSubmit={handleAddRole} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Role Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter role name"
                  />
                  {formErrors.name && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe the role's purpose and responsibilities"
                  />
                  {formErrors.description && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.description}</div>
                  )}
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Permissions *
                  </label>
                  {formErrors.permissions && (
                    <div className="text-red-500 text-sm mb-3">{formErrors.permissions}</div>
                  )}
                  
                  <div className="space-y-4">
                    {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                      <div key={category} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800">{category}</h4>
                          <button
                            type="button"
                            onClick={() => handleSelectAllInCategory(category)}
                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                          >
                            {permissions.every(p => formData.permissions.includes(p.id)) 
                              ? "Deselect All" 
                              : "Select All"
                            }
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {permissions.map((permission) => (
                            <label key={permission.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.permissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                              />
                              <span className="text-sm text-gray-700">{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaPlus className="text-sm" />
                  )}
                  {submitting ? "Creating..." : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Edit Role: {selectedRole.name}</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <form onSubmit={handleEditRole} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Role Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.description && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.description}</div>
                  )}
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Permissions *
                  </label>
                  {formErrors.permissions && (
                    <div className="text-red-500 text-sm mb-3">{formErrors.permissions}</div>
                  )}
                  
                  <div className="space-y-4">
                    {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                      <div key={category} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800">{category}</h4>
                          <button
                            type="button"
                            onClick={() => handleSelectAllInCategory(category)}
                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                          >
                            {permissions.every(p => formData.permissions.includes(p.id)) 
                              ? "Deselect All" 
                              : "Select All"
                            }
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {permissions.map((permission) => (
                            <label key={permission.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.permissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                              />
                              <span className="text-sm text-gray-700">{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaEdit className="text-sm" />
                  )}
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Role Modal */}
      {showViewModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Role Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  <FaUserShield />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{selectedRole.name}</h4>
                  <div className="text-gray-600">{selectedRole.description}</div>
                  <div className="flex gap-2 mt-2">
                    {selectedRole.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        Default Role
                      </span>
                    )}
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {selectedRole.userCount} users
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Role Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role ID:</span>
                      <span className="font-medium">{selectedRole.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Permissions:</span>
                      <span className="font-medium">{selectedRole.permissions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{selectedRole.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-700 mb-3">All Permissions</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedRole.permissions.map((permission) => (
                    <span
                      key={permission}
                      className={`text-xs px-3 py-1.5 rounded-full border ${getPermissionColor(permission)}`}
                    >
                      {getPermissionName(permission)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedRole);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <FaEdit className="text-sm" />
                  Edit Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissions;