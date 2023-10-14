import { API_URL } from "./functions.mjs";
import { externalDependecy } from "./externalDep.mjs";
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
  try {
    const url = API_URL + "/auth/register";

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(profile),
    });

    const data = await response.json();
    setTimeout(redirectUserToLogInPage(response), 3000);
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {object} response
 * checks if the request was succesfull and if yes redirects the user to login page
 * if not ,alerts him about the fail
 */
function redirectUserToLogInPage(response) {
  if (response.ok) {
    location.href = "index.html";
    alert("Register user successfull,you are beeing redirected to login page");
  } else {
    alert(
      "something whent wrong, check if you filled the fields correctly and try again"
    );
  }
}
