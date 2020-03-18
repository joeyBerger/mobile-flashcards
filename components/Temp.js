import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const Temp = (props) => {
    return(
        <TouchableOpacity onPress = {() => props.navigation.navigate('Settings')}>
            <Text >
                FAKE Button TEMP
            </Text>
        </TouchableOpacity>
    )
}

//props.navigation.navigate('InspectedDeck')
export default Temp