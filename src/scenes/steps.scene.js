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
import AppleHealthKit from 'rn-apple-healthkit';
import GoogleFit, { Scopes } from 'react-native-google-fit'
import { Alert } from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import BackgroundFetch from 'react-native-background-fetch'
import { NativeAppEventEmitter } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
  const PERMS = AppleHealthKit.Constants.Permissions;
  const opt = {
    startDate: moment().subtract(1, 'days'), // required ISO8601Timestamp
    endDate: moment(), // required ISO8601Timestamp
    bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1. 
  };
  // setup healthkit read/write permissions using PERMS
  const healthKitOptions = {
      permissions: {
          read:  [
              "StepCount"
          ],
          write: [
              "StepCount"
          ],
      }
  };
const activityData = [ 
    { value: 0.8,color: "#77b68b", }
  ];
  const activityConfig = { 
    width: 200,  
    height: 200,
    radius: 70,
    ringSize: 14,
  };
  const defaultSteps =[
    0 * 100,
    0 * 100,
    0 * 100,
    0 * 100,
    0 * 100,
    0 * 100,
    0 * 100]

const Steps = ({...props}) => {
  
  const [steps, setSteps] = useState(0);
  const [loader, setLoader] = useState(false);
  const [wRecord, setwRecord] = useState(defaultSteps);

  const handleBackgroundTask = () => {
    BackgroundFetch.configure({
      minimumFetchInterval: 3200,
    }, async (taskId) => {

      console.log("Received background-fetch event: " + taskId);
      if(Platform.OS == 'ios'){
        const stepIn = await handleAppleStep();
      }else{
        const step2 = await fetchData();
      }
    
      // const saveStep = await handleSaveSteps();
      /* process background tasks */
      
      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("RNBackgroundFetch failed to start");
    });
   
  }

  

  const handleAppleStep = () => {
    AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
      if (err) {
          console.log("error initializing Healthkit: ", err);
          return;
      }
   
      // Height Example
      AppleHealthKit.getStepCount(null, (err, results) => {
        console.log(results,"REESD")
          setSteps(results != undefined ? results.value : 0);
          handleSaveBackgroundSteps(results != undefined ? results.value : 0);
        console.log(results)
      });
   
  });
  }

  // useEffect(() => {
  //   if(steps != 0){
  //     handleSaveSteps()
  //   }
  // },[]);

  useEffect(async() => {
    handleBackgroundTask();
   
    if(Platform.OS == 'ios'){
      handlePopulateWeekData();
      handleAppleStep();
    }else{
      if(Platform.OS === 'android'){
        request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((result) => {
          console.log(result)
        });
       
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
          ],
        }
      const authorize = await GoogleFit.checkIsAuthorized();
      if(!authorize){
        const authorization = await GoogleFit.authorize(options);
        if (authorization.success) {
          console.log("AUTH_SUCCESS");
          handleSuccess();
          fetchData();
        } else {
          console.log("AUTH_DENIED", authorization.message);
        }
      }else{
       handleSuccess();
      }
      }
     
 
    }
    
  },[]);


  const handleSuccess = () => {
    GoogleFit.observeSteps((err, res) => {
      fetchData();
    })
    
  }

  async function fetchData() {
    var wDays = [0,0,0,0,0,0,0];
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    const res2 = await GoogleFit.getWeeklySteps(new Date(),0);
    console.log(res2[2].steps,"RES")
    const asset = res2[2].steps.map((item,index) => {
        // if(moment(item.date).day() == )
        wDays[moment(item.date).day()] = parseInt(item.value);
    });
    setwRecord(wDays);
    setSteps(res[2].steps[res[2].steps.length - 1].value);
    handleSaveBackgroundSteps(res[2]?.steps[res[2]?.steps?.length - 1].value);
  }

  const handlePopulateWeekData = async() => {
    var wDays = [0,0,0,0,0,0,0];
    var uArr = [];
    const _steps = await GETJSON('steps/');
    const asset = _steps.data.map((item,index) => {
      // if(moment(item.date).day() == )
    
      if(!uArr.includes(moment(item.timestamp).format('DD-MM-YYYY')) && uArr.length <= 6){
        uArr.push(moment(item.timestamp).format('DD-MM-YYYY'));
        wDays[moment(item.timestamp).day()] = parseInt(item.steps);
      }
    
  });
    setwRecord(wDays);
  }

  

  const handleSaveSteps = async() => {
    try{
      const _steps = await POSTJSON({
        steps:steps
      },'steps/');
      console.log(_steps,"STEPSSS")
    }catch(error){
        console.log(error,"ERRRPR");
    }
  }

  const handleSaveBackgroundSteps = async(steps_) => {
    try{
      const _steps = await POSTJSON({
        steps:steps_
      },'steps/');
      console.log(_steps,"STEPSSS")
    }catch(error){
        console.log(error,"ERRRPR");
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
        <Text style={[_.textCenter,_.textWhite,_.fs26,_.mt20,{maxWidth:width-80,alignSelf:'center'}]}>You have walked <Text style={{color:'#77b68b'}}>{(steps/10000 * 100).toFixed(1)}%</Text> of your goal</Text>
        <TouchableOpacity 
        onPress={() => fetchData()}
        style={[_.relative,{width:180,height:180,alignSelf:'center'}]}>
        <ActivityRings data={[{...activityData[0],value:parseFloat(steps/10000)}]} config={activityConfig} /> 
            <View style={[_.column,{position:'absolute',top:50,alignSelf:'center'}]}>
                <Image
                    source={require('./../assets/icons/walking.png')}
                    style={{width:40,height:40}}
                    resizeMode='contain'
                />
                <Text style={[_.textCenter,_.textWhite,_.fs24,_.mt10,{fontWeight:'bold'}]}>{steps < 0 ? 0 : steps}</Text>
                <Text style={[_.textCenter,_.textWhite,_.fs14]}>steps</Text>
            </View>
        </TouchableOpacity>
        {/* <LineChart
    data={{
      labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      datasets: [
        {
          data: wRecord
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
  /> */}
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