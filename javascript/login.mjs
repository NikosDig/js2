import { API_URL } from "./functions.mjs";
import { saveJWT } from "./functions.mjs";

const loginForm = document.querySelector(".loginForm");

// 12345test@stud.noroff.no
// 12345test

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

/**
 * main function that creates the profiile object which is added to the api call
 * to create a new user
 */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries()); //stolen line from Oliver

  loginUser(profile);
});

/**
 *
 * @param {object} profile
 * takes the data from the form entries and makes an asynchronous
 * call to the API to login a new user
 */
async function loginUser(profile) {
  try {
    const url = `${API_URL}/auth/login`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(profile),
    });

    const { accessToken, ...user } = await response.json();

    saveJWT("token", accessToken);
    saveJWT("user", user);
    console.log("all went well");
  } catch (error) {
    console.log(error);
  }
}


import { showPosts } from "./functions.mjs";

import { showOnePost } from "./functions.mjs";


import { createPost } from "./functions.mjs";

