
import React from 'react';
import { exportDataAsText } from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

const ReadableReport = ({ onClose }) => {
  // Fix: Pass an empty object as argument to exportDataAsText
  const reportText = exportDataAsText({});
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl max-h-[90vh] bg-white rounded-lg overflow-hidden relative">
        <div className="sticky top-0 bg-white p-3 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Wellness Report</h3>
          <button 
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-4rem)]">
          <Card className="bg-white p-4 font-mono text-sm whitespace-pre-wrap">
            {reportText}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReadableReport;
