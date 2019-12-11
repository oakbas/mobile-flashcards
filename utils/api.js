import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'MOBILE_FLASHCARDS'

export function fetchDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}