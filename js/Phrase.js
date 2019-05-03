class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.numberCorrect = 0;
    }

    /**
     * Display phrase to user 
     * Array is iterated to place newly created <li> with letter character
     * Appends all <li> to <ul> in #phrase div
     */
    addPhraseToDisplay() {
        const arrayOfLetters = [...this.phrase];
        arrayOfLetters.forEach(letter => {
            let list = document.createElement('li');
            if (letter === " ") {
                list.className = "space";
                list.innerHTML = letter;
            } else {
                list.className = `hide letter ${letter}`;
                list.innerHTML = letter;
            }
            document.querySelector('#phrase ul').appendChild(list);
        });
    }

    /**
     * Checks if user event input === active phrase 
     * @param (string) - user input event to check
     */
    checkLetter(userEvent) {
        const letterPick = userEvent.toLowerCase();

        if (this.phrase.search(letterPick) === -1) {
            return false; 
        } else {
            this.showMatchedLetter(letterPick);
        }
    }

    /**
     * Displays all correct inputs to user
     */
    showMatchedLetter(userEvent) {
        const correctPick = [...document.getElementsByClassName(`hide letter ${userEvent}`)]; 

        for (let i = 0; i < correctPick.length; i++) {
            correctPick[i].className = "show";
            this.numberCorrect += 1;
        }
    }
}
