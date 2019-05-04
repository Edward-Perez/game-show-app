# OOP Game Show App 
### Project 4 from the Treehouse Full Stack Javascript TechDegree program. 
**_Display's knowledge of Object-Oriented Programming with JavaScript._**

This project is a word guessing game named "Phrase Hunter". A user will either click on a onscreen keyboard or type to uncover a hidden phrase. If they failed to uncover any values in the phrase 5x, game is over with a loss. I will use a OOP approach to create install logic, render HTML elements, and validate user inputs.

### Project Requirements
* Game Class
  * Includes getRandomPhrase() method that randomly retrieves one phrase from the phrases array
  * Includes handleInteraction() method that handles user input / conducts win or lose logic
  * Includes startGame() method creates a new Game Object, hides start screen
  * Includes checkForWin() method reveals if all of the letters in the active phrase have been chosen
  * Includes a removeLife() method that removes a life from the scoreboard
  * Includes gameOver() method,  displays a final "win" or "loss" message
  * Includes a missed property 
  * Includes a phrases property 
  * Includes a activePhrase property
  
* Phrase Class
  * Includes constructor that receives a phrase parameter
  * Includes addPhraseToDisplay() method which presents a a hidden phrase to display
  * Includes checkLetter() / checks if user input === to a value in phrase
  * Includes showMatchedLetter() displays hidden values to user which are a match

* After a game is completed, the gameboard is reset so that clicking the "Start Game" button loads a new game


### Exceeds Requirements
* Event listener has been added for the keypress event 
* App styles have been personalized and changes have been noted in the README.md file and the project submission notes

### Exceeds Ratings HTML/CSS Changes
* Background images have been placed in body and overlay div
* Responsive CSS file has been added along with a normalizer.css
* Fonts have been imported to use on h1 and h2
* Button 'key' layout receives a bottom white border
* Show class receives a transparent color to allow background image to flow in

