import React, { Component } from 'react'
import { 
  View, 
  Text, 
  TouchableWithoutFeedback,
  AsyncStorage, 
  StyleSheet } from 'react-native'
import { Notifications } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { gray, blueDark, blueLight } from '../utils/colors'
import Button from './Button'
import ResultScreen from './ResultScreen'

const NoCards = () => (
    <View style={styles.noCards}>
        <Text style={styles.noCardsText}>Esse deck não possui cards.</Text>
    </View>
)

const ShowQuestionOrAnswer = (props) => (
    <TouchableWithoutFeedback onPress={props.toggle}>
        <View>
        {
            props.current == 'question'
            ? <Text>Mostrar resposta</Text>
            : <Text>Mostrar pergunta</Text>
        }
        </View>
    </TouchableWithoutFeedback>
)

class QuizScreen extends Component {
  state = { 
    currentQuestion: 0,
    correctAnswers: 0,
    show: 'question',
    showResults: false
  };

  showQuestionOrAnswer = () => {
    const show = (this.state.show) === 'question'
      ? 'answer'
      : 'question'
  
    this.setState({ show });
  }

  userAnswered(answer, correctAnswer) {
    if(answer === correctAnswer) {
      this.setState({ correctAnswers: this.state.correctAnswers + 1 });
    }
    
    if(this.state.currentQuestion === this.props.cards.length -1) {
      this.setState({ showResults: true });
    } else {
      this.setState({ 
        currentQuestion: this.state.currentQuestion + 1,
        show: 'question'
      });
    }
  }

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      show: 'question',
      showResults: false
    });
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() { 
    if(this.props.cards.length === 0) {
      return <NoCards/>
    }

    if(this.state.showResults) {
      return (
        <ResultScreen 
          totalAnswered={this.props.cards.length}
          correct={this.state.correctAnswers}
          restart={this.restartQuiz}
          goBack={this.goBack}
          styles={styles}
        />
      );
    }
    
    const showingCard = this.props.cards[this.state.currentQuestion];

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.quizProgress}>
          <Text>Card {this.state.currentQuestion + 1}/{this.props.cards.length}</Text>
        </View>

        <View style={styles.quizCard}>
          {
            this.state.show == 'question'
            ? <Text style={styles.questionText}>{showingCard.question}</Text>
            : <Text style={styles.answerText}>{showingCard.answer}</Text>
          }

          <ShowQuestionOrAnswer
            toggle={this.showQuestionOrAnswer}
            current={this.state.show}
          />
          <View>
            <Button text='Correto' func={() => this.userAnswered('Correto', showingCard.answer)}/>
            <Button text='Incorreto' func={() => this.userAnswered('Incorreto', showingCard.answer)}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    noCards: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    noCardsText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    resultCard: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    resultCardText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10
    },
    quizProgress: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 8,
      backgroundColor: blueLight
    },
    quizCard: {
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
    questionText: {
      fontSize: 22,
      marginBottom: 5,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    answerText: {
      fontSize: 26,
      marginBottom: 5,
      fontWeight: 'bold',
      textAlign: 'center',
      color: blueDark
    }
  })

  function mapStateToProps(state, props) {
      return {
          cards: state[props.navigation.state.params.deck].cards
      }
  }

  export default connect(mapStateToProps)(QuizScreen)