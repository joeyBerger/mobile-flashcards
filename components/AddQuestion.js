import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

class AddQuestion extends React.Component {

    state = {
        question : '',
        answer : ''
    }

    handleSubmitButton = () => {
        console.log('handleSubmitButton')
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
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
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

export default AddQuestion


