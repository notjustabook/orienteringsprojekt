const nameField = document.querySelector('.name');
const userNameField = document.querySelector('.name');
const passwordField = document.querySelector('.name');
const succesBox = document.querySelector('.successbox');

document.querySelector('.btncreate').onclick = async () => {
    try {
        const response = await POST('/createUser', {
            name: nameField.value,
            userName: userNameField.value,
            password: passwordField.value
        });
        succesBox.innerHTML = 'Bruger med navn ' + nameField.value + ' er oprettet';
    } catch (err) {
        succesBox.innerHTML = 'Noget gik galt.';
    }
};

async function POST(url, data) {
    const OK = 200;
    let response = await POST(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.status !== OK) {
        throw new Error("Error: " + response.status);
    }
    return await response.json();
}