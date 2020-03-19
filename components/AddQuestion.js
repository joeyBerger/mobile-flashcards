import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { addDeckQuestion } from '../actions'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from '../utils/api'

class AddQuestion extends React.Component {

    state = {
        deckName : 'Javascript',
        question : '',
        answer : ''
    }

    handleSubmitButton = () => {

        const returnObj = {
            question: this.state.question,
            answer: this.state.answer
        }
        const {title} = this.props.route.params
        this.props.dispatch(addDeckQuestion(returnObj,title))

        const updatedDeck = {...this.props.decks[title]}
        updatedDeck.questions.push(returnObj);

        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [title] : updatedDeck
        }))  //TODO: move this to the utils folder

        this.props.navigation.navigate('InspectedDeck', {key: title})
    }

    disableButton = () => {
        return this.state.question === '' || this.state.answer === ''
    }

    onChangeText = (text,type) => {
        this.setState(() => ({
            [type] : text
        }))
    }
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeText(text,'question')}
                value={this.state.question}
                />

                <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, margin: 20 }}
                onChangeText={text => this.onChangeText(text,'answer')}
                value={this.state.answer}
                />

                <TouchableOpacity disabled={this.disableButton()} onPress = {() => this.handleSubmitButton()}>
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(AddQuestion)


