import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Alert, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner, BottomNavInner2} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width } from '../utils/constant';
import { PATCHJSON } from '../utils/api';
import { SafeAreaView } from 'react-navigation';


const Summary = ({...props}) => {
  const {navigation} = props;
  const {getParam} = navigation;
  const scale1 = getParam('scale1',{});
  const scale2 = getParam('scale2',{});
  const scale3 = getParam('scale3',{});
  const motivation = getParam('motivation','');
  const problemSolving = getParam('problemSolving','');
  const fields = getParam('fields','');
  const id = getParam('id',0);
  const view = getParam('view',false);
  const recommendationText = getParam('recommendationText','');
  const problemString = getParam('problemString','');
    
  
  const handleSave = async() => {
    const userId = await AsyncStorage.getItem('userId');
    const data = {
      "the_one_thing": scale1.value,
      "biggest_reason": scale2.value,
      "number_one_reason": scale3.value,
      "user": userId,
      "motivation_scale": motivation.toString(),
      "recommendation_option": problemSolving,
      "recommendation_option_other": fields,
    }

    console.log(data,id)
      PATCHJSON(data,`plans/${id}/`,1).then(response => {
        console.log(response)
        alert('Congratulation, plan has been saved successfully!');
        navigation.navigate('Dashboard')
    }).catch(error => {
        console.log(error)
        alert('Something went wrong.')
    })
    // navigation.navigate('Dashboard')
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
        mode={2}
        />
        <Text style={[_.mt20,_.textLight,_.fs14,_.bold,_.textCenter,{marginTop:60}]}>SUMMARY</Text>
        <Text style={[_.mt20,_.textCenter,{fontSize:30},_.textWhite,{width:width - 120},_.alignCenter]}>
        Congratulations!
        </Text>
        <Text style={[_.mt30,_.textCenter,{fontSize:22},_.textWhite,{width:width/2+ 80},_.alignCenter]}>
        You are on your way to better health! Remember we make the best changes when we tackle small things, one step at a time. 
        </Text>
        <View style={[_._drcontainer,_.mt40,{width:width-60},_.alignCenter]}>
            <Text style={[_.textWhite,_.textCenter,_.fs24,{fontStyle:'italic',width:width/2+ 80, alignSelf:'center'}]}>
              "I want to be able to <Text style={{color:colors[4]}}>{scale1.text}</Text>
               because I want to <Text style={{color:colors[4]}}>{scale2.text}</Text>.
                In order to do this, I will do my best to <Text style={{color:colors[4]}}>{scale3.text}</Text>. 
            In order to work towards this, I will do my best to {fields.split(',')[1] == '' ? `${fields.split(',')[0]} ${recommendationText.box[0]}` :
             `${fields.split(',')[0]} ${recommendationText.box[0]} and ${fields.split(',')[1]} ${recommendationText.box[1]}` 
            }
            . In order to work toward this goal I will {problemString}"
            </Text>
             
       
        </View>
        {!view &&
        <TouchableOpacity style={[_._dhbtn,_.mt40,{width:width/2,borderRadius:4}]}
              onPress={() => handleSave()}
        >
            <Text style={_._dhbtext}>Save</Text>
        </TouchableOpacity>
        }
        </View>
        </ScrollView>
        <BottomNavInner2
       dots
       dotIndex={4}
       navigation={props.navigation}

      />
        </View>       
    );
}



export default Summary;