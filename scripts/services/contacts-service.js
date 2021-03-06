import apiFetch from "./api-fetch.js";


export function getContacts() {
  return apiFetch("contacts");
}

export function getContact(id) {
  return apiFetch("contacts/" + id, { method: "GET" });
}

export async function createContact(
  newContact = { name, number, email, password }
) {
  const { token, ...contact } = await apiFetch("contacts", { body: newContact });
  return contact;
}

export function updateContact(id, data = { name, number, email, relation }) {
  return apiFetch("contacts/" + id, {
    body: data,
    method: "PATCH"
  });
}

export function deleteContact(id) {
  return apiFetch("contacts/" + id, { method: "DELETE" });
}