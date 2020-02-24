const { validationResult } = require("express-validator");

const darksky = require("../api/darksky");
const dates = require("../utils/dates.js");
const geonames = require("../api/geonames.js");
const pixabay = require("../api/pixabay.js");
const countries = require("../api/countries.js");

/**
 * Query utility for resolving what DarkSky endpoint to call, if the time of the trip is in this week we need to call darksky.getWeekForecast to get the current weather in that locatily and darksky.getFutureForecast, which returns a predicton for a future date, if the time for the travel is > 1 week
 *
 * @param {float} lat - The latitude of the location to query the weather for
 * @param {float} lng - The lng of the location to query the weather for
 * @param {int} time - The UNIX time to query the weather for
 * @return {object} - An object with the weather info and staying if it
 * isCurrent or not, this is if it is actual weather info or a forecast
 */
const getForecast = async (lat, lng, time) => {
  console.log("lat, lng, time: ", lat, lng, time);
  let weatherInfo = {};
  try {
    if (dates.dateIsInCurrentWeek(time)) {
      weatherInfo = await darksky.getWeekForecast(lat, lng);
      weatherInfo.isCurrent = true;
    } else {
      weatherInfo = await darksky.getFutureForecast(lat, lng, time);
      weatherInfo.isCurrent = false;
    }
    return weatherInfo;
  } catch (e) {
    console.log("[getForecast] ERROR: ", e.message);
    return { error: e.message };
  }
};

/**
 * Route handler for the route "/weather-forecast", it receives the req with
 * the params in its query key, it validated that it gets the proper values,
 * and calls our 3 APIS to build a response with location info, weather info
 * for that location and an image for that location
 *
 * Example query:
 *  http://localhost:3000/weather-forecast?city=%22Paris%22&time=01582383106
 *
 * @param {object} req - The req made by the client
 * @param {object} res - The res to be sent to the client
 * @return {object} - An object with location info, weather info
 * for that location and an image for that location or an error if something
 * happens
 */
const getForecastRouteHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { city, country, time } = req.query;

  const country_code = countries.getCountryCode(country);
  if (!country_code) {
    res.status(404).send(`Cannot find ${country} country`);
    return;
  }
  let result = {};
  let coordinates = await geonames.fetchCoordinates(city, country_code);

  if (!coordinates || !coordinates.lat) {
    const errorMessage = `Can't find the coordinates for the given location ${city}`;
    console.error("404", errorMessage);
    res.status(404).send(errorMessage);
  } else {
    result.country_name = country;
    result.city = city;
    result.count_down = dates.getDaysBetweenTimestamps(
      time,
      dates.parseDateToUnixTime(new Date())
    );
    result.coordinates = coordinates;
    try {
      weatherInfo = await getForecast(coordinates.lat, coordinates.lng, time);
      if (!weatherInfo.error) {
        result.weatherInfo = weatherInfo;

        let locationImage = await pixabay.fetchLocationImage(city);

        if (!locationImage) {
          locationImage = await pixabay.fetchLocationImage(country);
        }
        result.locationImage = locationImage;

        res.status(200).send(result);
      } else {
        res.status(404).send(`${weatherInfo.error}`);
      }
    } catch (e) {
      console.log("** --->error: ", e);
      res.status(404).send(`${e}`);
    }
  }
};

module.exports = { getForecast, getForecastRouteHandler };
