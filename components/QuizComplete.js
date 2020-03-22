import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import colors from '../utils/colors'
import { Button } from 'react-native-elements';

const QuizComplete = (props) => {
    return(
        <View style={{ flex: 1, alignItems: 'center', }}>
            <View style={{padding:100}}>            
                <View style={{backgroundColor:colors.green, width: 400, borderRadius: 4, borderWidth: 0.5, borderColor: colors.black}}>
                    <Text style={styles.questionHeader}>
                        Quiz Complete!
                    </Text>
                    <Text style={styles.text}>
                    Score: {props.score}
                    </Text>            
                </View>
            </View>
            <View style={styles.buttonView}>
            <Button 
            onPress = {() => props.handleQuizRestart()}
            title="Restart Quiz"
            raised={true}
            buttonStyle={styles.buttonStyle}
            titleStyle={{color:colors.black}}
            />
            </View>
            <View style={styles.buttonView}>
            <Button 
            onPress = {() => props.navigation.navigate('InspectedDeck', {key: props.deckKey})}
            title="Back To Deck"
            raised={true}
            buttonStyle={styles.buttonStyle}
            titleStyle={{color:colors.black}}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    questionHeader: { 
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
        padding:20
    },
    buttonStyle : {
        backgroundColor: colors.orange,        
        height: 40,
        width: 150
    },
})

export default QuizComplete
