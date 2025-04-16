
// Re-export backup functionality from their dedicated files
import { formatTime } from '../utils';
import { getSleepData } from './sleep';
import { getMealData } from './meal';
import { getStressLogs } from './stress'; 
import { getSkincareRoutines } from './skincare';
import { getDayDescriptions } from './day';

export const exportDataAsText = (): string => {
  try {
    let report = "WELLNESS TRACKER REPORT\n";
    report += "=======================\n\n";
    report += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Sleep Data
    const sleepData = getSleepData();
    if (sleepData.length > 0) {
      report += "SLEEP TRACKING\n";
      report += "==============\n\n";
      
      sleepData.forEach(entry => {
        report += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
        report += `Hours Slept: ${entry.hoursSlept}\n`;
        report += `Sleep Quality: ${entry.quality}\n`;
        if (entry.morningReminder) {
          report += `Morning Reminder: ${entry.morningReminder}\n`;
        }
        report += "\n";
      });
    }
    
    // Meal Data
    const mealData = getMealData();
    if (mealData.length > 0) {
      report += "FOOD TRACKING\n";
      report += "=============\n\n";
      
      mealData.forEach(entry => {
        report += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
        report += `Meal: ${entry.title}\n`;
        report += `Time: ${formatTime(entry.time)}\n`;
        if (entry.description) {
          report += `Description: ${entry.description}\n`;
        }
        report += "\n";
      });
    }
    
    // Stress Logs
    const stressLogs = getStressLogs();
    if (stressLogs.length > 0) {
      report += "STRESS MANAGEMENT\n";
      report += "=================\n\n";
      
      stressLogs.forEach(entry => {
        report += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
        report += `Time: ${entry.timestamp ? formatTime(entry.timestamp) : 'Not recorded'}\n`;
        report += `Stress Level: ${entry.rating}/5\n`;
        if (entry.notes) {
          report += `Notes: ${entry.notes}\n`;
        }
        report += "\n";
      });
    }
    
    // Skincare Routines
    const skincareRoutines = getSkincareRoutines();
    if (skincareRoutines.length > 0) {
      report += "SKINCARE ROUTINE\n";
      report += "================\n\n";
      
      skincareRoutines.forEach(entry => {
        report += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
        report += `Reminder Time: ${formatTime(entry.reminderTime)}\n`;
        report += `Products Used:\n`;
        if (entry.serum1) report += "- Serum 1\n";
        if (entry.serum2) report += "- Serum 2\n";
        if (entry.sunscreen) report += "- Sunscreen\n";
        if (entry.moisturizer) report += "- Moisturizer\n";
        report += "\n";
      });
    }
    
    // Day Descriptions
    const dayDescriptions = getDayDescriptions();
    if (dayDescriptions.length > 0) {
      report += "DAILY REFLECTIONS\n";
      report += "=================\n\n";
      
      dayDescriptions.forEach(entry => {
        report += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
        report += `Reflection: ${entry.description}\n`;
        report += "\n";
      });
    }
    
    return report;
  } catch (e) {
    console.error('Error generating text report:', e);
    return "Error generating report. Please try again.";
  }
};
