import "./styles/reset.scss";
import "./styles/style.scss";
import "./styles/mobile.scss";
import "./styles/weather-card.scss";
import "./styles/modal.scss";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { getTripInfo } from "./js/formHandler";
import { errorModalHandler } from "./js/modalHandler";
/**
 * Waits until the DOM has loaded all the content, inside of here I run the necessary event listeners
 */
window.addEventListener("DOMContentLoaded", () => {
  // showCopyRightYear();

  // Submit button handler
  document
    .getElementById("submit-button")
    .addEventListener("click", getTripInfo);

  // Manage enable/disable of the submit button
  // document.getElementById("submit-button").disabled = true;
  // document.getElementById("aylien-form__input").addEventListener("input", e => {
  //   document.getElementById("submit-button").disabled = e.target.value
  //     ? false
  //     : true;
  // });

  errorModalHandler();
  // showDevConsoleInstructions();
  // registerServiceWorkers();
  // checkEnvironmentVariables();
});
