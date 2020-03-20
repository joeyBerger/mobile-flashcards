import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const QuizComplete = (props) => {    
    return(
        <View>
            <Text>
                Quiz Complete
            </Text>
            <TouchableOpacity onPress = {() => props.handleQuizRestart()}>
                <Text>
                    Restart Quiz
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => props.navigation.navigate('InspectedDeck', {key: props.key})}>
                <Text>
                    Back To Deck
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuizComplete
