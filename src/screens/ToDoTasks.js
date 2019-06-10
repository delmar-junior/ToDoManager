import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { readTaskFromFirebaseAsync } from '../services/FirebaseApi';
import { TaskListView } from '../components/Components';

const imgChecList = require('../assets/checklist.png');
const imgPlus = require('../assets/baseline_add_black_48dp.png');

export default class ToDoTasks extends Component {

  static navigationOptions = {
    tabBarLabel: 'To Do',
    tabBarIcon: ({ tintColor }) => (<Image source={imgChecList} style={[styles.icon, { tintColor }]} />)
  }

  state = {
    tasks: []
  }

  componentDidMount() {
    readTaskFromFirebaseAsync(this._fetchTasks.bind(this));
  }

  _fetchTasks(tasks) {
    const tasksToDo = tasks.filter(t => !t.isDone);
    this.setState({ tasks: tasksToDo });
  }

  _goToTask() {
    this.props.navigation.navigate('pageTask');
  }

  render() {
    return (
      <View style={styles.container}>
        <TaskListView tasks={this.state.tasks} navigation={this.props.navigation} />
        <TouchableOpacity style={styles.floatButton} onPress={() => this._goToTask()}>
          <Image source={imgPlus} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  floatButton: {
    // position: 'absolute',
    right: 0,
    bottom: 0
  }
});