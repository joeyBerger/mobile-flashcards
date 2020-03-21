import * as React from 'react';
import { Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Temp from './components/Temp'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import DeckList from './components/DeckList'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { AsyncStorage } from 'react-native'
import reducer from './reducers'
import { createAppContainer } from 'react-navigation';
import NewDeck from './components/NewDeck'
import InspectedDeck from './components/InspectedDeck'
import AddQuestion from './components/AddQuestion'
import NoDeckWarning from './components/NoDeckWarning'
import QuizManager from './components/QuizManager'
import colors from './utils/colors'

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home(props) {
  // {console.log('butt',props)}
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: colors.red,
        inactiveTintColor: 'gray',
        backgroundColor: 'black'
      }}>
      <Tab.Screen       
        name="DeckList"
        component={DeckList}
        options={{
          tabBarLabel: 'Decks',
          tintColor: 'black',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="cards" color={focused ? colors.red : 'gray'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="NewDeck"
        component={NewDeck}
        options={{
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={focused ? colors.red : 'gray'} size={25} />
          ),

        }}
      />
    </Tab.Navigator>
  );
}

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={{ backgroundColor: colors.orange, height:Constants.statusBarHeight}}>
            <StatusBar translucent/>
          </View>
          <Stack.Navigator 
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: colors.orange },
            }}
          >
            <Stack.Screen name="Home" component={Home} tintColor = {'butt'}/>
            <Stack.Screen name="InspectedDeck" component={InspectedDeck} options={{title: 'Deck'}}/>
            <Stack.Screen name="AddQuestion" component={AddQuestion} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="NoDeckWarning" component={NoDeckWarning} />
            <Stack.Screen name="QuizManager" component={QuizManager} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }  
}

export default App