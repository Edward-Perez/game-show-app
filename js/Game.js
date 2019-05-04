class Game {
        constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.userChoices = "";
        this.gameStatus = false;
    }

    /**
     * Begins Game by hiding div with #overlay / Sets gameStatus
     * Call addPhraseToDisplay() to display phrase
     */
    startGame() {
        if (!this.gameStatus) {
            this.gameReset();
        }
        overlayDiv.style.display = 'none';
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay();
        this.gameStatus = true;
    }

    /**
     * @return {Array} -array holds phrases objects
     */
    createPhrases() {
        return [
            {phrase: "A Piece of Cake"},
            {phrase: "Hold your horses"},
            {phrase: "I reckon"},
            {phrase: "She is pretty as a peach"},
            {phrase: "Cup of Joe"}
        ];
    }

    /**
     * Selects random phrase from phrases property
     * @return {Object} -phrase to display
     */
    getRandomPhrase() {
        const randomIndex = Math.floor((Math.random() * (this.phrases.length)));
        const randomPhrase =this.phrases[randomIndex];
        return new Phrase(randomPhrase.phrase);
    }

    /**
     * Checks if user event input is valid, and/or present in this.activePhrase
     */
    handleInteraction(userEvent) {
        if (this.validUserInput(userEvent)) {
            return;
        }
        if (this.activePhrase.checkLetter(userEvent) === false) {
            this.disableQwertyKey(userEvent, false);
            this.removeLife();
        } else {
            this.disableQwertyKey(userEvent, true);
            this.checkForWin();
        }
    }

    /**
     * Disables key buttons, Adds className based on boolean
     * @param {string} - user event input
     * @param {boolean} - true if match,  false if no match found in phrase
     */
    disableQwertyKey(userEvent, bool) {
        if (bool) {
            for (let i = 0; i < keyButtons.length; i++) {
                if (keyButtons[i].textContent === userEvent) {
                    keyButtons[i].disabled = "true";
                    keyButtons[i].className = "chosen";
                }
            }
        } else {
            for (let i = 0; i < keyButtons.length; i++) {
                if (keyButtons[i].textContent === userEvent) {
                    keyButtons[i].disabled = "true";
                    keyButtons[i].className = "wrong";
                }
            }
        }
    }

    /**
     * Prevents previous enteries / keyup events that are not [a-z]
     * @param {string} - string from user event input
     */
    validUserInput(userEvent) {
        const letterRegex = /^[a-z]$/;
        if (this.userChoices.includes(userEvent) || !letterRegex.test(userEvent)) {
            return true;
        } else {
            this.userChoices += userEvent;
        }
    }

    /**
     * Removes/replace liveHeart.png to lostHeart.png
     * Adds 1 to this.missed until max amount of tries
     */
    removeLife() { 
        this.missed += 1;
        if (this.missed >= heartLives.length) {
            this.gameOver(false);
        }
        for (let i = 0; i < this.missed; i++) {
            heartLives[i].children[0].src = "./images/lostHeart.png";
        }
    }

    /**
     * Check if user won / Removes whitespace from phrase with Regex
     */
    checkForWin() {
        const whiteSpaceRegex = /\s/g;
        const noSpaces = this.activePhrase.phrase.replace(whiteSpaceRegex, "");

        if (this.activePhrase.numberCorrect === noSpaces.length) {
                this.gameOver(true);
        }
    }

    /**
     * Game resets back to start values
     */
    gameReset() {
        // Wrong/Chosen classes replace to key on buttons
        const wrong = document.querySelectorAll('.wrong');
        const chosen = document.querySelectorAll('.chosen');
        wrong.forEach(li => { 
            li.disabled = false;
            li.className = "key"
        });
        chosen.forEach(li => { 
            li.disabled = false;
            li.className = "key"
        });
        // Remove all of phrase <li>
        const ul = document.querySelector('#phrase ul');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        // Replace all heart img with lifeHeart.png
        for (let i = 0; i < heartLives.length; i++) {
            heartLives[i].children[0].src = "./images/liveHeart.png";
        }
    }

    /**
     * Displays a message to user based on true or false boolean
     * @param {boolean} -boolean if true user won / if false user loss message is display
     */
    gameOver(bool) {
        this.gameStatus = false;
        overlayDiv.style.display = '';
        const winMessage = "You have Won the Game!!";
        const loseMessage = "You Ran Out Of Heart Lives!";

        if (bool) {        
            overlayDiv.className = "win";
            gameOverMessage.textContent = winMessage;
        } else {
            overlayDiv.className = "lose";
            gameOverMessage.textContent = loseMessage;
        }
    }

}




