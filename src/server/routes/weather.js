const { validationResult } = require("express-validator");

const darksky = require("../api/darksky");
const dates = require("../utils/dates.js");

const getForecast = async (lat, lng, time) => {
  console.log("lat, lng, time: ", lat, lng, time);
  let weatherInfo = {};
  try {
    if (dates.dateIsInCurrentWeek(time)) {
      weatherInfo = await darksky.getWeekForecast(lat, lng);
      // TOOD: Maybe return an error here?
    } else {
      weatherInfo = await darksky.getFutureForecast(lat, lng, time);
      // TODO: Return the proper info
    }
    return weatherInfo;
  } catch (e) {
    console.log("[getForecast] ERROR: ", e.message);
    return { error: e.message };
  }
};

// TODO: this should also send a query to the Geonames endpoint
const getForecastRouteHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("ERRORS: ", errors.array());
    return res.status(422).json({ errors: errors.array() });
  }

  const { lat, lng, time } = req.query;
  try {
    weatherInfo = await getForecast(lat, lng, time);
    if (!weatherInfo.error) {
      res.status(200).send(weatherInfo);
    } else {
      // TODO: mount better reults, right now it shows this:
      // Error on fetching the DarkSky Forecast API: 400-Bad Request, URL: https://api.darksky.net/forecast/c16eeec776a071a04b8ad95a40b68a3b/asdasd,23423
      res.status(404).send(`${weatherInfo.error}`);
    }
  } catch (e) {
    console.log("** --->error: ", e);
  }
};

module.exports = { getForecast, getForecastRouteHandler };
