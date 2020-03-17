import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class NewDeck extends React.Component {

    state = {
        deckName : ''
    }
    createDeck = () => {
        console.log('create deck')

        this.props.dispatch(addDeck(this.state.deckName))
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