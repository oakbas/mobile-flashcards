import  { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions/index'

function decks (state={}, action) {
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          cards: []
        }
      }
      case ADD_CARD:
        return {
          ...state,
          [action.deckId]: {
            ...state[action.deckId],
            cards: [
              ...state[action.deckId].cards,
              { question: action.question, answer: action.answer }
            ]
          }
        };
    default:
      return state
  }
}

export default decks