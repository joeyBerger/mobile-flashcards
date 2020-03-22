import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
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
})

export default NoCardWarning