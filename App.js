import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

var type = "poop"
var category = ['East Asian', 'European', 'South East Asian', 'Other'];

var outputArray = [];
var n = 0;

var EastOptions = ['Taiwanese', 'Chinese', 'Japanese', 'Korean'];
var EuroOptions = ['British', 'Greek', 'French', 'Mediterranean'];
var SEAOptions = ['Vietnamese', 'Filipino', 'Thai', ''];
var OtherOptions = ['Fast Food', 'Mexican', 'Indian', 'Middle Eastern'];

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
      tab2: 'lightgrey',
      tab3: 'lightgrey',
      tab4: 'lightgrey'],
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
        tab2: 'lightgrey',
        tab3: 'lightgrey',
        tab4: 'lightgrey',
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })
    }

    else if (thing == 'European') {
      //console.log("Entering 2");
      this.setState({
        item: thing,
        tab1: 'lightgrey',
        tab2: 'skyblue',
        tab3: 'lightgrey',
        tab4: 'lightgrey'
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })
    }
    else if (thing == 'South East Asian') {
      //console.log("Entering 3");
      this.setState({
        item: thing,
        tab1: 'lightgrey',
        tab2: 'lightgrey',
        tab3: 'skyblue',
        tab4: 'lightgrey'
      }, () => {
        //console.log('new cuisine', this.state.item);
        this.props.onSelectCuisine(this.state.item);
      })

    }
    else if (thing == 'Other') {
      //console.log("Entering 4");
      this.setState({
        item: thing,
        tab1: 'lightgrey',
        tab2: 'lightgrey',
        tab3: 'lightgrey',
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
          style={[styles.buttonCategory, { backgroundColor: this.state.tab1 }]}>
          <Text style={styles.categoryText}>
            {category[0]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('European')} underlayColor='grey'
          style={[styles.buttonCategory, { backgroundColor: this.state.tab2 }]}>
          <Text style={styles.categoryText}>
            {category[1]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('South East Asian')} underlayColor='grey'
          style={[styles.buttonCategory, { backgroundColor: this.state.tab3 }]}>
          <Text style={styles.categoryText}>
            {category[2]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('Other')} underlayColor='grey'
          style={[styles.buttonCategory, { backgroundColor: this.state.tab4 }]}>
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
      myButtonTextColor: 'black'
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
          myButtonTextColor: 'black'
        })
      }
    }

    if (found === 0) {
      outputArray[n] = this.props.text;
      n++;
      //change state.color to lightyellow
      this.setState({
        myButtonTextColor: 'white'
      })
    }
    console.log(outputArray);
  }
  render() {
    if (this.props.hidden === 'true') {
      return (
        <View style={[styles.buttonTypeOfFood, { backgroundColor: this.props.color}]} />
      )
    }
    else {
      return (
        <View style={[styles.buttonTypeOfFood, { backgroundColor: this.props.color }]}>
          <TouchableHighlight underlayColor='lightblue' onPress={() => this.onPress(this.props.text)}
            style={[styles.buttonTypeOfFood, { backgroundColor: this.props.color }]}>
            <Text style={[styles.optionText, { color: this.state.myButtonTextColor }]}> {this.props.text} </Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
}

function RenderRight(props) {
  return (
    <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
      <View style={styles.vertColRightside}>
        <Options text={props.selectedArray[0]} hidden={props.state[0]} color={props.colorArray[0]} />
        <Options text={props.selectedArray[1]} hidden={props.state[1]} color={props.colorArray[1]} />
      </View>

      <View style={styles.vertColRightside}>
        <Options text={props.selectedArray[2]} hidden={props.state[2]} color={props.colorArray[2]} />
        <Options text={props.selectedArray[3]} hidden={props.state[3]} color={props.colorArray[3]} />
      </View>
    </View>
  )

}

class Rightside extends React.Component {
  //button colour selected: blue, default: white
  render() {
    if (this.props.item == "East Asian") {
      for (var i = 0; i < n; i++) {
        if (outputArray[i] == 'Taiwanese') { // in array, add color
          EastAsiaColorTrack[0] = 'black';
        }
        if (outputArray[i] == 'Chinese') { // in array, add color
          EastAsiaColorTrack[1] = 'black';
        }
        if (outputArray[i] == 'Japanese') { // in array, add color
          EastAsiaColorTrack[2] = 'black';
        }
        if (outputArray[i] == 'Korean') { // in array, add color
          EastAsiaColorTrack[3] = 'black';
        }
      }
      return (

        <RenderRight selectedArray={EastOptions} colorArray={EastAsiaColorTrack} state={[false, false, false, false]} />

      );
    }
    else if (this.props.item == "European") {
      return (
        <RenderRight selectedArray={EuroOptions} colorArray={EuropeanColorTrack} state={[false, false, false, false]} />
      );
    }
    else if (this.props.item == "South East Asian") {
      return (
        <RenderRight selectedArray={SEAOptions} colorArray={SEAColorTrack} state={[false, false, false, true]} />
      );
    }
    else if (this.props.item == "Other") {
      return (
        <RenderRight selectedArray={OtherOptions} colorArray={OtherColorTrack} state={[false, false, false, false]} />
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
