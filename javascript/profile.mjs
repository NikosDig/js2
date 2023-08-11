import { loadJWT } from "./functions.mjs";
const user = loadJWT("user");

/**
 *
 * @param {object} user
 * loads the user name and banner and displays them on the profile page
 */
function fixProfile(user) {
  const profileName = document.querySelector(".profileName");
  const profilePicture = document.querySelector(".profilePicture");
  profileName.innerText = user.name;
  if (user.banner) {
    profilePicture.setAttribute("src", user.banner);
  } else {
    profilePicture.setAttribute("src", "../images/bean.png");
  }
}

fixProfile(user);
