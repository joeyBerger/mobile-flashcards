import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import colors from '../utils/colors'

const NoCardWarning = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blue }}>
            <Text style={styles.text}>
                Sorry, you cannot take a quiz because there are no cards in the deck.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: { 
        fontSize: 20,
        margin: 30,
        textAlign: 'center',
        color: colors.black
    },
    textInput : {
        height: 40, 
        width: 300, 
        borderColor: 'gray', 
        borderWidth: 1, 
        margin: 20, 
        backgroundColor: 'white', 
        textAlign: 'center'
    },
    buttonView: {
        padding:40
    },
    buttonStyle : {
        backgroundColor: colors.orange,        
        height: 40,
        width: 150
    },
})
export default NoCardWarning