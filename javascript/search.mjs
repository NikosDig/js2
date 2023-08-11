import { showOnePost } from "./functions.mjs";
import { showPosts } from "./functions.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const searchHeader = document.querySelector(".searchHeader");
searchHeader.innerText = id;

/**
 *
 * @param {object} postData
 * @returns rendered the object of the post to HTML
 */
function renderPosts(postData) {
  const searchContainer = document.querySelector(".searchContainer");

  if (postData && postData.media) {
    //transforms the date to a more readable date
    let strDate = postData.created.split("T")[0];
    return (searchContainer.innerHTML = `
        <div class="card my-3 border border-primary">
        <a class="text-decoration-none" href="../feed/singlePost.html?id=${postData.id}">
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
  } else if (postData && !postData.media) {
    //transforms the date to a more readable date
    let strDate = postData.created.split("T")[0];
    return (searchContainer.innerHTML = `
      <div class="card my-3 border border-primary">
      <a class="text-decoration-none" href="../feed/singlePost.html?id=${postData.id} ">
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
  } else {
    searchContainer.innerHTML = `<h2 class="text-center m-3 p-3 text-danger">Sorry, that post doesnt exist, try with a deferent id</h2>`;
  }
}

const searchForm = document.querySelector(".searchForm");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await showPosts();
  location.href = `/search/index.html?id=${searchForm.search.value}`;
});

/**
 *
 * @param {number} id
 * @returns returns the rendered post by id into HTML
 */
async function showPost(id) {
  const postData = await showOnePost(id);
  return renderPosts(postData);
}

showPost(id);
