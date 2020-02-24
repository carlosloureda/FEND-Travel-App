/**
 * A relation between DarkSky icon-names and FontAwesome icons classes
 */
const icons = {
  "clear-day": "fa-sun",
  "clear-night": "fa-moon",
  rain: "fa-cloud-rain",
  snow: "fa-snowflakes",
  sleet: "fa-snowflakes",
  wind: "fa-wind",
  fog: "fa-smog",
  cloudy: "fa-cloud",
  "partly-cloudy-day": "fa-cloud-sun",
  "partly-cloudy-night": "fa-cloud-moon"
};

/**
 * Retrieves an fontAwesome icon  for a given key (DarkSky API result)
 * @param {string} iconKey - The key retrieved from SarkSky API for a location
 * @return {string} - The icon class for FontAwesome icon
 */
export const getIcon = iconKey =>
  icons[iconKey] ? icons[iconKey] : icons["partly-cloudy-day"];
