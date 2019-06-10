import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const imgDone = require('../assets/notification.png');

export default class DoneTasks extends Component {

  static navigationOptions = {
    tabBarLabel: 'Notification',
    tabBarIcon: ({ tintColor }) => (<Image source={imgDone} style={[styles.icon, { tintColor: tintColor }]} />)
  }

  state = {
    tasks: []
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Notification</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    width: 26,
    height: 26
  },
  img: {
    width: 50,
    height: 50
  }
});