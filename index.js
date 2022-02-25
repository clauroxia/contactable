import { login } from "./scripts/services/sessions-service.js";

const credentials = {
    email: "team01-chema@mail.com",
    password: "123456"
}

login(credentials)
    .then(console.log(user, "success"))
    .catch((error) => console.log(error, ));