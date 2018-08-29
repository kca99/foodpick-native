import React from 'react';
import { Platform, TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import {Constants, Location, Permissions} from 'expo';

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
    }
  }

  componentWillMount(){
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocation();
    }
  }

  getLocation= async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    const { navigation } = this.props;
    const items = navigation.getParam('items');
    // console.log(items);
    // console.log(items[0])
    const length=items.length;
    var index = Math.floor((Math.random() * length ) );
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 13, backgroundColor: 'white' }}>
            <Button
              title="Change Your Options"
              onPress={() => this.props.navigation.goBack()}
            />
            <Text> You have randomed: </Text>
            <Text> {items[index]}</Text>
            <Text> {this.state.errorMessage}</Text>
            <Text> {JSON.stringify(this.state.location)}</Text>
            <Button
              title="Redo location"
              onPress={() => this.getLocation()}
            />
          </View>
        </View>
      </View>
    );
  }
};

export default DetailsScreen;