const overlayDiv = document.getElementById('overlay');
const heartLives = document.getElementsByClassName('tries');
const keyButtons = document.getElementsByClassName('key');
const gameOverMessage = document.getElementById('game-over-message');
let initiateGame;


// Initiates the game with a click event
document.getElementById("btn__reset").addEventListener('click', function (){
    initiateGame = new Game();
    initiateGame.startGame();
});

// Handles click events on qwerty
document.getElementById("qwerty").addEventListener('click', function (e){

    if (e.target.className == 'key') {
        initiateGame.handleInteraction(e.target.textContent);
    }
});

// Handles key events / Prevents key events until user starts game
document.addEventListener('keyup', function (e){
    const lowerCase = e.key.toLowerCase();
    if (initiateGame && overlayDiv.style.display === "none") {
        initiateGame.handleInteraction(lowerCase);
    }
});