import "./styles/reset.scss";
import "./styles/style.scss";
import "./styles/weather-card.scss";
import "./styles/modal.scss";

import "./images/travel.png";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { getTripInfo, submitButtonStateHandler } from "./js/formHandler";
import { errorModalHandler, openErrorModal } from "./js/modalHandler";

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
    openErrorModal(
      `There isn't a .env file where I can fetch the server URL and its PORT. Please see README.md`
    );
  }
};

/**
 * Registers the servide worker when we are on production environment (webpack config)
 * TIP: If you run this once as production and want to come back to dev you need to unregister this service worker over the browser developer console.
 */
const registerServiceWorkers = () => {
  // TODO: for development please uncomment this ward
  // if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    navigator.serviceWorker.register("/dist/service-worker.js");
  }
  // }
};
/**
 * Appends on footer the actual year :D
 */
const showCopyRightYear = () => {
  document.getElementById(
    "copyright-year"
  ).innerText = `©${new Date().getFullYear()}`;
};

/**
 * Waits until the DOM has loaded all the content, inside of here I run the necessary event listeners
 */
window.addEventListener("DOMContentLoaded", () => {
  showCopyRightYear();

  // Submit button handler
  document
    .getElementById("submit-button")
    .addEventListener("click", getTripInfo);

  // Manage enable/disable of the submit button
  submitButtonStateHandler();
  errorModalHandler();

  registerServiceWorkers();
  checkEnvironmentVariables();
});
