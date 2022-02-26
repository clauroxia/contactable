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
    <h1 class="heading title--sm form__title">Sign up</h1>
    <form class="js-signup-form">
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
      ${signupError ? `<p class="text-center error">${signupError}</p>` : ""}
      </div> 
      <div class="footer">
      <a href="#" class="link js-login">Login</a>
      <button class="button-enter">Sign up</button>
      </div>
    </form>
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
