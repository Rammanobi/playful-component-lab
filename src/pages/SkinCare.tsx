
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveSkincareRoutine, getSkincareRoutines } from '@/lib/storage';
import { showReminderNotification } from '@/utils/notifications';
import { SkincareRoutine } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Clock, Sun, Sunset, Moon } from 'lucide-react';

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

  const TimeSection = ({ title, time, icon: Icon, color, children }: {
    title: string;
    time: string;
    icon: any;
    color: string;
    children: React.ReactNode;
  }) => (
    <Card className={`p-4 mb-4 border-l-4 ${color}`}>
      <div className="flex items-center mb-3">
        <Icon className="h-5 w-5 mr-2" />
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="ml-auto text-sm text-gray-500">{time}</span>
      </div>
      {children}
    </Card>
  );

  const TaskItem = ({ label, checked, onChange, description }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
  }) => (
    <div className="flex items-start space-x-3 mb-3">
      <Checkbox checked={checked} onCheckedChange={onChange} className="mt-1" />
      <div className="flex-1">
        <label className="text-sm font-medium cursor-pointer" onClick={() => onChange(!checked)}>
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );

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
        <TimeSection
          title="Morning Routine"
          time="8:00 AM"
          icon={Sun}
          color="border-l-yellow-400"
        >
          <div className="space-y-2">
            <TaskItem
              label="Use AHA Glow S Face Wash"
              checked={ahaFaceWash}
              onChange={setAhaFaceWash}
            />
            <TaskItem
              label="Apply Pilgrim Tea Tree + Cica Toner"
              checked={teaTreeToner}
              onChange={setTeaTreeToner}
            />
            <TaskItem
              label="Apply Vitamin B5 10% Moisturizer"
              checked={vitaminB5Morning}
              onChange={setVitaminB5Morning}
            />
            <TaskItem
              label="Apply Photostable SPF 55++ Sunscreen"
              checked={sunscreenMorning}
              onChange={setSunscreenMorning}
            />
          </div>
          <p className="text-xs text-gray-600 italic mt-3">
            "You're refreshing your energy and clarity for the day."
          </p>
        </TimeSection>

        {/* Midday Routine */}
        <TimeSection
          title="Midday Recharge"
          time="1:00 PM"
          icon={Clock}
          color="border-l-orange-400"
        >
          <TaskItem
            label="Reapply Photostable SPF 55++ Sunscreen"
            checked={sunscreenReapply}
            onChange={setSunscreenReapply}
          />
          <p className="text-xs text-gray-600 italic mt-3">
            "Protected and ready to shine—your glow is your armor."
          </p>
        </TimeSection>

        {/* Evening Routine */}
        <TimeSection
          title={`Evening Actives - ${currentDay}`}
          time="4:00-6:00 PM"
          icon={Sunset}
          color="border-l-pink-400"
        >
          {eveningRoutineType === 'pore' && (
            <>
              <TaskItem
                label="Apply Pore Minimizing Serum (DermaCo)"
                checked={poreSerum}
                onChange={setPoreSerum}
              />
              <TaskItem
                label="Apply Vitamin B5 10% Moisturizer"
                checked={vitaminB5Evening}
                onChange={setVitaminB5Evening}
              />
            </>
          )}
          
          {eveningRoutineType === 'salicylic' && (
            <>
              <TaskItem
                label="Apply Salicylic Acid Serum"
                checked={salicylicSerum}
                onChange={setSalicylicSerum}
              />
              <TaskItem
                label="Apply Vitamin B5 10% Moisturizer"
                checked={vitaminB5Evening}
                onChange={setVitaminB5Evening}
              />
            </>
          )}
          
          {eveningRoutineType === 'niacinamide' && (
            <>
              <TaskItem
                label="Apply Niacinamide 10% Serum"
                checked={niacinamideSerum}
                onChange={setNiacinamideSerum}
              />
              <TaskItem
                label="Apply Vitamin B5 10% Moisturizer"
                checked={vitaminB5Evening}
                onChange={setVitaminB5Evening}
              />
            </>
          )}

          {shouldShowClayMask() && (
            <TaskItem
              label="Dot & Key Clay Mask (6:30 PM)"
              checked={clayMask}
              onChange={setClayMask}
              description="Replace serum on this day"
            />
          )}
          
          <p className="text-xs text-gray-600 italic mt-3">
            "Every drop is a step toward clearer, healthier skin. You're glowing already!"
          </p>
        </TimeSection>

        {/* Night Routine */}
        <TimeSection
          title="Night Wind-Down"
          time="9:00 PM"
          icon={Moon}
          color="border-l-indigo-400"
        >
          <TaskItem
            label="Apply Pilgrim Toner"
            checked={pilgrimToner}
            onChange={setPilgrimToner}
          />
          <TaskItem
            label="Apply Vitamin B5 10% Moisturizer"
            checked={vitaminB5Night}
            onChange={setVitaminB5Night}
          />
          <p className="text-xs text-gray-600 italic mt-3">
            "You've earned this rest. Your skin is healing and you deserve to glow."
          </p>
        </TimeSection>

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
        <Card className="p-4 bg-blue-50 border border-blue-200 mb-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 Smart Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Don't layer salicylic acid and clay mask on the same day</li>
            <li>• Wait 2–3 mins after toner before applying serum</li>
            <li>• Massage moisturizer gently for deeper absorption</li>
          </ul>
        </Card>
        
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
