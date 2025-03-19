
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, CalendarDays, Calendar, ListFilter } from 'lucide-react';
import { useLogDetails } from '@/hooks/useLogDetails';
import LogTabSection from '@/components/logs/LogTabSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
    activeTab,
    setActiveTab,
    today,
    selectedDate,
    setSelectedDate,
    showAllDates,
    setShowAllDates,
    allDates
  } = useLogDetails(type);

  // Format the date for display
  const formatDateForDisplay = (dateStr: string) => {
    const [day, month, year] = dateStr.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formattedDate = formatDateForDisplay(selectedDate);
  const isToday = selectedDate === today;

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
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {allDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {date === today ? `Today (${date})` : formatDateForDisplay(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        
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
            showDate={showAllDates}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default LogDetails;
