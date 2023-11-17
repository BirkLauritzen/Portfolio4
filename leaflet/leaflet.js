// leaflet.js

// UfoLeafletApp
console.log(ufoSightings);

const ufoSightingsArray = ufoSightings.sheet1;

const map = L.map("map").setView([56.3, 12], 6.5);

const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 50,
    attribution: '© CartoDB'
}).addTo(map);

const limeGreenIcon = L.icon({
    iconUrl: '../pictures/alien.png',
    iconSize: [25, 25],
    iconAnchor: [32, 32],
    popupAnchor: [-19, -30]
});

ufoSightingsArray.forEach(function (sighting) {

    const lat = parseFloat(sighting.latitude);
    const lng = parseFloat(sighting.longitude);

    const marker = L.marker([lat, lng], { icon: limeGreenIcon }).addTo(map);
    marker.bindPopup(`<br>Location: ${sighting.location}<br>datetime: ${sighting.datetime}`);
});

