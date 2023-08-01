import { API_URL } from "./functions.mjs";
import { showOnePost } from "./functions.mjs";
import { updatePost } from "./functions.mjs";
import { removePost } from "./functions.mjs";

const form = document.querySelector("#singlePostForm");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function renderForm(index) {
  const post = await showOnePost(index);

  form.title.value = post.title;
  form.media.value = post.media;
  form.feedTags.value = post.tags;
  form.body.value = post.body;
}

renderForm(id);

const update = document.querySelector("#updatePost");
const remove = document.querySelector("#deletePost");

update.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  const formData = new FormData(target);
  const post = Object.fromEntries(formData.entries()); //stolen line from Oliver
  updatePost(id);
  console.log("updated");
});

remove.addEventListener("click", (e) => {
  e.preventDefault();
  removePost(id);
  console.log("removed");
  if (response.ok) {
    const userMessage = document.querySelector(".userMessage");
    userMessage.innerHTML = `<h2 class="text-center p-2 m-5"> Post deleted </h2>`;
  } else {
    alert("You can only delete posts you created");
  }
});
