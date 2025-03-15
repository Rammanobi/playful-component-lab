
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, Trash2, FileText, Eye } from 'lucide-react';

interface StorageActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const StorageActionButton: React.FC<StorageActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = "default"
}) => {
  return (
    <Button 
      className="w-full"
      variant={variant} 
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
};

interface StorageActionButtonsProps {
  onCreateBackup: () => void;
  onExportData: () => void;
  onExportReadableData: () => void;
  onViewReport: () => void;
  onImportData: () => void;
  onClearStorage: () => void;
}

const StorageActionButtons: React.FC<StorageActionButtonsProps> = ({
  onCreateBackup,
  onExportData,
  onExportReadableData,
  onViewReport,
  onImportData,
  onClearStorage
}) => {
  return (
    <div className="grid gap-4">
      <StorageActionButton
        icon={<Download className="mr-2 h-5 w-5" />}
        label="Create Backup"
        onClick={onCreateBackup}
      />
      
      <StorageActionButton
        icon={<Download className="mr-2 h-5 w-5" />}
        label="Export Raw Data"
        onClick={onExportData}
      />
      
      <StorageActionButton
        icon={<FileText className="mr-2 h-5 w-5" />}
        label="Export Readable Report"
        variant="secondary"
        onClick={onExportReadableData}
      />
      
      <StorageActionButton
        icon={<Eye className="mr-2 h-5 w-5" />}
        label="View Readable Report"
        variant="secondary"
        onClick={onViewReport}
      />
      
      <StorageActionButton
        icon={<Upload className="mr-2 h-5 w-5" />}
        label="Import Data"
        onClick={onImportData}
      />
      
      <StorageActionButton
        icon={<Trash2 className="mr-2 h-5 w-5" />}
        label="Clear Storage"
        variant="destructive"
        onClick={onClearStorage}
      />
    </div>
  );
};

export default StorageActionButtons;
