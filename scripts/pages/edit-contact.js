import ContactDetail from "./contact-detail.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { input } from "../components/inputs.js";
import { getContacts, updateContact } from "../services/contacts-service.js";

function render() {
  const contact = STORE.currentContact;
  function relationContacts() {
    let relation = ["Family", "Friends", "Work", "Acquaintance"];
    let relationDefault = contact.relation;
    let option = `<option value="${contact.relation}">${contact.relation}</option>`;
    relation = relation.filter((value) => value != relationDefault);
    for (let i = 0; i < relation.length; i++) {
      option += `<option value="${relation[i]}">${relation[i]}</option>`;
    }
    return option;
  }
  return `
  <section>
    <div class="header">
      <h1 class="heading title--sm header__title">Edit contact</h1>
      <a href="#" class = "link js-logout"> Logout </a>
    </div>
    <form class="js-edit-form">
      <div class="container__form">
        ${input({
          id: "name",
          value: contact.name,
          type: "name",
          required: true,
        })}
        ${input({
          id: "number",
          value: contact.number,
          type: "number",
          required: true,
        })}
        ${input({
          id: "email",
          value: contact.email,
          type: "email",
          required: true,
        })}
        <div class="input__container">
          <div class="input__row">
            <select class="input__form input__select" name='relation' id="standard-select">
            ${relationContacts()}
            </select>
          </div>
        </div>
      </div>  
      <div class="footer">
        <a href="#" class="link js-cancel">Cancel</a>
        <button class="button-enter js-save">Save</button>
      </div>
    </form>
  </section>
  `;
}

function listenCancel() {
  const cancel = document.querySelector(".js-cancel");
  cancel.addEventListener("click", async (event) => {
    DOMHandler.load(ContactDetail);
  });
}

function listenSave() {
  const form = document.querySelector(".js-edit-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { name, number, email, relation } = event.target;

      const data = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };

      STORE.currentContact = await updateContact(STORE.currentContact.id, data);
      STORE.contacts = await getContacts();
      DOMHandler.load(ContactDetail);
    } catch (error) {
      DOMHandler.reload();
    }
  });
}

const EditContact = {
  toString() {
    return render();
  },
  addListeners() {
    listenCancel(), listenSave();
  },
};

export default EditContact;
