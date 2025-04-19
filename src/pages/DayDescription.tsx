
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveDayDescription, getTodayData, getDayDescriptions } from '@/lib/storage';
import { DayDescription as DayDescriptionType } from '@/lib/types';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DayDescription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayData, setTodayData] = useState<DayDescriptionType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if today's data already exists
  useEffect(() => {
    if (user) {
      loadTodayData();
    }
  }, [user]);
  
  const loadTodayData = async () => {
    setIsLoading(true);
    try {
      const data = await getTodayData<DayDescriptionType>(getDayDescriptions);
      if (data) {
        setTodayData(data);
        setDescription(data.description);
      } else {
        setTodayData(null);
        setDescription('');
      }
    } catch (error) {
      console.error('Error loading today data:', error);
      toast.error('Failed to load today data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get current time in HH:MM format
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      const dayData: DayDescriptionType = {
        id: generateId(),
        date: getCurrentDate(),
        description,
        timestamp: currentTime
      };
      
      await saveDayDescription(dayData);
      toast.success('Day description saved successfully');
      await loadTodayData();
    } catch (error) {
      console.error('Error saving day description:', error);
      toast.error('Failed to save day description');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await loadTodayData();
      toast.success('Data refreshed');
    }, 500);
  };

  if (!user) {
    return (
      <div className="app-container page-transition">
        <Header title="Day Description" showBackButton />
        <div className="px-5 py-12 text-center">
          <p>Please log in to access this feature.</p>
          <Button onClick={() => navigate('/auth')} className="mt-4">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container page-transition">
      <Header title="Day Description" showBackButton />
      
      <div className="px-5">
        <div className="mb-4">
          <label htmlFor="dayDescription" className="label-text block mb-2">
            Describe your day...
          </label>
          <textarea
            id="dayDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field h-48"
            placeholder="What happened today? How did you feel? What are you grateful for?"
          />
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg mb-4">
          <div className="text-center mb-2">
            <p className="text-gray-600 font-medium">
              Your day description will be saved with the current time
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Time is automatically recorded when you save
            </p>
          </div>
        </div>
        
        <button
          className="btn-primary w-full mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : 'Submit'}
        </button>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-app-darkGray">
              Current Day Details
            </h2>
            <button
              onClick={handleRefresh}
              className="bg-app-gray hover:bg-gray-200 text-app-darkGray rounded-lg p-2 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {isLoading ? (
            <Card className="py-6 flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span>Loading...</span>
            </Card>
          ) : todayData ? (
            <Card className="p-4">
              <p className="text-app-darkGray whitespace-pre-wrap">{todayData.description}</p>
              <div className="text-sm text-app-lightText mt-4">
                Saved on: {new Date(todayData.date).toLocaleDateString()} at {todayData.timestamp || 'unknown time'}
              </div>
            </Card>
          ) : (
            <Card className="text-center py-8 text-app-lightText">
              No entry for today yet
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayDescription;
