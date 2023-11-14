// main.js

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#container');
    const flyingImage = document.querySelector('#flyingImage');
    const letters = document.querySelectorAll('#container h1 span');

    function checkCollision(ufoRect, letterRect) {
        return !(ufoRect.right < letterRect.left ||
            ufoRect.left > letterRect.right ||
            ufoRect.bottom < letterRect.top ||
            ufoRect.top > letterRect.bottom);
    }

    function animateUFO() {
        let containerRect = container.getBoundingClientRect();
        let startX = -flyingImage.offsetWidth;
        let endX = containerRect.width;
        let currentX = startX;

        flyingImage.style.top = '0px';
        flyingImage.style.display = 'block';

        function updatePosition() {
            if (currentX < endX) {
                currentX += 2;
                flyingImage.style.left = currentX + 'px';

                // Check collision for each letter
                let ufoRect = flyingImage.getBoundingClientRect();
                letters.forEach(letter => {
                    let letterRect = letter.getBoundingClientRect();
                    if (checkCollision(ufoRect, letterRect)) {
                        letter.style.color = '#00ff00'; // Lime green color
                    }
                });

                requestAnimationFrame(updatePosition);
            } else {
                flyingImage.style.display = 'none';
                flyingImage.style.left = startX + 'px';
            }
        }

        requestAnimationFrame(updatePosition);
    }

    setTimeout(animateUFO, 5000);
});

// UfoLeafletApp
console.log(ufoSightings);

const ufoSightingsArray = ufoSightings.sheet1;

const map = L.map("map").setView([56, 11.6], 6);

const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 50,
    attribution: '© CartoDB'
}).addTo(map);

const limeGreenIcon = L.icon({
    iconUrl: './pictures/alien.png', // Replace with your lime green marker icon path
    iconSize: [25, 25], // Replace with your desired icon size
    iconAnchor: [32, 32], // Replace with your desired icon anchor
    popupAnchor: [0, -32] // Replace with your desired popup anchor
});

ufoSightingsArray.forEach(function (sighting) {

    const lat = parseFloat(sighting.latitude);
    const lng = parseFloat(sighting.longitude);

    // Create a marker for each sighting and add it to the map
    const marker = L.marker([lat, lng], { icon: limeGreenIcon }).addTo(map);

});
