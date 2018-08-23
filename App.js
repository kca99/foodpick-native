import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import DetailsScreen from './components/DetailsView.js';

// const renderArray = [
//   [0, 1, 2, 3],
//   ['Taiwanese', 'British', 'Vietnamese', 'Fast Food'],
//   ['Chinese', 'Greek', 'Filipino', 'Mexican'],
//   ['Japanese', 'French', 'Thai', 'Indian'],
//   ['Korean', 'Mediterranean', ' ', 'Middle Eastern']
// ];

const renderArray = [
  ['East Asian', 'European', 'South East Asian', 'Other'],
  ['Taiwanese', 'Chinese', 'Japanese', 'Korean'],
  ['British', 'Greek', 'French', 'Mediterranean'],
  ['Vietnamese', 'Filipino', 'Thai', ''],
  ['Fast Food', 'Mexican', 'Indian', 'Middle Eastern']
];

const outputArray = [];

const addCuisine = (text) => {
  return { type: ADD_CUISINE, text }
}

const removeCuisine = (text) => {
  return { type: REMOVE_CUISINE, text }
}

const addSelectedCuisine = (outputArray, text) => {
  //concat 
  return [...outputArray, text];
};

// const removeSelectedCuisine = (outputArray, text) =>{

// };

const visibilityReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_TYPE':
      // not sure what to return, needs work
      return state;
    default:
      return state;
  }
}

//need to work on returns for each case, not sure if this is how we should call it
const selectedReducer = (state = outputArray, action) => {
  switch (action.type) {
    case 'ADD_CUISINE':
      return addSelectedCuisine(outputArray, action.text);
    case 'REMOVE_CUISINE':
      return state - 'text';
    default:
      return outputArray;
  }
}

baseReducer = combineReducers({ visibilityReducer, selectedReducer });
const store = createStore(baseReducer);

class Categories extends React.Component {
  render() {
    const listItems = renderArray[0].map((Item) =>
      <TouchableHighlight key={Item.toString()} style={{ flex: 2}} >
        <Text >
          {Item}
        </Text>
      </TouchableHighlight>
    );
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
      {listItems}
      </View>
    )
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 0
    }
  }
  static navigationOptions = {
    title: 'FoodPick'
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'lightblue' }}>
          <Text> Results: </Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text> Hello </Text>
          <Button
            title="Map TODO"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'lightgrey' }}>
          <Categories />
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



