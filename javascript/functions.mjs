export const API_URL = "https://api.noroff.dev/api/v1/social";

/**
 *
 * @param {string} key the name of the key we add to the local storage
 * @param {string} value the actual JWT
 *
 * the function takes the web token after the user has loged in and
 * saves it to local srorage
 */
export function saveJWT(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 *
 * @param {string} key the name of the JWT we added to the local storage
 * @returns returns the JWT parsed from local storage
 */
export function loadJWT(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 *
 * @param {string} key the name of the JWT we want to delete
 *
 * deletes the JWT from local storage
 */
export function deleteJWT(key) {
  localStorage.removeItem(key);
}

/**
 *
 * @param {object} postData titel and body of post
 * @returns the updates version of the post you want to modify
 * requires also the id of the post
 */
export async function updatePost(postData) {
  const url = API_URL + "/posts/" + postData.id;
  const token = loadJWT("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "put",
    body: JSON.stringify(postData),
  });
  const result = await response.json();
  console.log(result);
  return result;
}

/**
 *
 * @param {object} postData title and body of post you want to create
 * @returns title and body of the post you want to create
 * the function takes the tile and body of the post you want to create and
 * creates the post
 */
export async function createPost(postData) {
  const url = API_URL + "/posts";
  const token = loadJWT("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    body: JSON.stringify(postData),
  });
  const result = await response.json();
  console.log(result);
  return result;
}

/**
 *
 * @param {number} id takes the id of the post you want to delete
 * @returns
 * takes the id of the post you want to delete and deletes that post
 */
export async function removePost(id) {
  const url = API_URL + "/posts/" + id;
  const token = loadJWT("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "delete",
  });
  const result = await response.json();
  console.log(result, "post propably deleted");
  if (response.ok) {
    const userMessage = document.querySelector(".userMessage");
    userMessage.innerHTML = `<h2 class="text-center p-2 m-5"> Post deleted </h2>`;
    return result;
  } else {
    alert("You can only delete posts you created");
  }
}

/**
 *
 * @returns the last 100 posts the have been created
 */
export async function showPosts() {
  const url = API_URL + "/posts/";
  const token = loadJWT("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

/**
 *
 * @param {number} id the id of the particular post
 * @returns returns the spesific post you have selected (needs id of post)
 */
export async function showOnePost(id) {
  const url = `${API_URL}/posts/${id}`;
  const token = loadJWT("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
