import { API_URL } from "./functions.mjs";

const loginPassword = document.querySelector("#logInPassword");
const button = document.querySelector(".btn");

//code imported from bootstrap for adding custom validation to the forms
// bootstrap form validation
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// check if input on password is large enough ,smaller than 8 in this case
/**
 *
 * @param {*} input
 * the output that the user has added as a password.
 * checks if the user has typed correct length password and if yes activates the register button of the form
 */
function checkInput(input) {
  var value = input.value;

  if (value.length < 8) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  } else {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    button.removeAttribute("disabled", false);
  }
}
