import { AsyncStorage } from 'react-native'
const FLASHCARD_STORAGE_KEY = 'MOBILE_FLASHCARDS'

export const saveDeck = deck => {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,JSON.stringify({ 
    [deck.id]: deck 
  }));
};
  
export const fetchDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(result => {const data = JSON.parse(result);
    return data;
  });
};

export const saveCard = (deckId, card) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {const data = JSON.parse(results);
    data[deckId] = {
      ...data[deckId],
      cards: [
        ...data[deckId].cards,
        { question: card.question, answer: card.answer }
      ]
    };
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  });
};