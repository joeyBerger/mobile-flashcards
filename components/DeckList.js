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

class DeckList extends React.Component {
    componentDidMount() {  
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
          .sort((a,b) => decks[a].timeCreated - decks[b].timeCreated)
          .map(i => decks[i])
        return(
            <View style={styles.container}>
                {decksArr.length > 0 ? (
                  <View style={styles.deckContainer}>
                  <SafeAreaView style={styles.safeContainer}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={decksArr}
                      renderItem={({ item }) =>
                          <DeckView 
                          key = {item.timeCreated}
                          title = {item.title}
                          questions = {item.questions}
                          navigation = {this.props.navigation}
                          />}
                      keyExtractor={item => item.title}
                    />
                  </SafeAreaView>
                  </View>
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>
                      No Decks - Create A New Deck!
                    </Text>
                    <View style={styles.buttonView}>
                        <Button 
                        onPress = {() => this.props.navigation.navigate('NewDeck')} 
                        title="Create Deck"
                        raised={true}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{color:colors.black}}
                        />
                    </View>    
                  </View>
                )
              }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  safeContainer: {
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

  container: {
    flex: 1,
    backgroundColor: colors.blue
  },
  deckContainer: {
    flex: 1,
    margin: 30,
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  text: { 
    fontSize: 20,
    margin: 30,
    textAlign: 'center',
    color: colors.black
  },  
  buttonView: {
    paddingBottom:50
  },
  buttonStyle : {
      backgroundColor: colors.orange,
      height: 40,
      width: 150
  },
});

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckList)