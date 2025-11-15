// Settings.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from '../ThemeContext';
import { useTranslation } from './useTranslation';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { 
    themeConfig, 
    mode, 
    themeBackups,
    updateThemeConfig, 
    setThemeMode, 
    resetTheme,
    createBackup,
    restoreBackup,
    deleteBackup,
    exportTheme,
    importTheme
  } = useTheme();
  
  const { t, language, changeLanguage } = useTranslation();
  
  const [profileData, setProfileData] = useState({
    firstName: "Council",
    lastName: "Member",
    email: "council@kebele.gov.et",
    phone: "+251 91 234 5678",
    role: "Administrator",
    department: "Social Justice Council"
  });

  const [preferences, setPreferences] = useState({
    language: language,
    notifications: true,
    autoSave: true,
    reportFrequency: "weekly"
  });

  const [backupName, setBackupName] = useState("");

  // Update preferences when language changes
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      language: language
    }));
  }, [language]);

  // Preset themes for quick selection
  const presetThemes = {
    blue: {
      primary: "#2563eb",
      primaryLight: "#3b82f6",
      primaryDark: "#1d4ed8",
      sidebarBg: "#1e3a8a",
      sidebarHover: "#1e40af",
      sidebarActive: "#3b82f6"
    },
    green: {
      primary: "#059669",
      primaryLight: "#10b981",
      primaryDark: "#047857",
      sidebarBg: "#065f46",
      sidebarHover: "#047857",
      sidebarActive: "#10b981"
    },
    purple: {
      primary: "#7c3aed",
      primaryLight: "#8b5cf6",
      primaryDark: "#6d28d9",
      sidebarBg: "#5b21b6",
      sidebarHover: "#6d28d9",
      sidebarActive: "#8b5cf6"
    },
    dark: {
      primary: "#3b82f6",
      primaryLight: "#60a5fa",
      primaryDark: "#2563eb",
      background: "#0f172a",
      surface: "#1e293b",
      card: "#1e293b",
      textPrimary: "#f1f5f9",
      textSecondary: "#cbd5e1",
      border: "#334155",
      sidebarBg: "#0f172a",
      sidebarText: "#f1f5f9",
      sidebarHover: "#1e293b",
      headerBg: "#1e293b",
      headerText: "#f1f5f9",
      headerBorder: "#334155"
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert(t.profileUpdated);
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleThemeChange = (key, value) => {
    updateThemeConfig({ [key]: value });
  };

  const applyPresetTheme = (themeName) => {
    updateThemeConfig(presetThemes[themeName]);
    if (themeName === 'dark') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  };

  const handleCreateBackup = () => {
    const name = backupName || `Backup-${new Date().toLocaleString()}`;
    createBackup(name);
    setBackupName("");
    alert(t.backupCreated);
  };

  const handleRestoreBackup = (backupId) => {
    if (restoreBackup(backupId)) {
      alert(t.themeRestored);
    } else {
      alert(t.restoreError);
    }
  };

  const handleDeleteBackup = (backupId) => {
    if (window.confirm(t.confirmDelete)) {
      deleteBackup(backupId);
      alert(t.backupDeleted);
    }
  };

  const handleImportTheme = (e) => {
    const file = e.target.files[0];
    if (file) {
      importTheme(file);
    }
  };

  const saveThemeSettings = () => {
    localStorage.setItem('kebeleTheme', JSON.stringify(themeConfig));
    localStorage.setItem('kebeleThemeMode', mode);
    alert(t.themeSaved);
  };

  return (
    <div className="space-y-6 theme-bg-surface min-h-screen p-6">
      {/* Header Section */}
      <div className="theme-card p-6 theme-border">
        <h2 className="text-2xl font-bold theme-text-primary mb-2">{t.councilSettings}</h2>
        <p className="theme-text-secondary">
          {t.settingsDescription}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 theme-card p-4 theme-border">
          <nav className="space-y-2">
            {[
              { id: "profile", label: `👤 ${t.profileSettings}`, icon: "👤" },
              { id: "preferences", label: `⚙️ ${t.systemPreferences}`, icon: "⚙️" },
              { id: "appearance", label: `🎨 ${t.appearanceTheme}`, icon: "🎨" },
              { id: "backups", label: `💾 ${t.themeBackups}`, icon: "💾" },
              { id: "notifications", label: `🔔 ${t.notifications}`, icon: "🔔" },
              { id: "security", label: `🔐 ${t.security}`, icon: "🔐" },
              { id: "team", label: `👥 ${t.teamManagement}`, icon: "👥" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors theme-border ${
                  activeTab === item.id
                    ? "theme-bg-primary text-white"
                    : "theme-text-secondary hover:theme-bg-surface"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 theme-card theme-border">
          {activeTab === "profile" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.profileSettings}</h3>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">
                      {t.firstName}
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({...prev, firstName: e.target.value}))}
                      className="theme-input w-full"
                      placeholder={t.firstName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">
                      {t.lastName}
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({...prev, lastName: e.target.value}))}
                      className="theme-input w-full"
                      placeholder={t.lastName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                      className="theme-input w-full"
                      placeholder={t.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                      className="theme-input w-full"
                      placeholder={t.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">
                      {t.role}
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      readOnly
                      className="theme-input w-full bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">
                      {t.department}
                    </label>
                    <input
                      type="text"
                      value={profileData.department}
                      readOnly
                      className="theme-input w-full bg-gray-100"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="theme-btn theme-btn-primary px-6 py-3">
                    {t.updateProfile}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.systemPreferences}</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Language Selection */}
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-3">
                      {t.language}
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className="theme-input w-full"
                    >
                      <option value="en">English</option>
                      <option value="am">አማርኛ (Amharic)</option>
                      <option value="om">Afaan Oromoo (Oromo)</option>
                    </select>
                  </div>

                  {/* Report Frequency */}
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-3">
                      {t.reportFrequency}
                    </label>
                    <select
                      value={preferences.reportFrequency}
                      onChange={(e) => handlePreferenceChange('reportFrequency', e.target.value)}
                      className="theme-input w-full"
                    >
                      <option value="weekly">{t.weekly}</option>
                      <option value="monthly">{t.monthly}</option>
                      <option value="quarterly">{t.quarterly}</option>
                    </select>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 theme-border rounded-lg">
                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-1">
                        {t.notifications}
                      </label>
                      <p className="text-sm theme-text-secondary">
                        {t.receiveNotifications}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Auto Save */}
                  <div className="flex items-center justify-between p-4 theme-border rounded-lg">
                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-1">
                        {t.autoSave}
                      </label>
                      <p className="text-sm theme-text-secondary">
                        {t.autoSaveDescription}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.autoSave}
                        onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t theme-border">
                  <button
                    onClick={() => alert('Preferences saved!')}
                    className="theme-btn theme-btn-primary px-6 py-3"
                  >
                    {t.savePreferences}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.appearanceTheme}</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-100 border border-purple-200 rounded-2xl p-6">
                  <h4 className="font-medium text-purple-800 mb-2">{t.themeCustomization}</h4>
                  <p className="text-purple-700 text-sm">
                    {t.themeCustomizationDesc}
                  </p>
                </div>

                {/* Theme Mode Selection */}
                <div className="theme-card p-6">
                  <label className="block text-sm font-medium theme-text-primary mb-3">
                    {t.themeMode}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'auto'].map((themeMode) => (
                      <button
                        key={themeMode}
                        onClick={() => setThemeMode(themeMode)}
                        className={`p-4 border-2 rounded-lg text-center capitalize theme-btn ${
                          mode === themeMode 
                            ? 'theme-border-primary theme-bg-primary text-white' 
                            : 'theme-border theme-text-secondary'
                        }`}
                      >
                        {t[themeMode] || themeMode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Themes */}
                <div className="theme-card p-6">
                  <label className="block text-sm font-medium theme-text-primary mb-3">
                    {t.presetThemes}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(presetThemes).map(([name, theme]) => (
                      <button
                        key={name}
                        onClick={() => applyPresetTheme(name)}
                        className="p-4 border-2 theme-border rounded-lg hover:theme-border-primary text-left"
                        style={{
                          background: `linear-gradient(135deg, ${theme.background || '#ffffff'} 50%, ${theme.primary} 50%)`
                        }}
                      >
                        <div className="text-center">
                          <div className="capitalize text-sm font-medium theme-text-primary">{name}</div>
                          <div className="flex justify-center gap-1 mt-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.sidebarBg }}></div>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.background || '#ffffff' }}></div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Configuration */}
                <div className="theme-card p-6">
                  <h4 className="text-lg font-semibold theme-text-primary mb-4">{t.customColors}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Primary Colors */}
                    <div className="space-y-4">
                      <h5 className="font-medium theme-text-primary border-b theme-border pb-2">{t.primaryColors}</h5>
                      {[
                        { key: 'primary', label: t.primaryColor, description: t.mainBrandColor },
                        { key: 'primaryLight', label: t.primaryLight, description: t.lighterPrimaryVariant },
                        { key: 'primaryDark', label: t.primaryDark, description: t.darkerPrimaryVariant }
                      ].map((colorConfig) => (
                        <div key={colorConfig.key} className="space-y-2">
                          <label className="block text-sm font-medium theme-text-secondary">
                            {colorConfig.label}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={themeConfig[colorConfig.key]}
                              onChange={(e) => handleThemeChange(colorConfig.key, e.target.value)}
                              className="w-12 h-12 rounded border theme-border cursor-pointer"
                            />
                            <div className="flex-1">
                              <input
                                type="text"
                                value={themeConfig[colorConfig.key]}
                                onChange={(e) => handleThemeChange(colorConfig.key, e.target.value)}
                                className="theme-input text-sm"
                              />
                              <p className="text-xs theme-text-secondary mt-1">{colorConfig.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sidebar Colors */}
                    <div className="space-y-4">
                      <h5 className="font-medium theme-text-primary border-b theme-border pb-2">{t.sidebarColors}</h5>
                      {[
                        { key: 'sidebarBg', label: t.background, description: t.sidebarBackground },
                        { key: 'sidebarText', label: t.textColor, description: t.sidebarTextColor },
                        { key: 'sidebarHover', label: t.hoverColor, description: t.hoverStateColor },
                        { key: 'sidebarActive', label: t.activeColor, description: t.activeItemColor }
                      ].map((colorConfig) => (
                        <div key={colorConfig.key} className="space-y-2">
                          <label className="block text-sm font-medium theme-text-secondary">
                            {colorConfig.label}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={themeConfig[colorConfig.key]}
                              onChange={(e) => handleThemeChange(colorConfig.key, e.target.value)}
                              className="w-12 h-12 rounded border theme-border cursor-pointer"
                            />
                            <div className="flex-1">
                              <input
                                type="text"
                                value={themeConfig[colorConfig.key]}
                                onChange={(e) => handleThemeChange(colorConfig.key, e.target.value)}
                                className="theme-input text-sm"
                              />
                              <p className="text-xs theme-text-secondary mt-1">{colorConfig.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* UI Colors */}
                    <div className="space-y-4">
                      <h5 className="font-medium theme-text-primary border-b theme-border pb-2">{t.interfaceColors}</h5>
                      {[
                        { key: 'background', label: t.background, description: t.mainBackgroundColor },
                        { key: 'textPrimary', label: t.mainTextColor, description: t.mainTextColor },
                        { key: 'textSecondary', label: t.secondaryTextColor, description: t.secondaryTextColor },
                        { key: 'border', label: t.defaultBorderColor, description: t.defaultBorderColor }
                      ].map((colorConfig) => (
                        <div key={colorConfig.key} className="space-y-2">
                          <label className="block text-sm font-medium theme-text-secondary">
                            {colorConfig.label}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={themeConfig[colorConfig.key]}
                              onChange={(e) => handleThemeChange(colorConfig.key, e.target.value)}
                              className="w-12 h-12 rounded border theme-border cursor-pointer"
                            />
                            <div className="flex-1">
                              <input
                                type="text"
                                value={themeConfig[colorConfig.key]}
                                onChange={(e) => handleThemeChange(colorConfig.key, e.target.value)}
                                className="theme-input text-sm"
                              />
                              <p className="text-xs theme-text-secondary mt-1">{colorConfig.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="theme-card p-6">
                  <label className="block text-sm font-medium theme-text-primary mb-3">
                    {t.livePreview}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <button className="theme-btn theme-btn-primary w-full py-3">{t.primaryButton}</button>
                      <button className="theme-btn theme-btn-secondary w-full py-3">{t.secondaryButton}</button>
                      <button className="theme-btn theme-btn-success w-full py-3">{t.successButton}</button>
                      <button className="theme-btn theme-btn-warning w-full py-3">{t.warningButton}</button>
                      <button className="theme-btn theme-btn-error w-full py-3">{t.errorButton}</button>
                    </div>
                    <div className="space-y-4">
                      <div className="theme-card p-4">
                        <h4 className="font-medium theme-text-primary">{t.sampleCard}</h4>
                        <p className="text-sm theme-text-secondary">{t.sampleCardDesc}</p>
                      </div>
                      <input 
                        type="text" 
                        placeholder={t.sampleInput} 
                        className="theme-input w-full p-3"
                      />
                      <div className="p-3 rounded-lg border-l-4 theme-border-light bg-gradient-to-r from-green-50 to-emerald-100">
                        <p className="text-sm theme-text-primary">{t.successMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t theme-border">
                  <button
                    onClick={resetTheme}
                    className="theme-btn theme-btn-secondary px-6 py-3"
                  >
                    {t.resetToDefault}
                  </button>
                  <button
                    onClick={saveThemeSettings}
                    className="theme-btn theme-btn-primary px-6 py-3"
                  >
                    {t.saveTheme}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "backups" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.themeBackups}</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-100 border border-blue-200 rounded-2xl p-6">
                  <h4 className="font-medium text-blue-800 mb-2">{t.backupRestore}</h4>
                  <p className="text-blue-700 text-sm">
                    {t.backupRestoreDesc}
                  </p>
                </div>

                {/* Create Backup */}
                <div className="theme-card p-6">
                  <h5 className="font-semibold theme-text-primary mb-4">{t.createNewBackup}</h5>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={backupName}
                      onChange={(e) => setBackupName(e.target.value)}
                      placeholder={t.backupNamePlaceholder}
                      className="theme-input flex-1"
                    />
                    <button
                      onClick={handleCreateBackup}
                      className="theme-btn theme-btn-success px-6 py-3"
                    >
                      {t.createBackup}
                    </button>
                  </div>
                </div>

                {/* Export/Import */}
                <div className="theme-card p-6">
                  <h5 className="font-semibold theme-text-primary mb-4">{t.exportImport}</h5>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={exportTheme}
                      className="theme-btn theme-btn-primary px-6 py-3"
                    >
                      {t.exportTheme}
                    </button>
                    <label className="theme-btn theme-btn-secondary px-6 py-3 cursor-pointer">
                      {t.importTheme}
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportTheme}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Existing Backups */}
                <div className="theme-card p-6">
                  <h5 className="font-semibold theme-text-primary mb-4">{t.existingBackups}</h5>
                  {themeBackups.length === 0 ? (
                    <p className="theme-text-secondary text-center py-8">{t.noBackups}</p>
                  ) : (
                    <div className="space-y-3">
                      {themeBackups.map((backup) => (
                        <div key={backup.id} className="flex items-center justify-between p-4 theme-border rounded-lg">
                          <div>
                            <p className="font-medium theme-text-primary">{backup.name}</p>
                            <p className="text-sm theme-text-secondary">
                              {new Date(backup.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRestoreBackup(backup.id)}
                              className="theme-btn theme-btn-success px-4 py-2 text-sm"
                            >
                              {t.restore}
                            </button>
                            <button
                              onClick={() => handleDeleteBackup(backup.id)}
                              className="theme-btn theme-btn-error px-4 py-2 text-sm"
                            >
                              {t.delete}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs can be added similarly */}
          {activeTab === "notifications" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.notifications}</h3>
              <p className="theme-text-secondary">{t.notificationsSettingsComingSoon}</p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.security}</h3>
              <p className="theme-text-secondary">{t.securitySettingsComingSoon}</p>
            </div>
          )}

          {activeTab === "team" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-6">{t.teamManagement}</h3>
              <p className="theme-text-secondary">{t.teamSettingsComingSoon}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;