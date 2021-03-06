import React from 'react'
import { View, Platform, StatusBar} from 'react-native'
import AddDeck from './components/AddDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks'
import DeckEdit from './components/DeckEdit'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import { purple, white } from './utils/color'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { AsyncStorage } from 'react-native'
import { setLocalNotification } from './utils/helpers';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

AsyncStorage.clear();

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='box' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckEdit: {
    screen: DeckEdit,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    })
  },
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <AppContainer />
        </View>
      </Provider>
    )
  }
}