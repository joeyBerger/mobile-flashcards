import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { addDeckQuestion } from '../actions'
import { connect } from 'react-redux'
import { mergeItem } from '../utils/api'
import colors from '../utils/colors'
import { CustomPicker } from 'react-native-custom-picker'
import { Button } from 'react-native-elements';

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
        if (itemValue === null) {
            itemValue = ''
        } else {
            itemValue = itemValue[0].toLowerCase() + itemValue.slice(1)
        }
        this.setState(() => ({
            correctResponse : itemValue
        }))
    }
    render() {
        const options = ['Correct', 'Incorrect']
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blue }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text,'question')}
                    value={this.state.question}
                    placeholder='Question'
                    />
                    <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text,'answer')}
                    value={this.state.answer}
                    placeholder='Answer'
                    />
                    <CustomPicker
                    options={options}
                    placeholder={'Choose Correct Response'}
                    onValueChange ={(itemValue) => {this.onChangePicker(itemValue)}}
                    />
                    <View style={styles.buttonView}>
                        <Button 
                        onPress = {() => this.handleSubmitButton()}
                        disabled={this.disableButton()}
                        title="Submit"
                        raised={true}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{color:colors.black}}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput : {
        height: 40, 
        width: 300, 
        borderColor: 'gray', 
        borderWidth: 1, 
        margin: 20, 
        backgroundColor: 'white', 
        textAlign: 'center'
    },
    buttonView: {
        padding:60
    },
    buttonStyle : {
        backgroundColor: colors.orange,
        height: 40,
        width: 150
    },
})

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(AddQuestion)


