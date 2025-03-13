
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveDayDescription, getTodayData, getDayDescriptions } from '@/lib/storage';
import { DayDescription as DayDescriptionType } from '@/lib/types';
import { RefreshCw } from 'lucide-react';

const DayDescription = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayData, setTodayData] = useState<DayDescriptionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if today's data already exists
  useEffect(() => {
    loadTodayData();
  }, []);
  
  const loadTodayData = () => {
    const data = getTodayData<DayDescriptionType>(getDayDescriptions);
    if (data) {
      setTodayData(data);
      setDescription(data.description);
    } else {
      setTodayData(null);
      setDescription('');
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const dayData: DayDescriptionType = {
        id: generateId(),
        date: getCurrentDate(),
        description
      };
      
      await saveDayDescription(dayData);
      toast.success('Day description saved successfully');
      loadTodayData();
    } catch (error) {
      console.error('Error saving day description:', error);
      toast.error('Failed to save day description');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadTodayData();
      setIsLoading(false);
      toast.success('Data refreshed');
    }, 500);
  };

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
        
        <button
          className="btn-primary w-full mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
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
          
          {todayData ? (
            <Card>
              <p className="text-app-darkGray whitespace-pre-wrap">{todayData.description}</p>
              <div className="text-sm text-app-lightText mt-4">
                Saved on: {new Date(todayData.date).toLocaleDateString()}
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
