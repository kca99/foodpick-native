import React from 'react';
import { Platform, TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';


class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: 'Waiting',
      longitude: null,
      latitude: null,
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocation();
    }
  }

  getLocation = async () => {
    //Ask permission to retrieve location
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });

    }
    else { //permission granted YES
      //this if statement below doesn't work properly, the below if condition is undefined zzz 
      //Check if location is actually on
      var provObj = await Expo.Location.getProviderStatusAsync();
      console.log("provObj: ", provObj['gpsAvailable'])
      if (provObj['gpsAvailable'] === false) { //Location is off you nitwits!
        this.setState({
          errorMessage: 'Please turn on location',
        });
      }
      else{
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
        this.setState({
          longitude: this.state.location['coords']['longitude'],
          latitude: this.state.location['coords']['latitude']
        });
        console.log(this.state.location['timestamp'])
        // console.log(this.state.latitude)
        // console.log(this.state.longitude)  
      }
    }


  };

  render() {
    const { navigation } = this.props;
    const items = navigation.getParam('items');
    // console.log(items);
    // console.log(items[0])
    const length = items.length;
    var index = Math.floor((Math.random() * length));
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;

    console.log(latitude, longitude);

    if (latitude === null || longitude === null) {
      console.log("Rendering Waiting Page");
      return (
        <View>
          <Text>{this.state.errorMessage}</Text>
        </View>
      );
    }
    else {
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

              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>
          </View>
        </View>
      );
    }

  }
};

export default DetailsScreen;