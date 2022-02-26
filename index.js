import { tokenKey } from "./scripts/config.js";
import DOMHandler from "./scripts/dom-handler.js";
import HomePage from "./scripts/pages/home-page.js";
import LoginPage from "./scripts/pages/login-page.js";
import { getContacts } from "./scripts/services/contacts-service.js";
import { getUser } from "./scripts/services/users-service.js";
import STORE from "./scripts/store.js";
import { getContacts } from "./scripts/services/contacts-service.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) throw new Error();
    const user = await getUser();
    STORE.user = user;
    const contacts = await getContacts();
    STORE.contacts = contacts;
    DOMHandler.load(HomePage);
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
