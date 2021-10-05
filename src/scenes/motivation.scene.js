import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Touchable, Platform, StatusBar} from 'react-native';
import { Slider } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner, BottomNavInner2} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width } from '../utils/constant';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { SafeAreaView } from 'react-navigation';
// import RangeSlider from '@lighthouseapps/react-native-range-slider'

const motivationResponse = [
    {
        id:1,
        text:'not motivated at all'
    },
    {
        id:2,
        text:'a little motivated'
    },
    {
        id:3,
        text:'somewhat motivated'
    },
    {
        id:4,
        text:'motivated'
    },
    {
        id:5,
        text:'extremely motivated'
    },
]

const Motivation = ({...props}) => {
    const [slider, setSlider] = useState(1);
    const [motivationStatus, setmotivationStatus] = useState('not motivated at all');
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const scale2 = getParam('scale2',{});
    const scale3 = getParam('scale3',{});
    const id = getParam('id',0);
    const fields = getParam('fields','');
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
        <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter,{marginTop:60}]}>MOTIVATION</Text>
        <Text style={[_.mt20,_.textCenter,_.fs26,_.textWhite,{width:width - 60},_.alignCenter]}>
        One a scale of 1 to 5 how motivated are you to meet this goal? 
        </Text>
        <View style={[{width:width-40,marginTop:80},_.justifyCenter,_.alignCenter]}>
       <Slider
       maximumValue={5}
       minimumValue={1}
       step={1}
       value={slider}
       trackStyle={{height:10,borderRadius:100}}
       onValueChange={value => setSlider(value)}
       thumbStyle={{backgroundColor: 'transparent' }}
       thumbProps={{
         children: (
             <View style={_._dtrackthumb}>
            <Text style={[_.textWhite,_.textCenter,_.fs20]}>{slider}</Text>
            </View>
         ),
       }}
       />
 <Text style={[_.textLight,_.fs22,_.mt40,{textAlign:'center'}]}>{motivationResponse[slider-1].text}</Text>
       <TouchableOpacity
             onPress={() => {
                navigation.navigate('Commitment',{
                    scale1,
                    scale2,
                    scale3,
                    motivation:slider,
                    id,
                    fields,
                    recommendationText
                })
            }}
       style={[_._dmbtn,_.column,_.alignICenter,_.alignCenter,_.justifyCenter,{marginTop:50}]}>
            <Text style={[_.textWhite,_.fs16]}>Confirm</Text>
           
       </TouchableOpacity>

        </View>
       
      
        </View>
        </ScrollView>
        <BottomNavInner2
       dots
       dotIndex={1}
       navigation={props.navigation}

      />
        </View>       
    );
}



export default Motivation;