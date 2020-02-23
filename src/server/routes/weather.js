const { validationResult } = require("express-validator");

const darksky = require("../api/darksky");
const dates = require("../utils/dates.js");
const geonames = require("../api/geonames.js");
const pixabay = require("../api/pixabay.js");
const countries = require("../api/countries.js");

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
// http://localhost:3000/weather-forecast?city=%22Paris%22&time=01582383106
const getForecastRouteHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("ERRORS: ", errors.array());
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Params should be location city or country and the time in UNIX time
  const { city, country, time } = req.query;

  const country_code = countries.getCountryCode(country);
  if (!country_code) {
    res.status(404).send(`Cannot find ${country} country`);
    return;
  }
  // TODO: We should query geonames to get the lat, lng
  let result = {};
  let coordinates = await geonames.fetchCoordinates(city, country_code);
  coordinates.country_name = country;
  result.coordinates = coordinates;
  // console.log("coordinates: ", coordinates);
  if (!coordinates || !coordinates.lat) {
    // TODO: Manage the problems with this lat,lng problems, searh for country?

    const errorMessage = `Can't find the coordinates for the given location ${city}`;
    console.error("404", errorMessage);
    res.status(404).send(errorMessage);
  } else {
    console.log("Continue");
    try {
      weatherInfo = await getForecast(coordinates.lat, coordinates.lng, time);
      if (!weatherInfo.error) {
        result.weatherInfo = weatherInfo;

        let locationImage = await pixabay.fetchLocationImage(city);

        if (!locationImage) {
          // TODO: Send error of location not found!
          locationImage = await pixabay.fetchLocationImage(country);
        }
        result.locationImage = locationImage;

        res.status(200).send(result);
        // TODO: Query the pixabay (for location and if not location pictures for the country)
      } else {
        // TODO: mount better reults, right now it shows this:
        // Error on fetching the DarkSky Forecast API: 400-Bad Request, URL: https://api.darksky.net/forecast/c16eeec776a071a04b8ad95a40b68a3b/asdasd,23423
        // TODO: Manage all the errors together and just send the response we need
        res.status(404).send(`${weatherInfo.error}`);
      }
    } catch (e) {
      console.log("** --->error: ", e);
    }
  }

  // TODO: Return the response properly
};

module.exports = { getForecast, getForecastRouteHandler };
