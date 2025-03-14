
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import Rating from '@/components/ui/Rating';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveStressLog, getTodayData, getStressLogs } from '@/lib/storage';
import { StressLog } from '@/lib/types';
import { Heart } from 'lucide-react';

const StressManagement = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if today's data already exists
  useEffect(() => {
    const todayData = getTodayData<StressLog>(getStressLogs);
    if (todayData) {
      setRating(todayData.rating);
      setNotes(todayData.notes);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get current time in HH:MM format
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      const stressLog: StressLog = {
        id: generateId(),
        date: getCurrentDate(),
        rating,
        notes,
        timestamp: currentTime
      };
      
      await saveStressLog(stressLog);
      toast.success('Stress log saved successfully');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error saving stress log:', error);
      toast.error('Failed to save stress log');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container page-transition">
      <Header title="Stress Management" showBackButton />
      
      <div className="px-5">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full">
            <Heart className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <Card className="p-6 mb-6 shadow-lg bg-gradient-to-br from-white to-purple-50 border-none">
          <div className="bg-white/50 p-4 rounded-lg mb-6">
            <div className="text-center mb-2">
              <p className="text-gray-600 font-medium">
                Your stress log will be saved with the current time
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Time is automatically recorded when you save
              </p>
            </div>
          </div>
          
          <div className="mb-6 bg-white/50 p-4 rounded-lg">
            <label className="label-text block mb-3 font-medium">Rate your stress level:</label>
            <Rating value={rating} onChange={setRating} />
          </div>
          
          <div className="mb-4">
            <label htmlFor="stressNotes" className="label-text block mb-2 font-medium">
              How are you feeling today?
            </label>
            <textarea
              id="stressNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field h-32 focus:ring-purple-400/30 transition-all duration-300"
              placeholder="Describe your feelings and thoughts..."
            />
          </div>
          
          <button
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg active:opacity-90 transition-all duration-200 w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Stress Log'}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default StressManagement;
