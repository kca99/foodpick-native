import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class CuisineButton extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.color, borderRightWidth: this.props.border }}>
        <Text >
          {this.props.text}
        </Text>
      </View>
    );
  }
}
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' }}>
          <Text>FoodPick</Text>
        </View>
        <View style={{ flex: 2, backgroundColor: 'white' }}>
          <Button
            title="Randomize"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'lightgrey' }}>
          <View style={{flex:1, flexDirection: 'column'}}>
            <CuisineButton text="East Asian" color="powderblue" />
            <CuisineButton text="European" color="white" />
            <CuisineButton text="South East Asian" color="lightyellow" />
            <CuisineButton text="Fast Food" color="lightblue" />
            <CuisineButton text="Mexican" color="orchid" />
            <CuisineButton text="Indian" color="slategrey" />

          </View>
          <View style={{ flex: 2, backgroundColor: 'skyblue' }}>
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' }}>
            <Text>FoodPick</Text>
          </View>
          <View style={{ flex: 12, backgroundColor: 'white' }}>
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
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}