import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

var type = "poop"
var colors = ["powderblue", "white", "lightyellow", "lightblue"];
var category = ['East Asian', 'European', 'South East Asian', 'Other'];

var array = [];
var n = 0;

class ParentCuisine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 'East Asian',
      tab1: 'grey',
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
        tab1: 'grey',
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
        tab2: 'grey',
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
        tab3: 'grey',
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
        tab4: 'grey'
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
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.tab1, borderRightWidth: this.props.border }}>
          <Text style={styles.categoryText}>
            {category[0]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('European')} underlayColor='grey'
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.tab2, borderRightWidth: this.props.border }}>
          <Text style={styles.categoryText}>
            {category[1]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('South East Asian')} underlayColor='grey'
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.tab3, borderRightWidth: this.props.border }}>
          <Text style={styles.categoryText}>
            {category[2]}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onPress('Other')} underlayColor='grey'
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.tab4, borderRightWidth: this.props.border }}>
          <Text style={styles.categoryText}>
            {category[3]}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class CuisineChoice extends React.Component {
  //props: {hidden: boolean, text: string}
  //hidden means that there will a empty space in that spot

  constructor(props) {
    super(props);
    this.state = {
      color: 'white'
    }
  }

  onPress(item) {
    //console.log(item);
    var found = 0;
    for (var i = 0; i < n; i++) { //linear traversal TODO: binary search if you want
      if (array[i] === this.props.text) { // duplicate
        array.splice(i, 1);
        n--;
        found = 1;
        //change state.color back to white

      }
    }
    if (found === 0) {
      array[n] = this.props.text;
      n++;
      //change state.color to lightyellow

    }
    console.log(array);
  }
  render() {
    if (this.props.hidden === 'true') {
      return (
        <View style={{
          flex: 1, backgroundColor: 'grey',
          margin: 10, borderRadius: 20
        }} />
      )
    }
    else {
      return (
        <TouchableHighlight underlayColor='grey' onPress={() => this.onPress(this.props.text)} style={{
          flex: 1, backgroundColor: this.state.color,
          margin: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text style={styles.optionText}> {this.props.text} </Text>
        </TouchableHighlight>
      )
    }
  }
}

class Rightside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EastAsia: ['white', 'white']
    }
  }

  onChange(inState, index) {
    var a = "this.state." + inState;
    console.log(a);

  }
  render() {
    if (this.props.item == "East Asian") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice onPress = {this.onChange('EastAsia',0)} text='Taiwanese' hidden='false' />
            <CuisineChoice text='Chinese' hidden='false' />
          </View>

          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='Japanese' hidden='false'/>
            <CuisineChoice text='Korean' hidden='false' />
          </View>
        </View>
      );
    }
    else if (this.props.item == "European") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='British' hidden='false'  />
            <CuisineChoice text='Greek' hidden='false' />
          </View>

          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='French' hidden='false' />
            <CuisineChoice text='Mediterranean' hidden='false' />
          </View>
        </View>
      );
    }
    else if (this.props.item == "South East Asian") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='Vietnamese' hidden='false' />
            <CuisineChoice text='Filipino' hidden='false' />
          </View>

          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='Thai' hidden='false' />
            <CuisineChoice text='' hidden='true' />
          </View>
        </View>
      );
    }
    else if (this.props.item == "Other") {
      return (
        <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='Fast Food' hidden='false' />
            <CuisineChoice text='Mexican' hidden='false' />
          </View>

          <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
            <CuisineChoice text='Indian' hidden='false' />
            <CuisineChoice text='Middle Eastern' hidden='true' />
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
          <Button
            title="Randomize"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        <View style={StyleSheet.flatten([styles.greyBg, styles.container1of5])}
        /*StyleSheet.flatten tosses the two items into an array and returns it as one style*/>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.buttonText}> Result: {type} </Text>
            <Button
              title="Map TODO"
              onPress={() => this.props.navigation.navigate('Details')}
            />
          </View>
        </View>

        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'lightgrey' }}>
          <ParentCuisine onSelectCuisine={this.handleChange} />
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
  }
});
