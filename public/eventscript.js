const eventNameField = document.querySelector('#input-eventName');
const locationField = document.querySelector('#input-location');
const dateField = document.querySelector('#input-date');
const infoBox = document.querySelector('#infobox');

document.querySelector('#btnCreateEvent').onclick = async () => {
    if (isFilledOut() && checkInput()) {
        infoBox.innerHTML = '';
        const response = await POST('/createEvent', {
            eventName: eventNameField.value,
            location: locationField.value,
            date: dateField.value,
        });
        if (response.message === "created") {
            infoBox.innerHTML = 'Event med navn ' + eventNameField.value + ' er oprettet';
        } else if (response.message === "wrong format") {
            infoBox.innerHTML = 'Navn og lokation må kun indeholde' +
                ' bogstaver fra A-Å, tal fra 1-9, bindestreg og mellemrum. ' +
                'Dato må kun indeholde tal og skal være på formen dd-mm-åååå';
        } else {
            infoBox.innerHTML = 'Noget gik galt';
        }
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

function isFilledOut() {
    if (eventNameField.value === '') {
        infoBox.innerHTML = 'Løbets navn skal udfyldes.';
        return false;
    } else if (locationField.value === '') {
        infoBox.innerHTML = 'Løbets lokation skal udfyldes.';
        return false;
    } else if (dateField.value === '') {
        infoBox.innerHTML = 'Alle felter skal udfyldes.';
        return false;
    } else {
        return true;
    }
}

function checkInput() {
    let nameRegex = /^[(a-zA-Z0-9ÆØÅæøå\- )]+$/;
    let numberRegex = /^((19|20)\d\d[- /.](0[1-9]|1[0-2])[- /.](0?[1-9]|[12]\d|3[01]))$/g;
    if (eventNameField.value.match(nameRegex) === null) {
        infoBox.innerHTML = 'Navn må kun indeholde tegn fra A-Å, tal fra 0-9, bindetreg og mellemrum';
        return false;
    }
    if (locationField.value.match(nameRegex) === null) {
        infoBox.innerHTML = 'Lokation må kun indeholde tegn fra A-Å, tal fra 0-9, bindetreg og mellemrum';
        return false;
    }
    if (dateField.value.match(numberRegex) === null) {
        infoBox.innerHTML = dateField.value + ' Datoen må kun bestå af tal';
        return false;
    }
    return true;
}