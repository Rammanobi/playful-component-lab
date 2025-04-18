
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog } from '@/components/ui/dialog';
import Header from '@/components/layout/Header';
import LogTabSection from '@/components/logs/LogTabSection';
import { getAllLogs, deleteLogById } from '@/lib/storage';
import { getCurrentDate } from '@/lib/utils';
import DateSelector from '@/components/logs/DateSelector';
import EditLogModal from '@/components/logs/EditLogModal';

const LogDetails = () => {
  const { type } = useParams();
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [logs, setLogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [editInfo, setEditInfo] = useState(null);
  
  useEffect(() => {
    loadLogs();
  }, []);
  
  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const allLogs = await getAllLogs();
      setLogs(allLogs);
    } catch (error) {
      console.error('Error loading logs:', error);
      toast.error('Failed to load logs');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleEditLog = (type, logData) => {
    setEditInfo({ type, logData });
  };
  
  const handleSaveEdit = (updatedData) => {
    if (!editInfo) return;
    
    const typeMapping = {
      'sleep': 'sleepData',
      'meal': 'mealData',
      'stress': 'stressLogs',
      'skincare': 'skincareRoutines',
      'day': 'dayDescriptions'
    };
    
    const storageKey = typeMapping[editInfo.type];
    
    if (!storageKey) {
      toast.error('Invalid log type');
      return;
    }
    
    try {
      setLogs(prevLogs => {
        const updatedLogs = { ...prevLogs };
        if (updatedLogs[storageKey]) {
          updatedLogs[storageKey] = updatedLogs[storageKey].map(item => 
            item.id === updatedData.id ? updatedData : item
          );
        }
        return updatedLogs;
      });
      
      toast.success(`${editInfo.type} log updated successfully`);
    } catch (error) {
      console.error('Error saving log:', error);
      toast.error('Failed to save log');
    }
  };
  
  const handleDeleteLog = (type, id) => {
    setDeleteInfo({ type, id });
    setIsDeleteConfirmOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!deleteInfo) return;
    
    try {
      await deleteLogById(deleteInfo.type, deleteInfo.id);
      await loadLogs();
      toast.success('Log deleted successfully');
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting log:', error);
      toast.error('Failed to delete log');
    }
  };
  
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setDeleteInfo(null);
  };

  return (
    <div className="app-container page-transition">
      <Header title="Wellness Logs" showBackButton />
      
      <div className="px-5 py-4">
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          className="mb-6"
        />
        
        <LogTabSection 
          selectedDate={selectedDate}
          logs={logs}
          onEdit={handleEditLog}
          onDelete={handleDeleteLog}
          isLoading={isLoading}
        />
      </div>
      
      {editInfo && (
        <EditLogModal
          isOpen={!!editInfo}
          onClose={() => setEditInfo(null)}
          logType={editInfo.type}
          logData={editInfo.logData}
          onSave={handleSaveEdit}
        />
      )}
      
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this log? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LogDetails;
