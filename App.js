import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

var type = "poop"
var colors = ["lightgrey", "lightgrey", "lightgrey", "lightgrey"];
var category = ['East Asian', 'European', 'South East Asian', 'Other'];

var outputArray = [];
var tempArray = [];
var n = 0;

var EastAsiaColorTrack = ['white', 'white', 'white', 'white'];
var EuropeanColorTrack = ['white', 'white', 'white', 'white'];
var SEAColorTrack = ['white', 'white', 'white', 'white'];
var OtherColorTrack = ['white', 'white', 'white', 'white'];

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 'East Asian',
      tab1: 'skyblue',
      tab2: colors[1],
      tab3: colors[2],
      tab4: colors[3],
    }
    this.onPress = this.onPress.bind(this);
  }

  onPress(thing) {
    //console.log("onPress", thing);
    if (thing == 'East Asian') {
      //console.log("Entering 1");
      this.setState({
        item: thing,
        tab1: 'skyblue',
        tab2: colors[1],
        tab3: colors[2],
        tab4: colors[3],
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })
    }

    else if (thing == 'European') {
      //console.log("Entering 2");
      this.setState({
        item: thing,
        tab1: colors[0],
        tab2: 'skyblue',
        tab3: colors[2],
        tab4: colors[3]
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })
    }
    else if (thing == 'South East Asian') {
      //console.log("Entering 3");
      this.setState({
        item: thing,
        tab1: colors[0],
        tab2: colors[1],
        tab3: 'skyblue',
        tab4: colors[3]
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })

    }
    else if (thing == 'Other') {
      //console.log("Entering 4");
      this.setState({
        item: thing,
        tab1: colors[0],
        tab2: colors[1],
        tab3: colors[2],
        tab4: 'skyblue'
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })
    }
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <TouchableHighlight onPress={() => this.onPress('East Asian')} underlayColor='grey'
          style={[styles.buttonCategory, {backgroundColor: this.state.tab1}]}>
          <Text style={styles.categoryText}>
            {category[0]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('European')} underlayColor='grey'
          style={[styles.buttonCategory, {backgroundColor: this.state.tab2}]}>
          <Text style={styles.categoryText}>
            {category[1]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('South East Asian')} underlayColor='grey'
          style={[styles.buttonCategory, {backgroundColor: this.state.tab3}]}>
          <Text style={styles.categoryText}>
            {category[2]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('Other')} underlayColor='grey'
          style={[styles.buttonCategory, {backgroundColor: this.state.tab4}]}>
          <Text style={styles.categoryText}>
            {category[3]}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class Options extends React.Component {
  //props: {hidden: boolean, text: string}
  //hidden means that there will a empty space in that spot

  constructor(props) {
    super(props);
    this.state = {
      myButtonColor: 'white',
      myButtonTextColor: 'black',
      backgroundColor: 'white'
    }
  }

  onPress(item) {
    //console.log(item);
    var found = 0;

    for (var i = 0; i < n; i++) { //linear traversal TODO: binary search if you want
      if (outputArray[i] === this.props.text) { // duplicate
        outputArray.splice(i, 1);
        n--;
        found = 1;
        //change state.color back to white
        this.setState({
          myButtonColor: 'transparent',
          myButtonTextColor: 'black'
        })
      }
    }

    if (found === 0) {
      outputArray[n] = this.props.text;
      n++;
      //change state.color to lightyellow
      this.setState({
        myButtonColor: 'blue',
        myButtonTextColor: 'white'
      })
    }
    console.log(outputArray);
  }
  render() {
    if (this.props.hidden === 'true') {
      return (
        <View style={[styles.buttonTypeOfFood, {backgroundColor: this.state.myButtonColor}]} />
      )
    }
    else {
      return (
        <View style={[styles.buttonTypeOfFood, {backgroundColor: this.state.backgroundColor}]}>
          <TouchableHighlight underlayColor='lightblue' onPress={() => this.onPress(this.props.text)}
          style={[styles.buttonTypeOfFood, {backgroundColor: this.state.myButtonColor}]}>
            <Text style={[styles.optionText, {color: this.state.myButtonTextColor}]}> {this.props.text} </Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
}

function renderRight(array, state){

  render(){
    return(
      <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
        <View style={styles.vertColRightside}>
          <Options text='Taiwanese' hidden='false' />
          <Options text='Chinese' hidden='false' />
        </View>

        <View style={styles.vertColRightside}>
          <Options text='Japanese' hidden='false'/>
          <Options text='Korean' hidden='false' />
        </View>
      </View>
    )
  }
}

class Rightside extends React.Component {
  render() {
    if (this.props.item == "East Asian") {
      for (var i = 0; i < n; i++){
        if(array[i] == 'Taiwanese'){ // in array, add color
          EastAsiaColorTrack[0] = 'black';
        }
        if(array[i] == 'Chinese'){ // in array, add color
          EastAsiaColorTrack[1] = 'black';
        }
        if(array[i] == 'Japanese'){ // in array, add color
          EastAsiaColorTrack[2] = 'black';
        }
        if(array[i] == 'Chinese'){ // in array, add color
          EastAsiaColorTrack[3] = 'black';
        }
      }
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={styles.vertColRightside}>
            <Options text='Taiwanese' hidden='false' color= {EastAsiaColorTrack[0]}/>
            <Options text='Chinese' hidden='false' color= {EastAsiaColorTrack[1]}/>
          </View>

          <View style={styles.vertColRightside}>
            <Options text='Japanese' hidden='false'color= {EastAsiaColorTrack[2]}/>
            <Options text='Korean' hidden='false' color= {EastAsiaColorTrack[3]}/>
          </View>
        </View>
      );
    }
    else if (this.props.item == "European") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={styles.vertColRightside}>
            <Options text='British' hidden='false'  />
            <Options text='Greek' hidden='false' />
          </View>

          <View style={styles.vertColRightside}>
            <Options text='French' hidden='false' />
            <Options text='Mediterranean' hidden='false' />
          </View>
        </View>
      );
    }
    else if (this.props.item == "South East Asian") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={styles.vertColRightside}>
            <Options text='Vietnamese' hidden='false' />
            <Options text='Filipino' hidden='false' />
          </View>

          <View style={styles.vertColRightside}>
            <Options text='Thai' hidden='false' />
            <Options text='' hidden='true' />
          </View>
        </View>
      );
    }
    else if (this.props.item == "Other") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={styles.vertColRightside}>
            <Options text='Fast Food' hidden='false' />
            <Options text='Mexican' hidden='false' />
          </View>

          <View style={styles.vertColRightside}>
            <Options text='Indian' hidden='false' />
            <Options text='Middle Eastern' hidden='true' />
          </View>
        </View>
      );
    }
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 'East Asian'
    }
  }
  static navigationOptions = {
    title: 'FoodPick'
  };
  handleChange = (item) => {
    //console.log("recieved", item);
    this.setState({
      currentItem: item,
    }, function () {
      console.log(item);
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={StyleSheet.flatten([styles.container3of5, styles.whiteBg])}>
          <Text> {outputArray.join(', ')} </Text>
          <Button
            title="Randomize"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        <View style={StyleSheet.flatten([styles.greyBg, styles.container1of5])}
        /*StyleSheet.flatten tosses the two items into an outputArray and returns it as one style*/>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.buttonText}> Result: {type} </Text>
            <Button
              title="Map TODO"
              onPress={() => this.props.navigation.navigate('Details')}
            />
          </View>
        </View>

        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'lightgrey' }}>
          <Tabs onSelectCuisine={this.handleChange} />
          <Rightside item={this.state.currentItem} />
        </View>
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

//stylesheet starts ici
//uhhh this is still tentative, I just put arbitrary values for now that scaled down
//for font family, we can explore different sans-serifs
const heading1 = 30;
const heading2 = 24;
const heading3 = 16;
const para = 14;

const styles = StyleSheet.create({
  //flexbox grid sizes
  container1of5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container3of5: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //fonts
  baseText: {
    fontFamily: 'Arial',
  },

  titleText: {
    fontSize: heading1,
    fontWeight: 'bold',
  },

  categoryText: {
    fontSize: heading2,
  },

  buttonText: {
    fontSize: heading3,
  },

  optionText: {
    fontSize: heading3,
  },

  bodyText: {
    fontSize: para,
  },

  //colors
  greyBg: {
    backgroundColor: 'grey',
  },

  whiteBg: {
    backgroundColor: 'white',
  },

  //styling for columns and rows
  vertColRightside: {
    flex: 1,
    backgroundColor: 'transparent',
    //set hidden to transparent
    flexDirection: 'column',
  },

  //button style
  buttonCategory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black'
  },

  buttonTypeOfFood: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
