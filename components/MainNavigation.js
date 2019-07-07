import React from 'react'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import DeckListScreen from './DeckListScreen'
import AddDeck from './AddDeck'
import AddCard from './AddCard'
import IndividualDeckScreen from './IndividualDeckScreen'
import QuizScreen from './QuizScreen'
import { blueHighlight, blue, white } from '../utils/colors'

const Tabs = createBottomTabNavigator({
  DECKS: {
    screen: DeckListScreen,
    navigationOptions: {
      topBarLabel: 'Decks'
    }
  },
  ADD: {
    screen: AddDeck,
    navigationOptions: {
      topBarLabel: 'Add Deck'
    }
  }
},
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      labelStyle: {
        fontSize: 17,
        textAlign: "center",
        color: blueHighlight
      },
      style: {
        height: 50,
        backgroundColor: blue,
        alignItems: 'center'
      }
    }
  })

const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: blue
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  IndividualDeck: {
    screen: IndividualDeckScreen,
    navigationOptions
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions
  },
  AddCard: {
    screen: AddCard,
    navigationOptions
  }
})

const MainNavigation = createAppContainer(MainNavigator)

export default MainNavigation