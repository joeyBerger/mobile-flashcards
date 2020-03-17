import * as React from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import DeckList from './components/DeckList'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { AsyncStorage } from 'react-native'
import reducer from './reducers'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NewDeck from './components/NewDeck'

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: MyTabs,
    navigationOptions: {
      header: () => false
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({

      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple',
      },
    }),
  },
}));

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'magenta' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (

    <NavigationContainer>

      <View style={{ backgroundColor: 'purple', height:Constants.statusBarHeight}}>
        <StatusBar translucent/>
      </View>

      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Feed"
          component={DeckList}
          options={{
            tabBarLabel: 'Decks',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cards" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={NewDeck}
          options={{
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    alignItems:'center',
    flex:1,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'magenta',
  },
});

class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style = {styles.container}> 
          {/* <NavigationContainer >
            <View style={{ backgroundColor: 'purple', height:Constants.statusBarHeight}}>
              <StatusBar translucent/>
            </View>
            <MyTabs />
          </NavigationContainer> */}
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App;