import { input } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { createContact, getContacts } from "../services/contacts-service.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";
import { renderHeader } from "../components/header.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";


function render() {
  const { createError } = CreateContactPage.state;
  return `
<main class="section">
  <section class="container">
  ${renderHeader("Create Contact")}
    <form class="main js-create-contact-form">
      <div class="container__form">
    ${input({
      id: "name",
      placeholder: "Name",
      value: CreateContactPage.state.nameValue,
      type: "text",
      error: CreateContactPage.state.nameError,
    })}
    ${input({
      id: "number",
      placeholder: "Number",
      value: CreateContactPage.state.numberValue,
      type: "number",
      error: CreateContactPage.state.numberError,
    })}
      ${input({
        id: "email",
        placeholder: "john@example.com",
        value: CreateContactPage.state.emailValue,
        type: "email",
        error: CreateContactPage.state.emailError,
      })}
      <div class="input__container">
        <div class="input__row">
          <select class="input input__form" name='relation' id="standard-select">
            <option value="Option 1">Relation</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Work">Work</option>
            <option value="Acquaintance">Acquaintance</option>
          </select>
        </div>
      </div>
      ${
        createError ? `<p class="text-center error-300">${createError}</p>` : ""
      }
      </div>
      <div class="footer">
        <a href="#" class="link js-cancel">Cancel</a> 
        <button class="button-enter">Save</button>
      </div>
    </form>
  </section>
</main>
  `;
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

function listenSubmitForm() {
  const form = document.querySelector(".js-create-contact-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { name, number, email, relation } = event.target;

      const contact = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };

      await createContact(contact);
      STORE.contacts = await getContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      CreateContactPage.state.createError = error.message;
      DOMHandler.reload();
    }
  });
}

function listenCancel() {
  const a = document.querySelector(".js-cancel");
  a.addEventListener("click", (event) => {
    event.preventDefault();
    try {
      DOMHandler.load(HomePage);
    } catch (error) {
      console.log(error);
    }
  });
}


const CreateContactPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout(),
    listenSubmitForm(),
    listenCancel();
  },
  state: {
    createError: null,
    nameValue: "",
    numberValue: "",
    emailValue: "",
    relationValue: "",
    nameError: false,
    numberError: false,
    emailError: false,
    relationError: false,
  },
};

export default CreateContactPage;
