import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { addCardToDeck } from '../api/api'
import { red } from '../utils/colors'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import Button from './Button'

class AddCard extends Component {
    state = {
        question: 'Pergunta',
        answer: 'Resposta',
        tooShortQuestion: false,
        tooShortAnswer: false
    }

    createCard = () => {
        const { question, answer } = this.state

        if (question.trim().length > 6 && answer.trim().length > 1) {
            const cardObj = {
                question,
                answer
            }
            const deckTitle = this.props.navigation.state.params.deck
            addCardToDeck(deckTitle, cardObj)
            this.props.addCard(deckTitle, cardObj)
            this.setState({
                question: '',
                answer: ''
            })
            this.props.navigation.navigate('IndividualDeck', { deck: deckTitle })
        } else {
            if (question.length <= 6) {
                this.setState({ tooShortQuestion: true })
            }
            if (answer.length <= 1) {
                this.setState({ tooShortAnswer: true })
            }
        }
    }

    render() {
        const { tooShortQuestion, tooShortAnswer, question, answer } = this.state

        return (
            <View style={styles.container}>
                {tooShortQuestion && <Text style={styles.error}>O tamanho da pergunta é muito pequeno.</Text>}
                <TextInput 
                    underlineColorAndroid='#2962ff'
                    style={styles.input}
                    onChangeText={(question) => this.setState({ question })}
                    value={question}
                    onFocus={() => this.setState({ question : '', tooShortQuestion: false })}
                />
                {tooShortAnswer && <Text style={styles.error}>O tamanho da resposta é muito pequeno.</Text>}
                <TextInput 
                    underlineColorAndroid='#2962ff'
                    style={styles.input}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={answer}
                    onFocus={() => this.setState({ answer: '', tooShortAnswer: false })}
                />
                <View style={styles.buttonWrapper}>
                    <Button text='Criar novo card' func={this.createCard} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start'
    },
    error: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: red
    },
    input: {
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 17
    },
    input: {
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 17
    },
    buttonWrapper: {
        alignItems: 'center'
    }
})

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ addCard }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddCard)