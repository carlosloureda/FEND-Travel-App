const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const PIXABAY_URL = "https://pixabay.com/api/";
/**
 * //TODO:
 */
const fetchLocationImage = async location => {
  const API_KEY = process.env.PIXABAY_API_KEY;
  const url = encodeURI(
    `${PIXABAY_URL}?key=${API_KEY}&q=${location}&categories=places&safesearch=true`
  );

  const result = await fetch(url);
  try {
    let info = await result.json();
    // console.log("info: ", info.hits[0]);
    // info:  { total: 0, totalHits: 0, hits: [] }
    if (info.totalHits > 0) {
      const {
        // imageURL,
        largeImageURL,
        webformatURL,
        imageWidth,
        imageHeight,
        previewURL,
        pageURL
      } = info.hits[0];
      let image = {
        // imageURL,
        largeImageURL,
        webformatURL,
        imageWidth,
        imageHeight,
        previewURL,
        pageURL
      };
      console.log("image: ", image);
      return image;
    }
    return null;

    // if (info.postalCodes && info.postalCodes.length) {
    //   //   console.log("info.postalCodes: ", info.postalCodes);
    //   //   TODO: A better filtering :)
    //   info.postalCodes = info.postalCodes.filter(
    //     postalCode => postalCode.placeName === city
    //   );
    //   if (!info.postalCodes) {
    //     // TODO: Return the location for the COUNTRY
    //     // TODO: But I dont query the country ...
    //   }

    //   return {
    //     lng: info.postalCodes[0].lng,
    //     lat: info.postalCodes[0].lat,
    //     countryCode: info.postalCodes[0].countryCode
    //   };
    // }
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { fetchLocationImage };
