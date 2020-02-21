const darksky = require("./darksky");

// describe("#.dotenv config", () => {
//   it(".dotenv file exists", () => {
//     const fs = require("fs");
//     expect(fs.existsSync("./.env")).toBeTruthy();
//   });
//   it(".dotenv has GEONAMES_USERNAME", () => {
//     expect(process.env.GEONAMES_USERNAME).toBeDefined();
//   });
// });

/**
 * Builds a future date from 1 year from todays date
 * @return {int} - The timestamp for the future date
 */
const getFutureTimestamp = () => {
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return new Date(year + 1, month, day).getTime();
};

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
      const time = getFutureTimestamp();
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
