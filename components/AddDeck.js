import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { saveDeck } from '../api/api'
import { red } from '../utils/colors'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addDeck as addNewDeck } from '../actions'
import Button from './Button'

class AddDeck extends Component {
    state = {
        title: 'Title',
        tooShort: false
    }

    createNewDeck = () => {
        const { title } = this.state

        if (title.trim().length > 3) {
            saveDeck(title)
            const deckObj = {
                [title]: {
                    title,
                    cards: []
                }
            }
            this.props.addNewDeck(deckObj)
            this.props.navigation.navigate('IndividualDeck', { deck: title })
            this.setState({ title: '' })
        } else {
            this.setState({ tooShort: true })
        }
    }

    render() {
        const { tooShort, title } = this.state
        return (
            <View style={styles.container}>
                {tooShort && <Text style={styles.error}>O nome do deck deve ser maior que 3 caracteres.</Text>}
                <TextInput 
                    underlineColor='#2962ff'
                    style={styles.titleInput}
                    onChangeText={(title) => this.setState({ title })}
                    value={title}
                    onFocus={() => this.setState({ title: '', tooShort: false })}
                />
                <View style={styles.buttonWrapper}>
                    <Button text='Criar novo deck' func={this.createNewDeck} />
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
    titleInput: {
        padding: 10,
        marginTop: 35,
        marginBottom: 10,
        fontSize: 17
    },
    buttonWrapper: {
        alignItems: 'center'
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNewDeck }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddDeck)