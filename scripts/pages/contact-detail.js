import STORE from "../store.js";
import EditContact from "./edit-contact.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";
import { deleteContact } from "../services/contacts-service.js";
import { getContacts } from "../services/contacts-service.js";


function render() {
  const contact = STORE.currentContact;
  return `
  <section>
    <div class="header">
      <h1 class="heading title--sm header__title">Contact Detail</h1>
      <a href="#" class = "link js-logout"> Logout </a>
    </div>
    <img src="./images/Rectangle.svg" class="image-size" >
    <p>${contact.name}</p>
    <p>${contact.relation}</p>
    <p>${contact.number}</p>
    <p>${contact.email}</p>
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
