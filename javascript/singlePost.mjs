import { API_URL } from "./functions.mjs";
import { showOnePost } from "./functions.mjs";
import { updatePost } from "./functions.mjs";
import { removePost } from "./functions.mjs";
import { showPosts } from "./functions.mjs";

const form = document.querySelector("#singlePostForm");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const searchForm = document.querySelector(".searchForm");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await showPosts();
  location.href = `/search/index.html?id=${searchForm.search.value}`;
});

async function renderForm(index) {
  const post = await showOnePost(index);

  form.title.value = post.title;
  form.media.value = post.media;
  form.feedTags.value = post.tags;
  form.body.value = post.body;
}

renderForm(id);
const remove = document.querySelector("#deletePost");
const mainHeading = document.querySelector(".mainHeading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = e.target;
  const formData = new FormData(target);
  const post = Object.fromEntries(formData.entries()); //stolen line from Oliver
  post.id = id;
  updatePost(post);
  mainHeading.innerText = "Post updated succesfully";
  mainHeading.classList.add("text-success");
});

remove.addEventListener("click", (e) => {
  e.preventDefault();
  removePost(id);
  console.log("removed");
});
