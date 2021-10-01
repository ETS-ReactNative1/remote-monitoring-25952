import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner} from './../components/index';
import { styles as _ } from '../styles';
import {PATCHJSON, PUTJSON} from '../utils/api';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width, barrierList } from '../utils/constant';
import { SafeAreaView } from 'react-navigation';

const Barrier = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const scale2 = getParam('scale2',{});
    const id = navigation.getParam('id',0);
    const handleSavePlan = async(item) => {
        const userId = await AsyncStorage.getItem('userId');
        
        const data = {
            "the_one_thing": scale1.value,
            "biggest_reason": scale2.value,
            "number_one_reason": item.value,
            "user": userId,
          }
        

        // PATCHJSON(data,`plans/${id}/`).then(response => {
        //     console.log(response)
       
        // }).catch(error => {
        //     console.log(error)
        // })
        props.navigation.navigate('Recap',{
            scale1,
            scale2,
            scale3:item,
            id
        })
        // props.navigation.navigate('Recap',{
        //     scale1,
        //     scale2,
        //     scale3:item,
        //     id
        // })
        // console.log(item)
        
    }
    
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
        <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter]}>BARRIERS</Text>
        <Text style={[_.mt10,_.textCenter,_.fs22,_.textWhite,{width:width/2+ 80},_.alignCenter]}>
        What is the number one reason you are not already making this change? 
        </Text>
        <Text style={[_.mt20,_.textWhite,_.fs24,_.textCenter]}>THE BIGGEST ISSUE IS I:</Text>
        <View style={[_.row,_.alignCenter,_.mt10,{width:width-40}]}>
            {barrierList.map((item,index) => {
                return(
                    <TouchableOpacity
                    key={index}
                    style={_._dglist}
                    onPress={() => handleSavePlan(item)}
                    >
                        <Text style={[_.fs14,_.textWhite,_.textCenter]}>{item.text}</Text>
                    </TouchableOpacity>
                );
            })}
           
        </View>

        </View>
        </ScrollView>
        <BottomNavInner
      dots
      dotIndex={3}
      navigation={props.navigation}
      />
        </View>       
    );
}



export default Barrier;