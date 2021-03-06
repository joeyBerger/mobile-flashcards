import React from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux'
import XofY from './XofY'
import QuizCard_FaceUp from './QuizCard_FaceUp'
import QuizCard_FaceDown from './QuizCard_FaceDown'
import QuizComplete from './QuizComplete'
import colors from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'

class QuizManager extends React.Component {
    state = {
        currentCard : 0,
        cardState : 'up',
        score : 0,
        cards : []
    }
    componentDidMount() {        
        this.setState(() => ({
            cards : this.shuffleDeck(this.props.cards)
        }))
    }
    shuffleDeck(arr) {
        for (let i = 0; i < arr.length; i++) {
            let newPos = Math.round(Math.random()*(arr.length-1))
            let temp = arr[i]
            arr[i] = arr[newPos]
            arr[newPos] = temp
        }
        return arr
    }
    handleShowAnswer = () => {
        this.setState(() => ({
            cardState : 'down'
        }))
    }
    handleAnswerInput = (response) => {
        const quizComplete = this.state.currentCard === this.state.cards.length-1 
        const tally = this.state.cards[this.state.currentCard].correctResponse === response ? 1 : 0
        this.setState((cs) => ({
            cardState : quizComplete ? 'complete' : 'up',
            currentCard : quizComplete ? 0 : cs.currentCard+1,
            score : cs.score + tally
        }))
        //set notification for tomorrow at 8:00 p.m.
        if (quizComplete) {
            clearLocalNotification()
                .then(setLocalNotification())
        }
    }
    handleNextInput = () => {
        this.setState(() => ({
            cardState : 'complete',
            currentCard : 0
        }))
    }
    handleQuizRestart = () => {
        this.setState((cs) => ({
            cardState : 'up',
            score : 0,
            cards : this.shuffleDeck(cs.cards)
        }))
    }
    formatScore = () => {
        const {cards,score} = this.state
        return `${Math.round(score/cards.length*100)}%`
    }
    render() {
        const {currentCard,cards} = this.state
        const {key} = this.props.route.params
        if (cards.length === 0) {
            return null 
        }
        if (this.state.cardState === 'up') {
            return(
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: colors.green }} >
                    <XofY currentCard = {currentCard+1} totalCards = {cards.length}/>
                    <QuizCard_FaceUp question = {cards[currentCard].question} handleShowAnswer = {this.handleShowAnswer}/>
                </View>
            )
        } else if (this.state.cardState === 'down') {
            return(
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: colors.green }} >          
                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
                    <XofY currentCard = {currentCard+1} totalCards = {cards.length}/>
                    <QuizCard_FaceDown answer = {cards[currentCard].answer} handleAnswerInput = {this.handleAnswerInput}/>
                </View>
            )
        } else {
            return(
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: colors.blue }}>
                    <QuizComplete handleQuizRestart = {this.handleQuizRestart} deckKey = {key} navigation = {this.props.navigation} score = {this.formatScore()}/>
                </View>               
            )
        }
    }
}

function mapStateToProps({decks}, props) {
    return{
        cards : decks[props.route.params.key].questions
    }
}

export default connect(mapStateToProps)(QuizManager)