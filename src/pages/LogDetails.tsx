
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, CalendarDays, Loader2 } from 'lucide-react';
import { useLogDetails } from '@/hooks/useLogDetails';
import LogTabSection from '@/components/logs/LogTabSection';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DateSelector from '@/components/logs/DateSelector';
import EditLogModal from '@/components/logs/EditLogModal';
import { parseDate, formatDateString } from '@/lib/utils';
import { toast } from 'sonner';

const LogDetails = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const {
    sleepData,
    mealData,
    stressLogs,
    skincareRoutines,
    dayDescriptions,
    deleteItem,
    updateItem,
    activeTab,
    setActiveTab,
    today,
    selectedDate,
    setSelectedDate,
    showAllDates,
    setShowAllDates,
    allDates,
    isLoading
  } = useLogDetails(type as string);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);
  const [currentEditType, setCurrentEditType] = useState<string>('');

  // Format the date for display
  const formatDateForDisplay = (dateStr: string) => {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditItem = (type: string, item: any) => {
    setCurrentEditType(type);
    setCurrentEditItem(item);
    setIsEditModalOpen(true);
  };

  // Fix the function signature to match EditLogModal's onSave prop
  const handleUpdateItem = async (updatedItem: any): Promise<void> => {
    try {
      await updateItem(currentEditType, updatedItem);
      toast.success('Log updated successfully');
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error('Failed to update log');
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDateString(date);
      setSelectedDate(formattedDate);
    }
  };

  const formattedDate = formatDateForDisplay(selectedDate);
  const isToday = selectedDate === today;
  
  // Convert string date to Date object for the DateSelector
  const selectedDateObj = parseDate(selectedDate);

  return (
    <div className="app-container page-transition">
      <Header title={showAllDates ? "All Logs" : (isToday ? "Today's Logs" : "Past Logs")} showBackButton />
      
      <div className="px-5 space-y-6">
        <Button variant="outline" onClick={() => navigate('/storage')} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Storage
        </Button>
        
        <div className="bg-muted/30 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-primary" />
              <span className="text-lg font-medium">{showAllDates ? "All Dates" : formattedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-all" 
                checked={showAllDates} 
                onCheckedChange={setShowAllDates}
              />
              <Label htmlFor="show-all">Show All</Label>
            </div>
          </div>
          
          {!showAllDates && (
            <DateSelector 
              selectedDate={selectedDateObj} 
              onSelectDate={handleDateChange} 
            />
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading logs...</span>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
              <TabsTrigger value="meal">Meals</TabsTrigger>
              <TabsTrigger value="stress">Stress</TabsTrigger>
              <TabsTrigger value="skincare">Skincare</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
            </TabsList>
            
            <LogTabSection
              sleepData={sleepData}
              mealData={mealData}
              stressLogs={stressLogs}
              skincareRoutines={skincareRoutines}
              dayDescriptions={dayDescriptions}
              onDelete={deleteItem}
              onEdit={handleEditItem}
              showDate={showAllDates}
            />
          </Tabs>
        )}
      </div>

      <EditLogModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        logItem={currentEditItem}
        logType={currentEditType}
        onSave={handleUpdateItem}
      />
    </div>
  );
};

export default LogDetails;
