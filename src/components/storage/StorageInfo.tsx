
import React from 'react';
import { Card } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

interface StorageInfoProps {
  storageSize: string;
  lastBackup: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const StorageInfo: React.FC<StorageInfoProps> = ({
  storageSize,
  lastBackup,
  isRefreshing,
  onRefresh
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-app-darkGray">
          Storage Information
        </h2>
        <button
          onClick={onRefresh}
          className="bg-app-gray hover:bg-gray-200 text-app-darkGray rounded-lg p-2 transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <Card className="bg-gradient-to-br from-app-lightGray to-blue-50 border border-gray-100 shadow-md">
        <div className="p-4">
          <div className="text-lg text-app-darkGray font-medium">Storage Usage: <span className="text-app-blue">{storageSize}</span></div>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="text-lg text-app-darkGray font-medium">Last Backup: <span className="text-app-blue">{lastBackup}</span></div>
        </div>
      </Card>
    </div>
  );
};

export default StorageInfo;
