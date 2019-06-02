import { AsyncStorage } from "react-native";


export const DECK_STORAGE_KEY = "MobileFlashcards:decks";

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    console.log("results", JSON.parse(results));
    return JSON.parse(results);
  });
}

export function generateID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function saveDeck(deck) {
  console.log(deck);
  AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [deck.id]: deck
    })
  );
}

function getDeck(id) {}

export function addCardToDeck(deck, question, answer) {
  const card = { question, answer };
  const deckID = deck.id;
  const title = deck.title;

  AsyncStorage.getItem(DECK_STORAGE_KEY).then(response => {
    const data = JSON.parse(response);
    const questions = data[deckID].questions;
    questions.push(card);

    return AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [deckID]: {
          id: deckID,
          title: title,
          questions: questions
        }
      })
    );
  });
}

