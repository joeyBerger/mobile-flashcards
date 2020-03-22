# Mobile-Flashcards Project

This project demonstrates the use of React, React Native, Redux, react-redux, store,  action creators, reducers, AsyncStorage, expo and the use of stateful, stateless components. This app was mainly tested on an iOS simulator.

## Starting

Once the project lives locally, install yarn.
* install all project dependencies with `yarn install`
* start the development server with `yarn start`
* once the appropriate window is populated, select 'Run on iOS simulator'
* this application was tested on an simulated version of an iPhone Pro Max and physically on an iPhone 11

## Using the application

* The app starts with a list of flashcard decks. Upon first creation, the deck list should not be populated. Once populated, the deck list is scrollable- an infinite amount of decks can be created.
* To create a new deck, navigate to the right-most tab and create a new deck
* Once a deck has been created, the user can add questions, start a quiz or delete the deck. If a quiz is started with no registered questions, a message stating that a quiz could not be commenced due to a lack of questions. 
* When navigating to the 'Add Card' page, a question, answer and Correct/Incorrect response must be chosen to successfully add a question. Once successfully submitted, the app navigates to that deck's 'home'.
* When deleting a deck, the app navigates to that app's list of decks.
* When starting a quiz, the available cards in a deck are shuffled and the user is shown a question. Upon clicking on the 'Show Answer' button, answer is presented. Next, the user can either select a 'Correct/Incorrect' button. These actions continue until the deck's cards have been exhausted. Upon completing a quiz, a score is presented (in a percentage), and the user can either select 'Restart Quiz' or 'Back To Deck'. Upon selecting 'Restart Quiz', the deck is reshuffled and app navigates to the beginning of the quiz. Upon selecting 'Back To Deck', the app navigates to that deck's 'home'.
* All data is persistent and utilizes react-redux to access and manage state.
* Notifications will be sent at 8:00 p.m. the next day once the user completes a quiz.