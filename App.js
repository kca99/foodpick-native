import React from 'react';
import { TouchableHighlight, Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

var type = "poop"

//sidebar buttons
class CuisineButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      color: this.props.color,
      prevcolor: ''
    }
  }
  onPress = () => {
    //console.log(this.state.color);
    if (this.state.color != 'grey'){ 
      this.setState({prevcolor: this.props.color,
        color:'grey'})
    }
    else{
      this.setState({
        color:this.state.prevcolor})
    }
    var item = this.props.text;
    this.props.onSelect(item);
    //console.log(this.props.text);
  }
  render() {
    return (
      <TouchableHighlight onPress={this.onPress} underlayColor='grey'
        style={{ flex: 1, backgroundColor: this.state.color, borderRightWidth: this.props.border }}>
        <Text >
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

class ParentCuisine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      item: ''
    }
  }

  handleItem = (selectedItem) => {
    this.setState({item: selectedItem},() =>{
      console.log(this.state.item);
    });
    
  }
  
  render(){
    return(
      <View style={{ flex: 1, flexDirection: 'column' }}>
            <CuisineButton onSelect={this.handleItem} text="East Asian" color="powderblue" />
            <CuisineButton onSelect={this.handleItem}  text="European" color="white" />
            <CuisineButton onSelect={this.handleItem} text="South East Asian" color="lightyellow" />
            <CuisineButton onSelect={this.handleItem}  text="Fast Food" color="lightblue" />
            <CuisineButton onSelect={this.handleItem} text="Mexican" color="orchid" />
            <CuisineButton onSelect={this.handleItem} text="Indian" color="slategrey" />
    </View>
    )
  }
}

class CuisineChoice extends React.Component {
  //props: {hidden: boolean, text: string}
  //hidden means that there will a empty space in that spot
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
        <View style={{
          flex: 1, backgroundColor: 'white',
          margin: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text> {this.props.text} </Text>
        </View>
      )
    }

  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'FoodPick'
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <Button
            title="Randomize"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 22 }}> Result: {type} </Text>
            <Button
              title="Map TODO"
              onPress={() => this.props.navigation.navigate('Details')}
            />
          </View>
        </View>

        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'lightgrey' }}>
          <ParentCuisine />

          <View style={{ flex: 2, backgroundColor: 'skyblue', flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
              <CuisineChoice text='bat' hidden='false' />
              <CuisineChoice text='cat' hidden='false' />
              <CuisineChoice text='dat' hidden='false' />
            </View>

            <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column' }}>
              <CuisineChoice text='mat' hidden='false' />
              <CuisineChoice text='nat' hidden='false' />
              <CuisineChoice text='' hidden='true' />
            </View>
          </View>
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