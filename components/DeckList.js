import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import DeckView from "./DeckView";
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'

class DeckList extends React.Component {  //TODO: this could propbably be stateless component

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


        //   AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
        this.getStoredData();
    }

    getStoredData() {
        console.log('getStoredData')
        return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((res) => console.log('res',JSON.parse(res)["JavaScript"]))
    }
    
    render() {

        const length = [1,2,3]

        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                {/* <TouchableOpacity>
                    <Text onPress = {(e) => this.getStoredData(e)}>
                        FAKE Button
                    </Text>
                </TouchableOpacity> */}
                {length.map(l => 
                    <DeckView key = {l}/>
                )}
            </View>
        )
    }
}

export default DeckList
