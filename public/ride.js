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
};


async function createRide() {
    try {
        const pickUpPointField = document.getElementById('pickUpPoint');
        const numberOfPassengersField = document.getElementById('numberOfPassengers');
        await POST('/', {pickUpPoint: pickUpPointField.value, numberOfPassengers: numberOfPassengersField.value});
    } catch (err) {
        console.log("Mistakes.." + err);
    };
};

async function DELETE(url) {
    const OK = 200;
    let response = await fetch(url, {
        method: "DELETE",
    });
    if (response.status !== OK)
        throw new Error("DELETE status code " + response.status);
    return await response.json();
};

async function deleteRide() {
    try {
        const response = await DELETE('/');
    } catch (err) {
        console.log("Mistakes.." + err);
    }
};
