// src/components/admin/UserManagement.jsx
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaFilter,
  FaSync,
  FaDownload,
  FaEye,
  FaBan,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBuilding,
  FaUserShield, // Replaced FaShield with FaUserShield
  FaShieldAlt // Alternative shield icon
} from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Record Officer",
    department: "",
    status: "active"
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Departments based on roles
  const departments = {
    "System Administrator": ["IT Department", "System Administration"],
    "Record Officer": ["Records Office", "Registration Department"],
    "Cashier": ["Finance Office", "Revenue Department"]
  };

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockUsers = [
      {
        id: "U001",
        name: "AGUMAS BIRHANU",
        email: "agumas.birhanu@woldiakebele.gov.et",
        role: "System Administrator",
        department: "IT Department",
        status: "active",
        lastLogin: "2024-01-15 08:30:00",
        createdAt: "2024-01-01",
        phone: "+251911223344",
        avatar: "AB",
        permissions: ["all"],
        lastActive: "2 minutes ago"
      },
      {
        id: "U002",
        name: "MESERET KEBEDE",
        email: "meseret.kebede@woldiakebele.gov.et",
        role: "Record Officer",
        department: "Records Office",
        status: "active",
        lastLogin: "2024-01-15 09:15:00",
        createdAt: "2024-01-02",
        phone: "+251922334455",
        avatar: "MK",
        permissions: ["resident_register", "house_register", "reports_generate"],
        lastActive: "15 minutes ago"
      },
      {
        id: "U003",
        name: "TEWODROS MULATU",
        email: "tewodros.mulatu@woldiakebele.gov.et",
        role: "Cashier",
        department: "Finance Office",
        status: "active",
        lastLogin: "2024-01-14 14:20:00",
        createdAt: "2024-01-03",
        phone: "+251933445566",
        avatar: "TM",
        permissions: ["payment_process", "receipt_manage"],
        lastActive: "1 hour ago"
      },
      {
        id: "U004",
        name: "ELENI GIRMA",
        email: "eleni.girma@woldiakebele.gov.et",
        role: "Record Officer",
        department: "Records Office",
        status: "inactive",
        lastLogin: "2024-01-10 11:45:00",
        createdAt: "2024-01-04",
        phone: "+251944556677",
        avatar: "EG",
        permissions: ["resident_register", "reports_generate"],
        lastActive: "3 days ago"
      },
      {
        id: "U005",
        name: "DAWIT HAILE",
        email: "dawit.haile@woldiakebele.gov.et",
        role: "Cashier",
        department: "Finance Office",
        status: "suspended",
        lastLogin: "2024-01-08 16:30:00",
        createdAt: "2024-01-05",
        phone: "+251955667788",
        avatar: "DH",
        permissions: ["payment_process"],
        lastActive: "1 week ago"
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setLoading(false);
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter, users]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.department.trim()) errors.department = "Department is required";
    
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

  // Handle role change - reset department
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData(prev => ({
      ...prev,
      role,
      department: ""
    }));
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: `U${String(users.length + 1).padStart(3, '0')}`,
        ...formData,
        avatar: formData.name.split(' ').map(n => n[0]).join(''),
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString().split('T')[0],
        permissions: getDefaultPermissions(formData.role),
        lastActive: "Just now"
      };
      
      setUsers(prev => [newUser, ...prev]);
      setSubmitting(false);
      setShowAddModal(false);
      resetForm();
      
      // Show success message (you can replace with toast notification)
      alert(`User ${formData.name} added successfully!`);
    }, 1500);
  };

  // Edit user
  const handleEditUser = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers(prev => prev.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData, avatar: formData.name.split(' ').map(n => n[0]).join('') }
          : user
      ));
      
      setSubmitting(false);
      setShowEditModal(false);
      resetForm();
      
      alert(`User ${formData.name} updated successfully!`);
    }, 1500);
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setActionLoading(userId);
    // Simulate API call
    setTimeout(() => {
      setUsers(users.filter(user => user.id !== userId));
      setActionLoading(null);
    }, 1000);
  };

  // Toggle user status
  const handleToggleStatus = async (userId, currentStatus) => {
    setActionLoading(userId);
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    // Simulate API call
    setTimeout(() => {
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      setActionLoading(null);
    }, 800);
  };

  // View user details
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Reset password
  const handleResetPassword = (userId) => {
    if (window.confirm("Reset password for this user? They will receive an email with instructions.")) {
      // Simulate API call
      setTimeout(() => {
        alert("Password reset email sent successfully!");
      }, 1000);
    }
  };

  // Export data
  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `woldia_kebele_users_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Record Officer",
      department: "",
      status: "active"
    });
    setFormErrors({});
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      status: user.status
    });
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Get default permissions based on role
  const getDefaultPermissions = (role) => {
    const permissions = {
      "System Administrator": ["all"],
      "Record Officer": ["resident_register", "house_register", "reports_generate", "data_export"],
      "Cashier": ["payment_process", "receipt_manage", "reports_generate"]
    };
    return permissions[role] || [];
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: FaCheckCircle },
      inactive: { color: "bg-gray-100 text-gray-800", icon: FaBan },
      suspended: { color: "bg-red-100 text-red-800", icon: FaExclamationTriangle }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      "System Administrator": "bg-purple-100 text-purple-800",
      "Record Officer": "bg-blue-100 text-blue-800",
      "Cashier": "bg-green-100 text-green-800"
    };
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${roleColors[role] || "bg-gray-100 text-gray-800"}`}>
        {role}
      </span>
    );
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
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <div className="text-gray-600 mt-1">
              Manage system users, roles, and permissions (UC-002, UC-014)
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <FaDownload className="text-sm" />
              Export Data
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <FaUserPlus className="text-sm" />
              Add New User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Total Users</div>
              <div className="text-4xl font-bold mt-2">{users.length}</div>
            </div>
            <FaUserPlus className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Active Users</div>
              <div className="text-4xl font-bold mt-2">
                {users.filter(u => u.status === "active").length}
              </div>
            </div>
            <FaCheckCircle className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Record Officers</div>
              <div className="text-4xl font-bold mt-2">
                {users.filter(u => u.role === "Record Officer").length}
              </div>
            </div>
            <FaEdit className="text-6xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 shadow-xl hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg opacity-90">Cashiers</div>
              <div className="text-4xl font-bold mt-2">
                {users.filter(u => u.role === "Cashier").length}
              </div>
            </div>
            <FaUserPlus className="text-6xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Record Officer">Record Officer</option>
              <option value="Cashier">Cashier</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <FaSync className="text-sm" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Smart Users Table */}
<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500 text-sm" />
              User Information
            </div>
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
            Role & Department
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
            Status
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
            Last Activity
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaEdit className="text-gray-500 text-sm" />
              Actions
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {filteredUsers.map((user) => (
          <tr key={user.id} className="hover:bg-blue-50 transition-all duration-200 group">
            {/* User Column */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    user.status === 'active' ? 'bg-green-500' : 
                    user.status === 'inactive' ? 'bg-gray-400' : 'bg-red-500'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </div>
                    {user.role === "System Administrator" && (
                      <FaShieldAlt className="text-purple-500 text-xs" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {user.email}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1">
                    ID: {user.id}
                  </div>
                </div>
              </div>
            </td>

            {/* Role & Department Column */}
            <td className="px-6 py-4">
              <div className="space-y-2">
                <div>
                  {getRoleBadge(user.role)}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {user.department}
                </div>
              </div>
            </td>

            {/* Status Column */}
            <td className="px-6 py-4">
              {getStatusBadge(user.status)}
            </td>

            {/* Last Activity Column */}
            <td className="px-6 py-4 text-sm text-gray-600">
              <div className="space-y-1">
                <div className="font-medium">
                  {new Date(user.lastLogin).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(user.lastLogin).toLocaleTimeString()}
                </div>
              </div>
            </td>

            {/* Actions Column */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleViewUser(user)}
                  className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-100 group relative"
                  title="View User"
                >
                  <FaEye className="text-sm" />
                </button>
                <button
                  onClick={() => openEditModal(user)}
                  className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-lg hover:bg-green-100 group relative"
                  title="Edit User"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={() => handleToggleStatus(user.id, user.status)}
                  disabled={actionLoading === user.id}
                  className={`p-2 rounded-lg transition-colors group relative ${
                    user.status === "active" 
                      ? "text-orange-600 hover:text-orange-800 hover:bg-orange-100" 
                      : "text-green-600 hover:text-green-800 hover:bg-green-100"
                  } ${actionLoading === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={user.status === "active" ? "Deactivate User" : "Activate User"}
                >
                  {actionLoading === user.id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : user.status === "active" ? (
                    <FaBan className="text-sm" />
                  ) : (
                    <FaCheckCircle className="text-sm" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={actionLoading === user.id}
                  className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-100 group relative disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete User"
                >
                  {actionLoading === user.id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaTrash className="text-sm" />
                  )}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {filteredUsers.length === 0 && (
    <div className="text-center py-12">
      <FaUserPlus className="mx-auto text-4xl text-gray-300 mb-4" />
      <div className="text-gray-500 text-lg">No users found</div>
      <div className="text-gray-400 mt-1">Try adjusting your search or filters</div>
    </div>
  )}
</div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Add New User</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter full name"
                    />
                  </div>
                  {formErrors.name && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                  </div>
                  {formErrors.email && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="+251 XXX XXX XXX"
                    />
                  </div>
                  {formErrors.phone && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.phone}</div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <div className="relative">
                    <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleRoleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="System Administrator">System Administrator</option>
                      <option value="Record Officer">Record Officer</option>
                      <option value="Cashier">Cashier</option>
                    </select>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.department ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Department</option>
                      {departments[formData.role]?.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.department && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.department}</div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
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
                    <FaUserPlus className="text-sm" />
                  )}
                  {submitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <form onSubmit={handleEditUser} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.phone}</div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <div className="relative">
                    <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleRoleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="System Administrator">System Administrator</option>
                      <option value="Record Officer">Record Officer</option>
                      <option value="Cashier">Cashier</option>
                    </select>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.department ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Department</option>
                      {departments[formData.role]?.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.department && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.department}</div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
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

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">User Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xl">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{selectedUser.name}</h4>
                  <div className="text-gray-600">{selectedUser.email}</div>
                  <div className="flex gap-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Basic Information</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-medium">{selectedUser.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedUser.department}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Activity Information</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Login:</span>
                      <span className="font-medium">{new Date(selectedUser.lastLogin).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Active:</span>
                      <span className="font-medium">{selectedUser.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{selectedUser.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-medium text-gray-700 mb-3">Permissions</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {permission.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => handleResetPassword(selectedUser.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                >
                  <FaKey className="text-sm" />
                  Reset Password
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedUser);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <FaEdit className="text-sm" />
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;