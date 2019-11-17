const username = document.querySelector('#input-username');
const password = document.querySelector('#input-password');
const login = document.querySelector('#btnLogin');
const error = document.querySelector('#errorLabel');

async function POST(url, data) {
    const CREATED = 200;
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.status !== CREATED)
        throw new Error("POST status code " + response.status);
    return await response.json();
}

login.onclick = async () => {
    try {
        const response = await POST("/login", {userName: username.value, password: password.value});
        if (response.ok) {
            window.location.href = "/session";
        }
        else {
            password.value = "";
            error.innerHTML = "Incorrect password!";
        }
    } catch (e) {
        error.innerHTML = e.name + ": " + e.message;
    }
};