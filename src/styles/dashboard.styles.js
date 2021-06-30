import React from 'react';
import {StyleSheet} from 'react-native';
import {width,colors,height} from '../utils/constant';

const _dasboard = StyleSheet.create({
    _dfclbtns:{
        width:width/4 + 5,
        height:125,
        backgroundColor:colors[0],
        borderRadius:20,
        alignItems:'center',
        margin:10,
        marginLeft:0
    },
    _dfclbimg:{
        width:40,
        height:40
    },
    _dpopup:{
        backgroundColor:'#de5e5f',width, height:60,alignItems:'center',justifyContent:'center'
    }
});

export default _dasboard;