/**
 * API for searching for geolocations for a city
 * - Use dotenv for credentials use
 * - Use the API
 */
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_URL = "http://api.geonames.org/postalCodeSearchJSON";
/**
 * Queries Geonames API to get the coordinates of a given location
 * @param {string} city - The city to search for the coordinates for
 */
const fetchCoordinates = async city => {
  let username = process.env.GEONAMES_USERNAME;
  const url = `${GEONAMES_URL}?placename=${city}&username=${username}`;

  const result = await fetch(url);
  try {
    let info = await result.json();
    if (info.postalCodes && info.postalCodes.length) {
      //   console.log("info.postalCodes: ", info.postalCodes);
      //   TODO: A better filtering :)
      info.postalCodes = info.postalCodes.filter(
        postalCode => postalCode.placeName === city
      );
      if (!info.postalCodes) {
        // TODO: Return the location for the COUNTRY
        // TODO: But I dont query the country ...
      }

      return {
        lng: info.postalCodes[0].lng,
        lat: info.postalCodes[0].lat,
        countryCode: info.postalCodes[0].countryCode
      };
    }
  } catch (error) {
    console.error("error", error);
  }
};

const geonames = { fetchCoordinates };
module.exports = geonames;
