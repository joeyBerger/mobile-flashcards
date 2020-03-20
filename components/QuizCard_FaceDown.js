import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const QuizCard_FaceDown = (props) => {
    
    return(
        <View>
            <Text>
                {props.answer}
            </Text>
            <TouchableOpacity onPress = {() => props.handleAnswerInput('correct')}>
                <Text>
                    Correct
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => props.handleAnswerInput('incorrect')}>
                <Text>
                    Incorrect
                </Text>                        
            </TouchableOpacity>
        </View>
    )

}

export default QuizCard_FaceDown
