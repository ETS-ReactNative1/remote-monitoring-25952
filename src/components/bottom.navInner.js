import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const totalDots=[1,2,3,4];

const BottomNavInner = ({...props}) => {
    const {dots, dotIndex, navigation} = props;
    const handleDots = () => {
        return(
            <View style={[_.row,{marginLeft:80}]}>
                {totalDots.map((item,index) => {
                    return(
                        <View style={{margin:5}} key={index}>
                            <Icon
                            type="font-awesome"
                            size={20}
                            color={item - 1 == dotIndex ? colors[4] : colors[0]}
                            name='circle'
                        />
                        </View>
                        
                    );
                })}
            </View>
        );
    }
    return(
        <View style={s.container}>
           <TouchableOpacity
           onPress={() => navigation.goBack()}
           >
               <Icon
                name="angle-left"
                type="font-awesome"
                size={40}
                color={colors[0]}
               />

           </TouchableOpacity>
           {dots && handleDots()}
        </View>       
    );
}

const s = StyleSheet.create({
    container:{
        flexDirection:'row',
        width,
        height:80,
        backgroundColor:colors[6],
        alignItems:'center',
        position:'absolute',
        bottom:0,
        paddingTop:5,
        paddingLeft:40
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

export default BottomNavInner;