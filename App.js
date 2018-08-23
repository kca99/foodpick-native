import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from './style';
import { createStore } from 'redux';
import { combineReducers } from 'redux';

const renderArray = [
  [0           ,1               ,2            ,3               ],
  ['Taiwanese' ,'British'       ,'Vietnamese' ,'Fast Food'     ],
  ['Chinese'   ,'Greek'         ,'Filipino'   ,'Mexican'       ],
  ['Japanese'  ,'French'        ,'Thai'       ,'Indian'        ],
  ['Korean'    ,'Mediterranean' ,' '          ,'Middle Eastern']
];

const outputArray = [];

const addCuisine = (text) =>{
  return{ type: ADD_CUISINE, text }
}

const removeCuisine = (text) =>{
  return{ type: REMOVE_CUISINE, text }
}

const addSelectedCuisine = (outputArray, text) =>{
  //concat 
  return [...outputArray, text];
};

// const removeSelectedCuisine = (outputArray, text) =>{

// };

const visibilityReducer = (state = 0, action) => {
  switch(action.type){
    case 'CHANGE_TYPE':
      // not sure what to return, needs work
      return state;
    default:
      return state;
  }
}

//need to work on returns for each case, not sure if this is how we should call it
const selectedReducer = (state = 'empty', action) => {
  switch(action.type) { 
    case 'ADD_CUISINE':
      return addSelectedCuisine(outputArray, action.text);
    case 'REMOVE_CUISINE':
      return state - 'text';
    default:
      return state;
  }
}

baseReducer = combineReducers({visibilityReducer, selectedReducer});
const store = createStore(baseReducer);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'FoodPick'
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Button
              title="Map TODO"
              onPress={() => this.props.navigation.navigate('Details')}
            />
      </View>
    );
  }
};

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 13, backgroundColor: 'white' }}>
            <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
      </View>
    );
  }
};

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "lightgrey",
        height: 40
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}



