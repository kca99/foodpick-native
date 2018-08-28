import React from 'react';
import { TouchableHighlight, Button, View, Text, StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';

class DetailsScreen extends React.Component {

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
          </View>
        </View>
      </View>
    );
  }
};

export default DetailsScreen;