import React from 'react';
import {StyleSheet} from 'react-native';
import {colors, width, height} from '../utils/constant';

const _common = StyleSheet.create({
    container:{
        flex:1,
    },
    blackBg:{
        backgroundColor:colors[1],
        paddingBottom:40
    },
    flexFull:{
        flex:1,
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    column:{
        flexDirection:'column'
    },
    alignCenter:{
        alignSelf:'center'
    },
    alignLeft:{
        alignSelf:'flex-start'
    },

    alignRight:{
        alignSelf:'flex-end'
    },
    alignICenter:{
        alignItems:'center'
    },
    alignIRight:{
        alignItems:'flex-end'
    },
    justifyCenter:{
        justifyContent:'center'
    },
    relative:{
        position:'relative'
    },
    textCenter:{
        textAlign:'center'
    },
    inputIcon:{
        width:20,
        height:20
    },
    textWhite:{
        color:colors[0],
    },
    textBlack:{
        color:colors[1],
    },
    fs10:{
        fontSize:10
    },
    fs12:{
        fontSize:12,
    },
    fs14:{
        fontSize:14,
    },
    fs16:{
        fontSize:16
    },
    fs18:{
        fontSize:18,
    },
    fs20:{
        fontSize:20,
    },
    fs22:{
        fontSize:22,
    },
    fs24:{
        fontSize:24,
    },
    fs26:{
        fontSize:26,
    },
    fs28:{
        fontSize:28,
    },
    fs30:{
        fontSize:30,
    },
    
    mt10:{
        marginTop:10
    },
    mt20:{
        marginTop:20
    },
    mt30:{
        marginTop:30
    },
    mt40:{
        marginTop:40
    },
    elements:{
        maxWidth:width-40,
        alignSelf:'center',
        paddingBottom:80,
    },
    submitBtn:{
        backgroundColor:colors[5],
        height:50,
        borderRadius:100,
        width:width/2 + 60,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    sBtnText:{
        color:colors[0],
        fontSize:16
    },
    mb10:{
        marginBottom:10
    },
    mb20:{
        marginBottom:20
    },
    mb40:{
        marginBottom:40
    },
    ml10:{
        marginLeft:10
    },
    ml20:{
        marginLeft:20
    },
    ml40:{
        marginLeft:40
    },
    backBtn:{
        alignItems:'flex-start',margin:20
    },
    p5:{
        padding:5
    },
    p10:{
        padding:10,
    },
    p20:{
        padding:20
    },
    textLight:{
        color:colors[3],
    },
    shadow5:{
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    shadow2:{
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 2,
    },
    mr10:{
        marginRight:10,
    },
    para:{
        color:colors[3],
    },
    mt5:{
        marginTop:5
    },
    borderLine:{
        borderBottomColor:colors[0],
        borderBottomWidth:2
    },
    _locontainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:'black'
      },
    _lohorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
    },
    topBar: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 6,
        backgroundColor: "#22509d"
      },
      heading: {
        fontWeight: "bold",
        fontSize: 16,
        alignSelf: "center",
        color: "#fff"
      },
      enableInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      listContainer: {
        borderColor: "#ccc",
        borderTopWidth: 0.5
      },
      listItem: {
        flex: 1,
        height: "auto",
        paddingHorizontal: 16,
        borderColor: "#ccc",
        borderBottomWidth: 0.5,
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 15
      },
      listItemStatus: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        fontWeight: "bold",
        fontSize: 12,
        color: "#fff"
      },
      footer: {
        height: 52,
        borderTopWidth: 1,
        borderTopColor: "#999"
      },
      fixedFooter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ddd"
      },
      button: {
        height: 36,
        margin: 5,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center"
      },
      buttonText: {
        color: "#22509d",
        fontWeight: "bold",
        fontSize: 14
      },
      buttonRaised: {
        backgroundColor: "#22509d",
        borderRadius: 2,
        elevation: 2
      }
});

export default _common;