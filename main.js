// main.js

// Adds the animation to the text and the ufo image
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('#container');
    const flyingImage = document.querySelector('#flyingImage');
    const letters = document.querySelectorAll('#container h1 span');

    // Function that checks if the ufo and the letter are colliding
    function checkCollision(ufoRect, letterRect) {
        return !(ufoRect.right < letterRect.left ||
            ufoRect.left > letterRect.right ||
            ufoRect.bottom < letterRect.top ||
            ufoRect.top > letterRect.bottom);
    }

    // Function that animates the text
    function animateUFO() {
        let containerRect = container.getBoundingClientRect();
        let startX = -flyingImage.offsetWidth;
        let endX = containerRect.width;
        let currentX = startX;

        flyingImage.style.top = '0px';
        flyingImage.style.display = 'block';

        // Function that updates the position of the ufo
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

// Load the JSON data
let data;
fetch('/ufoObservationer.json')
  .then(response => response.json())
  .then(json => data = json);

// Function to generate a random number between 2511 and 4450
function getRandomId() {
  return Math.floor(Math.random() * (4450 - 2511 + 1)) + 2511;
}

// Function to get a note by id
function getNoteById(id) {
  for (let obj of data) {
    if (obj.id === id) {
      return obj.notes;
    }
  }
  // If no matching id was found, generate a new random id and try again
  return getNoteById(getRandomId());
}

// Add event listener to button
document.querySelector('#myButton').addEventListener('click', () => {
    // Get a random note
    const note = getNoteById(getRandomId());

    if (note) {
        // Make the notes container visible
        const notesContainer = document.querySelector('#notesContainer');
        notesContainer.style.display = 'block'; // or 'flex', 'inline-block', etc., depending on your layout

        // Set the note text
        notesContainer.textContent = note;
    }
});
