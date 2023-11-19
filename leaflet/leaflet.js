// leaflet.js
const ufoSightingsArray = ufoSightings.sheet1;

// Making the map
const map = L.map("map").setView([56.3, 12], 6.5);

// Add tiles
const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 50,
    attribution: '© CartoDB'
}).addTo(map);

// Adding icons
const limeGreenIcon = L.icon({
    iconUrl: '../pictures/alien.png',
    iconSize: [25, 25],
    iconAnchor: [32, 32],
    popupAnchor: [-19, -30]
});

// Create a MarkerClusterGroup
const markers = L.markerClusterGroup();

// Loop through data and add markers to the cluster group
ufoSightingsArray.forEach(function (sighting) {
    const lat = parseFloat(sighting.latitude);
    const lng = parseFloat(sighting.longitude);

    // Create a marker and bind a popup to it
    const marker = L.marker([lat, lng], { icon: limeGreenIcon });
    marker.bindPopup(`<br>Location: ${sighting.location}<br>datetime: ${sighting.datetime}`);

    // Add the marker to the MarkerClusterGroup
    markers.addLayer(marker);
});

// Add the MarkerClusterGroup to the map
map.addLayer(markers);
