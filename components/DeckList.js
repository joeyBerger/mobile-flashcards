import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import DeckView from "./DeckView";
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { recieveDecks } from '../actions'

class DeckList extends React.Component {

    componentDidMount() {        
        const dummyData = {
            React: {
              title: 'React',
              timeCreated: 1584630929810,
              questions: [
                {
                  question: 'What is React?',
                  answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ]
            },
            JavaScript: {
              title: 'JavaScript',
              timeCreated: 1584631116040,
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          }

        // AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
        // AsyncStorage.removeItem(DECK_STORAGE_KEY)

        this.getStoredData()
        .then((res) => this.dispatchStoredData(res))      
    }
    getStoredData() {
        return AsyncStorage.getItem(DECK_STORAGE_KEY)
    }
    dispatchStoredData(res) {
        this.props.dispatch((recieveDecks(JSON.parse(res))))
    }   
    render() {
        if (!this.props.decks) {
            return null  //TODO: eventually change this to loading
        }
        const { decks } = this.props  
        console.log('decks',decks);
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                {Object.keys(decks)
                .sort((a,b) => decks[a].timeCreated - decks[b].timeCreated)                
                .map(key => 
                    <DeckView 
                    key = {key}
                    title = {decks[key].title}
                    questions = {decks[key].questions}
                    navigation = {this.props.navigation}
                    />
                )}
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckList)