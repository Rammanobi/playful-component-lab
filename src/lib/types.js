
// This file contains type definitions that have been converted to JSDoc comments
// for JavaScript projects

/**
 * @typedef {Object} SleepData
 * @property {string} id
 * @property {string} date
 * @property {string} [bedTime]
 * @property {string} [wakeTime]
 * @property {number} hoursSlept
 * @property {string} quality
 * @property {string} [notes]
 * @property {string} morningReminder
 * @property {string} timestamp
 */

/**
 * @typedef {Object} MealData
 * @property {string} id
 * @property {string} date
 * @property {string} title
 * @property {string} description
 * @property {string} time
 * @property {string} [mealType]
 * @property {number} [satisfaction]
 * @property {string[]} [foods]
 * @property {string} [notes]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} StressLog
 * @property {string} id
 * @property {string} date
 * @property {number} rating
 * @property {string} notes
 * @property {string} [time]
 * @property {number} [stressLevel]
 * @property {string} [triggers]
 * @property {string} [copingMechanisms]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} SkincareRoutine
 * @property {string} id
 * @property {string} date
 * @property {string} reminderTime
 * @property {boolean} serum1
 * @property {boolean} serum2
 * @property {boolean} sunscreen
 * @property {boolean} moisturizer
 * @property {string} [routineType]
 * @property {string} [time]
 * @property {string} [cleanser]
 * @property {string[]} [productsUsed]
 * @property {string} [notes]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} DayDescription
 * @property {string} id
 * @property {string} date
 * @property {string} description
 * @property {number} [dayRating]
 * @property {string} [dailyGoals]
 * @property {string} timestamp
 */

/**
 * @typedef {('sleepData'|'mealData'|'stressLogs'|'skincareRoutines'|'dayDescriptions')} StorageKeys
 */

export {};
