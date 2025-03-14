
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveMealData } from '@/lib/storage';
import { MealData } from '@/lib/types';
import { Utensils } from 'lucide-react';

const FoodTracker = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mealTime, setMealTime] = useState('12:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      toast.error('Please enter a meal title');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get current time in HH:MM format
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      const mealData: MealData = {
        id: generateId(),
        date: getCurrentDate(),
        title,
        description,
        time: mealTime,
        timestamp: currentTime
      };
      
      await saveMealData(mealData);
      toast.success('Meal added successfully');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error saving meal data:', error);
      toast.error('Failed to save meal data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container page-transition">
      <Header title="Daily Food Tracker" showBackButton />
      
      <div className="px-5">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-green-400 to-blue-400 p-3 rounded-full">
            <Utensils className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <Card className="p-6 mb-6 shadow-lg bg-gradient-to-br from-white to-blue-50 border-none">
          <div className="mb-4">
            <label htmlFor="mealTitle" className="label-text block mb-2 font-medium">
              Meal Title
            </label>
            <input
              id="mealTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field focus:ring-green-400/30 transition-all duration-300"
              placeholder="Enter meal title"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="mealDescription" className="label-text block mb-2 font-medium">
              Meal Description
            </label>
            <textarea
              id="mealDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field h-32 focus:ring-green-400/30 transition-all duration-300"
              placeholder="Enter meal details"
            />
          </div>
          
          <div className="bg-white/50 p-4 rounded-lg mb-4">
            <TimeSelector
              label="Meal Time:"
              value={mealTime}
              onChange={setMealTime}
            />
          </div>
          
          <div className="bg-white/50 p-4 rounded-lg mb-6">
            <div className="text-center mb-2">
              <p className="text-gray-600 font-medium">
                Your meal log will be saved with the current time
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Time is automatically recorded when you save
              </p>
            </div>
          </div>
          
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:opacity-90 transition-all duration-200 w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Meal'}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default FoodTracker;
