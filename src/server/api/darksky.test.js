const darksky = require("./darksky");
const dates = require("../utils/dates.js");

describe("#.dotenv config", () => {
  it(".dotenv file exists", () => {
    const fs = require("fs");
    expect(fs.existsSync("./.env")).toBeTruthy();
  });
  it(".dotenv has DARKSKY_SECRET_KEY", () => {
    expect(process.env.DARKSKY_SECRET_KEY).toBeDefined();
  });
});

if (parseInt(process.env.RUN_API_TESTS)) {
  describe("#DarkSky endpoints", () => {
    it("getWeekForecast works", async () => {
      // Coordinates for Madrid
      const lat = "-3.70256423950195";
      const lng = "40.4165020941502";
      let response = await darksky.getWeekForecast(lat, lng);

      expect(response).toBeDefined();
      expect(response.latitude).toBeDefined();
      expect(response.longitude).toBeDefined();
      expect(response.latitude.toString()).toEqual(lat);
      expect(response.longitude.toString()).toEqual(lng);
    });

    it("getFutureForecast works", async () => {
      // Coordinates for Madrid
      const lat = "-3.70256423950195";
      const lng = "40.4165020941502";
      const time = dates.parseDateToUnixTime(
        dates.addDaysToDate(new Date(), 29)
      );

      let response = await darksky.getFutureForecast(lat, lng, time);

      expect(response).toBeDefined();
      expect(response.latitude).toBeDefined();
      expect(response.longitude).toBeDefined();
      expect(response.latitude.toString()).toEqual(lat);
      expect(response.longitude.toString()).toEqual(lng);
      expect(response.daily.data).toBeDefined();
      expect(response.daily.data.length).toBeGreaterThan(0);
    });
  });
}
