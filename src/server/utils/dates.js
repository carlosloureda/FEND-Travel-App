/**
 * Converts a date given in javascript date format into a UNIX time
 * @param {string} dateString - The date given JS date format (new Date())
 * @returns {int} - UNIX representation of a date
 */
const parseDateToUnixTime = date => Math.round(date.getTime() / 1000);

/**
 * Adds to a JS Date an amount of days
 * @param {object} date - The date we want to add days to, in JS format
 * @param {int} days - The days to add to a date
 * @returns {Date} - A Javascript date representing the resulting sum
 */
const addDaysToDate = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Retrieves the amount of days between 2 JS timestamps
 * @param {int} time1 - 1st time to calculate in Javascript timestamp format
 * (miliseconds)
 * @param {int} time2 - 2nd time to calculate in Javascript timestamp format
 * (miliseconds)
 * @retuns {int} - Days between both UNIX times
 */
const getDaysBetweenTimestamps = (time1, time2) => {
  const secondsPerDay = 24 * 60 * 60;
  let diff = Math.ceil(Math.abs(time1 - time2) / secondsPerDay);
  return diff;
};

/**
 * Provides if a date is in the next 7 days or not
 * @param {int} time - The date in JS timestamp format (miliseconds).
 * @returns {boolean} - True if the time provided is in this week (<=7 days)
 * and False if is next week (> 7 days)
 */
const dateIsInCurrentWeek = time => {
  let todayDate = parseDateToUnixTime(new Date());
  let diffDays = getDaysBetweenTimestamps(time, todayDate);
  return diffDays <= 7 ? true : false;
};

module.exports = {
  parseDateToUnixTime,
  addDaysToDate,
  getDaysBetweenTimestamps,
  dateIsInCurrentWeek
};
