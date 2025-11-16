import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState({
    // Primary colors
    primary: '#2563eb',
    primaryLight: '#3b82f6',
    primaryDark: '#1d4ed8',
    
    // Secondary colors
    secondary: '#64748b',
    secondaryLight: '#94a3b8',
    secondaryDark: '#475569',
    
    // Background colors
    background: '#ffffff',
    surface: '#f8fafc',
    card: '#ffffff',
    
    // Text colors
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textInverted: '#ffffff',
    
    // Status colors
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0369a1',
    
    // Border colors
    border: '#e5e7eb',
    borderLight: '#f1f5f9',
    borderDark: '#d1d5db',
    
    // Sidebar specific
    sidebarBg: '#1e3a8a',
    sidebarText: '#ffffff',
    sidebarHover: '#1e40af',
    sidebarActive: '#3b82f6',
    
    // Header specific
    headerBg: '#ffffff',
    headerText: '#1f2937',
    headerBorder: '#e5e7eb',
    
    // Component specific
    buttonPrimary: '#2563eb',
    buttonSecondary: '#64748b',
    buttonSuccess: '#059669',
    buttonWarning: '#d97706',
    buttonError: '#dc2626',
    
    // Additional theme properties
    borderRadius: '8px',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    shadowLarge: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  });

  const [mode, setMode] = useState('light');
  const [themeBackups, setThemeBackups] = useState([]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('kebeleTheme');
    const savedMode = localStorage.getItem('kebeleThemeMode');
    const savedBackups = localStorage.getItem('kebeleThemeBackups');
    
    if (savedTheme) {
      setThemeConfig(JSON.parse(savedTheme));
    }
    if (savedMode) {
      setMode(savedMode);
    }
    if (savedBackups) {
      setThemeBackups(JSON.parse(savedBackups));
    }
  }, []);

  // Apply theme to CSS variables and save to localStorage
  useEffect(() => {
    applyThemeToCSS();
    localStorage.setItem('kebeleTheme', JSON.stringify(themeConfig));
    localStorage.setItem('kebeleThemeMode', mode);
  }, [themeConfig, mode]);

  const applyThemeToCSS = () => {
    const root = document.documentElement;
    
    // Apply all theme colors as CSS variables
    Object.entries(themeConfig).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Apply mode classes
    document.body.className = `theme-${mode}`;
    
    // Apply Tailwind-like classes for dynamic colors
    updateTailwindClasses();
  };

  const updateTailwindClasses = () => {
    // This function dynamically updates classes that can't be handled by CSS variables
    const style = document.createElement('style');
    style.textContent = `
      .theme-primary-bg { background-color: ${themeConfig.primary} !important; }
      .theme-primary-text { color: ${themeConfig.primary} !important; }
      .theme-primary-border { border-color: ${themeConfig.primary} !important; }
      
      .theme-sidebar-bg { background-color: ${themeConfig.sidebarBg} !important; }
      .theme-sidebar-text { color: ${themeConfig.sidebarText} !important; }
      .theme-sidebar-hover:hover { background-color: ${themeConfig.sidebarHover} !important; }
      .theme-sidebar-active { background-color: ${themeConfig.sidebarActive} !important; }
      
      .theme-header-bg { background-color: ${themeConfig.headerBg} !important; }
      .theme-header-text { color: ${themeConfig.headerText} !important; }
      .theme-header-border { border-color: ${themeConfig.headerBorder} !important; }
      
      .theme-button-primary { background-color: ${themeConfig.buttonPrimary} !important; }
      .theme-button-secondary { background-color: ${themeConfig.buttonSecondary} !important; }
      .theme-button-success { background-color: ${themeConfig.buttonSuccess} !important; }
      .theme-button-warning { background-color: ${themeConfig.buttonWarning} !important; }
      .theme-button-error { background-color: ${themeConfig.buttonError} !important; }
    `;
    
    // Remove existing dynamic styles
    const existingStyle = document.getElementById('dynamic-theme-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'dynamic-theme-styles';
    document.head.appendChild(style);
  };

  const updateThemeConfig = (newConfig) => {
    setThemeConfig(prev => ({ ...prev, ...newConfig }));
  };

  const setThemeMode = (newMode) => {
    setMode(newMode);
  };

  const createBackup = (name = `Backup-${new Date().toLocaleString()}`) => {
    const backup = {
      id: Date.now(),
      name,
      timestamp: new Date().toISOString(),
      themeConfig: { ...themeConfig },
      mode
    };
    
    const newBackups = [backup, ...themeBackups.slice(0, 9)]; // Keep only last 10 backups
    setThemeBackups(newBackups);
    localStorage.setItem('kebeleThemeBackups', JSON.stringify(newBackups));
    
    return backup;
  };

  const restoreBackup = (backupId) => {
    const backup = themeBackups.find(b => b.id === backupId);
    if (backup) {
      setThemeConfig(backup.themeConfig);
      setMode(backup.mode);
      return true;
    }
    return false;
  };

  const deleteBackup = (backupId) => {
    const newBackups = themeBackups.filter(b => b.id !== backupId);
    setThemeBackups(newBackups);
    localStorage.setItem('kebeleThemeBackups', JSON.stringify(newBackups));
  };

  const resetTheme = () => {
    const defaultTheme = {
      primary: '#2563eb',
      primaryLight: '#3b82f6',
      primaryDark: '#1d4ed8',
      secondary: '#64748b',
      secondaryLight: '#94a3b8',
      secondaryDark: '#475569',
      background: '#ffffff',
      surface: '#f8fafc',
      card: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textInverted: '#ffffff',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#0369a1',
      border: '#e5e7eb',
      borderLight: '#f1f5f9',
      borderDark: '#d1d5db',
      sidebarBg: '#1e3a8a',
      sidebarText: '#ffffff',
      sidebarHover: '#1e40af',
      sidebarActive: '#3b82f6',
      headerBg: '#ffffff',
      headerText: '#1f2937',
      headerBorder: '#e5e7eb',
      buttonPrimary: '#2563eb',
      buttonSecondary: '#64748b',
      buttonSuccess: '#059669',
      buttonWarning: '#d97706',
      buttonError: '#dc2626',
      borderRadius: '8px',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      shadowLarge: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    };
    
    setThemeConfig(defaultTheme);
    setMode('light');
  };

  const exportTheme = () => {
    const themeData = {
      themeConfig,
      mode,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kebele-theme-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTheme = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target.result);
        if (themeData.themeConfig) {
          setThemeConfig(themeData.themeConfig);
        }
        if (themeData.mode) {
          setMode(themeData.mode);
        }
        alert('Theme imported successfully!');
      } catch (error) {
        alert('Error importing theme: Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const value = {
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
    importTheme,
    applyThemeToCSS
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};