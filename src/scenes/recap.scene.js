import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width } from '../utils/constant';
import { SafeAreaView } from 'react-navigation';


const Recap = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const scale2 = getParam('scale2',{});
    const scale3 = getParam('scale3',{});
    const id = getParam('id',0);
  
    return(
        <View style={[_.container,_.blackBg,_.relative]}>
              {Platform.OS == 'ios' &&
            <SafeAreaView style={{backgroundColor:'white'}}>
            <StatusBar
          translucent
          barStyle="light-content"
        />
            </SafeAreaView>
            }
     
        <ScrollView>
            <View style={{paddingBottom:80}}>
            <Header2
        navigation={props.navigation}
        mode={1}
        />
        <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter]}>LET RECAP</Text>
        <Text style={[_.mt20,_.textCenter,_.fs22,_.textWhite,{width:width/2+ 80},_.alignCenter]}>
        OKAY, so does this goal sound right? 
        </Text>
        <View style={[_._drcontainer,_.mt40,{paddingBottom:60}]}>
            <View style={[{width:width/2 + 50},_.alignCenter,_.mt30]}>
            <Text style={[_.textWhite,_.fs24,{fontStyle:'italic',width:width/2+ 80, alignSelf:'flex-start'}]}>"I want to <Text style={{color:colors[4]}}>{scale1.text}</Text> because I want to <Text style={{color:colors[4]}}>{scale2.text}</Text> but my biggest issue is <Text style={{color:colors[4]}}>{scale3.text}</Text>"</Text>

            </View>
            <TouchableOpacity 
             onPress={() => {
                navigation.navigate('Recommendation',{
                    scale1,
                    scale2,
                    scale3,
                    id
                })
            }}
            style={[_._dhbtn,_.mt20,{width:width/2+40,borderRadius:20}]}>
            <Text style={_._dhbtext}>YEP, THAT'S ME</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={[_._dhbtn,_.mt20,{width:width/2+40,borderRadius:20,backgroundColor:colors[7]}]}>
            <Text style={[_._dhbtext]}>CHANGE RESPONSE</Text>
        </TouchableOpacity>
        </View>

        </View>
        </ScrollView>
        <BottomNavInner
      navigation={props.navigation}
      />
        </View>       
    );
}



export default Recap;