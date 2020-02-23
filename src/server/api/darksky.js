/**
 * API for searching for retrieving forecast for given locations
 */
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

/**
 * URL for FORECAST calls
 */

const FORECAST_URL = `https://api.darksky.net/forecast/${process.env.DARKSKY_SECRET_KEY}`;
console.log("process.env.DARKSKY_SECRET_KEY: ", process.env.DARKSKY_SECRET_KEY);

/**
 * Queries DarkSky API to get the weather info of a location
 * @param {string} lat - The latitute of the place to search the weather for
 * @param {string} lng - The longitude of the place to search the weather for
 */
const getWeekForecast = async (lat, lng) => {
  const url = `${FORECAST_URL}/${lat},${lng}`;

  const result = await fetch(url);
  // console.log("result: ", result);
  if (result.status == 200) {
    // console.log("status ok");
    let weatherInfo = await result.json();
    if (weatherInfo) {
      // console.log(">>weatherInfo: ", weatherInfo);
      // TODO: maybe daily.summary will the one to fetch later
      return weatherInfo;
    } else {
      console.log("Error on fetching the DarkSky Forecast API: ", result);
      throw new Error(
        result.status,
        "Error on fetching the DarkSky Forecast API"
      );
    }
  } else {
    throw new Error(
      `Error on fetching the DarkSky Forecast API: ${result.status}-${result.statusText}, URL: ${result.url}`
    );
  }
};

/**
 * Queries DarkSky API to get the weather prediction of a location in a
 * future time
 * @param {string} lat - The latitute of the place to search the weather for
 * @param {string} lng - The longitude of the place to search the weather for
 * @param {string} time - The timestamp of the time to get the weather
 * From the client you can use: new Date(year, month, day).getTime()
 * prediction for.
 */
const getFutureForecast = async (lat, lng, time) => {
  const url = `${FORECAST_URL}/${lat},${lng},${time}`;

  const result = await fetch(url);
  // console.log("[getFutureForecast] result: ", result);
  if (result.status == 200) {
    let weatherInfo = await result.json();
    // console.log("[getFutureForecast] weatherInfo: ", weatherInfo);
    if (weatherInfo) {
      // TODO: maybe daily.summary will the one to fetch later
      return weatherInfo;
    } else {
      console.log("Error on fetching the DarkSky Forecast API: ", result);
      //TODO: I need this?
      throw new Error(
        `2-Error on fetching the DarkSky Forecast API: ${result.status}-${result.statusText}, URL: ${result.url}`
      );
    }
  } else {
    throw new Error(
      `Error on fetching the DarkSky Forecast API: ${result.status}-${result.statusText}, URL: ${result.url}`
    );
  }
};

const darksky = { getWeekForecast, getFutureForecast };
module.exports = darksky;
