import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import DeckView from "./DeckView";
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { recieveDecks } from '../actions'
import colors from '../utils/colors'

class DeckList extends React.Component {

    componentDidMount() {        
        const dummyData = {
            React: {
              title: 'React',
              timeCreated: 1584630929810,
              questions: [
                {
                  question: 'What is React?',
                  answer: 'A library for managing user interfaces',
                  correctResponse: 'correct'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event',
                  correctResponse: 'correct'
                }
              ]
            },
            JavaScript: {
              title: 'JavaScript',
              timeCreated: 1584631116040,
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.',
                  correctResponse: 'correct'
                }
              ]
            }
          }

        // AsyncStorage.removeItem(DECK_STORAGE_KEY)
        // AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))        

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
          return(
            <ActivityIndicator size="large" color="#0000ff" />
          )
        }
        const { decks } = this.props  
        // console.log('decks',decks);
        const decksArr = Object.keys(decks)
        //align-items: flex-end
        return(
            <View style={styles.container}>
                {decksArr.length > 0 ? (
                  <View style={styles.deckContainer}> 
                  {decksArr.sort((a,b) => decks[a].timeCreated - decks[b].timeCreated)                
                    .map(key => 
                        <DeckView 
                        key = {key}
                        title = {decks[key].title}
                        questions = {decks[key].questions}
                        navigation = {this.props.navigation}
                        />
                    )}
                  </View>
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                      No Decks - Create A New Deck!
                    </Text>
                  </View>
                )
              }
            </View>
        )
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.blue
  },

  deckContainer: {
    flex: 1,
    margin: 30,
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },


  

  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckList)