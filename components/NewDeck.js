import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'
import colors from '../utils/colors'
import { Button } from 'react-native-elements';

class NewDeck extends React.Component {
    state = {
        deckName : ''
    }
    createDeck = () => {
        timeCreated = Date.now()
        this.props.dispatch(addDeck(this.state.deckName,timeCreated))
        const newDeck = {
            title : this.state.deckName,
            questions : [],
            timeCreated
        }
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [this.state.deckName] : newDeck,
        }))
        this.props.navigation.navigate('InspectedDeck', {key: this.state.deckName})
        this.setState(() => ({
            deckName : ''
        }))
    }
    disableButton = () => {
        const {deckName} = this.state
        return deckName === ''
    }
    onChangeText = (text) => {
        this.setState(() => ({
            deckName : text
        }))
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blue }}>

                <Text style={styles.headerText}>
                    WHAT IS THE NAME OF YOUR NEW DECK?
                </Text>
                <TextInput
                style={styles.textInput}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.deckName}
                placeholder='Name'
                />
                <View style={styles.buttonView}>
                    <Button 
                    onPress = {() => this.createDeck()}
                    disabled={this.disableButton()}
                    title="Submit"
                    raised={true}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{color:colors.black}}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: { 
        fontSize: 25,
        margin: 30,
        textAlign: 'center',
        color: colors.black
    },
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
        padding:40
    },
    buttonStyle : {
        backgroundColor: colors.orange,        
        height: 40,
        width: 150
    },
})

function mapStateToProps({ decks }) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(NewDeck)