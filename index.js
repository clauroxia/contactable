import DOMHandler from "./scripts/dom-handler.js";
import HomePage from "./scripts/pages/home-page.js";
import { login } from "./scripts/services/sessions-service.js";


DOMHandler.load(HomePage);

const credentials = {
    email: "team01-luis@mail.com",
    password: "123456"
}

login(credentials)
    .then(console.log(user, "success"))
    .catch((error) => console.log(error, ));