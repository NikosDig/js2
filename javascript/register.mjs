import { API_URL } from "./functions.mjs";

const registerForm = document.querySelector(".registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  registerUser(profile);
});

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
  console.log(data);
}
