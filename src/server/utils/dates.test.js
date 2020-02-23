const dates = require("./dates");

const thisWeekDate = dates.parseDateToUnixTime(
  dates.addDaysToDate(new Date(), 3)
);
const futureDate = dates.parseDateToUnixTime(
  dates.addDaysToDate(new Date(), 29)
);
const todayDate = dates.parseDateToUnixTime(new Date());
describe("#Dates utils modile", () => {
  it("getDaysBetweenTimestamps works", () => {
    let daysDiff = dates.getDaysBetweenTimestamps(todayDate, thisWeekDate);
    expect(daysDiff).toEqual(3);
    daysDiff = dates.getDaysBetweenTimestamps(todayDate, futureDate);
    expect(daysDiff).toEqual(29);
  });

  it("dateIsInCurrentWeek works", () => {
    let isCurrentWeek = dates.dateIsInCurrentWeek(thisWeekDate);
    expect(isCurrentWeek).toEqual(true);
    isCurrentWeek = dates.dateIsInCurrentWeek(futureDate);
    expect(isCurrentWeek).toEqual(false);
  });
});
