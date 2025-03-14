
import React from 'react';
import Header from '@/components/layout/Header';
import ReadableReport from '@/components/reports/ReadableReport';
import StorageInfo from '@/components/storage/StorageInfo';
import StorageActions from '@/components/storage/StorageActions';
import { useStorageManager } from '@/hooks/useStorageManager';

const Storage = () => {
  const {
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
  } = useStorageManager();

  return (
    <div className="app-container page-transition">
      <Header title="Storage Management" showBackButton />
      
      <div className="px-5">
        <StorageActions 
          onCreateBackup={handleCreateBackup}
          onExportData={handleExportData}
          onExportReadableData={handleExportReadableData}
          onViewReport={handleViewReport}
          onImportData={handleImportData}
          onClearStorage={handleClearStorage}
        />
        
        <StorageInfo
          storageSize={storageSize}
          lastBackup={lastBackup}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </div>
      
      {showReport && <ReadableReport onClose={() => setShowReport(false)} />}
    </div>
  );
};

export default Storage;
