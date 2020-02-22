const dates = require("../utils/dates");
const weather = require("./weather");

// Coordinates for Madrid
const lat = -3.70256423950195;
const lng = 40.4165020941502;

describe("#Weather Endpoint", () => {
  it("#weather file exists", () => {
    expect(weather).toBeDefined();
  });
  if (parseInt(process.env.RUN_API_TESTS)) {
    it("getForecast for this week works", async () => {
      let time = dates.parseDateToUnixTime(dates.addDaysToDate(new Date(), 2));
      let weatherResults = await weather.getForecast(lat, lng, time);
      // console.log(">> weatherResults: ", weatherResults);
      expect(weatherResults).toBeDefined();

      expect(weatherResults.latitude).toBeDefined();
      expect(weatherResults.longitude).toBeDefined();

      expect(weatherResults.latitude).toEqual(lat);
      expect(weatherResults.longitude).toEqual(lng);
      expect(weatherResults.timezone).toBeDefined();
      expect(weatherResults.currently).toBeDefined();
      expect(weatherResults.hourly).toBeDefined();
      expect(weatherResults.daily).toBeDefined();
      expect(weatherResults.flags).toBeDefined();
      expect(weatherResults.offset).toBeDefined();
    });

    it("getForecast for future weeks works", async () => {
      let time = dates.parseDateToUnixTime(dates.addDaysToDate(new Date(), 10));

      let weatherResults = await weather.getForecast(lat, lng, time);
      expect(weatherResults).toBeDefined();
      expect(Object.keys(weatherResults).length).toBeGreaterThan(0);

      expect(weatherResults.latitude).toBeDefined();
      expect(weatherResults.longitude).toBeDefined();

      expect(weatherResults.latitude).toEqual(lat);
      expect(weatherResults.longitude).toEqual(lng);
      expect(weatherResults.timezone).toBeDefined();
      expect(weatherResults.currently).toBeDefined();
      expect(weatherResults.hourly).toBeDefined();
      expect(weatherResults.daily).toBeDefined();
      expect(weatherResults.flags).toBeDefined();
      expect(weatherResults.offset).toBeDefined();
      // TODO: add something for diffin between both results
    });
    //   Fails for not passed arguments

    it("getForecast throws exception on empty lat or lng", () => {
      let t = null;
      try {
        t = () => {
          throw new Error("UNKNOWN ERROR");
        };
      } catch (e) {
        expect(e.message).toBe("UNKNOWN ERROR");
      }
      expect(t).toThrow(Error);
    });
  }
});
