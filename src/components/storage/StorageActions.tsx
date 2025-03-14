
import React from 'react';
import { Download, Upload, Trash2, FileText, Eye } from 'lucide-react';

interface StorageActionsProps {
  onCreateBackup: () => void;
  onExportData: () => void;
  onExportReadableData: () => void;
  onViewReport: () => void;
  onImportData: () => void;
  onClearStorage: () => void;
}

const StorageActions: React.FC<StorageActionsProps> = ({
  onCreateBackup,
  onExportData,
  onExportReadableData,
  onViewReport,
  onImportData,
  onClearStorage
}) => {
  return (
    <div className="grid gap-4">
      <button
        className="bg-gradient-to-r from-app-blue to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
        onClick={onCreateBackup}
      >
        <Download className="mr-2 h-5 w-5" />
        Create Backup
      </button>
      
      <button
        className="bg-gradient-to-r from-app-blue to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
        onClick={onExportData}
      >
        <Download className="mr-2 h-5 w-5" />
        Export Raw Data
      </button>
      
      <button
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:bg-purple-600 transition-all duration-200 flex items-center justify-center"
        onClick={onExportReadableData}
      >
        <FileText className="mr-2 h-5 w-5" />
        Export Readable Report
      </button>
      
      <button
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:bg-indigo-600 transition-all duration-200 flex items-center justify-center"
        onClick={onViewReport}
      >
        <Eye className="mr-2 h-5 w-5" />
        View Readable Report
      </button>
      
      <button
        className="bg-gradient-to-r from-app-blue to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:bg-app-blue/80 transition-all duration-200 flex items-center justify-center"
        onClick={onImportData}
      >
        <Upload className="mr-2 h-5 w-5" />
        Import Data
      </button>
      
      <button
        className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:bg-red-600 transition-all duration-200 flex items-center justify-center"
        onClick={onClearStorage}
      >
        <Trash2 className="mr-2 h-5 w-5" />
        Clear Storage
      </button>
    </div>
  );
};

export default StorageActions;
