
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  getStorageSize, 
  createBackup, 
  importData, 
  clearAllStorage,
  getLastBackupDate,
  setLastBackupDate,
  exportDataAsText
} from '@/lib/storage';

export const useStorageManager = () => {
  const [storageSize, setStorageSize] = useState('Calculating...');
  const [lastBackup, setLastBackup] = useState('Never');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  const updateStorageInfo = () => {
    setStorageSize(getStorageSize());
    setLastBackup(getLastBackupDate());
  };
  
  useEffect(() => {
    updateStorageInfo();
  }, []);
  
  const handleViewReport = () => {
    setShowReport(true);
  };
  
  const handleCreateBackup = () => {
    try {
      const backup = createBackup();
      const dataStr = JSON.stringify(backup);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `wellness_backup_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setLastBackupDate();
      updateStorageInfo();
      toast.success('Backup created successfully');
    } catch (error) {
      console.error('Error creating backup:', error);
      toast.error('Failed to create backup');
    }
  };
  
  const handleExportData = () => {
    try {
      const backup = createBackup();
      const dataStr = JSON.stringify(backup, null, 2);
      const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `wellness_data_${new Date().toISOString().slice(0, 10)}.txt`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };
  
  const handleExportReadableData = () => {
    try {
      const textData = exportDataAsText();
      const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(textData);
      
      const exportFileDefaultName = `wellness_report_${new Date().toISOString().slice(0, 10)}.txt`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Human-readable report created successfully');
    } catch (error) {
      console.error('Error exporting readable data:', error);
      toast.error('Failed to create human-readable report');
    }
  };
  
  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          const result = importData(json);
          
          if (result) {
            updateStorageInfo();
            toast.success('Data imported successfully');
          } else {
            toast.error('Failed to import data');
          }
        } catch (error) {
          console.error('Error parsing import file:', error);
          toast.error('Failed to import data. Invalid file format.');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  const handleClearStorage = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllStorage();
      updateStorageInfo();
    }
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      updateStorageInfo();
      setIsRefreshing(false);
      toast.success('Storage information updated');
    }, 500);
  };

  return {
    storageSize,
    lastBackup,
    isRefreshing,
    showReport,
    setShowReport,
    handleViewReport,
    handleCreateBackup,
    handleExportData,
    handleExportReadableData,
    handleImportData,
    handleClearStorage,
    handleRefresh
  };
};
