import { loadJWT } from "./functions.mjs";
import { showPosts } from "./functions.mjs";
const user = loadJWT("user");
const searchForm = document.querySelector(".searchForm");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await showPosts();
  location.href = `/search/index.html?id=${searchForm.search.value}`;
});

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
