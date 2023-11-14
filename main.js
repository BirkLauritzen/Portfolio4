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

