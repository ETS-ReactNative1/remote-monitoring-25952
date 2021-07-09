import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { navigationOptions } from '../utils/constant';

// Scenes
import Login from '../scenes/login.scene';
import Register from '../scenes/register.scene';
import Welcome from '../scenes/welcome.scene';
// Scenes

const UnSignedStack = createStackNavigator({
    Welcome:{
        screen:Welcome,
        navigationOptions: () => navigationOptions
    },
    Login:{
        screen:Login,
        navigationOptions: () => navigationOptions
    },
    Register:{
        screen:Register,
        navigationOptions: () => navigationOptions
    },
   
},{
    initialRouteName:'Welcome'
});

export default UnSignedStack;