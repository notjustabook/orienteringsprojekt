const createBtn = document.getElementById('createRideBtn');
const pickUpPointField = document.getElementById('pickUpPoint');
const numberOfPassengersField = document.getElementById('numberOfPassengers');
const event = document.getElementById('event');
let rideTable = document.querySelector('.eventRide:last-child');
let rideTableBody = document.querySelector('#rideTableBody');

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
        await POST('/ride', {pickUpPoint: pickUpPointField.value, numberOfPassengers: numberOfPassengersField.value, event: event.value});
    } catch (err) {
        console.log("Mistakes.." + err);
    };
};

function updateRides(event, allRides) {
    let parsedRides = JSON.parse(allRides);
    let html = "";
    for(let i = 0; i < parsedRides.length; i++) {
        if (parsedRides[i].event === event) {
            html += "<tr>";
            html+= "<td class='untoggled'>" + parsedRides[i].driver + "</td>";
            html+= "<td>" + parsedRides[i].pickUpPoint + "</td>";
            html+= "<td>" + parsedRides[i].numberOfSeats + "</td>";
            html+= "</tr>";
        }
    }
    rideTableBody.innerHTML = html;
    rideTable.className = 'showRides';
}

function switchTable() {
    let lastTable = rideTable.querySelector('table:last-child');
    if (rideTable.firstElementChild.className !== "switchTable") {
        rideTable.firstElementChild.className = "switchTable";
        lastTable.className="";
    }
    else {
        rideTable.firstElementChild.className = "";
        lastTable.className="switchTable";
    }
}

function getEventName(eventName, htmlElement) {
   const toggledCell = document.querySelector('.toggled');
   if (toggledCell != null) {
       if(toggledCell.innerHTML === htmlElement.innerHTML) {
           htmlElement.className = 'untoggled';
           return;
       }
   toggledCell.className = 'untoggled';
   }

    if(htmlElement.className === 'untoggled') {
        htmlElement.className = 'toggled';
        createBtn.disabled = false;
        event.disabled = false;
        event.setAttribute('readonly', true);
        event.value = htmlElement.innerHTML;
    }
    else {
        htmlElement.className = 'untoggled';
        createBtn.disabled = true;
    }
}

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
}
