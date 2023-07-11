import { API_URL } from "./functions.mjs";

const registerForm = document.querySelector(".registerForm");

/**
 * main function that creates the profiile object which is added to the api call
 * to create a new user
 */
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries()); //stolen line from Oliver

  registerUser(profile);
});

/**
 *
 * @param {object} profile
 * takes the data from the form entries and makes an asynchronous
 * call to the API to register a new user
 */
async function registerUser(profile) {
  const url = API_URL + "/auth/register";

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(profile),
  });

  const data = await response.json();
}
