const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const PIXABAY_URL = "https://pixabay.com/api/";

/**
 * Retrieves an image for a given location
 * @param {string} location - The location to search the image for (citry or
 * country)
 * @return {object} - Object with the image URL and other params
 */
const fetchLocationImage = async location => {
  const API_KEY = process.env.PIXABAY_API_KEY;
  const url = encodeURI(
    `${PIXABAY_URL}?key=${API_KEY}&q=${location}&categories=places&safesearch=true`
  );

  const result = await fetch(url);
  try {
    let info = await result.json();
    if (info.totalHits > 0) {
      const {
        largeImageURL,
        webformatURL,
        imageWidth,
        imageHeight,
        previewURL,
        pageURL
      } = info.hits[0];
      let image = {
        largeImageURL,
        webformatURL,
        imageWidth,
        imageHeight,
        previewURL,
        pageURL
      };
      return image;
    }
    return null;
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { fetchLocationImage };
