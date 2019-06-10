import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Login, Register, ToDoTasks, DoneTasks, Notification, App, Task } from "../screens/Screens";
import { Platform } from 'react-native';

const taskListTabNavigator = createBottomTabNavigator({ 
  pageToDoTasks: { screen: ToDoTasks, title: 'To Do' },
  pageDoneTasks: { screen: DoneTasks, title: 'Done' },
  pageNotification: { screen: Notification, title: 'Notification' },
});

export default Routes = createAppContainer(createStackNavigator(
  {
    pageApp: { screen: App },
    pageLogin: { screen: Login },
    pageRegister: { screen: Register },
    pageTasksList: {
      screen: taskListTabNavigator,
      navigationOptions: {
        ...Platform.select({
          ios: {
            title: 'Task List'
          },
          android: {
            title: null
          }
        })
      }
    },
    pageTask: { screen: Task }
  },
  {
    headMode: 'screen'
  }
));