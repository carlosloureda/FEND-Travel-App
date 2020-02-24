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

export const getIcon = iconKey =>
  icons[iconKey] ? icons[iconKey] : icons["partly-cloudy-day"];
