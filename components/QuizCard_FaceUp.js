import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const QuizCard_FaceUp = (props) => {
    
    return(
        <View>
            <Text>
                Question: {props.question}
            </Text>
            <TouchableOpacity onPress = {() => props.handleShowAnswer()}>
                <Text>
                    Show Answer
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuizCard_FaceUp

