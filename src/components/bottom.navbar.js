import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const navOptions = [
    {
        id:0,
        name:'Home',
        image:require('../assets/icons/home.png'),
        routeTo:'Dashboard'
    },
    {
        id:1,
        name:'My Plans',
        image:require('../assets/icons/plans.png'),
        routeTo:'MyPlans'
    },
    {
        id:2,
        name:'Setting',
        image:require('../assets/icons/settings.png'),
        routeTo:'Setting'
    },
    {
        id:3,
        name:'Support',
        image:require('../assets/icons/support.png'),
        routeTo:'Support'
    },
    
]


const BottomNav = ({...props}) => {
    const {eventFired} = props;
    const handlePageChange = (item) => {
        if(item.routeTo != null){
            props.navigation.navigate(item.routeTo)
        }
    }
    return(
        <View style={s.container}>
            {navOptions.map((item,index) => {
                return(
                    <TouchableOpacity 
                    onPress={() => handlePageChange(item)}
                    style={s.btn} key={index}>
                        <Image
                            source={item.image}
                            style={s.image}
                            resizeMode='contain'
                        />
                        <Text style={[_.textWhite,_.fs14, _.mt5]}>{item.name}</Text>
                    </TouchableOpacity>
                );
            })}
           
        </View>       
    );
}

const s = StyleSheet.create({
    container:{
        flexDirection:'row',
        width,
        height:80,
        backgroundColor:colors[6],
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        paddingTop:5
    },
    btn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },
    image:{
        width:30,
        height:30
    }
});

export default BottomNav;