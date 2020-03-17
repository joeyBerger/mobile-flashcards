import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_DECK_QUESTION, REMOVE_DECK_QUESTION } from '../actions'

function decks(state = {}, action) {
  console.log('\nin decks reducer',action);
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state, 
        decks : {...action.decks}
    }

    case ADD_DECK:
      return {
        ...state,
        decks : {
            ...state.decks,
            [action.deckName] : {
                title : action.deckName,
                questions : []
            }
        }
    }

    case REMOVE_DECK:
        return {...state, ...action.deck}

    case ADD_DECK_QUESTION:
        return {...state, ...action.deck}

    case REMOVE_DECK_QUESTION:
        return {...state, ...action.deck}

    default:
      return state;
  }
}

export default decks