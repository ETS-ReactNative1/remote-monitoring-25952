import React, { useEffect } from 'react';
import {View, AsyncStorage, ActivityIndicator} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {colors} from '../utils/constant';
import SignedStack from './signed.stack';
import UnSignedStack from './unsigned.stack';
import {styles as _} from '../styles/index';


const AuthLoading = ({...props}) => {
    
    useEffect(() => {
        handleAuth();
    },[]);

    const handleAuth = async() => {
        const {navigation} = props;
        const {navigate} = navigation;
        const token = await AsyncStorage.getItem('token');
        // console.log(token,"TEOK")
        if(token){
            navigate('Signed');
        }else{
            navigate('UnSigned');
        }
    }

    return(
      <View style={[_.container, _.alignSelf, _.justifyContent]}>
          <ActivityIndicator
            size="large"
            color={colors[1]}
          />
      </View>  
    );
}

const AppContainer = createSwitchNavigator({
    AuthLoader:{
        screen:AuthLoading
    },
    Signed:{
        screen: SignedStack
    },
    UnSigned:{
        screen: UnSignedStack
    }
},{
    initialRouteName: 'AuthLoader'
});

const ContainerStack = createAppContainer(AppContainer);

export default ContainerStack;