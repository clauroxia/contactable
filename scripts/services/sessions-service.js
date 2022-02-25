const BASE_URI =  "https://contactable-api.herokuapp.com/"
const tokenKey = "conctactable_token"

export async function login(credentials = { email, password }) {
    const response = await fetch(BASE_URI+"login", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const user = await response.json(); 
    sessionStorage.setItem(tokenKey, user.token);
    return user;

}

