import React from 'react';
import {View, Image, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const Header = ({...props}) => {
    const {backBtn = false,back_ = false,sideBtn = false, navigation, logout} = props;

    const handleLogout = () =>{
        AsyncStorage.removeItem('token');
        navigation.navigate('AuthLoader');
    }

    return(
        <View style={s.container}>
            {backBtn &&
            <View style={[_.flexFull,{alignItems:'flex-start',marginLeft:10}]}>
                {back_ &&
                <Icon
                    name="arrow-left"
                    color={colors[1]}
                    type="feather"
                    size={26}
                />
             }
            </View>
            }
            <View style={_.flexFull}>
                <Image
                    source={require(`../assets/icons/logo.png`)}
                    style={s.logo}
                    resizeMode='contain'
                 />
            </View>
            {sideBtn &&
            <View style={[_.flexFull,{alignItems:'flex-end',marginRight:10}]}>
                <Icon
                    name="bars"
                    color={colors[1]}
                    type="font-awesome"
                    size={24}
                />
            </View>
            }
             {logout &&
            <TouchableOpacity 
            onPress={() => handleLogout()}
            style={[{alignItems:'flex-end',marginRight:10}]}>
                
                <Icon
                    name="log-out"
                    color={colors[1]}
                    type="feather"
                    size={26}
                />
        </TouchableOpacity> 
            }
             </View>       
        
    );
}

const s = StyleSheet.create({
    container:{
        flexDirection:'row',
        width,
        height:height/10,
        backgroundColor:colors[0],
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:140,
        alignSelf:'center'
    }
});

export default Header;