import React from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import colors from '../utils/colors'
import { Button } from 'react-native-elements';

const QuizCard_FaceUp = (props) => {    
    return(
        <View style={{ flex: 1, alignItems: 'center'}}>            
            <View style={{backgroundColor:colors.blue, width: 400, borderRadius: 4, borderWidth: 0.5, borderColor: colors.black}}>
                <Text style={styles.questionHeader}>
                    Question:
                </Text>
                <Text style={styles.text}>
                {props.question}
                </Text>            
            </View>
            <View style={styles.buttonView}>
            <Button 
            onPress = {() => props.handleShowAnswer()}
            title="Show Answer"
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
        padding:60
    },
    buttonStyle : {
        backgroundColor: colors.orange,        
        height: 40,
        width: 150
    },
})

export default QuizCard_FaceUp

