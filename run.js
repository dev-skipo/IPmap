 // Function to get IP address using ipify
 async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return null;
    }
}

// Function to get location data based on IP address
async function getIPLocation(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
        return null;
    }
}

// Initialize the map
let map;
let marker;

function initMap(lat, lon) {
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
}

// Update the map with a new location
function updateMap(lat, lon, locationInfo) {
    map.setView([lat, lon], 13);
    marker.setLatLng([lat, lon]).setPopupContent(locationInfo).openPopup();
}

// Search for IP location
async function searchIP() {
    const ip = document.getElementById('ipInput').value;
    const locationData = await getIPLocation(ip);
    if (locationData) {
        const lat = locationData.lat;
        const lon = locationData.lon;
        const locationInfo = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
        document.getElementById('info').innerText = `IP Address: ${ip}\nLocation: ${locationInfo}`;
        updateMap(lat, lon, locationInfo);
    } else {
        document.getElementById('info').innerText = 'Could not fetch location data.';
    }
}

// Main function to execute on page load
(async function() {
    const ip = await getIPAddress();
    if (ip) {
        const locationData = await getIPLocation(ip);
        if (locationData) {
            const lat = locationData.lat;
            const lon = locationData.lon;
            const locationInfo = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
            document.getElementById('info').innerText = `IP Address: ${ip}\nLocation: ${locationInfo}`;
            initMap(lat, lon);
        } else {
            document.getElementById('info').innerText = 'Could not fetch location data.';
        }
    } else {
        document.getElementById('info').innerText = 'Could not fetch IP address.';
    }
})();


//  ====>
//  https://www.openstreetmap.org/
//  https://leafletjs.com/
//  https://www.ipify.org/

