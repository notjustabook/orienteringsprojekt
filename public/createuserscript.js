const nameField = document.querySelector('.name');
const userNameField = document.querySelector('.name');
const passwordField = document.querySelector('.name');
const successBox = document.querySelector('.successbox');

document.querySelector('.btncreate').onclick = async () => {
    try {
        const response = await POST('/createUser', {
            name: nameField.value,
            userName: userNameField.value,
            password: passwordField.value
        });
        successBox.innerHTML = 'Bruger med navn ' + nameField.value + ' er oprettet';
    } catch (err) {
        successBox.innerHTML = 'Noget gik galt.';
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