import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from "../actions/index";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        [deck.id]: deck
      };
    case ADD_QUESTION:
      const { deckID, question, answer } = action;

      const oldDeck = state[deckID];
      const card = { question, answer };
      const newDeck = {
        ...oldDeck,
        ...{ questions: oldDeck.questions.concat(card) }
      };

      return {
        ...state,
        ...{ [deckID]: newDeck }
      };
    default:
      return state;
  }
}
