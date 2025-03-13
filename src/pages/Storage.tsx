
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import { 
  getStorageSize, 
  createBackup, 
  importData, 
  clearAllStorage,
  getLastBackupDate,
  setLastBackupDate
} from '@/lib/storage';
import { Download, Upload, Trash2, RefreshCw } from 'lucide-react';

const Storage = () => {
  const [storageSize, setStorageSize] = useState('Calculating...');
  const [lastBackup, setLastBackup] = useState('Never');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    updateStorageInfo();
  }, []);
  
  const updateStorageInfo = () => {
    setStorageSize(getStorageSize());
    setLastBackup(getLastBackupDate());
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

  return (
    <div className="app-container page-transition">
      <Header title="Storage Management" showBackButton />
      
      <div className="px-5">
        <div className="grid gap-4">
          <button
            className="bg-app-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-app-blue/90 active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
            onClick={handleCreateBackup}
          >
            <Download className="mr-2 h-5 w-5" />
            Create Backup
          </button>
          
          <button
            className="bg-app-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-app-blue/90 active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
            onClick={handleExportData}
          >
            <Download className="mr-2 h-5 w-5" />
            Export Data
          </button>
          
          <button
            className="bg-app-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-app-blue/90 active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
            onClick={handleImportData}
          >
            <Upload className="mr-2 h-5 w-5" />
            Import Data
          </button>
          
          <button
            className="bg-app-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-app-blue/90 active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
            onClick={handleClearStorage}
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Clear Storage
          </button>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-app-darkGray">
              Storage Information
            </h2>
            <button
              onClick={handleRefresh}
              className="bg-app-gray hover:bg-gray-200 text-app-darkGray rounded-lg p-2 transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <Card className="bg-app-lightGray border border-gray-100">
            <div className="py-2">
              <div className="text-lg text-app-darkGray">Storage Usage: {storageSize}</div>
            </div>
            <div className="py-2">
              <div className="text-lg text-app-darkGray">Last Backup: {lastBackup}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Storage;
