
import { useState, useEffect } from 'react';
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
  updateDayDescription,
  deleteSleepData,
  deleteMealData,
  deleteStressLog,
  deleteSkincareRoutine,
  deleteDayDescription
} from '@/lib/storage';
import { getCurrentDate } from '@/lib/utils';

interface UseLogDetailsReturn {
  sleepData: any[];
  mealData: any[];
  stressLogs: any[];
  skincareRoutines: any[];
  dayDescriptions: any[];
  deleteItem: (type: string, id: string) => Promise<void>;
  updateItem: (type: string, updatedItem: any) => Promise<boolean>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  today: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  showAllDates: boolean;
  setShowAllDates: (show: boolean) => void;
  allDates: string[];
  isLoading: boolean;
}

export const useLogDetails = (initialType?: string): UseLogDetailsReturn => {
  const validTypes = ['sleep', 'meal', 'stress', 'skincare', 'day'];
  const defaultType = initialType && validTypes.includes(initialType) 
    ? initialType 
    : 'sleep';
    
  const [activeTab, setActiveTab] = useState(defaultType);
  const [sleepData, setSleepData] = useState<any[]>([]);
  const [mealData, setMealData] = useState<any[]>([]);
  const [stressLogs, setStressLogs] = useState<any[]>([]);
  const [skincareRoutines, setSkincareRoutines] = useState<any[]>([]);
  const [dayDescriptions, setDayDescriptions] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [showAllDates, setShowAllDates] = useState(false);
  const [allDates, setAllDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const today = getCurrentDate();

  // Function to get all unique dates from all log types
  const calculateAllUniqueDates = (
    sleep: any[],
    meals: any[],
    stress: any[],
    skincare: any[],
    day: any[]
  ): string[] => {
    const dateSet = new Set<string>();
    
    // Add dates from all log types
    sleep.forEach(entry => dateSet.add(entry.date));
    meals.forEach(entry => dateSet.add(entry.date));
    stress.forEach(entry => dateSet.add(entry.date));
    skincare.forEach(entry => dateSet.add(entry.date));
    day.forEach(entry => dateSet.add(entry.date));
    
    // Convert to array and sort dates in descending order (newest first)
    return Array.from(dateSet).sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-'));
      const dateB = new Date(b.split('-').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch all data
      const [
        sleepResults, 
        mealResults, 
        stressResults, 
        skincareResults, 
        dayResults
      ] = await Promise.all([
        getSleepData(),
        getMealData(),
        getStressLogs(),
        getSkincareRoutines(),
        getDayDescriptions()
      ]);
      
      // Calculate all unique dates
      const dates = calculateAllUniqueDates(
        sleepResults,
        mealResults,
        stressResults,
        skincareResults,
        dayResults
      );
      setAllDates(dates);
      
      if (showAllDates) {
        // Show all data without date filtering
        setSleepData(sleepResults);
        setMealData(mealResults);
        setStressLogs(stressResults);
        setSkincareRoutines(skincareResults);
        setDayDescriptions(dayResults);
      } else {
        // Filter data for the selected date
        setSleepData(sleepResults.filter(entry => entry.date === selectedDate));
        setMealData(mealResults.filter(entry => entry.date === selectedDate));
        setStressLogs(stressResults.filter(entry => entry.date === selectedDate));
        setSkincareRoutines(skincareResults.filter(entry => entry.date === selectedDate));
        setDayDescriptions(dayResults.filter(entry => entry.date === selectedDate));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, showAllDates]);

  const deleteItem = async (type: string, id: string) => {
    try {
      switch (type) {
        case 'sleep':
          await deleteSleepData(id);
          break;
        case 'meal': 
          await deleteMealData(id);
          break;
        case 'stress': 
          await deleteStressLog(id);
          break;
        case 'skincare': 
          await deleteSkincareRoutine(id);
          break;
        case 'day': 
          await deleteDayDescription(id);
          break;
        default:
          throw new Error(`Unknown log type: ${type}`);
      }
      
      await loadData();
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} record deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type} record:`, error);
      toast.error(`Failed to delete ${type} record`);
    }
  };

  const updateItem = async (type: string, updatedItem: any): Promise<boolean> => {
    try {
      switch (type) {
        case 'sleep':
          await updateSleepData(updatedItem);
          break;
        case 'meal': 
          await updateMealData(updatedItem);
          break;
        case 'stress': 
          await updateStressLog(updatedItem);
          break;
        case 'skincare': 
          await updateSkincareRoutine(updatedItem);
          break;
        case 'day': 
          await updateDayDescription(updatedItem);
          break;
        default:
          throw new Error(`Unknown log type: ${type}`);
      }
      
      await loadData();
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
    allDates,
    isLoading
  };
};
