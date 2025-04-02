
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  getSleepData, 
  getMealData, 
  getStressLogs, 
  getSkincareRoutines,
  getDayDescriptions,
  updateSleepData,
  updateMealData,
  updateStressLog,
  updateSkincareRoutine,
  updateDayDescription
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
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [showAllDates, setShowAllDates] = useState<boolean>(false);
  
  const today = getCurrentDate();
  const allDates = getAllUniqueDates();

  // Function to get all unique dates from all log types
  function getAllUniqueDates(): string[] {
    const dateSet = new Set<string>();
    
    // Add dates from all log types
    getSleepData().forEach(entry => dateSet.add(entry.date));
    getMealData().forEach(entry => dateSet.add(entry.date));
    getStressLogs().forEach(entry => dateSet.add(entry.date));
    getSkincareRoutines().forEach(entry => dateSet.add(entry.date));
    getDayDescriptions().forEach(entry => dateSet.add(entry.date));
    
    // Convert to array and sort dates in descending order (newest first)
    return Array.from(dateSet).sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-'));
      const dateB = new Date(b.split('-').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  const loadData = () => {
    if (showAllDates) {
      // Show all data without date filtering
      setSleepData(getSleepData());
      setMealData(getMealData());
      setStressLogs(getStressLogs());
      setSkincareRoutines(getSkincareRoutines());
      setDayDescriptions(getDayDescriptions());
    } else {
      // Filter data for the selected date
      setSleepData(getSleepData().filter(entry => entry.date === selectedDate));
      setMealData(getMealData().filter(entry => entry.date === selectedDate));
      setStressLogs(getStressLogs().filter(entry => entry.date === selectedDate));
      setSkincareRoutines(getSkincareRoutines().filter(entry => entry.date === selectedDate));
      setDayDescriptions(getDayDescriptions().filter(entry => entry.date === selectedDate));
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, showAllDates]);

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

  const updateItem = (type: string, updatedItem: any) => {
    try {
      switch (type) {
        case 'sleep':
          updateSleepData(updatedItem as SleepData);
          break;
        case 'meal': 
          updateMealData(updatedItem as MealData);
          break;
        case 'stress': 
          updateStressLog(updatedItem as StressLog);
          break;
        case 'skincare': 
          updateSkincareRoutine(updatedItem as SkincareRoutine);
          break;
        case 'day': 
          updateDayDescription(updatedItem as DayDescription);
          break;
        default:
          throw new Error(`Unknown log type: ${type}`);
      }
      
      loadData();
      return true;
    } catch (error) {
      console.error(`Error updating ${type} record:`, error);
      toast.error(`Failed to update ${type} record`);
      return false;
    }
  };

  return {
    sleepData,
    mealData,
    stressLogs,
    skincareRoutines,
    dayDescriptions,
    deleteItem,
    updateItem,
    activeTab,
    setActiveTab,
    today,
    selectedDate,
    setSelectedDate,
    showAllDates,
    setShowAllDates,
    allDates
  };
};
