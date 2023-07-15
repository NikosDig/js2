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
