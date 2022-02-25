import apiFetch from "./api-fetch.js";


export function getContacts() {
  return apiFetch("contacts");
}
