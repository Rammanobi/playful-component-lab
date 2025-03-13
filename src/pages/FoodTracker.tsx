
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveMealData } from '@/lib/storage';
import { MealData } from '@/lib/types';

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
      const mealData: MealData = {
        id: generateId(),
        date: getCurrentDate(),
        title,
        description,
        time: mealTime
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
        <div className="mb-4">
          <label htmlFor="mealTitle" className="label-text block mb-2">
            Meal Title
          </label>
          <input
            id="mealTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Enter meal title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="mealDescription" className="label-text block mb-2">
            Meal Description
          </label>
          <textarea
            id="mealDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field h-32"
            placeholder="Enter meal details"
          />
        </div>
        
        <TimeSelector
          label="Meal Time:"
          value={mealTime}
          onChange={setMealTime}
        />
        
        <button
          className="btn-primary w-full mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Meal'}
        </button>
      </div>
    </div>
  );
};

export default FoodTracker;
