const nameField = document.querySelector('.name');
const usernameField = document.querySelector('.username');
const passwordField = document.querySelector('.password');
const confirmPasswordField = document.querySelector('.confirmpassword');
const successBox = document.querySelector('.successbox');

document.querySelector('.btncreate').onclick = async () => {
    successBox.innerHTML = '';
    if (!isFilledOut()) {
        return;
    }
    if (!checkInput()) {
        return;
    }
    try {
        const response = await POST('/createUser', {
            name: nameField.value,
            username: usernameField.value,
            password: passwordField.value,
            confirmpassword: confirmPasswordField.value,
        });
        if (response.message === "created") {
            successBox.innerHTML = 'Bruger med brugernavn ' + usernameField.value + ' er oprettet';
            clearFields();
        } else if (response.message === "user exists") {
            successBox.innerHTML = 'Brugernavnet er allerede i brug';
            usernameField.value = '';
        } else if (response.message === "no match") {
            successBox.innerHTML = 'Passwords skal matche';
            usernameField.value = '';
        } else {
            successBox.innerHTML = 'Password skal udfyldes';
            usernameField.value = '';
        }
    } catch (err) {
        successBox.innerHTML = 'Noget gik galt: ' + err;
        console.log(err);
    }
};

async function POST(url, data) {
    const OK = 200;
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.status !== OK) {
        throw new Error("Error: " + response.status);
    }
    return await response.json();
}

function clearFields() {
    nameField.value = '';
    usernameField.value = '';
    passwordField.value = '';
    confirmPasswordField.value = '';
}

function isFilledOut() {
    if (nameField.value === '') {
        successBox.innerHTML = 'Navn skal udfyldes';
        return false;
    }
    if (usernameField.value === '') {
        successBox.innerHTML = 'Brugernavn skal udfyldes';
        return false;
    }
    if (passwordField.value === '') {
        successBox.innerHTML = 'Password skal udfyldes';
        return false;
    }
    if (confirmPasswordField.value === '') {
        successBox.innerHTML = 'Bekræft venligst dit password';
        return false;
    }
    return true;
}

function checkInput() {
    let usernameRegex = /^[a-zA-Z0-9ÆØÅæøå]+$/;
    let nameRegex = /^[a-zA-ZÆØÅæøå\-]+$/;
    if (usernameField.value.match(usernameRegex) === null) {
        successBox.innerHTML = 'Brugernavn må kun indeholde bogstaver fra A-Å og tal fra 0-9';
        return false;
    }
    if (nameField.value.match(nameRegex) === null) {
        successBox.innerHTML = 'Navn må kun indeholde bogstaver fra A-Å og -';
        return false;
    }
    if (passwordField.value !== confirmPasswordField.value) {
        successBox.innerHTML = 'Passwords matcher ikke';
        return false;
    }
    return true;
}