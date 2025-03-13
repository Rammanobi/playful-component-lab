
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import Rating from '@/components/ui/Rating';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveStressLog, getTodayData, getStressLogs } from '@/lib/storage';
import { StressLog } from '@/lib/types';

const StressManagement = () => {
  const navigate = useNavigate();
  const [morningCheckIn, setMorningCheckIn] = useState('08:00');
  const [eveningReview, setEveningReview] = useState('21:00');
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if today's data already exists
  useEffect(() => {
    const todayData = getTodayData<StressLog>(getStressLogs);
    if (todayData) {
      setMorningCheckIn(todayData.morningCheckIn);
      setEveningReview(todayData.eveningReview);
      setRating(todayData.rating);
      setNotes(todayData.notes);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const stressLog: StressLog = {
        id: generateId(),
        date: getCurrentDate(),
        rating,
        notes,
        morningCheckIn,
        eveningReview
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
        <Card className="bg-app-lightGray border border-gray-100">
          <TimeSelector
            label="Morning Check-in:"
            value={morningCheckIn}
            onChange={setMorningCheckIn}
          />
          
          <TimeSelector
            label="Evening Review:"
            value={eveningReview}
            onChange={setEveningReview}
          />
        </Card>
        
        <div className="mb-6">
          <label className="label-text block mb-3">Rate your stress level:</label>
          <Rating value={rating} onChange={setRating} />
        </div>
        
        <div className="mb-4">
          <label htmlFor="stressNotes" className="label-text block mb-2">
            How are you feeling today?
          </label>
          <textarea
            id="stressNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field h-32"
            placeholder="Describe your feelings and thoughts..."
          />
        </div>
        
        <button
          className="btn-primary w-full mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Stress Log'}
        </button>
      </div>
    </div>
  );
};

export default StressManagement;
