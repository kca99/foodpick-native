import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import DetailsScreen from './components/DetailsView.js';

const renderArray = [
  ['East Asian', 'European', 'South East Asian', 'Other'],
  ['Taiwanese', 'Chinese', 'Japanese', 'Korean'],
  ['British', 'Greek', 'French', 'Mediterranean'],
  ['Vietnamese', 'Filipino', 'Thai',''],
  ['Fast Food', 'Mexican', 'Indian', 'Middle Eastern']
];
var tab =1; 
const outputArray = [];

function filterArray(array, text) {
  // for (var i = 0; i < array.length; i++) {
  //   if (array[i] === text) return array.indexOf(text);
  //   else return null;
  // }

  //^quicker way of writing above lol
  if(array.includes(text)) return array.indexOf(text);
  else return;
}

function contains(array, text){
  //the following doesn't work b/c current state of selectedReducer returns
  //an obj, not an array. so array.length can't be called
  // for (var i = 0; i < array.length; i++){
  //   if(array[i] === text) return true;
  //   else return false;
  // }

  //Object.values returns an array of all property values in an object
  if(Object.values(array).includes(text)) return true;
  else return false;
}

const addCuisine = (text) => {
  return { type: 'ADD_CUISINE', text }
}

const removeCuisine = (text) => {
  return { type: 'REMOVE_CUISINE', text }
}

const addSelectedCuisine = (outputArray, text) => {
  //concat 
  return [...outputArray, text];
};

const removeSelectedCuisine = (currStateArray, text) => {
  if (currStateArray === null) return currStateArray;
  // console.log(text);
  var index = filterArray(currStateArray, text);
  // console.log(index);
  if (index === null) {
    return currStateArray;
  }
  else {
    return [
      ...currStateArray.slice(0, index), //first portion from 0 - index we want to remove
      ...currStateArray.slice(index + 1) //concat rest back on
    ];
  }
};

const changeType = (text) => {
  return { type: 'CHANGE_TYPE', text }
}

const visibilityReducer = (state = 'East Asian', action) => {
  switch (action.type) {
    case 'CHANGE_TYPE':
      return action.text;
    default:
      return state;
  }
}

const selectedReducer = (state = outputArray, action) => {
  switch (action.type) {
    case 'ADD_CUISINE':
      return addSelectedCuisine(state, action.text);
    case 'REMOVE_CUISINE':
      return removeSelectedCuisine(state, action.text);
    default:
      return state;
  }
}

baseReducer = combineReducers({ visibilityReducer, selectedReducer });
const store = createStore(baseReducer);


let listItems;

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      buttonColor: 'red'
    }
  }

  onPress(Item) {
    // console.log(Item);
    this.setState ({
      buttonColor:'blue'
    })
    store.dispatch(changeType(Item));
    //console.log("Switching to " + Item);
    //console.log(store.getState());
    switch(store.getState().visibilityReducer){
      case 'East Asian':
        tab = 1;
        console.log("tab= ", tab);

        break;
      case 'European':
        tab = 2;
        console.log("tab= ", tab);

        break;
      case 'South East Asian':
        tab = 3;
        console.log("tab= ", tab);

        break;
      case 'Other':
        tab = 4;
        console.log("tab= ", tab);

        break;
    }
  }

  render() {
    listItems = renderArray[0].map((Item) => {
      var currentState = store.getState();
      //console.log(currentState.visibilityReducer)
      if (Item === currentState.visibilityReducer) {
        //console.log(currentState.keys());
        //console.log('in first loop');
        return(
        <TouchableHighlight key={Item.toString()} style={{ flex: 2, backgroundColor: 'red'}} onPress={() => this.onPress(Item)} >
          <Text >
            {Item}
          </Text>
        </TouchableHighlight>)
      }
      else{
        //console.log(currentState.visibilityReducer)
        //console.log('in second loop');
        return(
        <TouchableHighlight key={Item.toString()} style={{ flex: 2}} onPress={() => this.onPress(Item)} >
          <Text >
            {Item}
          </Text>
        </TouchableHighlight>)
      }
    });
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        {listItems}
      </View>
    )
  }
}

store.subscribe(Categories);


let listOptionsLeft, listOptionsRight;

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  
  onPress(Option){
    // console.log(Option);
    // store.dispatch(addCuisine(Option));
    if(!contains(store.getState().selectedReducer, Option)){
      //console.log("ADDING: " + Option + " is not in the array");
      store.dispatch(addCuisine(Option));
    }
    else{
      //console.log("REMOVING: " + Option + " is in the array");
      store.dispatch(removeCuisine(Option));
    }
    console.log(store.getState());
    // console.log(store.getState().selectedReducer);
  }

  render(){
    //console.log("inside options loop: ", tab)

    
    // if(store.getState().visibilityReducer === 'East Asian') console.log("true");
    // else console.log("false");
    listOptionsLeft = renderArray[tab].map((Option, i) => {
      let color;
      if( contains(store.getState().selectedReducer, Option)){
        color = 'red';
      }
      else{
        color ='grey'
      }
      if(i%2 === 0 && !(Option === '')){
         //console.log(Option);
        return(
          <TouchableHighlight key={Option.toString()} style={{ flex: 2, backgroundColor: color}} onPress={ () => this.onPress(Option) }>
            <Text>
             {Option}
            </Text>
          </TouchableHighlight>
        )
      }
    });
  
    listOptionsRight = renderArray[tab].map((Option, i) =>{
      let color;
      if( contains(store.getState().selectedReducer, Option)){
        color = 'red';
      }
      else{
        color ='grey'
      }
      if(!(i%2 === 0) && !(Option === '')){
        // console.log(Option);
        return(
          <TouchableHighlight key={Option.toString()} style={{ flex: 2,backgroundColor: color }} onPress={ () => this.onPress(Option) }>
            <Text>
              {Option}
            </Text>
          </TouchableHighlight>
        )
      }
    })
    return(
      <View style ={{ flex: 3, flexDirection: 'row' }} > 
        <View style ={{ flex: 1, flexDirection: 'column' }}>
          {listOptionsLeft}
        </View>

        <View style ={{ flex: 1, flexDirection: 'column' }}>
          {listOptionsRight}
        </View>
      </View>
    )
  }
}
store.subscribe(Options);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 0,
      items: [],
      itemNonJoin:[]
    }

    store.subscribe(
      () =>{
      this.setState({
        items:store.getState().selectedReducer.join(', '),
        itemNonJoin: store.getState().selectedReducer,
      });
      //console.log(this.state.items)
    });
  }

  

  static navigationOptions = {
    title: 'FoodPick'
  };

  render() {
    let randItem;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, alignItems: 'center',  backgroundColor: 'lightblue' }}>
          <Text> Your Current Choices:  </Text>
          <Text> {this.state.items} </Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text> Press Here to Randomize your Choices: </Text>
          <Button
            title="Let's Go"
            onPress={() => 
              {
              // console.log(store.getState().selectedReducer);
              this.props.navigation.navigate('Details',{items: this.state.itemNonJoin})}
            }/>
        </View>
        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'lightgrey' }}>
          <Categories />
          <Options />
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



