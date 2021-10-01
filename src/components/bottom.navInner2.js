import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const totalDots=[1,2,3,4,5];

const BottomNavInner2 = ({...props}) => {
    const {dots, dotIndex, navigation} = props;
    const handleDots = () => {
        return(
            <View style={[_.row,{marginLeft:80,width:150}]}>
                {totalDots.map((item,index) => {
                    return(
                        <View style={{margin:5}} key={index}>
                            <Icon
                            type="font-awesome"
                            size={12}
                            color={item - 1 == dotIndex ? colors[4] : colors[1]}
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
           style={s.leftBtn}
           >
               <Icon
                name="arrow-left"
                type="feather"
                size={20}
                color={colors[4]}
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
        backgroundColor:colors[5],
        alignItems:'center',
        position:'absolute',
        bottom:0,
        paddingTop:5,
        paddingLeft:20
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
    },
    leftBtn:{
        width:40,
        height:40,
        borderRadius:100,
        borderWidth:2,
        borderColor:colors[4],
        alignItems:'center',
        justifyContent:'center'
    }
});

export default BottomNavInner2;