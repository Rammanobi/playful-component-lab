
import React from 'react';
import StorageActionButtons from './StorageActionButtons';

interface StorageActionsProps {
  onCreateBackup: () => void;
  onExportData: () => void;
  onExportReadableData: () => void;
  onViewReport: () => void;
  onImportData: () => void;
  onClearStorage: () => void;
}

const StorageActions: React.FC<StorageActionsProps> = (props) => {
  return (
    <div className="space-y-6">
      <StorageActionButtons {...props} />
    </div>
  );
};

export default StorageActions;
