/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import { name as appName } from './app.json';
import { SafeAreaView } from 'react-navigation';
import Routes from './src/services/Routes';
import { initializeFirebaseApi } from './src/services/FirebaseApi.js';

// class Index extends Component { render() {
//     return (<Login email='myemail@email.com' />); }
// }

const wrappedRoutes = () => {
    return (
        <Routes />
    );
}

AppRegistry.registerComponent(appName, () => {
    initializeFirebaseApi()
    return wrappedRoutes
});
