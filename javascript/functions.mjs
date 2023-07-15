export const API_URL = "https://api.noroff.dev/api/v1/social";

export function saveJWT(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadJWT(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function deleteJWT(key) {
  localStorage.removeItem(key);
}
