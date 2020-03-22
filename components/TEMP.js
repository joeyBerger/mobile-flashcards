import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import DeckView from "./DeckView";
import { DECK_STORAGE_KEY } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { recieveDecks } from '../actions'
import colors from '../utils/colors'
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

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
            },
            React1: {
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
            JavaScript1: {
              title: 'JavaScript',
              timeCreated: 1584631116040,
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.',
                  correctResponse: 'correct'
                }
              ]
            },
            React2: {
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
            JavaScript2: {
              title: 'JavaScript',
              timeCreated: 1584631116040,
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.',
                  correctResponse: 'correct'
                }
              ]
            },
            React3: {
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
            JavaScript3: {
              title: 'JavaScript',
              timeCreated: 1584631116040,
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.',
                  correctResponse: 'correct'
                }
              ]
            },
            React4: {
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
            JavaScript4: {
              title: 'JavaScript',
              timeCreated: 1584631116040,
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.',
                  correctResponse: 'correct'
                }
              ]
            },
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
        const decksArr = Object.keys(decks)
        return(

          <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>


            // <View style={styles.container}>
            //     {decksArr.length > 0 ? (
            //       <View style={styles.deckContainer}> 

   
            //       {decksArr.sort((a,b) => decks[a].timeCreated - decks[b].timeCreated)                
            //         .map(key => 
            //           <Text>
                        
            //           </Text>
            //             // <DeckView 
            //             // key = {key}
            //             // title = {decks[key].title}
            //             // questions = {decks[key].questions}
            //             // navigation = {this.props.navigation}
            //             // />
            //         )}
                    
            //       </View>
            //     ) : (
            //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            //         <Text style={styles.text}>
            //           No Decks - Create A New Deck!
            //         </Text>


            //         {/* todo: make sure this is ok */}
            //         <View style={styles.buttonView}>
            //             <Button 
            //             onPress = {() => this.props.navigation.navigate('NewDeck')} 
            //             title="Create Deck"
            //             raised={true}
            //             buttonStyle={styles.buttonStyle}
            //             titleStyle={{color:colors.black}}
            //             />
            //         </View>
    
            //       </View>
            //     )
            //   }
            // </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


// const styles = StyleSheet.create({

//   safeContainer: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: colors.blue
//   },
//   deckContainer: {
//     flex: 1,
//     margin: 30,
//     justifyContent: 'flex-start', 
//     alignItems: 'center'
//   },
//   text: { 
//     fontSize: 20,
//     margin: 30,
//     textAlign: 'center',
//     color: colors.black
//   },  
//   buttonView: {
//     paddingBottom:50
//   },
//   buttonStyle : {
//       backgroundColor: colors.orange,
//       height: 40,
//       width: 150
//   },
//   scrollView: {
//     backgroundColor: 'pink',
//     marginHorizontal: 20,
//   },
// });

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckList)