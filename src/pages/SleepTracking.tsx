
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveSleepData, getTodayData, getSleepData } from '@/lib/storage';
import { SleepData } from '@/lib/types';

const sleepQualityOptions = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

const SleepTracking = () => {
  const navigate = useNavigate();
  const [morningReminder, setMorningReminder] = useState('08:00');
  const [hoursSlept, setHoursSlept] = useState('');
  const [quality, setQuality] = useState(sleepQualityOptions[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if today's data already exists
  useEffect(() => {
    const todayData = getTodayData<SleepData>(getSleepData);
    if (todayData) {
      setMorningReminder(todayData.morningReminder);
      setHoursSlept(todayData.hoursSlept.toString());
      setQuality(todayData.quality);
    }
  }, []);

  const handleSubmit = async () => {
    if (!hoursSlept) {
      toast.error('Please enter hours slept');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get current time in HH:MM format
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      const sleepData: SleepData = {
        id: generateId(),
        date: getCurrentDate(),
        hoursSlept: parseFloat(hoursSlept),
        quality,
        morningReminder,
        timestamp: currentTime
      };
      
      await saveSleepData(sleepData);
      toast.success('Sleep data saved successfully');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error saving sleep data:', error);
      toast.error('Failed to save sleep data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container page-transition">
      <Header title="Sleep Tracking" showBackButton />
      
      <div className="px-5">
        <Card className="bg-app-lightGray border border-gray-100">
          <TimeSelector
            label="Morning Reminder:"
            value={morningReminder}
            onChange={setMorningReminder}
          />
        </Card>

        <div className="flex gap-6 mb-4">
          <div className="flex-1">
            <label htmlFor="hoursSlept" className="label-text block mb-2">
              Hours Slept:
            </label>
            <input
              id="hoursSlept"
              type="number"
              value={hoursSlept}
              onChange={(e) => setHoursSlept(e.target.value)}
              min="0"
              max="24"
              step="0.5"
              className="input-field"
              placeholder="0.0"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="sleepQuality" className="label-text block mb-2">
              Sleep Quality:
            </label>
            <select
              id="sleepQuality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="time-select"
            >
              {sleepQualityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg mb-6">
          <div className="text-center mb-2">
            <p className="text-gray-600 font-medium">
              Your sleep data will be saved with the current time
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
          {isSubmitting ? 'Saving...' : 'Save Sleep Data'}
        </button>
      </div>
    </div>
  );
};

export default SleepTracking;
