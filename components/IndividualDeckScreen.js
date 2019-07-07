import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { gray } from '../utils/colors'
import Button from './Button'

class IndividualDeckScreen extends Component {
    navigate = (screen) => {
        this.props.navigation.navigate(screen, {
            deck: this.props.deck.title
        })
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.deckCard}>
                <View>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.cardNumber}>Esse deck tem {deck.cards.length} cards</Text>
                </View>
                <View>
                    <Button text='Iniciar quiz' func={() => this.navigate('Quiz')} />
                    <Button text='Add card' func={() => this.navigate('AddCard')} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckCard: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 25,
        padding: 25,
        backgroundColor: gray,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 3
    },
    deckTitle: {
        fontSize: 23,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cardNumber: {
        fontSize: 15,
        textAlign: 'center'
    }
  })

  function mapStateToProps(state, props) {
      return {
          deck: state[props.navigation.state.params.deck]
      }
  }

  export default connect(mapStateToProps)(IndividualDeckScreen)