import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import DeckView from "./DeckView";
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { Provider, connect } from 'react-redux'
import { recieveDecks } from '../actions'

class DeckList extends React.Component {

    componentDidMount() {        
        const dummyData = {
            React: {
              title: 'React',
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
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          }
        //   const navigation = useNavigation();
        //   AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
        this.getStoredData()
        .then((res) => this.dispatchStoredData(res))
    }

    getStoredData() {
        return AsyncStorage.getItem(DECK_STORAGE_KEY)
    }

    dispatchStoredData(res) {
        this.props.dispatch((recieveDecks(JSON.parse(res))))
    }

    tempButtonFunc() {
        console.log('tempButtonFunc')
        this.props.navigation.navigate('Profile')
        // this.props.navigation.navigate({routeName: 'home'})
        
    }
    
    render() {
        if (!this.props.decks) {
            return null  //TODO: eventually change this to loading
        }

        const { decks } = this.props
            
        console.log('props',this.props)

        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <TouchableOpacity>
                    <Text onPress = {(e) => this.tempButtonFunc(e)}>
                        FAKE Button
                    </Text>
                </TouchableOpacity>

                {Object.keys(decks).map(key => 
                    <DeckView 
                    key = {key}
                    title = {decks[key].title}
                    questions = {decks[key].questions}
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