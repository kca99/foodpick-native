import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import DetailsScreen from './components/DetailsView.js';

const renderArray = [
  ['East Asian', 'European', 'South East Asian', 'Other'],
  ['Taiwanese', 'Chinese', 'Japanese', 'Korean'],
  ['British', 'Greek', 'French', 'Mediterranean'],
  ['Vietnamese', 'Filipino', 'Thai', ''],
  ['Fast Food', 'Mexican', 'Indian', 'Middle Eastern']
];

const outputArray = [];

function filterArray(array, text){
  for(var i = 0; i < array.length; i++){
    if(array[i] === text) return array.indexOf(i);
    else return null;
  }
}

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

const removeSelectedCuisine = (outputArray, text) =>{
  if(outputArray === null) return outputArray;
  
  var index = filterArray(outputArray, text);
  
  if(index === null) {
    return outputArray;
  }
  else{
    return[
      ...outputArray.slice(0, index),
      ...outputArray.slice(index + 1)
    ]; 
  } 
};

const changeType = (text) => {
  return { type: 'CHANGE_TYPE', text}
}

const visibilityReducer = (state = 'East Asian', action) => {
  switch (action.type) {
    case 'CHANGE_TYPE':
      return state = action.text;
    default:
      return state = 'East Asian';
  }
}

//need to work on returns for each case, not sure if this is how we should call it
const selectedReducer = (state = outputArray, action) => {
  switch (action.type) {
    case 'ADD_CUISINE':
      return addSelectedCuisine(outputArray, action.text);
    case 'REMOVE_CUISINE':
      return removeSelectedCuisine(outputArray, action.text);
    default:
      return outputArray;
  }
}

baseReducer = combineReducers({ visibilityReducer, selectedReducer });
const store = createStore(baseReducer);

let listItems, Item;

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      buttonColor: 'red'
    }
  }

  onPress(Item){
    // console.log(Item);

    this.setState ({
      buttonColor:'blue'
    })
    store.dispatch(changeType(Item));
    console.log(store.getState());
  }

  render() {
    listItems = renderArray[0].map((Item) =>
      <TouchableHighlight key={Item.toString()} style={{ flex: 2}} onPress={() => this.onPress(Item)} >
        <Text >
          {Item}
        </Text>
      </TouchableHighlight>
    );
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.props.buttonColor }}>
      {listItems}
      </View>
    )
  }
}

store.subscribe(Categories);


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



