
import React from 'react';
import { Card } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

/**
 * Component to display storage usage information
 */
const StorageInfo = ({ 
  storageSize, 
  lastBackup, 
  isRefreshing, 
  onRefresh 
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Storage Information</h3>
        <button
          onClick={onRefresh}
          className="bg-app-gray hover:bg-gray-200 text-app-darkGray rounded-lg p-2 transition-colors"
          disabled={isRefreshing}
          title="Refresh storage info"
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Current Storage Usage</p>
          <p className="font-medium">{storageSize} KB</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Last Backup</p>
          <p className="font-medium">{lastBackup || 'No backups yet'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Storage Type</p>
          <p className="font-medium">Local Browser Storage</p>
        </div>
        
        <div className="text-xs text-gray-500 mt-6">
          <p>Note: Data is stored in your browser's local storage.</p>
          <p>Clearing browser data will delete your wellness information.</p>
          <p>Create regular backups to prevent data loss.</p>
        </div>
      </div>
    </Card>
  );
};

export default StorageInfo;
