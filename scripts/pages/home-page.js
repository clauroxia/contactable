import DOMHandler from "../dom-handler.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";

function render() {
  const currentTab = STORE.currentTab;
  return `
    <p> Home Page</p>
  `;
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {},
};

export default HomePage;
