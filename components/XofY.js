import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import colors from '../utils/colors'

const XofY = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>
                    Question:{'\n'} {props.currentCard}/{props.totalCards}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 80,
        
    },
    textContainer: {
        // backgroundColor: colors.blue,
        width: 400,
        height: 100,//65,
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center'
    },
    headerText: { 
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center',
        color: colors.black,
        fontWeight: 'bold',
    },
    textInput : {
        height: 40, 
        width: 300, 
        borderColor: 'gray', 
        borderWidth: 1, 
        margin: 20, 
        backgroundColor: 'white', 
        textAlign: 'center',
        fontWeight: 'bold'
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

export default XofY

