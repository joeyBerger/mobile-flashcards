import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'

class InspectedDeck extends React.Component {

    handleAddCard = () => {
        console.log('handleAddCard')
        this.props.navigation.navigate('AddQuestion');
    }

    handleStartQuiz = () => {
        console.log('handleStartQuiz')
    }
    
    handleDeleteDeck = () => {
        console.log('handleDeleteDeck')
    }

    render() {
        const {key} = this.props.route.params
        const deck = this.props.decks[key]
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
                <TouchableOpacity onPress = {() => this.handleDeleteDeck()}>
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
