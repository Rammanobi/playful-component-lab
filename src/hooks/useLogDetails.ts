
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  getSleepData, 
  getMealData, 
  getStressLogs, 
  getSkincareRoutines,
  getDayDescriptions
} from '@/lib/storage';
import { safeStorage } from '@/lib/storage/utils';
import { SleepData, MealData, StressLog, SkincareRoutine, DayDescription, StorageKeys } from '@/lib/types';
import { getCurrentDate } from '@/lib/utils';

type LogType = 'sleep' | 'meal' | 'stress' | 'skincare' | 'day';

export const useLogDetails = (initialType: string | undefined) => {
  const navigate = useNavigate();
  const validTypes: LogType[] = ['sleep', 'meal', 'stress', 'skincare', 'day'];
  const defaultType: LogType = validTypes.includes(initialType as LogType) 
    ? (initialType as LogType) 
    : 'sleep';
    
  const [activeTab, setActiveTab] = useState<string>(defaultType);
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [mealData, setMealData] = useState<MealData[]>([]);
  const [stressLogs, setStressLogs] = useState<StressLog[]>([]);
  const [skincareRoutines, setSkincareRoutines] = useState<SkincareRoutine[]>([]);
  const [dayDescriptions, setDayDescriptions] = useState<DayDescription[]>([]);
  const today = getCurrentDate();

  const loadData = () => {
    // Filter each data type to only include entries for the current day
    setSleepData(getSleepData().filter(entry => entry.date === today));
    setMealData(getMealData().filter(entry => entry.date === today));
    setStressLogs(getStressLogs().filter(entry => entry.date === today));
    setSkincareRoutines(getSkincareRoutines().filter(entry => entry.date === today));
    setDayDescriptions(getDayDescriptions().filter(entry => entry.date === today));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteItem = (type: string, id: string) => {
    try {
      const storageKey = `${type}Data` as StorageKeys;
      const getData = () => {
        switch (type) {
          case 'sleep': return getSleepData();
          case 'meal': return getMealData();
          case 'stress': return getStressLogs();
          case 'skincare': return getSkincareRoutines();
          case 'day': return getDayDescriptions();
          default: return [];
        }
      };
      
      const data = getData();
      const newData = data.filter(item => item.id !== id);
      
      // Adjust the key for stress and day which don't follow the [type]Data pattern
      const adjustedKey = type === 'stress' ? 'stressLogs' : 
                          type === 'day' ? 'dayDescriptions' : 
                          storageKey;
      
      safeStorage.set(adjustedKey, newData);
      loadData();
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} record deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type} record:`, error);
      toast.error(`Failed to delete ${type} record`);
    }
  };

  return {
    sleepData,
    mealData,
    stressLogs,
    skincareRoutines,
    dayDescriptions,
    deleteItem,
    activeTab,
    setActiveTab,
    today
  };
};
