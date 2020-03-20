import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'
import XofY from './XofY'
import QuizCard_FaceUp from './QuizCard_FaceUp'
import QuizCard_FaceDown from './QuizCard_FaceDown'
import QuizComplete from './QuizComplete'

class QuizManager extends React.Component {
    state = {
        currentCard : 0,
        cardState : 'up',
        score : 0,
    }
    handleShowAnswer = () => {
        this.setState(() => ({
            cardState : 'down'
        }))
    }
    handleAnswerInput = (response) => {
        const quizComplete = this.state.currentCard === this.props.cards.length-1 
        this.setState((cs) => ({
            cardState : quizComplete ? 'complete' : 'up',
            currentCard : quizComplete ? 0 : cs.currentCard+1
        }))
    }
    handleNextInput = () => {
        this.setState(() => ({
            cardState : 'complete',
            currentCard : 0
        }))
    }
    handleQuizRestart = () => {
        this.setState(() => ({
            cardState : 'up',
            score : 0,
        }))
    }
    render() {
        const {currentCard} = this.state
        const {cards} = this.props
        const {key} = this.props.route.params
        if (this.state.cardState === 'up') {
            return(
                <View>
                    <XofY currentCard = {currentCard+1} totalCards = {cards.length}/>
                    <QuizCard_FaceUp question = {cards[currentCard].question} handleShowAnswer = {this.handleShowAnswer}/>
                </View>
            )
        } else if (this.state.cardState === 'down') {
            return(
                <View>                
                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
                    <XofY currentCard = {currentCard+1} totalCards = {cards.length}/>
                    <QuizCard_FaceDown answer = {cards[currentCard].answer} handleAnswerInput = {this.handleAnswerInput}/>
                </View>
            )
        } 
        else {
            return(
                <QuizComplete handleQuizRestart = {this.handleQuizRestart} key = {key}/>
            )
        }
    }
}

function shuffleDeck(arr) {
    for (let i = 0; i < arr.length; i++) {
        let newPos = Math.round(Math.random()*(arr.length-1))
        let temp = arr[i]
        arr[i] = arr[newPos]
        arr[newPos] = temp
    }
    return arr
}

function mapStateToProps({decks}, props) {
    return{
        cards : shuffleDeck(decks[props.route.params.key].questions),
    }
}

export default connect(mapStateToProps)(QuizManager)