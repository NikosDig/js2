import { API_URL } from "./functions.mjs";
import { showPosts } from "./functions.mjs";
import { createPost } from "./functions.mjs";
import { loadJWT } from "./functions.mjs";
import { removePost } from "./functions.mjs";

const feedForm = document.querySelector("#feedForm");
const feedContainer = document.querySelector(".feedContainer");
feedContainer.innerHTML = "";
loadJWT("token");
loadJWT("user");

feedForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const post = Object.fromEntries(formData.entries()); //stolen line from Oliver
  createPost(post);
  feedContainer.innerHTML = "";
  await showAllThePostsOnThePage();
});

/**
 *
 * @param {array} postData array of objects from the API
 * @returns takes data from the API and returns all the posts rendered to HTML
 */
function renderPosts(postData) {
  //transforms the date to a more readable date
  let strDate = postData.created.split("T")[0];

  if (postData.media) {
    return (feedContainer.innerHTML += `
      <div class="card my-3 border border-primary">
      <a class="text-decoration-none" href="singlePost.html?id=${postData.id}">
      <div
        class="card-header d-flex align-items-center align-items-center justify-content-between"
      >
        <div>
        <img
        src="${postData.media}"
        alt="${postData.id} ${postData.title}"
        title= "${postData.title}"
        width="40px"
        height="40px"
        class="rounded-circle"
      />
          <h5>${postData.title}</h5>
        </div>
        <div class="card-footer text-black-50 border rounded-pill">
          ${strDate}
        </div>
      </div>
      <div class="card-body bg-primary text-dark">
        <p class="card-text">
          ${postData.body}
        </p>
      </div>
      </a></div>`);
  } else {
    return (feedContainer.innerHTML += `
    <div class="card my-3 border border-primary">
    <a class="text-decoration-none" href="singlePost.html?id=${postData.id} ">
    <div
      class="card-header d-flex align-items-center align-items-center justify-content-between"
    >
      <div>
        <h5>${postData.title}</h5>
      </div>
      <div class="card-footer text-black-50 border rounded-pill">
        ${strDate}
      </div>
    </div>
    <div class="card-body bg-primary text-dark">
      <p class="card-text">
        ${postData.body}
      </p>
    </div>
    </a></div>`);
  }
}

/**
 *
 * @returns returns all the data from the API as HTML
 */
async function showAllThePostsOnThePage() {
  const postData = await showPosts();
  return postData.map((x) => renderPosts(x));
}

showAllThePostsOnThePage();
