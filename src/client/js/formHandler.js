console.log("Form handler loaded");
import { getIcon } from "./utils/weather-icons";

import { openErrorModal } from "./modalHandler";

/**
 * Converts a date given in string format (mm/dd/yyy) into a UNIX time
 * @param {string} dateString - The date given in string format (mm/dd/yyy)
 * @return {int} - UNIX representation of a date
 */
const stringDateToUnixTime = dateString =>
  Math.round(new Date(dateString).getTime() / 1000);

/**
 * Queries the server endpoint with the text/url provided by the user and
 * manages to update the UI (calling another function) *
 *
 * @param {string} text - The text or URL to analyze
 */
export const fetchInfo = async (country, city, departure_date) => {
  const API_URL = `${process.env.SERVER_BASE_URL}:${process.env.SERVER_PORT}`;
  // const API_URL = "http://localhost:3000";
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
    }
  } catch (error) {
    console.log("error: ", error);
    return {
      error: {
        status: 400,
        message: error
      }
    };
  }

  return false;
};

/**
 * Manages the UI for Loading effects
 * - Updates the button to a loading style
 */
const showLoading = () => {
  let submitBtn = document.getElementById("submit-button");
  submitBtn.classList.toggle("loading");

  submitBtn.innerText = "Searching  ";
  const loadingIcon = document.createElement("i");
  loadingIcon.classList = "fa fa-spinner fa-spin fa-lg";
  submitBtn.appendChild(loadingIcon);
};

/**
 * Manages the UI for removing thge loading effects
 * - Updates the button to a clickable
 */
const hideLoading = () => {
  let submitBtn = document.getElementById("submit-button");
  submitBtn.classList.toggle("loading");
  submitBtn.innerText = "Search";
};

/**
 * Updates all our UI with the data retrived from the API call
 * @param {object} data - An object with the following properties: weatherInfo, locationImage, country_name, count_down, city
 */
const updateUI = data => {
  if (data.error) {
    openErrorModal(
      `Error code: ${data.error.status}, message: ${data.error.message}`
    );
    hideLoading();
    return;
  }
  if (data && data.locationImage) {
    const { hourly, currently } = data.weatherInfo;

    const resultsContainer = document.getElementById("results");
    resultsContainer.classList.remove("hidden");
    const weatherCard = document.getElementById("weather-card");

    const tripInfoWrapper = document.getElementById("trip-info");
    tripInfoWrapper.innerHTML = `
        <p>
            ${data.city}, ${data.country_name} is <strong>${data.count_down}</strong> days away
        </p>`;

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

    document.getElementById(
      "weather-location-image"
    ).style.backgroundImage = `url('${data.locationImage.largeImageURL}')`;
    resetForm();
    hideLoading();
    weatherCard.scrollIntoView();
  }
};

/**
 * On form submit it handles the validation of the form, queries the backend
 * and updated the UI with the data retrieved
 * @param {event} e - The event that targeted this event handler (in this app
 * is the button with id:  submit-button)
 */
export const getTripInfo = async e => {
  e.preventDefault();
  showLoading();
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const departure_date = stringDateToUnixTime(
    document.getElementById("departure_date").value
  );

  console.log(
    `Quering weather info for ${country} - ${city} - ${departure_date}`
  );
  if (!country || !city || !departure_date) {
    openErrorModal(`Please provide all the values in the form`);
    hideLoading();
    return;
  }
  let info = await fetchInfo(country, city, departure_date);
  updateUI(info);

  console.log("response: ", info);
};

/**
 * Resets the form, setting all input values to their defaults
 */
const resetForm = () => {
  document.getElementById("country").value = "";
  document.getElementById("city").value = "";
  document.getElementById("departure_date").value = "mm/dd/yyyy";
};

/**
 * Validates the form, if not all the requried fields are provided the submit
 * button is disabled
 */
export const validateForm = () => {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  const date = document.getElementById("departure_date").value;
  const button = document.getElementById("submit-button");
  console.log("validating input: ", city, country, date);

  button.disabled = city && country && date ? false : true;
};

/**
 * Disables the submit button on first redner and adds event listeners to the
 * form inputs so we can listen for changes on them and enable/diable the
 * button later
 */
export const submitButtonStateHandler = () => {
  // Manage enable/disable of the submit button
  document.getElementById("submit-button").disabled = true;
  document.getElementById("city").addEventListener("input", validateForm);
  document.getElementById("country").addEventListener("input", validateForm);
  document
    .getElementById("departure_date")
    .addEventListener("input", validateForm);
};
// checkEnvironmentVariables();
