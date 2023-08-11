import { API_URL } from "./functions.mjs";
import { showPosts } from "./functions.mjs";
import { createPost } from "./functions.mjs";
import { loadJWT } from "./functions.mjs";

const feedForm = document.querySelector("#feedForm");
const feedContainer = document.querySelector(".feedContainer");
feedContainer.innerHTML = "";
loadJWT("token");
loadJWT("user");

const searchForm = document.querySelector(".searchForm");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await showPosts();
  location.href = `/search/index.html?id=${searchForm.search.value}`;
});

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

function minMax(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr.id[j] < arr.id[min]) {
        min = j;
      }
    }
    if (min !== i) {
      const temp = arr.id[i];
      arr.id[i] = arr.id[min];
      arr.id[min] = temp;
    }
  }
  return arr;
}
function maxMin(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      const temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
}

const shortOptions = document.querySelector(".shortOptions");

shortOptions.addEventListener("change", async (e) => {
  if (e.target.value === "1") {
    feedContainer.innerHTML = "";
    const postData = await showPosts();
    const step1 = postData.map((x) => minMax(x));
    const step1Reversed = step1.reverse();
    return step1Reversed.map((x) => renderPosts(x));
  } else if (e.target.value === "2") {
    feedContainer.innerHTML = "";
    const postData = await showPosts();
    const step2 = postData.map((x) => maxMin(x));
    return step2.map((x) => renderPosts(x));
  } else return;
});
