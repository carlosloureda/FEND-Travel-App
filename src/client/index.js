import "./styles/style.scss";

import { getTripInfo } from "./js/formHandler";

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

  // errorModalHandler();
  // showDevConsoleInstructions();
  // registerServiceWorkers();
  // checkEnvironmentVariables();
});
