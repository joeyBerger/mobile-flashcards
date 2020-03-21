import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const QuizComplete = (props) => {
    // console.log('props',props);
    return(
        <View>
            <Text>
                Quiz Complete - {props.score}
            </Text>
            <TouchableOpacity onPress = {() => props.handleQuizRestart()}>
                <Text>
                    Restart Quiz
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => props.navigation.navigate('InspectedDeck', {key: props.deckKey})}>
                <Text>
                    Back To Deck
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuizComplete
