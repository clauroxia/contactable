import { getContacts } from "./services/contacts-service.js";

async function fetchContacts() {
  const contacts = await getContacts();
  console.log(contacts)
}

fetchContacts();