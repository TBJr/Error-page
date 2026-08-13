const stackContainer = document.querySelector('.stack-container');
const cardNodes = document.querySelectorAll('.card-container');
const perspecNodes = document.querySelectorAll('.perspec');
const card = document.querySelector('.card');
const lead = document.querySelector('.lead');
const retry = document.getElementById('retry');

const LINE_COLORS = ['#c678dd', '#61afef', '#98c379', '#e5c07b', '#e06c75', '#56b6c2', '#abb2bf'];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let remaining = cardNodes.length;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function fillCard(cardEl) {
    const list = cardEl.querySelector('.code ul');
    if (!list || list.children.length) {
        return;
    }

    const numLines = randomInt(5, 9);

    for (let i = 0; i < numLines; i += 1) {
        const line = document.createElement('li');
        line.style.setProperty('--linelength', `${randomInt(30, 94)}%`);
        line.style.setProperty('--lineindent', `${randomInt(0, 4) * 10}px`);
        line.style.setProperty('--linecolor', LINE_COLORS[randomInt(0, LINE_COLORS.length - 1)]);
        line.style.animationDelay = `${i * 0.11}s`;
        line.classList.add('writeLine');
        list.appendChild(line);
    }
}

function throwCard(elem) {
    if (elem.dataset.thrown === 'true') {
        return;
    }

    elem.dataset.thrown = 'true';
    const randomY = Math.random() < 0.5 ? -820 : 820;
    const randomX = randomInt(-1100, -200);

    elem.style.transition = 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s ease';
    elem.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
    elem.style.opacity = '0';
    elem.style.pointerEvents = 'none';

    remaining -= 1;
    if (remaining === 0) {
        stackContainer.style.width = '0';
        stackContainer.style.height = '0';
        if (lead) {
            lead.textContent = 'Logs discarded. The 500 remains — but that was satisfying.';
        }
    }
}

function armCard(cardEl) {
    if (!cardEl || cardEl.dataset.armed === 'true') {
        return;
    }

    cardEl.dataset.armed = 'true';
    fillCard(cardEl);
    cardEl.classList.add('pokeup');
    cardEl.addEventListener('click', () => throwCard(cardEl), { once: true });
}

let exploded = false;

function explodeStack() {
    if (exploded) {
        return;
    }
    exploded = true;

    perspecNodes.forEach((elem, index) => {
        elem.style.animationDelay = `${index * 55}ms`;
        elem.classList.add('explode');
        window.setTimeout(() => {
            armCard(elem.closest('.card-container'));
        }, 560 + index * 55);
    });
}

retry?.addEventListener('click', () => {
    window.location.reload();
});

if (prefersReducedMotion) {
    cardNodes.forEach(armCard);
} else {
    const startExplode = () => explodeStack();
    card.addEventListener('animationend', function onTilt(event) {
        if (event.target !== card || event.animationName !== 'tiltcard') {
            return;
        }
        card.removeEventListener('animationend', onTilt);
        startExplode();
    });
    window.setTimeout(startExplode, 1500);
}
