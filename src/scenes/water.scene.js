import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, url2, width } from '../utils/constant';
import * as Progress from 'react-native-progress';
import { GETJSON, POSTJSON } from '../utils/api';
import axios from 'axios';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';
import { Alert } from 'react-native';
const Water = ({...props}) => {
    const [wcount, setwcount] = useState(0);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        handleData();
    },[]);

    const handleData = async() => {
        setLoader(true);
        try{
            const waterCount = await GETJSON('water/');
            const waterCount__ = waterCount.data;
            const waterCount_ = waterCount__.filter(x => moment(x.timestamp).isSame(moment(), 'day'))
            const wcl = waterCount_.sort((a, b) => {
                return b.id - a.id;
            });
            setwcount(parseInt(wcl[0].water));
            setLoader(false);
        }catch(error){
            console.log(error)
            setLoader(false);
        }
    }

    const handleWater = (type) => {
        let wcount_ = 1;
        if(type == 0){
            wcount_ = wcount == 1 ? 1 : wcount-1;
        }else{
            wcount_ = wcount == 10 ? 10 : wcount+1;
        }
        setwcount(wcount_);
    }

    const handleSaveWater = async() => {
        setLoader(true);
        try{
            const water_ = await POSTJSON({water:wcount},'water/');
            console.log(water_);
            setLoader(false);
            Alert.alert('Saved successfully!')
        }catch(error){
            setLoader(false);
            Alert.alert('Try again later')
            console.log(error)
        }
    }
    if(loader) return   <View style={[_._locontainer, _._lohorizontal]}><ActivityIndicator animating={true} /></View>;
    return(
        <View style={[_.container,_.blackBg,_.relative]}>
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
        <Text style={[_.textCenter,_.textWhite,_.fs16,_.mt20]}>HYDRATION</Text>
        <Text style={[_.textCenter,_.textWhite,_.fs26,_.mt20,{maxWidth:width-80,alignSelf:'center'}]}>Today you took <Text style={{color:'#77b68b'}}>{wcount*10} oz</Text> of water</Text>
        <Text style={[_.textCenter,_.textWhite,_.fs14,_.mt10]}>Almost there! Keep hydrated</Text>
        <View style={[_.mt40,_.alignICenter]}>
        <View style={[_._dwcirtext,_.mb20]}>
        <Text style={[_.textBlack,_.fs18,_.textCenter]}>{wcount * 10}</Text>
        </View>
        <Progress.Bar progress={0.1 * wcount} width={width - 100}  height={50} color={'#77b68b'} unfilledColor={'#a2cdb0'} style={{borderRadius:100}} />
        <Image
            source={require('./../assets/icons/scale.png')}
            style={{width:width-100,marginTop:10}}
            resizeMode='contain'
        />
        <View style={[_.alignICenter,_.alignCenter,_.justifyCenter,_.mt40,_.row,{width:width-20}]}>

        <View style={[_.flexFull,_.alignICenter]}> 
        <TouchableOpacity 
        onPress={() => handleWater(0)}
        style={[_._licbtn,{backgroundColor:'#a2cdb0'}]}>
                <Icon
                    name="minus"
                    size={20}
                    color={colors[0]}
                    type="font-awesome"
                />
            </TouchableOpacity>
            </View>
           
            <View style={[_.flexFull,_.alignICenter,_.column]}> 
            <Image
                source={require('./../assets/icons/glass.png')}
                style={{width:80,height:80}}
                resizeMode={'contain'}
            />
            <Text style={[_.textWhite,_.mt10]}>1 x 10oz Glass</Text>
            </View>
            <View style={[_.flexFull,_.alignICenter]}> 
             <TouchableOpacity 
                onPress={() => handleWater(1)}
             style={[_._licbtn]}>
                <Icon
                    name="plus"
                    size={20}
                    color={colors[0]}
                    type="font-awesome"
                />
            </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity 
                onPress={() => handleSaveWater()}
             style={[_._dsavebtn,_.mt30]}>
                <Text style={[_.textCenter,_.textWhite,_.fs18]}>Save</Text>
            </TouchableOpacity>
        </View>
      
         </View>
        </ScrollView>
     
        <BottomNav
            navigation={props.navigation}
            eventFired={() => console.log('Event saved')}

        />
        </View>       
    );
}



export default Water;