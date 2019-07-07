import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'
import { setLocalNotification } from './utils/notifications'
import { blueDark } from './utils/colors'
import MainNavigator from './components/MainNavigation'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    console.log('teste')
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={blueDark} />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App