import { AsyncStorage } from 'react-native'

const KEY_STORAGE = 'Flashcards:decks'

const initialData = {
    React: {
        title: 'React',
        cards: [
            {
                question: 'O react é uma biblioteca JavaScript de código aberto?',
                answer: 'Correto'
            },
            {
                question: 'O react é mantido pelo Google?',
                answer: 'Incorreto'
            }
        ]
    },
    Redux: {
        title: 'Redux',
        cards: [
            {
                question: 'Redux é uma biblioteca JavaScript usada para gerenciar o estado do aplicativo?',
                answer: 'Correto'
            },
            {
                question: 'Redux roda apenas com react?',
                answer: 'Incorreto'
            }
        ]
    }
}

//Obtendo todos os decks
export function getDecks() {
    return AsyncStorage.getItem(KEY_STORAGE).then((deck) => {
        if (deck !== null) {
            return JSON.parse(deck)
        } else {
            AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(initialData))
            return initialData
        }
    })
}

//Obter um deck em específico
export function getDeck(title) {
    return getDecks()
        .then((deck) => deck[title])
}

//Salvar um novo deck
export function saveDeck(title) {
    const deck = { title, cards: [] }
    return AsyncStorage.mergeItem(KEY_STORAGE, JSON.stringify({
        [title]: deck
    }))
}

//Adicionar um novo card
export function addCardToDeck(title, card) {
    return getDecks()
        .then((deck) => {
            deck[title].cards.push(card)
            AsyncStorage.mergeItem(KEY_STORAGE, JSON.stringify(deck))
        })
}