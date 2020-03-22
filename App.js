import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import DeckList from './components/DeckList'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import NewDeck from './components/NewDeck'
import InspectedDeck from './components/InspectedDeck'
import AddQuestion from './components/AddQuestion'
import NoCardWarning from './components/NoCardWarning'
import QuizManager from './components/QuizManager'
import colors from './utils/colors'
import { setLocalNotification } from './utils/notifications'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home(props) {
  return (
    <View style={{flex: 1, color: 'black'}}>
      <Tab.Navigator 
          tabBarOptions={{
            activeTintColor: colors.black,
            inactiveTintColor: colors.gray,
            style: {
              backgroundColor: colors.orange,
            },
          }}>
          <Tab.Screen       
            name="DeckList"
            component={DeckList}
            options={{
              tabBarLabel: 'Decks',
              tintColor: 'black',
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons name="cards" color={focused ? colors.black : colors.gray} size={25} />
              ),
            }}
          />
          <Tab.Screen
            name="NewDeck"
            component={NewDeck}
            options={{
              tabBarLabel: 'New Deck',
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons name="plus-circle-outline" color={focused ? colors.black : colors.gray} size={25} />
              ),

            }}
          />
        </Tab.Navigator>
    </View>
 
  );
}

class App extends React.Component {
  componentDidMount() {    
    setLocalNotification()
  }
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
            <Stack.Screen name="Home" component={Home} options={{title: 'FlashCards', headerTintColor: colors.black}}/>
            {/* <Stack.Screen name="InspectedDeck" component={InspectedDeck} options={{title: 'Deck', headerTintColor: colors.black}}/> */}
            <Stack.Screen name="InspectedDeck" component={InspectedDeck} options={({ route }) => ({ title: route.params.name, headerTintColor: colors.black })}/>            
            <Stack.Screen name="AddQuestion" component={AddQuestion} options={{title: 'Add Question', headerTintColor: colors.black}}/>
            <Stack.Screen name="NoCardWarning" component={NoCardWarning} options={{title: 'No Cards', headerTintColor: colors.black}}/>
            <Stack.Screen name="QuizManager" component={QuizManager} options={{title: 'Quiz', headerTintColor: colors.black}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }  
}

export default App