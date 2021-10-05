import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, SafeAreaView} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width } from '../utils/constant';
import ActivityRings from "react-native-activity-rings";  
import {
    LineChart,
  } from "react-native-chart-kit";
// import { startCounter, stopCounter } from 'react-native-accurate-step-counter';
import { NavigationEvents } from 'react-navigation';
import { GETJSON, POSTJSON } from '../utils/api';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import { Platform } from 'react-native';
import { StatusBar } from 'react-native';
  // import Pedometer from 'react-native-universal-pedometer'

const activityData = [ 
    { value: 0.8,color: "#77b68b", }
  ];
  const activityConfig = { 
    width: 200,  
    height: 200,
    radius: 70,
    ringSize: 14,
  };

const Steps = ({...props}) => {
  
  const [steps, setSteps] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    handleGetStep();
  },[]);


  const handleLatest = (dataset) => {
    const dataset_ = dataset.filter(x => moment(x.timestamp).isSame(moment(), 'day'))
    const dataset__ = dataset_.sort((a, b) => {
        return b.id - a.id;
    });
    return dataset__;
}

  const handleGetStep = async() => {
    try{
      setLoader(true);
      const _steps = await GETJSON('steps/');
      setSteps(_steps.data ? parseInt(handleLatest(_steps.data)[0].steps) : {});
      setLoader(false);
  }catch(error){
      console.log(error);

      setLoader(false);  
  }
  }

  // useEffect(() => {
  //   const config = {
  //     default_threshold: 20.0,
  //     default_delay: 15000099,
  //     cheatInterval: 3000,
  //     onStepCountChange: (stepCount) => { setSteps(stepCount) },
  //     onCheat: () => { console.log("User is Cheating", steps); setSteps(steps-1)}
  //   }
  //   startCounter(config);
  //   return () => { stopCounter() }
  // }, []);

  const handleSaveSteps = async() => {
    // alert('asdsasdaadssd')
    try{
      const _steps = await POSTJSON({
        steps:steps
      },'steps/');
      alert('Steps are saved')
      // setLoader(false);
    }catch(error){
      alert('332132')
        console.log(error,"ERRRPR");
        // setLoader(false);
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
           <NavigationEvents onDidBlur={() => handleSaveSteps()} />
        <Header
        navigation={props.navigation}
        />
        
       
        <ScrollView>
            <View style={{paddingBottom:80}}>
        <Text style={[_.textCenter,_.textWhite,_.fs16,_.mt20]}>DAILY INTAKE</Text>
        <Text style={[_.textCenter,_.textWhite,_.fs26,_.mt20,{maxWidth:width-80,alignSelf:'center'}]}>You have walked <Text style={{color:'#77b68b'}}>{steps/500 * 100}%</Text> of your goal</Text>
        <View style={[_.relative,{width:180,height:180,alignSelf:'center'}]}>
        <ActivityRings data={[{...activityData[0],value:parseFloat(steps/500)}]} config={activityConfig} /> 
            <View style={[_.column,{position:'absolute',top:50,alignSelf:'center'}]}>
                <Image
                    source={require('./../assets/icons/walking.png')}
                    style={{width:40,height:40}}
                    resizeMode='contain'
                />
                <Text style={[_.textCenter,_.textWhite,_.fs24,_.mt10,{fontWeight:'bold'}]}>{steps < 0 ? 0 : steps}</Text>
                <Text style={[_.textCenter,_.textWhite,_.fs14]}>steps</Text>
            </View>
        </View>
        <LineChart
    data={{
      labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: colors[1],
      backgroundGradientFrom: colors[1],
      backgroundGradientTo: colors[1],
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "2",
        strokeWidth: "2",
        stroke: "#77b68b"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
        </ScrollView>
     
        <BottomNav
            navigation={props.navigation}
            eventFired={() => handleSaveSteps()}
        />
        </View>       
    );
}



export default Steps;