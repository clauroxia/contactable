import { input } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";
import { createUser } from "../services/users-service.js";

function render() {
  const { signupError } = SignupPage.state;
  return `
<main class="section">
  <section class="container">
    <h1 class="heading heading--lg text-center mb-4">Sign up</h1>
    <form class="flex flex-column gap-4 mb-4 js-signup-form">
      ${input({
        label: "email",
        id: "email",
        placeholder: "john@example.com",
        type: "email",
        required: true,
        value: "test1@mail.com",
      })}
      ${input({
        label: "password",
        id: "password",
        placeholder: "******",
        type: "password",
        required: true,
        value: "123456",
      })}
      ${signupError ? `<p class="text-center error-300">${signupError}</p>` : ""}
      <button class="button button--primary">Sign up</button>
    </form>
    <a href="#" class="block text-center js-login">Login</a>
  </section>
</main>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-signup-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await createUser(credentials);
      STORE.user = user;
      await STORE.fetchContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      SignupPage.state.signupError = error.message;
      DOMHandler.reload();
    }
  });
}

function listenLogin(){
    const a = document.querySelector(".js-login");
    a.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            DOMHandler.load(LoginPage);
        } catch (error) {
            console.log(error);
        }
    });
}


const SignupPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmitForm();
    listenLogin()
  },
  state: {
    signupError: null,
  },
};

export default SignupPage;
