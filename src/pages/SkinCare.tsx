
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveSkincareRoutine, getSkincareRoutines } from '@/lib/storage';
import { SkincareRoutine } from '@/lib/types';
import { Button } from '@/components/ui/button';
import MorningRoutine from '@/components/skincare/MorningRoutine';
import MiddayRoutine from '@/components/skincare/MiddayRoutine';
import EveningRoutine from '@/components/skincare/EveningRoutine';
import NightRoutine from '@/components/skincare/NightRoutine';
import SmartTips from '@/components/skincare/SmartTips';

const SkinCare = () => {
  const navigate = useNavigate();
  const [reminderTime, setReminderTime] = useState('21:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Morning routine tasks
  const [ahaFaceWash, setAhaFaceWash] = useState(false);
  const [teaTreeToner, setTeaTreeToner] = useState(false);
  const [vitaminB5Morning, setVitaminB5Morning] = useState(false);
  const [sunscreenMorning, setSunscreenMorning] = useState(false);
  
  // Midday tasks
  const [sunscreenReapply, setSunscreenReapply] = useState(false);
  
  // Evening tasks (day-specific)
  const [poreSerum, setPoreSerum] = useState(false);
  const [salicylicSerum, setSalicylicSerum] = useState(false);
  const [niacinamideSerum, setNiacinamideSerum] = useState(false);
  const [clayMask, setClayMask] = useState(false);
  const [vitaminB5Evening, setVitaminB5Evening] = useState(false);
  
  // Night tasks
  const [pilgrimToner, setPilgrimToner] = useState(false);
  const [vitaminB5Night, setVitaminB5Night] = useState(false);

  // Get current day and date
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const getCurrentDateFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentDay = getCurrentDay();
  const formattedDate = getCurrentDateFormatted();

  // Determine evening routine based on day
  const getEveningRoutine = () => {
    const day = currentDay;
    if (['Monday', 'Thursday', 'Sunday'].includes(day)) {
      return 'pore';
    } else if (['Tuesday', 'Friday'].includes(day)) {
      return 'salicylic';
    } else if (['Wednesday', 'Saturday'].includes(day)) {
      return 'niacinamide';
    }
    return 'pore';
  };

  const shouldShowClayMask = () => {
    return ['Wednesday', 'Saturday'].includes(currentDay);
  };

  const eveningRoutineType = getEveningRoutine();

  // Check if today's data already exists
  useEffect(() => {
    const fetchTodayData = async () => {
      const todayData = await getTodayData();
      if (todayData) {
        setReminderTime(todayData.reminderTime);
        // Set existing data if available
        setAhaFaceWash(todayData.serum1 || false);
        setTeaTreeToner(todayData.serum2 || false);
        setSunscreenMorning(todayData.sunscreen || false);
        setVitaminB5Morning(todayData.moisturizer || false);
      }
    };
    
    fetchTodayData();
  }, []);

  // Helper function to get today's data
  const getTodayData = async () => {
    const routines = await getSkincareRoutines();
    const today = getCurrentDate();
    return routines.find(routine => routine.date === today);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      
      const skincareData: SkincareRoutine = {
        id: generateId(),
        date: getCurrentDate(),
        reminderTime,
        serum1: ahaFaceWash,
        serum2: teaTreeToner,
        sunscreen: sunscreenMorning,
        moisturizer: vitaminB5Morning,
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
      <Header title={`Skincare Routine - ${currentDay}`} showBackButton />
      
      <div className="px-5 pb-6">
        {/* Date Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {formattedDate}
          </h2>
          <p className="text-center text-gray-600 text-sm mt-1">
            "Start your day with care — glow begins within."
          </p>
        </div>

        {/* Morning Routine */}
        <MorningRoutine
          ahaFaceWash={ahaFaceWash}
          setAhaFaceWash={setAhaFaceWash}
          teaTreeToner={teaTreeToner}
          setTeaTreeToner={setTeaTreeToner}
          vitaminB5Morning={vitaminB5Morning}
          setVitaminB5Morning={setVitaminB5Morning}
          sunscreenMorning={sunscreenMorning}
          setSunscreenMorning={setSunscreenMorning}
        />

        {/* Midday Routine */}
        <MiddayRoutine
          sunscreenReapply={sunscreenReapply}
          setSunscreenReapply={setSunscreenReapply}
        />

        {/* Evening Routine */}
        <EveningRoutine
          currentDay={currentDay}
          eveningRoutineType={eveningRoutineType}
          shouldShowClayMask={shouldShowClayMask()}
          poreSerum={poreSerum}
          setPoreSerum={setPoreSerum}
          salicylicSerum={salicylicSerum}
          setSalicylicSerum={setSalicylicSerum}
          niacinamideSerum={niacinamideSerum}
          setNiacinamideSerum={setNiacinamideSerum}
          clayMask={clayMask}
          setClayMask={setClayMask}
          vitaminB5Evening={vitaminB5Evening}
          setVitaminB5Evening={setVitaminB5Evening}
        />

        {/* Night Routine */}
        <NightRoutine
          pilgrimToner={pilgrimToner}
          setPilgrimToner={setPilgrimToner}
          vitaminB5Night={vitaminB5Night}
          setVitaminB5Night={setVitaminB5Night}
        />

        {/* Reminder Time Setting */}
        <Card className="p-4 bg-app-lightGray border border-gray-100 mb-4">
          <TimeSelector
            label="Daily Reminder Time:"
            value={reminderTime}
            onChange={setReminderTime}
            id="reminderTime"
          />
        </Card>

        {/* Smart Tips */}
        <SmartTips />
        
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Today\'s Routine'}
        </Button>
      </div>
    </div>
  );
};

export default SkinCare;
