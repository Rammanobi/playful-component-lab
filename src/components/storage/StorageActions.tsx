
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
    <StorageActionButtons {...props} />
  );
};

export default StorageActions;
