import React, { Component } from 'react'
import { 
    View, 
    Text } from 'react-native'
import Button from './Button'
import { setLocalNotification, clearLocalNotification, NOTIFICATION_KEY } from '../utils/notifications'

class ResultScreen extends Component {

    componentDidMount() {
        clearLocalNotification()
        .then(setLocalNotification) 
    }

    render () {
        return (
            <View style={this.props.styles.resultCard}>
                <Text style={this.props.styles.resultCardText}>Total de perguntas respondidas: {this.props.totalAnswered}</Text>
                <Text style={this.props.styles.resultCardText}>Respostas corretas: {this.props.correct}</Text>
                <Button text='Restart' func={this.props.restart} />
                <Button text='Voltar' func={this.props.goBack} />
            </View>
        )
    }
}

export default ResultScreen
