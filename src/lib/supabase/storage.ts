import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  SleepData, 
  MealData, 
  StressLog, 
  SkincareRoutine, 
  DayDescription 
} from "../types";
import { getCurrentDate } from "../utils";
import DOMPurify from 'dompurify';

// Sleep data functions
export const getSleepData = async (): Promise<SleepData[]> => {
  try {
    const { data, error } = await supabase
      .from('sleep_logs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      date: item.date,
      hoursSlept: item.hours_slept,
      quality: item.quality,
      morningReminder: item.morning_reminder || '',
      timestamp: item.timestamp
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error fetching sleep data:', error);
    }
    toast.error('Failed to load sleep data');
    return [];
  }
};

// Wherever we receive or save user text (description, notes, reminders), sanitize it before storing or returning
export const saveSleepData = async (data: SleepData): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('sleep_logs')
      .insert({
        user_id: user.id,
        hours_slept: data.hoursSlept,
        quality: DOMPurify.sanitize(data.quality),
        morning_reminder: data.morningReminder ? DOMPurify.sanitize(data.morningReminder) : '',
        date: data.date,
        timestamp: new Date().toISOString()
      });
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error saving sleep data:', error);
    }
    toast.error('Failed to save sleep data');
    throw error;
  }
};

export const updateSleepData = async (data: SleepData): Promise<void> => {
  try {
    const { error } = await supabase
      .from('sleep_logs')
      .update({
        hours_slept: data.hoursSlept,
        quality: DOMPurify.sanitize(data.quality),
        morning_reminder: data.morningReminder ? DOMPurify.sanitize(data.morningReminder) : '',
        timestamp: new Date().toISOString()
      })
      .eq('id', data.id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error updating sleep data:', error);
    }
    toast.error('Failed to update sleep data');
    throw error;
  }
};

export const deleteSleepData = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('sleep_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error deleting sleep data:', error);
    }
    toast.error('Failed to delete sleep data');
    throw error;
  }
};

// Meal data functions
export const getMealData = async (): Promise<MealData[]> => {
  try {
    const { data, error } = await supabase
      .from('meal_logs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      date: item.date,
      title: item.title,
      description: item.description || '',
      time: item.time,
      timestamp: item.timestamp
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error fetching meal data:', error);
    }
    toast.error('Failed to load meal data');
    return [];
  }
};

// Example for saveMealData:
export const saveMealData = async (data: MealData): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const { error } = await supabase
      .from('meal_logs')
      .insert({
        user_id: user.id,
        title: DOMPurify.sanitize(data.title),
        description: DOMPurify.sanitize(data.description),
        time: data.time,
        date: data.date,
        timestamp: new Date().toISOString()
      });
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error saving meal data:', error);
    }
    toast.error('Failed to save meal data');
    throw error;
  }
};

export const updateMealData = async (data: MealData): Promise<void> => {
  try {
    const { error } = await supabase
      .from('meal_logs')
      .update({
        title: DOMPurify.sanitize(data.title),
        description: DOMPurify.sanitize(data.description),
        time: data.time,
        timestamp: new Date().toISOString()
      })
      .eq('id', data.id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error updating meal data:', error);
    }
    toast.error('Failed to update meal data');
    throw error;
  }
};

export const deleteMealData = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('meal_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error deleting meal data:', error);
    }
    toast.error('Failed to delete meal data');
    throw error;
  }
};

// Stress log functions
export const getStressLogs = async (): Promise<StressLog[]> => {
  try {
    const { data, error } = await supabase
      .from('stress_logs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      date: item.date,
      rating: item.rating,
      notes: item.notes || '',
      timestamp: item.timestamp
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error fetching stress logs:', error);
    }
    toast.error('Failed to load stress logs');
    return [];
  }
};

export const saveStressLog = async (data: StressLog): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('stress_logs')
      .insert({
        user_id: user.id,
        rating: data.rating,
        notes: DOMPurify.sanitize(data.notes),
        date: data.date,
        timestamp: new Date().toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error saving stress log:', error);
    }
    toast.error('Failed to save stress log');
    throw error;
  }
};

export const updateStressLog = async (data: StressLog): Promise<void> => {
  try {
    const { error } = await supabase
      .from('stress_logs')
      .update({
        rating: data.rating,
        notes: DOMPurify.sanitize(data.notes),
        timestamp: new Date().toISOString()
      })
      .eq('id', data.id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error updating stress log:', error);
    }
    toast.error('Failed to update stress log');
    throw error;
  }
};

export const deleteStressLog = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('stress_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error deleting stress log:', error);
    }
    toast.error('Failed to delete stress log');
    throw error;
  }
};

// Skincare routine functions
export const getSkincareRoutines = async (): Promise<SkincareRoutine[]> => {
  try {
    const { data, error } = await supabase
      .from('skincare_logs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      date: item.date,
      reminderTime: item.reminder_time,
      serum1: item.serum1,
      serum2: item.serum2,
      sunscreen: item.sunscreen,
      moisturizer: item.moisturizer,
      timestamp: item.timestamp
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error fetching skincare routines:', error);
    }
    toast.error('Failed to load skincare routines');
    return [];
  }
};

export const saveSkincareRoutine = async (data: SkincareRoutine): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('skincare_logs')
      .insert({
        user_id: user.id,
        reminder_time: data.reminderTime,
        serum1: DOMPurify.sanitize(data.serum1),
        serum2: DOMPurify.sanitize(data.serum2),
        sunscreen: DOMPurify.sanitize(data.sunscreen),
        moisturizer: DOMPurify.sanitize(data.moisturizer),
        date: data.date,
        timestamp: new Date().toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error saving skincare routine:', error);
    }
    toast.error('Failed to save skincare routine');
    throw error;
  }
};

export const updateSkincareRoutine = async (data: SkincareRoutine): Promise<void> => {
  try {
    const { error } = await supabase
      .from('skincare_logs')
      .update({
        reminder_time: data.reminderTime,
        serum1: DOMPurify.sanitize(data.serum1),
        serum2: DOMPurify.sanitize(data.serum2),
        sunscreen: DOMPurify.sanitize(data.sunscreen),
        moisturizer: DOMPurify.sanitize(data.moisturizer),
        timestamp: new Date().toISOString()
      })
      .eq('id', data.id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error updating skincare routine:', error);
    }
    toast.error('Failed to update skincare routine');
    throw error;
  }
};

export const deleteSkincareRoutine = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('skincare_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error deleting skincare routine:', error);
    }
    toast.error('Failed to delete skincare routine');
    throw error;
  }
};

// Day description functions
export const getDayDescriptions = async (): Promise<DayDescription[]> => {
  try {
    const { data, error } = await supabase
      .from('day_descriptions')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      date: item.date,
      description: item.description,
      timestamp: item.timestamp
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error fetching day descriptions:', error);
    }
    toast.error('Failed to load day descriptions');
    return [];
  }
};

export const saveDayDescription = async (data: DayDescription): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('day_descriptions')
      .insert({
        user_id: user.id,
        description: DOMPurify.sanitize(data.description),
        date: data.date,
        timestamp: new Date().toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error saving day description:', error);
    }
    toast.error('Failed to save day description');
    throw error;
  }
};

export const updateDayDescription = async (data: DayDescription): Promise<void> => {
  try {
    const { error } = await supabase
      .from('day_descriptions')
      .update({
        description: DOMPurify.sanitize(data.description),
        timestamp: new Date().toISOString()
      })
      .eq('id', data.id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error updating day description:', error);
    }
    toast.error('Failed to update day description');
    throw error;
  }
};

export const deleteDayDescription = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('day_descriptions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error('Error deleting day description:', error);
    }
    toast.error('Failed to delete day description');
    throw error;
  }
};

// Utility functions for data retrieval
export const getTodayData = async <T extends { date: string }>(
  getFunction: () => Promise<T[]>
): Promise<T | undefined> => {
  const data = await getFunction();
  const today = getCurrentDate();
  return data.find(item => item.date === today);
};
