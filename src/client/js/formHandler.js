console.log("Form handler loaded");
import { getIcon } from "./utils/weather-icons";
/**
 * Checks the existance of env variables for my server endpoints
 */
const checkEnvironmentVariables = () => {
  if (!process.env.SERVER_BASE_URL && !process.env.SERVER_PORT) {
    console.log(
      `There isn't a .env file where I can fetch the server URL and its PORT.
        Please see README.md
        `
    );
  }
};

const stringDateToUnixTime = dateString =>
  Math.round(new Date(dateString).getTime() / 1000);

/**
 * Queries the server endpoint with the text/url provided by the user and
 * manages to update the UI (calling another function) *
 *
 * @param {string} text - The text or URL to analyze
 */
export const fetchInfo = async (country, city, departure_date) => {
  //   const API_URL = `${process.env.SERVER_BASE_URL}:${process.env.SERVER_PORT}`;
  const API_URL = "http://localhost:3000";
  const response = await fetch(
    `${API_URL}/weather-forecast?city=${city}&country=${country}&time=${departure_date}`
  );
  try {
    if (response.status == 200) {
      const result = await response.json();
      return result;
    } else {
      return {
        error: {
          status: response.status,
          message: "An error occurred"
        }
      };
      // TODO: make proper errors
      console.log("-->response: ", response);
      console.log("-->type: ", response.type);
      console.log("-->message: ", response.message);
      console.log("-->body: ", response.body);
      //   openErrorModal(
      //     `Failed to fetch ${API_URL}/analyze-text?text=${text}:  ${response.status}, ${response.statusText}`
      //   );
    }
  } catch (error) {
    console.log("error: ", error);
    // openErrorModal(
    //   `Some unexpected error happened while fetching ${API_URL}/analyze-text?text=${text}`
    // );
  }

  return false;
};

const updateUI_old = data => {
  if (data.error) {
    console.log("ERRORACO: ", data.error);
  }
  if (data && data.locationImage) {
    let imageWrapper = document.getElementById("location-image");

    let image = document.createElement("img");
    // TODO:
    image.alt = "";
    image.src = data.locationImage.largeImageURL;
    console.log(
      "data.locationImage.largeImageURL: ",
      data.locationImage.largeImageURL
    );
    imageWrapper.innerHTML = "";
    imageWrapper.appendChild(image);

    const { hourly, currently } = data.weatherInfo;
    //  Trip info
    const tripInfoWrapper = document.getElementById("trip-info");
    tripInfoWrapper.innerHTML = `
        <p>
            ${data.city}, ${data.country_name} is ${data.count_down} days away
        </p>`;

    // Weather info
    const weatherInfoWrapper = document.getElementById("weather-info");
    if (data.weatherInfo.isCurrent) {
      weatherInfoWrapper.innerHTML = `
            <p>Typical weather for then is:</p>
            <p>${hourly.summary}</p>
            <p>Icon: ${hourly.icon}</p>
            <p>Temp: ${currently.temperature}ºF</p>
            <p>Apprent temp: ${currently.apparentTemperature}º</p>
            <p>Humidity: ${currently.humidity}</p>
            <p>Wind speed: ${currently.windSpeed}</p>

        `;
    } else {
      weatherInfoWrapper.innerHTML = `
            <p>Here is a weather prediction for your arrival date:</p>
            <p>Temp: ${currently.temperature}ºF</p>
            <p>Apprent temp: ${currently.apparentTemperature}º</p>
            <p>Humidity: ${currently.humidity}</p>
            <p>Wind speed: ${currently.windSpeed}</p>

        `;
    }
  } else {
    // TODO: Add a custom image for not found images
  }
};

const updateUI = data => {
  if (data.error) {
    console.log("ERRORACO: ", data.error);
  }
  if (data && data.locationImage) {
    const { hourly, currently } = data.weatherInfo;

    const weatherCard = document.getElementById("weather-card");
    weatherCard.classList.remove("hidden");

    document.getElementById("weather-card--city").textContent = data.city;
    document.getElementById(
      "weather-card--temp"
    ).textContent = `${currently.temperature} ºF`;
    document.getElementById(
      "weather-card--summary"
    ).textContent = hourly.summary ? hourly.summary : "";
    document.getElementById(
      "weather-card--humidity"
    ).textContent = `${currently.humidity * 100} %`;
    document.getElementById(
      "weather-card--wind-speed"
    ).textContent = `${currently.windSpeed} km/h`;

    if (data.weatherInfo.isCurrent) {
      document.getElementById("weather-card--icon").classList = `fa ${getIcon(
        hourly.icon
      )} fa-3x`;
    } else {
      document.getElementById("weather-card--icon").classList = `hidden`;
    }

    document.querySelector(
      ".weather-card--cover"
    ).style.backgroundImage = `url('${data.locationImage.largeImageURL}')`;

    // TODO: Update icon
  }
};
export const getTripInfo = async e => {
  e.preventDefault();
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const departure_date = stringDateToUnixTime(
    document.getElementById("departure_date").value
  );

  console.log(
    `Quering weather info for ${country} - ${city} - ${departure_date}`
  );
  let info = await fetchInfo(country, city, departure_date);
  updateUI(info);
  console.log("response: ", info);
};

// checkEnvironmentVariables();
