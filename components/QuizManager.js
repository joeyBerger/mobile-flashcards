import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'

class QuizManager extends React.Component {

    state = {
        currentCard : 0,
        cardState : 'up',
        score : 0,
    }
    handleAnswerInput = (response) => {
        console.log('response',response)

        this.setState(() => ({
            cardState : 'down'
        }))
    }
    handleNextInput = (questions) => {
        const quizFinished = this.state.currentCard === questions-1
        this.setState((cs) => ({
            cardState : quizFinished ? 'complete' : 'up',
            currentCard : quizFinished ? 0 : cs.currentCard+1
        }))
    }
    render() {
        const {key} = this.props.route.params
        const deck = this.props.decks[key]
        const {currentCard} = this.state
        if (this.state.cardState === 'up') {
            return(
                <View>
                    <Text>
                        Question: {deck.questions[currentCard].question}
                    </Text>
                    <TouchableOpacity onPress = {() => this.handleAnswerInput('correct')}>
                        <Text>
                            Correct
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.handleAnswerInput('incorrect')}>
                        <Text>
                            Incorrect
                        </Text>                        
                    </TouchableOpacity>
                </View>
            )
        } else if (this.state.cardState === 'down') {
            return(
                <View>
                    <Text>
                        {deck.questions[currentCard].answer}
                    </Text>
                    <TouchableOpacity onPress = {() => this.handleNextInput(deck.questions.length)}>
                        <Text>
                            {currentCard < deck.questions.length-1 ? 'Next' : 'Complete'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } 
        else {
            return(
                <View>
                    <Text>
                        Quiz Complete
                    </Text>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('DeckList')}>
                        <Text>
                            Home
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return(
            <View>
                <Text>
                    {'deck.title'}
                </Text>
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(QuizManager)