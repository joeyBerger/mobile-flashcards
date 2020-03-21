import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashcards:decks';

export function mergeItem(title,updatedDeck) {
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title] : updatedDeck
    }))
}
export function getItem(title) {
    AsyncStorage.getItem(DECK_STORAGE_KEY)  //TODO: move this to the utils folder
    .then((res) => {
        const storedData = JSON.parse(res)
        storedData[title] = undefined
        delete storedData[title]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(storedData))
    })
}