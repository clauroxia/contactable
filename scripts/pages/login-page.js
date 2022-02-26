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
    <h1 class="heading title--sm form__title">Login</h1>
    <form class="js-login-form">
      <div class="container__form">
      ${input({
        id: "email",
        placeholder: "email",
        type: "email",
        required: true,
      })}
      ${input({
        id: "password",
        placeholder: "password",
        type: "password",
        required: true,
      })}
      ${loginError ? `<p class="text-center error-300">${loginError}</p>` : ""}
      </div>  
      <div class="footer">
      <a href="#" class="link js-signup">Signup</a>
      <button class="button-enter">Login</button>
      </div>
      </form>
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
