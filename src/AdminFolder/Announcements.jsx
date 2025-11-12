// src/components/admin/Announcements.jsx
import React, { useState, useEffect } from "react";
import {
  FaBullhorn,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaFilter
} from "react-icons/fa";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const mockAnnouncements = [
      {
        id: "A001",
        title: "System Maintenance Notice",
        content: "There will be a scheduled system maintenance on January 20, 2024 from 10:00 PM to 2:00 AM EAT. The system will be unavailable during this time.",
        author: "AGUMAS BIRHANU",
        priority: "high",
        status: "active",
        createdAt: "2024-01-15 08:30:00",
        expiresAt: "2024-01-21 00:00:00",
        audience: "all_users"
      },
      {
        id: "A002",
        title: "New Feature: Online Payment",
        content: "We are excited to announce the launch of online payment feature. Residents can now make payments through our secure portal.",
        author: "AGUMAS BIRHANU",
        priority: "medium",
        status: "active",
        createdAt: "2024-01-14 14:20:00",
        expiresAt: "2024-02-14 00:00:00",
        audience: "all_users"
      },
      {
        id: "A003",
        title: "Record Officer Training",
        content: "Mandatory training session for all record officers will be held on January 25, 2024 at the main office.",
        author: "AGUMAS BIRHANU",
        priority: "medium",
        status: "active",
        createdAt: "2024-01-13 11:15:00",
        expiresAt: "2024-01-25 23:59:00",
        audience: "record_officers"
      },
      {
        id: "A004",
        title: "Holiday Schedule Update",
        content: "Office will be closed for the upcoming holiday. Emergency services will remain available.",
        author: "AGUMAS BIRHANU",
        priority: "low",
        status: "inactive",
        createdAt: "2024-01-10 09:45:00",
        expiresAt: "2024-01-12 23:59:00",
        audience: "all_users"
      }
    ];

    setAnnouncements(mockAnnouncements);
    setFilteredAnnouncements(mockAnnouncements);
  }, []);

  useEffect(() => {
    let filtered = announcements;

    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(announcement => announcement.status === statusFilter);
    }

    setFilteredAnnouncements(filtered);
  }, [searchTerm, statusFilter, announcements]);

  const handleAddAnnouncement = () => setShowAddModal(true);
  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowEditModal(true);
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setAnnouncements(announcements.map(announcement =>
      announcement.id === id
        ? { ...announcement, status: announcement.status === "active" ? "inactive" : "active" }
        : announcement
    ));
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </span>
    );
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}>
        {status === "active" ? <FaEye className="text-xs" /> : <FaEyeSlash className="text-xs" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getAudienceBadge = (audience) => {
    const audienceMap = {
      all_users: "All Users",
      record_officers: "Record Officers",
      cashiers: "Cashiers",
      residents: "Residents"
    };
    return (
      <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        {audienceMap[audience] || audience}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
            <p className="text-gray-600 mt-1">Create and manage system-wide announcements (UC-008)</p>
          </div>
          <button
            onClick={handleAddAnnouncement}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <FaPlus className="text-sm" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Announcements</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{announcements.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaBullhorn className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {announcements.filter(a => a.status === "active").length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaEye className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {announcements.filter(a => a.priority === "high").length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <FaBullhorn className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {announcements.filter(a => new Date(a.expiresAt) < new Date()).length}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-xl">
              <FaCalendarAlt className="text-gray-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {announcement.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {getPriorityBadge(announcement.priority)}
                        {getStatusBadge(announcement.status)}
                        {getAudienceBadge(announcement.audience)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(announcement.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          announcement.status === "active"
                            ? "text-orange-600 hover:text-orange-900 hover:bg-orange-50"
                            : "text-green-600 hover:text-green-900 hover:bg-green-50"
                        }`}
                      >
                        {announcement.status === "active" ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={() => handleEditAnnouncement(announcement)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaUser className="text-xs" />
                      <span>By {announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      <span>Created: {new Date(announcement.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      <span>Expires: {new Date(announcement.expiresAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <FaBullhorn className="mx-auto text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No announcements found</p>
            <p className="text-gray-400 mt-1">Try adjusting your search or create a new announcement</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Create New Announcement</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">New announcement creation form would be implemented here.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  Create Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Edit Announcement</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Editing announcement: <strong>{selectedAnnouncement.title}</strong>
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;