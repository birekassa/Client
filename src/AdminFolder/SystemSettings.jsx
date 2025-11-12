// src/components/admin/SystemSettings.jsx
import React, { useState } from "react";
import {
  FaSave,
  FaUndo,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaPalette,
  FaEnvelope,
  FaGlobe,
  FaLock
} from "react-icons/fa";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "Woldia Kebele Management System",
    timezone: "Africa/Addis_Ababa",
    language: "am",
    dateFormat: "dd/MM/yyyy",
    
    // Security Settings
    passwordPolicy: "strong",
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    backupNotifications: true,
    securityAlerts: true,
    
    // Database Settings
    autoBackup: true,
    backupTime: "20:00",
    backupRetention: 30,
    
    // Appearance
    theme: "light",
    primaryColor: "green"
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // In real app, would save to backend
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings to default?")) {
      setSettings({
        systemName: "Woldia Kebele Management System",
        timezone: "Africa/Addis_Ababa",
        language: "am",
        dateFormat: "dd/MM/yyyy",
        passwordPolicy: "strong",
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        twoFactorAuth: false,
        emailNotifications: true,
        smsNotifications: false,
        backupNotifications: true,
        securityAlerts: true,
        autoBackup: true,
        backupTime: "20:00",
        backupRetention: 30,
        theme: "light",
        primaryColor: "green"
      });
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: FaGlobe },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "database", label: "Database", icon: FaDatabase },
    { id: "appearance", label: "Appearance", icon: FaPalette }
  ];

  const TabIcon = tabs.find(tab => tab.id === activeTab)?.icon || FaGlobe;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
            <p className="text-gray-600 mt-1">Configure system-wide settings and preferences (UC-006, UC-011, UC-015)</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <FaUndo className="text-sm" />
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaSave className="text-sm" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="text-sm" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-xl">
              <TabIcon className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </h3>
              <p className="text-gray-600">Configure {activeTab} related settings</p>
            </div>
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  value={settings.systemName}
                  onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Africa/Addis_Ababa">East Africa Time (EAT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="am">Amharic</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                  <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                  <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Policy
                </label>
                <select
                  value={settings.passwordPolicy}
                  onChange={(e) => setSettings({ ...settings, passwordPolicy: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="weak">Weak (4+ characters)</option>
                  <option value="medium">Medium (6+ characters, mixed case)</option>
                  <option value="strong">Strong (8+ characters, mixed case + numbers + symbols)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="5"
                  max="240"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="10"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-500">Extra security for user logins</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive system notifications via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive important alerts via SMS' },
                { key: 'backupNotifications', label: 'Backup Notifications', description: 'Get notified about backup status' },
                { key: 'securityAlerts', label: 'Security Alerts', description: 'Receive security-related notifications' }
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[key] ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Database Settings */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Automatic Backups
                  </label>
                  <p className="text-sm text-gray-500">Automatically backup the database daily</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, autoBackup: !settings.autoBackup })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoBackup ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Time
                </label>
                <input
                  type="time"
                  value={settings.backupTime}
                  onChange={(e) => setSettings({ ...settings, backupTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Retention (days)
                </label>
                <input
                  type="number"
                  value={settings.backupRetention}
                  onChange={(e) => setSettings({ ...settings, backupRetention: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="365"
                />
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['light', 'dark', 'auto'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setSettings({ ...settings, theme })}
                      className={`p-4 border-2 rounded-xl text-center transition-all ${
                        settings.theme === theme
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                        theme === 'light' ? 'bg-yellow-400' :
                        theme === 'dark' ? 'bg-gray-800' :
                        'bg-gradient-to-r from-yellow-400 to-gray-800'
                      }`} />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {theme}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['green', 'blue', 'purple', 'red'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSettings({ ...settings, primaryColor: color })}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        settings.primaryColor === color
                          ? 'border-gray-800 scale-105'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full mx-auto bg-${color}-500`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;