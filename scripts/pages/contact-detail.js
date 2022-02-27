import STORE from "../store.js";
import EditContact from "./edit-contact.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";
import { deleteContact } from "../services/contacts-service.js";
import { getContacts } from "../services/contacts-service.js";
import { renderHeader } from "../components/header.js";


function render() {
  const contact = STORE.currentContact;
  return `
  <section>
    ${renderHeader("Contact Detail")}
    <div class="show_contact">
      <img src="./images/Rectangle.svg" class="image-size" >
      <p class="content content--md black">${contact.name}</p>
      <p class="content content--sm gray">${contact.relation}</p>
    </div>
    <div class="show_contact">
      <p class="content content--sm gray">Number: <span class="black">${contact.number}</span> </p>
      <p class="content content--sm gray">Email: <span class="black">${contact.email}</span> </p>
    </div>
    <div class="footer">
      <a href="#" class="link js-back">Back</a>
      <a href="#" class="link js-delete">Delete</a>
      <a href="#" class="link js-edit">Edit</a>
    </div>
  </section>
  `
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


function listenBack() {
  const back = document.querySelector(".js-back");
  back.addEventListener("click", async (event) => {
    DOMHandler.load(HomePage);
  });
}

function listenDelete() {
  const link = document.querySelector(".js-delete");
  link.addEventListener("click", async (event) => {
    await deleteContact(STORE.currentContact.id);
    const contacts = await getContacts();
    STORE.contacts = contacts;
    DOMHandler.load(HomePage);
  });
}

function listenEdit() {
  const edit = document.querySelector(".js-edit");
  edit.addEventListener("click", async (event) => {
    DOMHandler.load(EditContact);
  });
}


const ContactDetail = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout(),
    listenBack(),
    listenEdit(),
    listenDelete()
  }
};

export default ContactDetail;
