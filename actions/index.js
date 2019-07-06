import { getDecks } from '../api/api'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'



export function getAllDecks () {
    return (dispatch) => {
        getDecks()
            .then((decks) => {
                dispatch({
                    type: GET_DECKS,
                    decks
                })
            })
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard (card) {
    return {
        type: ADD_CARD,
        card
    }
}