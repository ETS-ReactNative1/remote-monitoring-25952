import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog, BSDialog, BMIDialog, VDialog} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, url2, width,firebaseConfig } from '../utils/constant';
import { GETJSON, POSTJSON } from '../utils/api';
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import { NavigationEvents,SafeAreaView } from "react-navigation";
import { Platform } from 'react-native';
import { StatusBar } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging'
import {decode as atob, encode as btoa} from 'base-64'
import { Alert } from 'react-native';
import { RefreshControl } from 'react-native';

const stateObjInitial = {
    state:false,
    heading:'',
    para:''
}

const Dashboard = ({...props}) => {
    const [bpdialog, setbpdialog] = useState(false);
    const [loader, setLoader] = useState(false);
    const [weightDialog, setWeightDialog] = useState(false);
    const [sugarDialog, setSugarDialog] = useState(false);
    const [bmiDialog, setBmiDialog] = useState(false);
    const [poptype, setpoptype] = useState(0); //0 blood pressure, 1 sugar
    const [weight, setWeight] = useState([]);
    const [sugar, setSugar] = useState([]);
    const [bmi, setBMI] = useState('0');
    const [upVisible, setupVisible] = useState(false);
    const [bloodPressure, setBloodPressure] = useState([]);
    const [steps, setSteps] = useState([]);
    const [water, setWater] = useState([]);
    const [vege_fruit, setvege_fruit] = useState([]);
    const [stateObj, setstateObj] = useState(stateObjInitial);
    const [refreshing, setrefreshing] = useState(false);

   
    useEffect(() => {
        if(firebase.apps.length == 0){
            firebase.initializeApp(firebaseConfig);
        }
    //    AsyncStorage.setItem('loggedIn','false');
        handleData();
        handleMaintainUser();
        createNotificationListeners();
        // // const readebleData = base64.decode("A8RA4AcBARYTHw==");
        // // console.log(readebleData)
        // console.log(base64ToHex("A9xG4AcBAhYiEg=="))
    
        // handleLogout();
    },[]);

    const handleMaintainUser = () => {
        GETJSON('user-status/').then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    createNotificationListeners = async () => {
        const self = this;
        const unSubscribe = messaging().onMessage(async remoteMessage => {
            const notificationContainer = remoteMessage.notification;
            Alert.alert(notificationContainer.title, notificationContainer.body);


        });

        messaging().onNotificationOpenedApp(async remoteMessage => {
            const notificationContainer = remoteMessage.notification;
            Alert.alert(notificationContainer.title, notificationContainer.body);

        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    const notificationContainer = remoteMessage.notification;
                    Alert.alert(notificationContainer.title, notificationContainer.body);

                }
            });
    };

    const handleLogout = async() => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userId');
        props.navigation.navigate('AuthLoader')
    }

    const handleData = async() => {
       try{
        setLoader(true);
        const _weight = await GETJSON('weight/');
        setWeight(_weight.data ? handleLatestW(_weight.data)[0] : {weight:'0',timestamp: new Date()});
        const _bloodSugar = await GETJSON('blood-sugar/');
        setSugar(_bloodSugar.data ? handleLatestW(_bloodSugar.data)[0] : {blood_sugar:'0',timestamp: new Date()});
        const _bloodPressure = await GETJSON('blood-pressure/');
        const bloodPressure__ = handleLatestW(_bloodPressure.data)[0];
         setBloodPressure(_bloodPressure.data.length != 0 ? {blood_pressure: `${bloodPressure__.systolic}/${bloodPressure__.diastolic}`, timestamp:bloodPressure__.timestamp} : {blood_pressure:'', timestamp: new Date()});
        const _water = await GETJSON('water/');
        setWater(_water.data ? handleLatest(_water.data)[0] : {water:'0',timestamp: new Date()});
        const _vege = await GETJSON('vegetables-fruits/');
        const vege__ = handleLatest(_vege.data)[0];
        setvege_fruit(_vege.data ? {vege: `${vege__.vegetables}/${vege__.fruits}`, timestamp:vege__.timestamp} : {vege:'0/0', timestamp: new Date()});
        const _steps = await GETJSON('steps/');
        setSteps(_steps.data ? handleLatest(_steps.data)[0] : {steps:'0',timestamp: new Date()});
        setLoader(false);  
        setrefreshing(false);  
    }catch(error){
        console.log(error,"ERRRRRR");
        setrefreshing(false);  
        setLoader(false);  
    }
    }

    const handleLatest = (dataset) => {
        const dataset_ = dataset.filter(x => moment(x.timestamp).isSame(moment(), 'day'))
        const dataset__ = dataset_.sort((a, b) => {
            return b.id - a.id;
        });
        return dataset__;
    }

    const handleLatestW = (dataset) => {
        const dataset__ = dataset.sort((a, b) => {
            return b.id - a.id;
        });
        return dataset__;
    }

    const handlePressureColor = () => {
        let color = '#edd674';
        if(bloodPressure.length != 0 && poptype == 0){
            const pressure_ = bloodPressure.blood_pressure.split('/');
            const pressure1 = parseInt(pressure_[0]);
            const pressure2 = parseInt(pressure_[1]);

          if(pressure1 <= 120 && pressure2 <= 80){
            color= '#77b68b' 
        }
        if((pressure1 > 120 && pressure1 < 140) || (pressure2 > 80 && pressure2 < 90)){
            color= '#edd674'
        }
        if((pressure1 >= 140 && pressure1 < 180) || (pressure2 >= 90 && pressure2 < 110)){
            color= '#de5e5f'
        }
        if((pressure1 >= 180) || pressure2 >= 111){
            color= 'red'
        }
        }
        return color;
    }

    const handleSugarColor = () => {
        console.log(sugar,"SUGWR")
        if(sugar != undefined){
            if(sugar.blood_sugar  <= 100){
          
                return '#77b68b'
            }
            if(sugar.blood_sugar > 100 && sugar.blood_sugar <= 126){
                return '#edd674' 
            }
            if(sugar.blood_sugar >= 127){
                return '#de5e5f'
            }
        }
           
        return '#edd674';
    }

    const handlePressureText = (poptype,value) => {
        let stateObj_ = {...stateObj};
        if(poptype == 0){
            
      const pressure_ = value.split('/');
      const pressure1 = parseInt(pressure_[0]);
      const pressure2 = parseInt(pressure_[1]);
      
        if(pressure1 <= 120 && pressure2 <= 80){
            stateObj_.heading = 'Great Job!\nYou must be managing your health well today! Keep it up! And continue logging your health using PreventScripts'
        }
        if((pressure1 > 120 && pressure1 < 140) || (pressure2 > 80 && pressure2 < 90)){
            stateObj_.heading = 'Uh Oh, your blood pressure is in the caution range\nWeight loss is one of the most effective lifestyle changes for controlling blood pressure. Losing even a small amount of weight if you\'re overweight or obese can help reduce your blood pressure. Track your progress in PreventScripts! You have a chance of avoiding medications now!\nA little bit better every day! '
        }
          if((pressure1 >= 140 && pressure1 < 180) || (pressure2 >= 90 && pressure2 < 110)){
            stateObj_.heading = 'CALL YOUR DOCTOR AS SOON AS POSSIBLE\nLifestyle Changes like weight loss, exercise and quitting smoking are critical to taking back your health! You may also require medication therapy to keep your blood pressure under control.  Track your progress in PreventScripts.'
          }
          if((pressure1 >= 180) || pressure2 >= 111){
            stateObj_.heading = 'GO TO THE EMERGENCY ROOM to safely reduce your Blood Pressure.'
        }
      }else{
        if(value < 100){
            stateObj_.heading = 'Awesome!\nYour number is fantastic! Keep up the good work! Usethe platform to track your habits and maintain health!” Keep checking your blood sugar periodically' 
        
        }
        if(value >= 100 && value <= 126){
            stateObj_.heading = 'Uh Oh!  Your number is elevated! To improve your blood sugar:\nIncrease your activity- track your movement on the Coach screenRecheck your number after 30 minutes of exercise!Go to "my plans" and pick a health behavior to improve.\nA little bit better every day!'
        
        }
        if(value >= 127){
            stateObj_.heading = 'YIKES! That number is too high!\nSee your doctor immediately if you haven’t been diagnosed with Diabetes.'
        }
      }
      
      setstateObj({...stateObj_,state:true});

    }

    const handleSubmitPressureInput = async(val) => {
        setbpdialog(false);
        // setLoader(true);
         const BP = val.split('/');
         handlePressureText(0,val);
        try{
            const _pressure = await POSTJSON({
            systolic: BP[0],
            diastolic: BP[1],
            },'blood-pressure/');
            console.log(_pressure,"RES")
            setBloodPressure({blood_pressure:val, timestamp: new Date()});
            
        }catch(error){
            console.log(error);
        }
  
    }
    
    const handleSubmitWeight = async(val) => {
      setWeightDialog(false);
      try{
          const _weight = await POSTJSON({weight: val},'weight/');
          console.log(_weight);
          setWeight({weight:val, timestamp: new Date()});
          setLoader(false);
      }catch(error){
          console.log(error);
          setLoader(false);
      }
    }

    const handleSubmitSugar = async(val) => {


      setSugarDialog(false);
    //   setLoader(true);
      try{
          const _sugar = await POSTJSON({blood_sugar: val},'blood-sugar/');
          setSugar({blood_sugar:parseInt(val), timestamp: new Date()});
          handlePressureText(1,parseInt(val));
        //   setLoader(false);
      }catch(error){
          console.log(error);
          setLoader(false);
      }
      }

    

      const handleDays = (timestamp) =>{
        var a = moment(new Date());
        var b = moment(timestamp);
        const days = a.diff(b, 'days');
        return days == 0 ? 'now' : days + 'd'; 
      }


      const handleRefresh = () => {
       setrefreshing(true);
        handleData();
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
             <NavigationEvents onDidFocus={() => handleData()} />
        <Header
        navigation={props.navigation}
        />
      
        <ScrollView
         refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
              color={colors[4]}
            />
           }
        
        >
            <View style={{paddingBottom:80}}>
        <Text style={[_.textCenter,_.textWhite,_.fs16,_.mt20]}>Welcome to Preventscripts</Text>
        {/* <TouchableOpacity
        onPress={() => setBmiDialog(true)}
        >
        <Text style={[_.textCenter,_.textWhite,_.para,_.mt30,_.fs18]}>BMI {bmi}</Text>
        </TouchableOpacity> */}
        <Text style={[_.textCenter,_.textWhite,_.para,_.mt20,_.fs18]}>Health Biometrics</Text>
        <View style={[_.elements,_.mt20,{paddingBottom:0,maxWidth:width-20,alignItems:'center'}]}>
        <View style={[_.row,_.alignICenter]}> 
            <TouchableOpacity 
            onPress={() => props.navigation.navigate('Weight',{weight:weight?.weight})}
            // onPress={() => setWeightDialog(true)}
            style={[_._dfclbtns,_.shadow2,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.textWhite,_.mt5,_.fs10,{height:25}]}>WEIGHT</Text>
                <Image
                    source={require('./../assets/icons/weight.png')}
                    style={[_._dfclbimg,_.mt5]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite,_.mt10]}>{weight?.weight ? weight?.weight : 0} lbs</Text>
                  <Text style={[_.textCenter,_.para,_.fs12,_.textWhite]}>last update {handleDays(weight?.timestamp)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={() => setSugarDialog(true)}
             style={[_._dfclbtns,_.shadow2,{backgroundColor:handleSugarColor()}]}
             >
                <Text style={[_.textCenter,_.mt5,_.fs10,_.textWhite,{maxWidth:width/4-20,height:25}]}>BLOOD SUGAR</Text>
                <Image
                    source={require('./../assets/icons/sugar.png')}
                    style={[_._dfclbimg,_.mt5]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite,_.mt10]}>{sugar != undefined ? sugar.blood_sugar : 0}</Text>
                  <Text style={[_.textCenter,_.para,_.fs12,_.textWhite]}>last update {handleDays(sugar?.timestamp)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() =>setbpdialog(true)}
            style={[_._dfclbtns,_.shadow2,{backgroundColor:handlePressureColor()}]}>
                <Text style={[_.textCenter,_.mt5,_.fs10,_.textWhite,{maxWidth:width/4-20,height:25}]}>BLOOD PRESSURE</Text>
                <Image
                    source={require('./../assets/icons/blood.png')}
                    style={[_._dfclbimg,_.mt5]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite,_.mt10]}>{bloodPressure?.blood_pressure ? bloodPressure?.blood_pressure : 0}</Text>
                  <Text style={[_.textCenter,_.para,_.fs12,_.textWhite]}>last update {handleDays(bloodPressure?.timestamp)}</Text>
            </TouchableOpacity>
        </View>

        
        </View>
    
        <Text style={[_.textCenter,_.textWhite,_.para,_.mt20,_.fs18]}>Health Behaviors</Text>
        <View style={[_.elements,_.mt20,{paddingBottom:0,maxWidth:width-20,alignItems:'center'}]}>
        <View style={[_.row,_.alignICenter]}> 
            <TouchableOpacity 
            onPress={() => props.navigation.navigate('Water')}
            style={[_._dfclbtns,_.shadow2,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs10,_.textWhite,{height:25}]}>WATER</Text>
                <Image
                    source={require('./../assets/icons/water.png')}
                    style={[_._dfclbimg,_.mt5]}
                    resizeMode='contain'
                />
                   <Text style={[_.textCenter,_.fs16,_.textWhite,_.mt10]}>{water != null ? water.water * 10 : 0} oz</Text>
                  <Text style={[_.textCenter,_.para,_.fs10,_.textWhite]}>last update {handleDays(water?.timestamp)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={() => props.navigation.navigate('Steps')}
            style={[_._dfclbtns,_.shadow2,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,_.textWhite,{maxWidth:width/4-20,height:25}]}>STEPS</Text>
                <Image
                    source={require('./../assets/icons/step.png')}
                    style={[_._dfclbimg,_.mt5]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite,_.mt10]}>{steps?.steps}</Text>
                  <Text style={[_.textCenter,_.para,_.fs12,_.textWhite]}>last update {handleDays(steps?.timestamp)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => props.navigation.navigate('Fruit')}
            style={[_._dfclbtns,_.shadow2,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs10,_.textWhite,{maxWidth:width/4-20,height:25}]}>VEGETABLES & FRUIT</Text>
                <Image
                    source={require('./../assets/icons/fruit.png')}
                    style={[_._dfclbimg,_.mt5]}
                    resizeMode='contain'
                />
                 <Text style={[_.textCenter,_.fs16,_.textWhite,_.mt10]}>{vege_fruit?.vege}</Text>
                  <Text style={[_.textCenter,_.para,_.fs12,_.textWhite]}>last update {handleDays(vege_fruit?.timestamp)}</Text>
            </TouchableOpacity>
        </View>

        
        </View>
        <TouchableOpacity
        onPress={() => props.navigation.navigate('WeightScale')}
        style={[_.row,_.mt30,_.alignICenter,{justifyContent:'flex-end',paddingRight:20}]}>
        <Text style={[_.textCenter,_.textWhite,_.fs18,{marginRight:10}]}>CONNECT MY SCALE</Text>
        <Icon
        name="angle-right"
        type="font-awesome"
        size={30}
        color={colors[0]}
        />
        </TouchableOpacity>
        </View>
        </ScrollView>
     
        <BPDialog
         submitInput={ (val) =>  handleSubmitPressureInput(val)}
         onTouchOutside={ () => {setbpdialog(false)}}
         state={bpdialog}
        />
        <BSDialog
         submitInput={ (val) =>  handleSubmitSugar(val)}
         onTouchOutside={ () => {setSugarDialog(false)}}
         state={sugarDialog}
        />
          <WGDialog
         submitInput={ (val) =>  handleSubmitWeight(val)}
         onTouchOutside={ () => {setWeightDialog(false)}}
         state={weightDialog}
        />
        <BMIDialog
         submitInput={ (val) =>  handleSubmitBMI(val)}
         onTouchOutside={ () => {setBmiDialog(false)}}
         state={bmiDialog}
         weight={weight}
        />
        <VDialog
            stateObj={stateObj}
            onTouchOutside={() => setstateObj({...stateObj,state:false})}
        />
        <BottomNav
            navigation={props.navigation}
            eventFired={() => console.log('Event Fired')}
        />
        </View>       
    );
}



export default Dashboard;