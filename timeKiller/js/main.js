// Easter egg:
// (function (UP,UP,DOWN,DOWN,LEFT,RIGHT,LEFT,RIGHT,B,A) {
// livesCount = 30;
// })();
// The end of the easter egg.

// board is the space, where the bomb is being displayed
const board = document.querySelector('.board');

// Flag
let isBombClicked = false;

// Count of disarmed bombs
let result = 0;

// Time to disarm the bomb [in miliseconds]
const time = 3000;

// Min and max time of waiting for the new bomb to appear [in miliseconds]
const min = 2000,
    max = 15000;

anticheater();

// Time between disappear of a bomb and the appearance of the next one (in miliseconds)
let timeout = parseInt(Math.floor(Math.random() * (max - min + 1) + min));

// This function executes, when the bomb explodes
const countdown = () => {
    const bombWrap = document.querySelector('.bombWrap');
    const bomb = document.querySelector('.bomb');
    const boom = document.createElement('img');

    document.querySelector('.result').textContent = result;
    bombWrap.removeChild(bomb);
    boom.classList.add('bomb');
    const number = Math.floor(Math.random() * 5 + 1);
    boom.setAttribute('src', `img/bad${number}.png`);
    boom.style.transform = 'translate(-100%, -100%) scale(1)';
    boom.style.animation = 'explosion 2s 1 linear both';
    bombWrap.appendChild(boom);
    setTimeout(() => {
        number === 5 ? alert(`Internet Explorer has taken over this device. Please, don\'t panic. Our staff is going to contact you within ${Math.floor(Math.random() * (365 - 50 + 1) + 50)} working days.`) : alert(`Game over! You have disarmed ${result} bombs, but the bomb number ${++result} was faster than you. RIP`);
        result = 0;
    }, 1000);
}

// appear function - the app's main function
const appear = () => {

    // Bomb wrap - creating and styling
    const bombWrap = document.createElement('div');
    bombWrap.style.width = '100px';
    bombWrap.style.height = '100px';
    bombWrap.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    bombWrap.classList.add('bombWrap');

    // Bomb - creating, styling and adding to the bomb wrap 
    const bomb = document.createElement('img');
    bomb.classList.add('bomb');
    bomb.setAttribute('src', 'img/bomb.png');
    bombWrap.appendChild(bomb);

    // Getting the board sizes
    const boardWidth = board.offsetWidth,
        boardHeight = board.offsetHeight;

    // Getting the bomb wrapper sizes
    const bombWrapWidth = parseInt(bombWrap.style.width),
        bombWrapHeight = parseInt(bombWrap.style.height);

    // Setting the bomb position
    const leftPosition = Math.floor(Math.random() * (boardWidth - bombWrapWidth) + bombWrapWidth),
        topPosition = Math.floor(Math.random() * (boardHeight - bombWrapHeight) + bombWrapHeight);

    // Applying the bomb position
    bombWrap.style.left = `${leftPosition}px`;
    bombWrap.style.top = `${topPosition}px`;

    // Adding the bomb wrapper (with the bomb inside) to the board
    board.appendChild(bombWrap);

    // Event listener - click the bomb and change the flag
    document.querySelector('.bomb').addEventListener('click', function () {
        let timeout = parseInt(Math.floor(Math.random() * (max - min + 1) + min));
        const success = document.createElement('img');
        isBombClicked = !isBombClicked;
        document.querySelector('.result').textContent = ++result;
        bomb.parentNode.removeChild(bomb);
        success.classList.add('bomb');
        const number = Math.floor(Math.random() * 5 + 1);
        success.setAttribute('src', `img/good${number}.png`);
        success.style.transform = 'translate(-100%, -100%) scale(1)';
        success.style.animation = 'explosion 2s 1 linear both';
        bombWrap.appendChild(success);

        // This condition executes, when the kitten appears
        if (number === 5) {
            const textWrap = document.createElement('p');
            const text = document.createTextNode(`You've saved a kitten! You get extra ${Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)} orens!!!!`);
            textWrap.appendChild(text);
            textWrap.classList.add('kitten');
            document.body.appendChild(textWrap);

            setTimeout(() => {
                document.body.removeChild(textWrap);
            }, 4000);
        }

        setTimeout(() => {
            bombWrap.parentNode.removeChild(bombWrap);
            appear();
        }, timeout); // Time between disappear of a bomb and the appearance of the next one
    });

    // Starting the countdown, when a bomb appears
    if (!isBombClicked) {
        countingDown = setTimeout(countdown, time); // Global declaration of the variable 'countingDown' is intentional
    }

    // When you click anywhere, it checks, if the bomb is clicked. If it is, the function stops the counting down
    window.addEventListener('click', () => {
        if (isBombClicked) {
            clearTimeout(countingDown);
            isBombClicked = false;
        }
    });
}

// Execution of the main function
appear();

// anti - cheater
function anticheater() {
    if (time !== 3000 || min !== 2000 || max !== 15000) {
        alert('And the Lord saith: Thou shalt not cheat!');
        window.location.reload(false);
    }
}