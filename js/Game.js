class Game {
    constructor() {
    this.phrases = null; // All phrases store here.
    this.activePhrase = null; // Phrase currently on display.
    this.usedPhrase = []; // Phrase's previously used.
    this.missed = 0; // Number of miss tries.
    this.userChoices = ""; // User input value's.
    this.qwertyEvent = (e) => this.qwertyHandler(e); // Qwerty event callback func bind to class.
    this.startButtonEvent = () => this.startGame(); // StartButton event callback func bind to class.
  }

  /**
   * Display's or hides a start menu along with adding or removing an event listener to start button.
   * @param {boolean} bool - True adds start menu and listener, False hide's start menu and removes listener.
   */
  start(bool) {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = bool ? '' : 'none';
    this.startListener(bool);
  }

  /**
   * Initiates Game class property values and insert eventListeners for qwerty display.
   */
  startGame() {
    if(this.phrases === null) this.phrases = this.createPhrases();
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    this.start(false);
    this.qwertyListener(true);
  }

  /**
   * Return an array of phrase objects for the property "this.phrases".
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
   * Method removes and returns a random phrase as a Class Phrase Object.
   * The return Phrase Class Object is saved in this.activePhrase. Method will also remove the random phrase from this.phrases and push value to this.usedPhrase.
   */
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    const removePhrase = this.phrases.splice(randomIndex, 1);
    this.usedPhrase.push(removePhrase);
    return new Phrase(removePhrase[0].phrase);
  }

  /**
   * Returns a boolean of True if user won or False if no win is detected.
   * Method remove's whitespace from activePhrase and compare the length with the numberCorrect store in activePhrase object.
   */
  checkForWin() {
    const whiteSpaceRegex = /\s/g;
    const phrase = this.activePhrase.phrase.replace(whiteSpaceRegex, "");
    if(this.activePhrase.numberCorrect === phrase.length) return true;
    return false;
  }

  /**
   * Restore all heart images with a liveHeart.png.
   */
  restoreHearts() {
    const heartImg = document.querySelectorAll('.tries img');
    for(let i = 0; i < heartImg.length; i++) {
      heartImg[i].src = "./images/liveHeart.png";
    }
  }

  /**
   * Restore's all disabled qwerty display keys and set className's back to 'key'.
   */
  restoreQwerty() {
    const qwertKeys = document.querySelectorAll('.keyrow button[disabled]');
    for(let i = 0; i < qwertKeys.length; i++) {
      qwertKeys[i].disabled = false;
      qwertKeys[i].className = 'key';
    }
  }

  /**
   * Return true if removeLife was a success or false if this.missed >= 5.
   * Method adds 1 to this.missed property and replace's a liveHeart.png with a lostHeart.png.
   */
  removeLife() { 
    this.missed++;
    if(this.missed >= 5) return false;
    const lives = document.querySelectorAll('.tries img');
    lives[lives.length - this.missed].src = "./images/lostHeart.png";
    return true;
  }

  /**
   * Restore's Game Class back to start settings for next quote, or for a new game based on condition. 
   * In the condition where no values are present in this.phrases, the method will set phrase and usedPhrase values back original values.
   */
  gameReset() {
    if(this.phrases.length <= 0) {
      this.phrases = null; 
      this.usedPhrase = [];
    }
    this.missed = 0;
    this.userChoices = "";
    this.restoreHearts();
    this.restoreQwerty();
  }

  /**
  * Displays a win or lose message to the user based on true or false boolean parameter.
  * Method will call gameReset(), qwertyListener() and start().
  * @param {boolean} bool - A boolean if true user won / if false user loss message is display
  */
  gameOver(bool) {
    const gameOver = document.querySelector('#game-over-message');
    const winMsg = "You have Won the Game!!";
    const loseMsg = "You Ran Out Of Heart Lives!";
    gameOver.textContent = bool ? winMsg : loseMsg;
    this.gameReset();
    this.qwertyListener(false); // False parameter will remove the qwerty event listener "keyup and click"
    this.start(true); // True will display start menu and add start button event listener "click".
  }

  /**
    * Disables key buttons, and adds a className based on boolean parameter.
    * Method disables button by either a 'click event.target.disabled' or iterating through all keys.
    * @param {object} event - User event 'click' or 'keyup' event object.
    * @param {boolean} bool - true if match,  false if no match found in phrase
    */
  disableQwertyKey(event, bool) {
    const keyClass = bool ? 'chosen' : 'wrong';
    let key = null;
    if(event.type === 'keyup') { // 'keyup' iteration for a match with event.key and key[i].textContent
      const keys = document.querySelectorAll('.key');
      for(let i = 0; i < keys.length && key === null; i++) {    
        if(keys[i].textContent === event.key) key = keys[i]; // Save variable 'key' as keys[i].
      } 
    }
    key = key || event.target; // Key is equal to what is currently true.
    key.disabled = true;
    key.className = keyClass;
  }

  /**
   * Return's event input value if value is valid otherwise return's false.
   * @param {object} e - Event object from event listener.
   */
  qwertyValueValid(e) {
    const value = e.type === 'keyup' ? e.key.toLowerCase() : e.target.textContent;
    const noDuplicates = !this.userChoices.includes(value);
    if(e.type === 'click' && e.target.className === 'key' && noDuplicates) return value;
    if(e.type === 'keyup' && /^[a-z]{1}$/i.test(value) && noDuplicates) return value;
    return false;
  }

  /**
   * Handles events for qwerty's 'click' and 'keyup' listeners.
   * This method is saved in property this.qwertyEvent as a reference for removing click and keyup listeners.
   * @param {object} event - Event object from 'click' or 'keyup' listener.
   */
  qwertyHandler(event) {
    const value = this.qwertyValueValid(event);
    if(value === false) return;
    const foundMatch = this.activePhrase.checkLetter(value);
    this.userChoices += value;
    this.disableQwertyKey(event, foundMatch);
    if(foundMatch && this.checkForWin()) return this.gameOver(true); // User Won.
    if(!foundMatch && !this.removeLife()) return this.gameOver(false); // User Loss.
    
  }

  /**
   * Method adds or removes "keyup", and "click" event listener from qwerty keyboard display. 
   * @param {boolean} bool - True to add listeners, and false to remove listeners.
   */
  qwertyListener(bool) {
    if(bool) {
      document.querySelector('#qwerty').addEventListener('click', this.qwertyEvent);
      document.addEventListener('keyup', this.qwertyEvent);
    } else {
      document.querySelector('#qwerty').removeEventListener('click', this.qwertyEvent);
      document.removeEventListener('keyup', this.qwertyEvent);
    }
  }

  /**
   * Method adds or removes "click" event listener from start menu. 
   * @param {boolean} bool - True to add listeners, and false to remove listeners.
   */
  startListener(bool) {
    const button = document.querySelector('#btn__reset');
    if(bool) button.addEventListener('click', this.startButtonEvent);
    else button.removeEventListener('click', this.startButtonEvent);
  }

}