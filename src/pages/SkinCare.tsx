
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import TimeSelector from '@/components/ui/TimeSelector';
import { generateId, getCurrentDate } from '@/lib/utils';
import { saveSkincareRoutine, getTodayData, getSkincareRoutines } from '@/lib/storage';
import { SkincareRoutine } from '@/lib/types';
import { Check } from 'lucide-react';

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
    const todayData = getTodayData<SkincareRoutine>(getSkincareRoutines);
    if (todayData) {
      setReminderTime(todayData.reminderTime);
      setSerum1(todayData.serum1);
      setSerum2(todayData.serum2);
      setSunscreen(todayData.sunscreen);
      setMoisturizer(todayData.moisturizer);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const skincareData: SkincareRoutine = {
        id: generateId(),
        date: getCurrentDate(),
        reminderTime,
        serum1,
        serum2,
        sunscreen,
        moisturizer
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

  const SkinCareCheckbox = ({ 
    label, 
    checked, 
    onChange 
  }: { 
    label: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void;
  }) => (
    <div className="mb-4">
      <label className="flex items-center cursor-pointer group">
        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors mr-3 ${
          checked 
            ? 'bg-app-blue border-app-blue' 
            : 'border-gray-300 group-hover:border-app-blue/50'
        }`}>
          {checked && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className="text-lg text-app-darkGray">{label}</span>
      </label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
    </div>
  );

  return (
    <div className="app-container page-transition">
      <Header title="Skincare Routine" showBackButton />
      
      <div className="px-5">
        <Card className="bg-app-lightGray border border-gray-100">
          <TimeSelector
            label="Reminder Time:"
            value={reminderTime}
            onChange={setReminderTime}
          />
        </Card>
        
        <Card>
          <SkinCareCheckbox 
            label="Serum 1" 
            checked={serum1} 
            onChange={setSerum1} 
          />
          
          <SkinCareCheckbox 
            label="Serum 2" 
            checked={serum2} 
            onChange={setSerum2} 
          />
          
          <SkinCareCheckbox 
            label="Sunscreen" 
            checked={sunscreen} 
            onChange={setSunscreen} 
          />
          
          <SkinCareCheckbox 
            label="Moisturizer" 
            checked={moisturizer} 
            onChange={setMoisturizer} 
          />
        </Card>
        
        <button
          className="btn-primary w-full mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Routine'}
        </button>
      </div>
    </div>
  );
};

export default SkinCare;
