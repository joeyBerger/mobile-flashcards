import React from 'react'
import { Text, View } from 'react-native'

const DeckView = (props) => {
    return(
        <Text >
            {props.title} - {props.questions.length}
        </Text>
    )
}

export default DeckView