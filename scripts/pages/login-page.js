import { input } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-service.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";
import SignupPage from "./signup-page.js";

function render() {
  const { loginError } = LoginPage.state;
  return `
<main class="section">
  <section class="container">
    <h1 class="heading heading--lg text-center mb-4">Login</h1>
    <form class="flex flex-column gap-4 mb-4 js-login-form">
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
      ${loginError ? `<p class="text-center error-300">${loginError}</p>` : ""}
      <button class="button button--primary">Login</button>
    </form>
    <a href="#" class="block text-center js-signup">Signup</a>
  </section>
</main>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await login(credentials);
      STORE.user = user;
      await STORE.fetchContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      LoginPage.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

function listenSignup(){
    const a = document.querySelector(".js-signup");
    a.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            DOMHandler.load(SignupPage);
        } catch (error) {
            console.log(error);
        }
    });
}

const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmitForm();
    listenSignup();
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
