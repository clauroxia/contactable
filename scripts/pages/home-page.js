import { renderHeader } from "../components/header.js";
import DOMHandler from "../dom-handler.js";
import {
  getContact,
  getContacts,
  updateContact,
} from "../services/contacts-service.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";
import ContactDetail from "./contact-detail.js";
import CreateContactPage from "./create-contact.js";

function renderContacts() {
  return `
  ${renderHeader("Contacts")}
  <ul class = "contact__list js-contact-list">
    ${renderFavorites(STORE.contacts)}
    <p class="content content--sm gray contacs_number">CONTACTS (${
      STORE.contacts.length
    })</p>
    ${createContactTemplate(STORE.contacts)}
  </ul>
  <div class="new_contact">
    <img class="js-new-contact" src="images/NewContactButton.svg" alt="">
  </div>
  `;
}

function renderFavorites(contacts) {
  let favoriteContacts = "";
  let favorites = 0;
  for (let contact of contacts) {
    if (contact.favorite) {
      favorites++;
      favoriteContacts += render(contact);
    }
  }
  if (favorites != 0) {
    return `
    <p class="content content--sm gray contacs_number">FAVORITES (${favorites})</p>
    ${favoriteContacts}
    <br>
    <br>
    `;
  } else {
    return "";
  }
}

function render(contact) {
  // const currentTab = STORE.currentTab;
  let favoriteIMG = "images/Vector.svg";
  if (contact.favorite) {
    favoriteIMG = "images/Vector-active.svg";
  }
  return `
  <li class="js-contact contact" data-id="${contact.id}">
    <div class="contact-container">
      <div class="contact-details">
        <img src="images/Rectangle.svg" alt="">
        <p class="content content--sm">${contact.name}</p>
      </div>
      <img data-favorite="${contact.favorite}" src=${favoriteIMG} alt="">
    </div>
  </li>
  `;
}

function createContactTemplate(contacts) {
  let contactsTemplate = "";
  for (let contact of contacts) {
    contactsTemplate += render(contact);
  }
  return contactsTemplate;
}

function listenLogout() {
  const link = document.querySelector(".js-logout");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

function listenCreate() {
  const a = document.querySelector(".js-new-contact");
  a.addEventListener("click", async (event) => {
    event.preventDefault();

    DOMHandler.load(CreateContactPage);
  });
}

function listenContact() {
  const ul = document.querySelector(".js-contact-list");
  ul.addEventListener("click", async (event) => {
    const contact = event.target.closest(".js-contact");
    if (!contact) return;
    STORE.currentContact = await getContact(contact.dataset.id);

    if (event.target.dataset.favorite != undefined) {
      STORE.currentContact.favorite = STORE.currentContact.favorite
        ? false
        : true;
      await updateContact(contact.dataset.id, STORE.currentContact);
      STORE.contacts = await getContacts();
      DOMHandler.load(HomePage);
    } else {
      DOMHandler.load(ContactDetail);
    }
  });
}

const HomePage = {
  toString() {
    return renderContacts();
  },
  addListeners() {
    listenLogout();
    listenContact();
    listenCreate();
  },
};

export default HomePage;
