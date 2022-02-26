import DOMHandler from "../dom-handler.js";
import { logout } from "../services/sessions-service.js";
import LoginPage from "./login-page.js";

function render(){
  // const currentTab = STORE.currentTab;
  return `
  <div class="contact-container">
    <div class="contact-details">
      <img src="images/Rectangle.svg" alt="">
      <p class="content content--sm">Luis Chota</p>
    </div>
    <img src="images/Vector.svg" alt="">
  </div> 
  <div class = "footer">
  <a href="#" class = "link js-logout"> Logout </a>
  </div>
  `
}

function listenLogout() {
  const a = document.querySelector(".js-logout");
  a.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners(){
    listenLogout();
  },
};

export default HomePage;
