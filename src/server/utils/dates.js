// /**
//  * From a date retrieves an object with year, month and date, it is an
//  * utiliy function that will be used for object detructuring.
//  *
//  * @params {date} - [Optional] Date to be parsed, if not passed will retrieve todays date
//  * @returns {object} containing year, month and day of the passed date
//  */
// const getDateDetructured = (date = new Date()) => {
//   return {
//     year: date.getFullYear(),
//     month: date.getMonth(),
//     day: date.getDate()
//   };
// };

// /**
//  * Retrieves todays date
//  * @return {date} - Todays date
//  */
// const getTodaysDate = () => new Date();

// /**
//  * Parses a given date into timestamp
//  * @return {int} - The timestamp retrieved from the date passed
//  */
// const dateToTimeStamp = date => date.getTime();

// /**
//  * Calculates the days between 2 timestamps
//  * @param {int} time1 - Smallest timestamp to compare
//  * @param {int} time2 - Greates timestamp to compare
//  * @return {int} Number of days between timestamps
//  */
// const daysBetweenTimestamps = (time1, time2) =>
//   Math.floor((time2 - time1) / 60 / 60 / 24);

const parseDateToUnixTime = date => Math.round(date.getTime() / 1000);

const addDaysToDate = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

const getDaysBetweenTimestamps = (time1, time2) => {
  const secondsPerDay = 24 * 60 * 60;
  let diff = Math.ceil(Math.abs(time1 - time2) / secondsPerDay);
  return diff;
};

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
