import { getContacts } from "./services/contacts-service.js";

async function fetchContacts() {
  const contacts = await getContacts();
  console.log(contacts)
}

fetchContacts();

const STORE = {
    user: null,
    fetchContacts,
  };
  
  export default STORE;
  