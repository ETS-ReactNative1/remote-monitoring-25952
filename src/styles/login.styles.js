import React from 'react';
import {StyleSheet} from 'react-native';
import { height,width, colors, fontFamily } from '../utils/constant';

const _login = StyleSheet.create({
    _lmimg:{
        width:120,
        height:120
    },
    _lwhead:{
        maxWidth:width/2
    },
    _lwpara:{
        width:width - 80
    },
    _lbtn:{
        backgroundColor:colors[4],
        height:60,
        width:170,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center'
    },
    _linput:{
        color:colors[0],
        borderRadius:4,
        borderColor:colors[0],
        borderWidth:1,
        width:width-40,
        paddingLeft:15,
        marginTop:5,
        height:52,
        // fontFamily:fontFamily
    },
    _labsBtn:{
        position:'absolute',
        bottom:40,
        width:width-40,
        alignSelf:'center'
    },
    _labsIcon:{
        position:'absolute',
        right:15,
    },
    _lreinput:{
        justifyContent: 'center',
        // fontFamily:fontFamily
    },
    _lfooter:{
        width,
        height:90,
        backgroundColor:colors[5]
    },
    _lfooterContent:{
        alignItems:'center',
        justifyContent:'flex-end',
        paddingTop:30,
        paddingRight:20
    },
    _liconContainer:{
        width:30,
        height:30,
        borderRadius:100,
        borderColor:colors[3],
        borderWidth:1/2,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10
    },
    _lskipBtn:{
        alignItems:'center',
        justifyContent:'center'
    }
    // _lficon:{
    //     width:20,
    //     height:20
    // }
});

export default _login;