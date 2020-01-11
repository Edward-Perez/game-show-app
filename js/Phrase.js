class Phrase {
  constructor(phrase) {
      this.phrase = phrase.toLowerCase();
      this.numberCorrect = 0;
  }

  /**
   * Checks if user event input === active phrase 
   * @param (string) - user input event to check
   */
  checkLetter(letter) {
    if(this.phrase.search(letter) === -1) return false; 
    return this.showMatchedLetter(letter);
  }

  /**
   * Displays all correct inputs to user
   */
  showMatchedLetter(letter) {
    const match = document.querySelectorAll(`.${letter}`); 
    this.numberCorrect += match.length;
    for (let i = 0; i < match.length; i++) {
      match[i].className = 'show';
    }
    return true;
  }

  /**
   * Inserts a phrase to the DOM.
   * Method will remove previous ul and create a new unorder list with this.phrase as its value.
   */
  addPhraseToDisplay() {
    let liClass, letter;
    const phraseDiv = document.querySelector('#phrase');
    const oldUl = phraseDiv.querySelector('ul');
    const newUl = document.createElement('ul');
    for(let i = 0; i < this.phrase.length; i++) {
      letter = this.phrase[i];
      letter === ' ' ? liClass = 'space' : liClass = `hide letter ${letter}`;
      newUl.appendChild(this.createListItem(liClass, letter));
    }  
    phraseDiv.removeChild(oldUl);
    phraseDiv.appendChild(newUl);
  }

  /**
   * Method creates and returns a list item.
   * @param {string} [listClass=''] - Value to place as a class value for list item.
   * @param {string} [listText=''] - Value to place as text content into list item.
   */
  createListItem(listClass = '', listText = '') {
    const listItem = document.createElement('li');
    listItem.textContent = listText;
    listItem.className = listClass;
    return listItem;
  }
}
