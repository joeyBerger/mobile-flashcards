import * as React from 'react';
import { Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
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
import InspectedDeck from './components/InspectedDeck'
import Temp from './components/Temp'

const MainNavigator = createAppContainer(createStackNavigator({

  Temp: {
    screen: Temp,
  },
  home: {
    screen: MyTabs,
    navigationOptions: {
      header: () => false
    },
  },
  InspectedDeck: {
    screen: InspectedDeck,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
        // headerTitle: 'InspectedDeck',
      },
    }),
  },
},
{
  initialRouteName: 'InspectedDeck'
}
));

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
      <TouchableOpacity>
          <Text onPress = {(e) => this.tempButtonFunc(e)}>
              FAKE Button
          </Text>
      </TouchableOpacity>
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
// const Stack = createStackNavigator();

function MyTabs() {
  return (

    <NavigationContainer>

      <View style={{ backgroundColor: 'purple', height:Constants.statusBarHeight}}>
        <StatusBar translucent/>
      </View>
      {/* <Stack.Navigator>
        <Stack.Screen name="InspectedDeck" component={InspectedDeck} />
      </Stack.Navigator> */}
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




//  const Stack = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//   }
//  )
// //  const Stack = createStackNavigator()


// function Messages() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Messages!</Text>
//     </View>
//   );
// }

// function Home() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Feed" component={Feed} />
//       <Tab.Screen name="Messages" component={Messages} />
//     </Tab.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* <Stack.Screen name="Home" component={Home} /> */}
//         <Stack.Screen name="Profile" component={Profile} />
//         <Stack.Screen name="Settings" component={Settings} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style = {styles.container}> 
            <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App;