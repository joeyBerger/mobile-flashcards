import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import colors from '../utils/colors'
import { Button } from 'react-native-elements';

const QuizCard_FaceDown = (props) => {    
    return(
        <View style={{ flex: 1, alignItems: 'center'}}>
            <View style={{backgroundColor:colors.blue, width: 400, borderRadius: 4, borderWidth: 0.5, borderColor: colors.black}}>
                <Text style={styles.answerHeader}>
                    Answer:
                </Text>
                <Text style={styles.text}>
                {props.answer}
                </Text>            
            </View>
            {/* <Text>
                {props.answer}
            </Text> */}
            <View style={{paddingTop: 60}}>
            <Button 
            onPress = {() => props.handleAnswerInput('correct')}
            title="Correct"
            raised={true}
            buttonStyle={styles.buttonStyle_correct}
            titleStyle={{color:colors.black}}
            />
            </View>
            <View style={styles.buttonView}>
            <Button 
            onPress = {() => props.handleAnswerInput('incorrect')}
            title="Incorrect"
            raised={true}
            buttonStyle={styles.buttonStyle_incorrect}
            titleStyle={{color:colors.black}}
            />
            </View>
            {/* <TouchableOpacity onPress = {() => props.handleAnswerInput('correct')}>
                <Text>
                    Correct
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => props.handleAnswerInput('incorrect')}>
                <Text>
                    Incorrect
                </Text>                        
            </TouchableOpacity> */}
        </View>
    )

}

const styles = StyleSheet.create({
    answerHeader: { 
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        color: colors.black,
        fontWeight: 'bold'
    },
    text: { 
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        color: colors.black
    },
    buttonView: {
        padding:40
    },
    buttonStyle_correct : {
        backgroundColor: colors.orange,        
        height: 40,
        width: 150
    },
    buttonStyle_incorrect : {
        backgroundColor: colors.red,        
        height: 40,
        width: 150
    },
})

export default QuizCard_FaceDown
