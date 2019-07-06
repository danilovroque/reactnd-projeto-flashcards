import {
    GET_DECKS,
    ADD_DECK,
    ADD_CARD
} from '../actions'

export default function decks (state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return action.decks
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            const updatedDeck = state[action.deck]
            updatedDeck.cards.push(action.card)
            return {
                ...state,
                [action.deck]: updatedDeck
            }
        default:
            return state
    }
}