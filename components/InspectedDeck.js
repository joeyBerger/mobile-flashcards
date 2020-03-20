import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { removeDeck } from '../actions'
import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from '../utils/api'

class InspectedDeck extends React.Component {

    handleAddCard = () => {
        this.props.navigation.navigate('AddQuestion', {title: this.props.route.params.key});        
    }
    handleStartQuiz = () => {
        console.log('handleStartQuiz')
        const {key} = this.props.route.params
        if (this.props.decks[key].questions.length === 0) {
            this.props.navigation.navigate('NoDeckWarning')
        } else {
            this.props.navigation.navigate('QuizManager', {key: this.props.route.params.key})
            // this.props.navigation.navigate('QuizManager')
        }
    }    
    handleDeleteDeck = (title) => {
        this.props.dispatch(removeDeck(title))
        this.props.navigation.navigate('DeckList');
        AsyncStorage.getItem(DECK_STORAGE_KEY)  //TODO: move this to the utils folder
        .then((res) => {
            const storedData = JSON.parse(res)
            storedData[title] = undefined
            delete storedData[title]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(storedData))
        })
    }
    render() {
        const {key} = this.props.route.params
        const deck = this.props.decks[key]
        if (deck === undefined) {
            return null
        }
        const cardsStr = deck.questions.length === 1 ? 'Card' : 'Cards'
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    {deck.title} - {deck.questions.length} {cardsStr}                    
                </Text>
                <TouchableOpacity onPress = {() => this.handleAddCard()}>
                    <Text>
                        Add Card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.handleStartQuiz()}>
                    <Text>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.handleDeleteDeck(deck.title)}>
                    <Text>
                        Delete Deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(InspectedDeck)
