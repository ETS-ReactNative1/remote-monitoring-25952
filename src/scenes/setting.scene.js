import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog, BHDialog} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, height, url, url2, width } from '../utils/constant';
import * as Progress from 'react-native-progress';
import { GETJSON } from '../utils/api';
import axios from 'axios';
import { Alert } from 'react-native';
import moment from 'moment';
import { Platform } from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';

const Setting = ({...props}) => {
    const [heightDialog,setHeightDialog ] = useState(false);
    const [bheight, setbheight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setbmi] = useState('');
    const [showBMI, setshowBMI] = useState(false);
    useEffect(() => {
        handleData();
        handleShowBMI();
    },[]);
  
    const handleSubmitHeight = async(val) => {
        setbheight(val);
        const token  = await AsyncStorage.getItem('token');
        axios.post(`${url}height/`, {
          height: (val),
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization':`Token ${token}`,
          }
      })
          .then(response => {
              console.log(response)
              // setLoader(false);
          }).catch(error => {
           console.log(error)
          //  setLoader(false);
          });
          setHeightDialog(false);
    }



    const handleLatest = (dataset) => {
        const dataset__ = dataset.sort((a, b) => {
            return b.id - a.id;
        });
        return dataset__;
    }


    const handleData = async() =>{
        try{
            const getHeight = await GETJSON('height/');
            setbheight(getHeight.data ? handleLatest(getHeight.data)[0].height : '');
            handleShowBMI(getHeight.data ? handleLatest(getHeight.data)[0].height : '')
        // setHeightDialog(true)
        }catch(error){
            console.log(error);
        }
    }
    // Formula: weight (kg) / [height (m)]2
    // Calculation: [weight (kg) / height (cm) / height (cm)] x 10,000
    // [weight (lb) / height (in) / height (in)] x 703
    // https://www.cdc.gov/nccdphp/dnpao/growthcharts/training/bmiage/page5_2.html
    const handleShowBMI = async(height) => {
        console.log()
        const _weight = await GETJSON('weight/');
        if(_weight.data.length > 0) {
            const weight_ = handleLatest(_weight.data)[0].weight;
            setWeight(_weight.data ? weight_ : '');
            const bmi_ = weight_ / (parseFloat(bheight) * parseFloat(bheight) * 144) * 703;
            console.log(bmi_);
            if(isNaN(bmi_)){
                // return '';
                // Alert.alert('Add weight and height');
            }else{
                // return bmi_.toFixed(2);
                setbmi(bmi_.toFixed(2));
            }
        }else{
            return '';
            // Alert.alert('Add weight and height');
        }
      
        
        
    }


    return(
        <View style={[_.container,_.blackBg,_.relative]}>
                   <NavigationEvents onDidFocus={() => handleData()} />
               {Platform.OS == 'ios' &&
          <SafeAreaView
          style={{ backgroundColor: 'white' }}
        >
                 <StatusBar
            translucent
            barStyle="light-content"
          />
        </SafeAreaView>
         }
        <Header
        navigation={props.navigation}
        />
        
       
        <ScrollView>
            <View style={{paddingBottom:80}}>
            <TouchableOpacity
            onPress={() => setHeightDialog(true)}
            style={_._dlist}>
                <Text style={[_.textWhite,_.fs20]}>Height {bheight == '' ? '' : `(${(bheight).split('.')[0]} feet and ${(bheight).split('.')[1]} inches)`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => handleShowBMI()}
            style={[_._dlist,{height:bmi == '' ? 100 : 60}]}>
                <Text style={[_.textWhite,_.fs20]} numberOfLines={2}>BMI {bmi}{bmi == '' ? '(To calculate BMI, enter height above and connect scale on home page)' : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => props.navigation.navigate('Guide',{viewMode:1})}
            style={_._dlist}>
                <Text style={[_.textWhite,_.fs20]}>How to use</Text>
            </TouchableOpacity>
         </View>
        </ScrollView>
        <BHDialog
         submitInput={ (val) =>  handleSubmitHeight(val)}
         onTouchOutside={ () => {setHeightDialog(false)}}
         heading={bheight}
         state={heightDialog}
        />
        <BottomNav
            navigation={props.navigation}
            eventFired={() => console.log('Event Fired')}

        />
        </View>       
    );
}



export default Setting;