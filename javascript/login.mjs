import { API_URL } from "./functions.mjs";
import { saveJWT } from "./functions.mjs";
import { externalDependecy } from "./externalDep.mjs";
const loginForm = document.querySelector(".loginForm");

// 12345test@stud.noroff.no
// 12345test

/**
 * main function that creates the profiile object which is added to the api call
 * to create a new user
 */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  try {
    const profile = Object.fromEntries(formData.entries()); //stolen line from Oliver
    await loginUser(profile);
    location.href = "/profile";
  } catch (error) {
    console.log("There was en error", error);
  }
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
