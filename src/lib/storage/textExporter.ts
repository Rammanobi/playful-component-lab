
import { SleepData, MealData, StressLog, SkincareRoutine, DayDescription } from '../types';
import { formatTime } from '../utils';

export const exportSleepDataToText = (data: SleepData[]): string => {
  let text = "Sleep Data:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    if (item.bedTime) text += `Bedtime: ${formatTime(item.bedTime)}\n`;
    if (item.wakeTime) text += `Wake Time: ${formatTime(item.wakeTime)}\n`;
    text += `Hours Slept: ${item.hoursSlept}\n`;
    text += `Quality: ${item.quality}\n`;
    if (item.notes) text += `Notes: ${item.notes}\n`;
    text += `\n`;
  });
  return text;
};

export const exportMealDataToText = (data: MealData[]): string => {
  let text = "Meal Data:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    text += `Title: ${item.title}\n`;
    if (item.mealType) text += `Meal Type: ${item.mealType}\n`;
    text += `Time: ${formatTime(item.time)}\n`;
    if (item.satisfaction !== undefined) text += `Satisfaction: ${item.satisfaction}/5\n`;
    if (item.foods && item.foods.length > 0) text += `Foods: ${item.foods.join(', ')}\n`;
    text += `Description: ${item.description}\n`;
    if (item.notes) text += `Notes: ${item.notes}\n`;
    text += `\n`;
  });
  return text;
};

export const exportStressLogsToText = (data: StressLog[]): string => {
  let text = "Stress Logs:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    if (item.time) text += `Time: ${formatTime(item.time)}\n`;
    text += `Stress Level: ${item.stressLevel ?? item.rating}/5\n`;
    if (item.triggers) text += `Triggers: ${item.triggers}\n`;
    if (item.copingMechanisms) text += `Coping Mechanisms: ${item.copingMechanisms}\n`;
    text += `Notes: ${item.notes}\n`;
    text += `\n`;
  });
  return text;
};

export const exportSkincareRoutinesToText = (data: SkincareRoutine[]): string => {
  let text = "Skincare Routines:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    if (item.routineType) text += `Routine Type: ${item.routineType}\n`;
    text += `Reminder Time: ${formatTime(item.reminderTime)}\n`;
    if (item.time) text += `Time: ${formatTime(item.time)}\n`;
    if (item.cleanser) text += `Cleanser: ${item.cleanser}\n`;
    if (item.productsUsed && item.productsUsed.length > 0) text += `Products Used: ${item.productsUsed.join(', ')}\n`;
    text += `Products: Serum1 (${item.serum1 ? 'Used' : 'Not Used'}), Serum2 (${item.serum2 ? 'Used' : 'Not Used'}), Sunscreen (${item.sunscreen ? 'Used' : 'Not Used'}), Moisturizer (${item.moisturizer ? 'Used' : 'Not Used'})\n`;
    if (item.notes) text += `Notes: ${item.notes}\n`;
    text += `\n`;
  });
  return text;
};

export const exportDayDescriptionsToText = (data: DayDescription[]): string => {
  let text = "Day Descriptions:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    if (item.dayRating !== undefined) text += `Day Rating: ${item.dayRating}/5\n`;
    text += `Description: ${item.description}\n`;
    if (item.dailyGoals) text += `Daily Goals: ${item.dailyGoals}\n`;
    text += `\n`;
  });
  return text;
};

export const exportDataAsText = (data: Record<string, any>): string => {
  let text = "Wellness Tracker Data Export\n\n";
  
  if (data.sleepData?.length > 0) {
    text += exportSleepDataToText(data.sleepData);
  }
  
  if (data.mealData?.length > 0) {
    text += exportMealDataToText(data.mealData);
  }
  
  if (data.stressLogs?.length > 0) {
    text += exportStressLogsToText(data.stressLogs);
  }
  
  if (data.skincareRoutines?.length > 0) {
    text += exportSkincareRoutinesToText(data.skincareRoutines);
  }
  
  if (data.dayDescriptions?.length > 0) {
    text += exportDayDescriptionsToText(data.dayDescriptions);
  }
  
  return text;
};
