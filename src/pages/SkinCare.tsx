
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveSkincareRoutine, getSkincareRoutines } from '@/lib/storage';
import { SkincareRoutine } from '@/lib/types';
import { Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const SkinCare = () => {
  const navigate = useNavigate();
  const [reminderTime, setReminderTime] = useState('21:00');
  const [serum1, setSerum1] = useState(false);
  const [serum2, setSerum2] = useState(false);
  const [sunscreen, setSunscreen] = useState(false);
  const [moisturizer, setMoisturizer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if today's data already exists
  useEffect(() => {
    const todayData = getTodayData();
    if (todayData) {
      setReminderTime(todayData.reminderTime);
      setSerum1(todayData.serum1);
      setSerum2(todayData.serum2);
      setSunscreen(todayData.sunscreen);
      setMoisturizer(todayData.moisturizer);
    }
  }, []);

  // Helper function to get today's data
  const getTodayData = () => {
    const routines = getSkincareRoutines();
    const today = getCurrentDate();
    return routines.find(routine => routine.date === today);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get current time in HH:MM format
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      const skincareData: SkincareRoutine = {
        id: generateId(),
        date: getCurrentDate(),
        reminderTime,
        serum1,
        serum2,
        sunscreen,
        moisturizer,
        timestamp: currentTime
      };
      
      await saveSkincareRoutine(skincareData);
      toast.success('Skincare routine saved successfully');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error saving skincare routine:', error);
      toast.error('Failed to save skincare routine');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container page-transition">
      <Header title="Skincare Routine" showBackButton />
      
      <div className="px-5">
        <Card className="p-4 bg-app-lightGray border border-gray-100">
          <TimeSelector
            label="Reminder Time:"
            value={reminderTime}
            onChange={setReminderTime}
          />
        </Card>
        
        <Card className="mt-4 p-4">
          <div className="flex flex-col gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox id="serum1" checked={serum1} onCheckedChange={setSerum1} />
              <span className="text-lg text-app-darkGray">Serum 1</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox id="serum2" checked={serum2} onCheckedChange={setSerum2} />
              <span className="text-lg text-app-darkGray">Serum 2</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox id="sunscreen" checked={sunscreen} onCheckedChange={setSunscreen} />
              <span className="text-lg text-app-darkGray">Sunscreen</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox id="moisturizer" checked={moisturizer} onCheckedChange={setMoisturizer} />
              <span className="text-lg text-app-darkGray">Moisturizer</span>
            </label>
          </div>
        </Card>
        
        <div className="bg-white/50 p-4 rounded-lg my-4">
          <div className="text-center mb-2">
            <p className="text-gray-600 font-medium">
              Your skincare routine will be saved with the current time
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Time is automatically recorded when you save
            </p>
          </div>
        </div>
        
        <Button
          className="w-full mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Routine'}
        </Button>
      </div>
    </div>
  );
};

export default SkinCare;
