
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import ReadableReport from '@/components/reports/ReadableReport';
import StorageInfo from '@/components/storage/StorageInfo';
import StorageActions from '@/components/storage/StorageActions';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useStorageManager } from '@/hooks/useStorageManager';

const Storage = () => {
  const navigate = useNavigate();
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
      
      <div className="px-5 space-y-6">
        <StorageActions 
          onCreateBackup={handleCreateBackup}
          onExportData={handleExportData}
          onExportReadableData={handleExportReadableData}
          onViewReport={handleViewReport}
          onImportData={handleImportData}
          onClearStorage={handleClearStorage}
        />
        
        <Button 
          variant="outline" 
          className="w-full flex justify-center items-center gap-2"
          onClick={() => navigate('/logs')}
        >
          <FileText className="h-5 w-5" />
          View Detailed Logs
        </Button>
        
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
