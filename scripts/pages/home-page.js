import DOMHandler from "../dom-handler.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";

function renderHeader(title) {
  return `
  <div class="header">
  <h1 class="heading title--sm header__title">${title}</h1>
  <a href="#" class = "link js-logout"> Logout </a>
  </div>
  ${renderUL()}
  `;
}

function renderUL() {
  return `
  <ul class = "contact__list js-contact-list"> 
    ${renderContacts(STORE.contacts)}
  </ul>`;
}

function render(contact) {
  // const currentTab = STORE.currentTab;
  return `
  <li>
    <div class="contact-container">
      <div class="contact-details">
        <img src="images/Rectangle.svg" alt="">
        <p class="content content--sm">${contact.name}</p>
      </div>
      <img src="images/Vector.svg" alt="">
    </div>
  </li>
  `;
}

function renderContacts(contacts) {
  let contactsTemplate = "";
  for (let contact of contacts) {
    contactsTemplate += render(contact);
  }
  return contactsTemplate;
}

function listenLogout() {
  const a = document.querySelector(".js-logout");
  a.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const HomePage = {
  toString() {
    return renderHeader("Contactable");
  },
  addListeners() {
    listenLogout();
  },
};

export default HomePage;
