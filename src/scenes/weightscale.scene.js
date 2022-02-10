import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from '../components/index';
import { styles as _ } from '../styles';
import { ActivityIndicator, Button } from 'react-native-paper';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, goalsList, barrierList, motivationsList, width, fruitIcon, boxIcon, dropIcon, mobileIcon, vegetableIcon, height } from '../utils/constant';
import { POSTJSON,GETJSON } from '../utils/api';
import moment from 'moment';
import { BleManager } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-navigation';
import JSONTree from 'react-native-json-tree'
import { connect } from 'react-redux';
import {decode as atob, encode as btoa} from 'base-64'
import { ADD_DEVICE_FUNCTION, REMOVE_DEVICE_FUNCTION } from '../action';
import { PermissionsAndroid } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const manager = new BleManager();

function mapStateToProps(state) {
  return {
    data: state,
  };
}

const DeviceCard = ({device, conDevice}) => {
  const [services, setServices] = useState([]);
  const [readData, setReadData] = useState([]);
  const [monitorData, setMonitorData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [disconnect, setdisconnect] = useState(false);
  const [weight, setWeight] = useState('0');
  const [serviceIndex, setServiceIndex] = useState(0);
  const [hex, setHex] = useState('');
 
  const handleConnect__ = () => {
    device.connect()
    .then(async (devices) => {
      console.log(devices)
    })
    .then(async(device_) => {
      console.log(device_)
    })
    .catch((error) => {
       console.log(error)
    });
  }

  // const handleSubmitWeight = async(val) => {
  //   setWeightDialog(false);
  //   try{
  //       const _weight = await POSTJSON({weight: val},'weight/');
  //       setWeight({weight:val, timestamp: new Date()});
  //       setLoader(false);
  //   }catch(error){
  //       console.log(error);
  //       setLoader(false);
  //   }
  // }


  const handleConnect = async() => {
    setLoader(true);
    try{
      const handleConnect_ = await handleConnect__();
      setTimeout(async() => {
        const isDeviceConnected = await device.isConnected();
       if(isDeviceConnected){
        conDevice(device);
        setdisconnect(false);
        setLoader(false);
        alert('Device is connected');
        setTimeout(async() => {
          const dsc = await device.discoverAllServicesAndCharacteristics();
          const services = await dsc.services();
          setServices(services)
          console.log(services,'SREC')
        }, 1000);
      
       
      }else{
        alert('Device is not connected');
        setLoader(false);
     
      }
      },1000);
     
      
      
    }catch(error){
      console.log(error,"ERREER")
    }
    
  }

  const getChar = async(service) => {
     
      const c = await device.characteristicsForService(service.uuid)
       manager.readCharacteristicForDevice(device.id, service.uuid, c[0].uuid,'').then(response => {
      
        setReadData(response);
         handleResult(response);
        console.log(typeof response,"CAHT")
      }).catch(error =>{
        setServiceIndex(serviceIndex >= services.length ? 0 : serviceIndex +1);
        console.log(error)
      })
     
     
  }

  const monitor_ = async(service) => {
    const c = await device.characteristicsForService(service.uuid);

    manager.monitorCharacteristicForDevice(device.id, service.uuid, c[0].uuid, (error, charact) => {
      if(error){
        console.log(error);
        if((error).toString().includes("not connected")){
          setdisconnect(true);
        }
        setServiceIndex(serviceIndex >= services.length ? 0 : serviceIndex +1);
      }
      console.log(charact)
      handleResult(charact);
      setTimeout(() => {
        setMonitorData(charact);
      }, 2000);

      
      console.log(charact,"CAJHSD")
    });
   
   
  }
 
  function base64ToHex(str) {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    const result_ = result.split('');
    const w1 = result_[2].concat(result_[3]);
    const w2 = result_[4].concat(result_[5]);
    const w =  parseInt(w2.concat(w1), 16); 
    return (w * 0.01).toFixed(1);
  }
  const renderDeviceInfo = () => {
    return(
      <TouchableOpacity
      style={{
        marginBottom: 12,
        borderRadius: 16,
        shadowColor: 'rgba(60,64,67,0.3)',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 4,
        padding: 12,
        width:width-40,
        alignSelf:'center',
        backgroundColor:colors[0]
      }}
      // navigate to the Device Screen
      >
      <Text style={{fontWeight:'bold',fontSize:20}}>{`${device.name == "51-102" ? "PreventScripts Scale" : "Scale"}`}</Text>
      <Text style={{color:colors[3],marginTop:10}}>1. Connect the device.</Text>
      <Text style={{color:colors[3]}}>2. Press Get Weight Button</Text>
      <Text style={{color:colors[3]}}>3. Save Weight</Text>
      <Button
      onPress={() => handleConnect()}
      style={{backgroundColor:colors[4],marginTop:10,borderRadius:100,height:40,alignItems:'center',justifyContent:'center',width:width/2,alignSelf:'flex-end'}}
      labelStyle={{color:colors[0],fontSize:14,width:width}}
      >
        Connect
      </Button>
    </TouchableOpacity>
    );
  }

  useEffect(() => {
    manager.onDeviceDisconnected(device.id,(error, device) => {
      if (error) {
        console.log(error);
      }
      setdisconnect(true);
      alert('Device is disconnected');
    })
  },[]);

  const handleResult = (data) => {
    console.log(data?.value)
    if(data != null){
      const weight_ = base64ToHex(data?.value);
      setWeight(weight_);
      // setHex(base64ToHex(data?.value).concat(' AND '+data?.value));
    }
   
    
  }

  const handleSaveWeight = async() => {
    console.log(weight)
    try{
      const _weight = await POSTJSON({weight: parseInt(weight)},'weight/');
      // console.log(_weight)
      alert('Weight is saved');
      setLoader(false);
  }catch(error){
    alert('Something went wrong');
      console.log(error);
      setLoader(false);
  }
  }

  const renderServiceInfo = (service) => {
      return(
        <View
        style={{
          marginBottom: 12,
          borderRadius: 16,
          shadowColor: 'rgba(60,64,67,0.3)',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 4,
          padding: 12,
          width:width-40,
          height:height/3,
          alignSelf:'center',
          backgroundColor:colors[0]
        }}
        // navigate to the Device Screen
        >
        <Text style={{fontWeight:'bold',fontSize:14,color:colors[3],marginBottom:10}}>{`${device.name == "51-102" ? "PreventScripts Scale" : "Scale"}`}</Text>
        <View style={_.row}>
        <Text style={[_.flexFull,{fontWeight:'bold',fontSize:20,marginBottom:10}]}>Weight is {weight == '' ? 0 : weight} lbs </Text>
        
        <Button
        onPress={() => handleSaveWeight()}
        style={{backgroundColor:colors[4],borderRadius:100}}
        labelStyle={{color:colors[0]}}
        >
          Save
        </Button>
        </View>
        <Text style={{color:colors[3],marginTop:5}}>1. Connect the device.</Text>
      <Text style={{color:colors[3]}}>2. Press Get Weight Button</Text>
      <Text style={{color:colors[3]}}>3. Save Weight</Text>
        {/* <Text style={{fontWeight:'bold',fontSize:10,marginBottom:10}}> </Text> */}
        <View style={[_.row,_.mt10,_.alignICenter,_.justifyCenter]}>
        <View style={[_.column,_.alignICenter]}>
        <TouchableOpacity 
          disabled={!disconnect}
          onPress={() => handleConnect()}
        style={[_.alignICenter,_.justifyCenter,{width:40,height:40,backgroundColor:colors[1],borderRadius:100}]}>
          <Icon name="connectdevelop" type="font-awesome" color={colors[0]}  size={20} />
        </TouchableOpacity>
        <Text style={{fontSize:6,marginTop:2}}>{disconnect ? 'Connect Again' : 'Connected'}</Text>
        </View>
       
        <Button
        onPress={() => monitor_(service)}
        style={{backgroundColor:colors[2],borderRadius:100,height:40,alignItems:'center',justifyContent:'center',width:width/2 + 20,alignSelf:'center',margin:10}}
        labelStyle={{color:colors[1],fontSize:10,width:width/2}}
        >
          Get Weight
        </Button>
        </View>
      </View>
      );
    }
  if(loader) return   <View style={[_._locontainer, _._lohorizontal,{backgroundColor:"transparent",marginBottom:20}]}><ActivityIndicator animating={true} color={colors[4]} /></View>;
   
  return(
    <View style={{flex:1, backgroundColor:'transparent'}}>
{services.length == 0 ? renderDeviceInfo() : renderServiceInfo(services[serviceIndex])
}
 
   </View>
 );
}


const WeightScale = ({...props}) => {
    const [scannedDevices, setscannedDevices] = useState([]);
    const [bleState, setbleState] = useState(false);
   const [conDevice, setconDevice] = useState([]);

    const requestLocationPermission = async () =>  {
      if(Platform.OS === 'android'){
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
              title: 'Location permission for bluetooth scanning',
              message: 'wahtever',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          ); 
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission for bluetooth scanning granted');
        
            return true;
          } else {
            console.log('Location permission for bluetooth scanning revoked');
            return false;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
        
      }
    
    }
    

    const handleConnection = async() => {
      let sd = [];
    
      manager.startDeviceScan(null, null,( async (error, scannedDevice) => {
        // console.log(error, scannedDevice)
        if (error) {
          alert('Kindly connect bluetooth');
          setbleState(false);
          console.log(error,'sdasd');
        }else{
          setbleState(true);
        }
      //  if(scannedDevice.name == "51-102"){
        if(scannedDevice.name == "51-102"){
          // await handleConnect__(scannedDevice);
          await props.AddDevice(scannedDevice);
       }
      
      
        // if (scannedDevice) {
        //    if (scannedDevice && !scannedDevices.find((dev) => dev.id === scannedDevice.id)) {
        //     // handleConnect__(scannedDevice);
        //     props.AddDevice(scannedDevice);
        //   }
        // }
      }));


    
     setTimeout(() => {
        manager.stopDeviceScan();
      }, 5000);
    }

    useEffect(() => {
      requestLocationPermission();
     
    },[]);

    const handleRefresh = async() => {
      setbleState(false);
      props.RemoveDevice();
    
      if(Platform.OS == 'ios'){
        manager.cancelDeviceConnection();
      }
  
      manager.cancelTransaction();
        handleConnection();
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
        <Header
     
        />
  <ScrollView>
            <View style={{paddingBottom:80,marginBottom:40}}>
                 <Button
                 onPress={() => !bleState ? handleConnection() : handleRefresh()}
                  style={{backgroundColor:colors[4],borderRadius:100,height:40,alignItems:'center',justifyContent:'center',width:width/2,alignSelf:'center',marginTop:20,marginBottom:20}}
                  labelStyle={{color:colors[0],fontSize:14,width:width}}
                  >
                    {!bleState ? 'Load Devices' : 'Refresh'}
                  </Button>
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={props.data}
                  renderItem={({ item }) => <DeviceCard conDevice={e => setconDevice(e)} device={item} />}
                  contentContainerStyle={_.content}
                />
         
          </View>
                </ScrollView>
      <BottomNav
       navigation={props.navigation}
       eventFired={() => console.log('event fired')}
      />
        </View>       
    );
}


function mapDispatchToProps(dispatch) {
  return {
    AddDevice: data => {
      dispatch(ADD_DEVICE_FUNCTION(data));
    },
    RemoveDevice: () => {
      dispatch(REMOVE_DEVICE_FUNCTION());
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeightScale);