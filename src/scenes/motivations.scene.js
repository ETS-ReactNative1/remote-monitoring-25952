import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width, motivationsList } from '../utils/constant';
import { SafeAreaView } from 'react-navigation';


const Motivations = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const id = navigation.getParam('id',0);
    
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
        <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter]}>MOTIVATIONS</Text>
        <Text style={[_.mt10,_.textCenter,_.fs22,_.textWhite,{width:width/2+ 80},_.alignCenter]}>
        What is the biggest reason you want to make this change? 
        </Text>
        <Text style={[_.mt20,_.textWhite,_.fs24,_.textCenter]}>I WANT TO:</Text>
        <View style={[_.row,_.alignCenter,_.mt10,{width:width-40}]}>
            {motivationsList.map((item,index) => {
                return(
                    <TouchableOpacity
                    key={index}
                    onPress={() => {
                        navigation.navigate('Barrier',{
                            scale1,
                            scale2:item,
                            id
                        })
                    }}
                    style={_._dglist}
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
      dotIndex={2}
      navigation={props.navigation}
      />
        </View>       
    );
}



export default Motivations;