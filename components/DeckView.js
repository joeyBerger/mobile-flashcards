import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const DeckView = (props) => {
    function navigate() {
        props.navigation.navigate('InspectedDeck', {key: props.title, name: props.title})
    }
    return(
        <View >
            <TouchableOpacity>
                <Text 
                onPress = {() => navigate()}
                style={styles.deckNameText}
                >
                    {props.title}
                </Text>
                <Text 
                onPress = {() => navigate()}
                style={styles.cardsText}>
                    {props.questions.length} Cards
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    deckNameText: {
        fontSize:30,
        padding: 8,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        textAlign: 'center',

    },    
    cardsText: {
        fontSize: 20,
        paddingBottom: 20,
        textAlign: 'center',
    }
})

export default DeckView