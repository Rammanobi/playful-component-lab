
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, CalendarDays } from 'lucide-react';
import { useLogDetails } from '@/hooks/useLogDetails';
import LogTabSection from '@/components/logs/LogTabSection';

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
    today
  } = useLogDetails(type);

  // Format the date for display
  const formattedDate = new Date(today).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="app-container page-transition">
      <Header title="Today's Logs" showBackButton />
      
      <div className="px-5 space-y-6">
        <Button variant="outline" onClick={() => navigate('/storage')} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Storage
        </Button>
        
        <div className="flex items-center justify-center mb-4 text-lg font-medium">
          <CalendarDays className="h-5 w-5 mr-2" />
          {formattedDate}
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
          />
        </Tabs>
      </div>
    </div>
  );
};

export default LogDetails;
