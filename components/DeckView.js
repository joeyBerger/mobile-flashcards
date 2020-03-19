import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const DeckView = (props) => {
    return(
        <TouchableOpacity>
            <Text onPress = {() => props.navigation.navigate('InspectedDeck', {key: props.title})}>
                {props.title} - {props.questions.length}
            </Text>
        </TouchableOpacity>
    )
}

export default DeckView