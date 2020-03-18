import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'

class NewDeck extends React.Component {

    state = {
        deckName : ''
    }
    createDeck = () => {
        this.props.dispatch(addDeck(this.state.deckName))
        const newDeck = {
            title : this.state.deckName,
            questions : [],
        }
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [this.state.deckName] : newDeck
        }))
        this.props.navigation.navigate('Feed')
    }
    onChangeText = (text) => {
        this.setState(() => ({
            deckName : text
        }))
    }
    render() {
        return (
            <View>
                <Text>
                    WHAT IS THE NAME OF YOUR NEW DECK?
                </Text>
                <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.deckName}
                />
                <TouchableOpacity>
                    <Text onPress = {() => this.createDeck()}>
                        Create Deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// function mapStateToProps({decks}) {
function mapStateToProps( state ) {

    console.log('state', state)
    const decks = state.decks

    return{
        decks
    }
}

export default connect(mapStateToProps)(NewDeck)