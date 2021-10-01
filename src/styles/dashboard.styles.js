import React from 'react';
import {StyleSheet} from 'react-native';
import {width,colors,height} from '../utils/constant';

const _dasboard = StyleSheet.create({
    _dfclbtns:{
        width:width/4 + 10,
        height:150,
        backgroundColor:colors[3],
        borderRadius:20,
        alignItems:'center',
        margin:10,
        marginLeft:0,
    },
    _dfclbimg:{
        width:50,
        height:50
    },
    _dpopup:{
        backgroundColor:'#de5e5f',width, padding:20,alignItems:'center',justifyContent:'center'
    },
    _dfcont:{
        width,
        height:115,
        backgroundColor:colors[0],
        padding:20
    },
    _dfclist:{
        borderBottomColor:colors[2],
        borderBottomWidth:1,
        paddingBottom:10
    },
    _dfctext:{
        fontSize:20,
        width:100,
        textAlign:'center'
    },
    _dfcbtn:{

    },
    _dwcirtext:{
        width:50,
        height:50,
        backgroundColor:colors[0],
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100
    },
    _licbtn:{
        width:40,
        height:40,
        borderRadius:10,
        backgroundColor:'#77b68b',
        alignItems:'center',
        justifyContent:'center'
    },
    _dlist:{
        padding:10,
        borderBottomWidth:1/2,
        borderBottomColor:colors[0],
        height:60,
        width,
        justifyContent:'center'
    },
    _dsavebtn:{
        width:width/3,
        height:50,
        borderRadius:10,
        backgroundColor:colors[4],alignItems:'center',justifyContent:'center'
    }
});

export default _dasboard;