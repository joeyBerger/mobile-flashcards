import React from 'react'
import { Text, View } from 'react-native'

const XofY = (props) => {
    return(
        <View>
            <Text>
                {props.currentCard} / {props.totalCards}
            </Text>
        </View>
    )
}

export default XofY

