import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner, BottomNavInner2} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width } from '../utils/constant';
import { SafeAreaView } from 'react-navigation';


const Commitment = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const scale2 = getParam('scale2',{});
    const scale3 = getParam('scale3',{});
    const motivation = getParam('motivation','');
    const fields = getParam('fields','');
    const id = getParam('id',0);
    const recommendationText = getParam('recommendationText','');
    
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
        mode={2}
        />
            <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter,{marginTop:60}]}>COMMITMENT</Text>
        <Text style={[_.mt20,_.textCenter,_.fs30,_.textWhite,{width:width- 60},_.alignCenter]}>
        Are you willing to commit to your provider to do the following? 
        </Text>
        <View style={[_._drcontainer,_.mt40,{width:width-40,borderRadius:4},_.alignCenter]}>
            <Text style={[_.textWhite,_.textCenter,_.fs24,{fontStyle:'italic',width:width/2+ 80, alignSelf:'center'}]}>"I will work hard to make the changes I have selected, I will try my best to <Text style={{color:colors[4]}}>{scale1.text}</Text> because I want to <Text style={{color:colors[4]}}>{scale2.text}</Text> and work with my provider to come up with ways to overcome by biggest issue that I <Text style={{color:colors[4]}}>{scale3.text}</Text>.</Text>
            {/* <TouchableOpacity
             onPress={() => {
                navigation.navigate('ProblemSolving',{
                    scale1,
                    scale2,
                    scale3,
                    motivation,
                    id
                })
            }}
            style={[_._dhbtn,_.mt20,{width:width/2}]}>
            <Text style={_._dhbtext}>YES I AGREE</Text>
        </TouchableOpacity> */}
        </View>
        <TouchableOpacity
             onPress={() => {
                navigation.navigate('ProblemSolving',{
                    scale1,
                    scale2,
                    scale3,
                    motivation,
                    id,
                    fields,
                    recommendationText
                })
            }}
       style={[_._dmbtn,_.column,_.alignICenter,_.alignCenter,_.justifyCenter,{marginTop:40}]}>
            <Text style={[_.bold,_.textWhite,_.fs16]}>YES I AGREE</Text>
           
       </TouchableOpacity>
            </View>
        </ScrollView>
        
        <BottomNavInner2
       dots
       dotIndex={2}
       navigation={props.navigation}

      />
        </View>       
    );
}



export default Commitment;