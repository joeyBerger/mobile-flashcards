import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const NoDeckWarning = () => {
    return(
        <View>
            <Text>
                Sorry, you cannot take a quiz because there are no cards in the deck.
            </Text>
        </View>
    )
}

export default NoDeckWarning