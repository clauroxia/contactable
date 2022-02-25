import { input } from "../components/inputs.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-service.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";

function render() {
  const { loginError } = LoginPage.state;
  return `
  <p>login page</p>`;
}


const LoginPage = {
    toString() {
      return render();
    },
    addListeners() {
      listenSubmitForm();
    },
  };

export default LoginPage;
