import { SleepData, MealData, StressLog, SkincareRoutine, DayDescription } from '../types';
import { formatTime } from '../utils';

export const exportSleepDataToText = (data: SleepData[]): string => {
  let text = "Sleep Data:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    text += `Bedtime: ${formatTime(item.bedTime)}\n`;
    text += `Wake Time: ${formatTime(item.wakeTime)}\n`;
    text += `Hours Slept: ${item.hoursSlept}\n`;
    text += `Quality: ${item.quality}/5\n`;
    text += `Notes: ${item.notes || 'N/A'}\n\n`;
  });
  return text;
};

export const exportMealDataToText = (data: MealData[]): string => {
  let text = "Meal Data:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    text += `Meal Type: ${item.mealType}\n`;
    text += `Time: ${formatTime(item.time)}\n`;
    text += `Satisfaction: ${item.satisfaction}/5\n`;
    text += `Foods: ${item.foods ? item.foods.join(', ') : 'N/A'}\n`;
    text += `Notes: ${item.notes || 'N/A'}\n\n`;
  });
  return text;
};

export const exportStressLogsToText = (data: StressLog[]): string => {
  let text = "Stress Logs:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    text += `Time: ${formatTime(item.time)}\n`;
    text += `Stress Level: ${item.stressLevel}/5\n`;
    text += `Triggers: ${item.triggers || 'N/A'}\n`;
    text += `Coping Mechanisms: ${item.copingMechanisms || 'N/A'}\n\n`;
  });
  return text;
};

export const exportSkincareRoutinesToText = (data: SkincareRoutine[]): string => {
  let text = "Skincare Routines:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    text += `Routine Type: ${item.routineType}\n`;
    text += `Time: ${formatTime(item.time)}\n`;
    text += `Cleanser: ${item.cleanser || 'N/A'}\n`;
    text += `Products Used: ${item.productsUsed ? item.productsUsed.join(', ') : 'N/A'}\n`;
    text += `Notes: ${item.notes || 'N/A'}\n\n`;
  });
  return text;
};

export const exportDayDescriptionsToText = (data: DayDescription[]): string => {
  let text = "Day Descriptions:\n\n";
  data.forEach(item => {
    text += `Date: ${item.date}\n`;
    text += `Day Rating: ${item.dayRating}/5\n`;
    text += `Description: ${item.description || 'N/A'}\n`;
    text += `Daily Goals: ${item.dailyGoals || 'N/A'}\n\n`;
  });
  return text;
};
