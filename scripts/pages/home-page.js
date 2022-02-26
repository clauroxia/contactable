import DOMHandler from "../dom-handler.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";

function renderUL() {
  return `
  <ul class="js-contact-list">
    ${renderContacts()}
  </ul>
  `
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
    <img src="images/Vector.svg" alt="">
  </div> 
  <div class = "footer">
  <a href="#" class = "link js-logout"> Logout </a>
  </div>
  `
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
    return renderContacts(STORE.contacts);
  },
  addListeners() {
    listenLogout();
  },
};

export default HomePage;
