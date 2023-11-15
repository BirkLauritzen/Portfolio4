// main.js

document.addEventListener('DOMContentLoaded', function () {
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

// chart.js

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'UFO observationer',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});