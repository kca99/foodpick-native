import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View, Button } from 'react-native';
import Swiper from 'react-native-swiper';

var array = [];
var n = 0;
class Base extends React.Component {
  onPress = () => {
    //console.log(this.props.text);
    var found = 0;
    for (var i = 0; i < n; i++) { //linear traversal TODO: binary search if you want
      if (array[i] === this.props.text) { // duplicate
        array.splice(i, 1);
        n--;
        found = 1;
      }
    }
    if (found === 0) {
      array[n] = this.props.text;
      n++;

    }
    console.log(array);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onPress}>
        <Text style={{ textAlignVertical: 'center', height: 35, backgroundColor: this.props.color }} >
          {this.props.text}
        </Text>
      </TouchableHighlight>
    )
  }
}
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "Press Submit."
    }
  }
  Submit(a){
    console.log(a);
    var index = Math.floor((Math.random() * n ) );
    console.log(index);
    var chosenCuisine = a[index];
    console.log(chosenCuisine);
    this.setState({
      text: chosenCuisine
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper horizontal={true} showsPagination={false}>
          <View style={styles.slide1}>
            <Text style={{ backgroundColor: 'lightpink' }} >
              East Asian
            </Text>
          </View>
          <View style={styles.items}>
            <Base text="Taiwanese" color='coral' />
            <Base text="Chinese" color='lightyellow' />
            <Base text="Korean" color='lightblue' />
            <Base text="Japanese" color='orchid' />
          </View>
        </Swiper>

        <Swiper horizontal={true} showsPagination={false}>
          <View style={styles.slide2}>
            <Text style={{ backgroundColor: 'lightblue' }} >
              European
            </Text>
          </View>
          <View style={styles.items}>
            <Base text="British" color='coral' />
            <Base text="Greek" color='lightyellow' />
            <Base text="French" color='lightblue' />
            <Base text="German" color='orchid' />
          </View>
        </Swiper>

        <Swiper horizontal={true} showsPagination={false}>
          <View style={styles.slide3}>
            <Text style={{ backgroundColor: 'lightyellow' }} >
              South East Asian
            </Text>
          </View>
          <View style={styles.items}>
            <Base text="Vietnamese" color='coral' />
            <Base text="Filipino" color='lightyellow' />
            <Base text="Thai" color='lightblue' />
          </View>
        </Swiper>

        <Base text="Fast Food" color='lightblue' />
        <Base text="Mexican" color='orchid' />
        <Base text="Indian" color='slategrey' />
        <Base text="Middle Eastern" color='steelblue' />
      
        <Button onPress={() => this.Submit(array)} title="Submit" />
        <Text style={{alignItems: "center"}}> {this.state.text} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 20,
    paddingTop: 40

  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'lightpink',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
  items: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
});
