import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
import { addDeckQuestion } from '../actions'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, mergeItem } from '../utils/api'

class AddQuestion extends React.Component {

    state = {
        deckName : 'Javascript',
        question : '',
        answer : '',
        correctResponse : ''
    }

    handleSubmitButton = () => {
        const {question,answer,correctResponse} = this.state
        const returnObj = {
            question: this.state.question,
            answer: this.state.answer,
            correctResponse : this.state.correctResponse
        }
        const {title} = this.props.route.params
        this.props.dispatch(addDeckQuestion(returnObj,title))

        const updatedDeck = {...this.props.decks[title]}
        updatedDeck.questions.push(returnObj);

        // console.log(doSome())

        // AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        //     [title] : updatedDeck
        // }))  //TODO: move this to the utils folder

        mergeItem(title,updatedDeck)

        this.props.navigation.navigate('InspectedDeck', {key: title})
    }

    disableButton = () => {
        const {question,answer,correctResponse} = this.state
        return question === '' || answer === '' || correctResponse === ''
    }
    onChangeText = (text,type) => {
        this.setState(() => ({
            [type] : text
        }))
    }
    onChangePicker = (itemValue) => {
        this.setState(() => ({
            correctResponse : itemValue
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
                <Picker selectedValue={this.state.correctResponse} style={{height: 50, width: 200}} onValueChange ={(itemValue) => {this.onChangePicker(itemValue)}}>
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="Correct" value="correct" />
                    <Picker.Item label="Incorrect" value="incorrect" />
                </Picker>          
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


