const stackContainer = document.querySelector('.stack-container');
const cardNodes = document.querySelectorAll('.card-container');
const perspecNodes = document.querySelectorAll('.perspec');
const perspec = document.querySelector('.perspec');
const card = document.querySelector('.card');

let counter = stackContainer.children.length;

// Function to generate random number
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// After tilt animation, fire the explode animation
card.addEventListener('animationend', function () {
    perspecNodes.forEach(function (elem, index) {
        elem.classList.add('explode');
    });
});

// After explode animation do a bunch of stuff
perspec.addEventListener('animationed', function (e) {
    cardNodes.forEach(function (elem, index) {

        // Add hover animation class
        elem.classList.add('pokeup');

        // Add event listener to throw card on click
        
    })
})