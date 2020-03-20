import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_DECK_QUESTION, REMOVE_DECK_QUESTION } from '../actions'

function decks(state = {}, action) {
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
                timeCreated : action.timeCreated,
                questions : []
            }
        }
    }

    case REMOVE_DECK:
      const returnObj = {}
      Object.keys(state.decks).filter(
        key => key !== action.deckName
      ).forEach(filteredKey => returnObj[filteredKey] = state.decks[filteredKey])
      return {
        ...state,
        decks : {...returnObj}        
    }

    case ADD_DECK_QUESTION:
      return {
        ...state, 
        decks : {
          ...state.decks,
          [action.name] : {
              title : state.decks[action.name].title,
              timeCreated : state.decks[action.name].timeCreated,
              questions : state.decks[action.name].questions.concat(action.questionInfo)
          }
      }
    }

    case REMOVE_DECK_QUESTION:
        return {
          ...state, ...action.deck}

    default:
      return state;
  }
}

export default decks