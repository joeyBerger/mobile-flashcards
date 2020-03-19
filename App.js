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

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DeckList"
        component={DeckList}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NewDeck"
        component={NewDeck}
        options={{
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
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
          <View style={{ backgroundColor: 'purple', height:Constants.statusBarHeight}}>
            <StatusBar translucent/>
          </View>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="InspectedDeck" component={InspectedDeck} />
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