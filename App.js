import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from './style';
import { createStore } from 'redux';

const outputArray = [];

function addCuisine(text){
  return{ type: ADD_CUISINE, text }
}

function removeCuisine(text){
  return{ type: REMOVE_CUISINE, text }
}

const cuisineChoice = (state = 'empty', action) => {
  switch(action.type) { 
    case 'ADD_CUISINE':
      return state + 'text';
    case 'REMOVE_CUISINE':
      return state - 'text';
    default:
      return state;
  }
}
const store = createStore(cuisineChoice);

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



