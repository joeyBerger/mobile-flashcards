export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_DECK_QUESTION = 'ADD_DECK_QUESTION'

export function recieveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deckName,timeCreated) {
  return {
    type: ADD_DECK,
    deckName,
    timeCreated
  }
}

export function removeDeck(deckName) {
  return {
    type: REMOVE_DECK,
    deckName
  }
}

export function addDeckQuestion(questionInfo,name) {
  return {
    type: ADD_DECK_QUESTION,
    questionInfo,
    name
  }
}