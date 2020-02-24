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
