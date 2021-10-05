import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from '../components/index';
import { styles as _ } from '../styles';
import { ActivityIndicator } from 'react-native-paper';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, goalsList, barrierList, motivationsList, width, fruitIcon, boxIcon, dropIcon, mobileIcon, vegetableIcon } from '../utils/constant';
import { POSTJSON,GETJSON } from '../utils/api';
import moment from 'moment';
import { BleManager } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-navigation';
import JSONTree from 'react-native-json-tree'
import { connect } from 'react-redux';
import { ADD_DEVICE_FUNCTION } from '../action';
const manager = new BleManager();


function mapStateToProps(state) {
  return {
    data: state,
  };
}


const DeviceCard = ({device}) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
		// is the device connected?
    device.isConnected().then(setIsConnected);
  }, [device]);
  
  const handleConnect = async() => {
    const isDeviceConnected = await device.isConnected();
    console.log(isDeviceConnected)
    console.log(device)
  //  const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
  //     // get the services only
  //     const discoveredServices = await allServicesAndCharacteristics.services();
  //     setServices(discoveredServices);
    // device.connect().then(response => {
    //   console.log(response)
    // }).then(res => {
    //   console.log(res)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
    // console.log(isDeviceConnected)
   
    // // get the services only
    // const discoveredServices = await allServicesAndCharacteristics.services();
    // console.log(discoveredServices)
    // device.connect()
    // .then(async (devices) => {
    //   console.log(devices,"DEVICE")
    
      
        
    // })
    // .then(async(device_) => {
    //   console.log(device_,"EFEF")
    //     // setresponse({device_:device_})
    //     // const dsc = await device_.discoverAllServicesAndCharacteristics()
    //     // handleRead(dsc,device_);
    //     // setdata(device_)

    // // Do work on device with services and characteristics
    // })
    // .catch((error) => {
    //    console.log(error)
      
    //    // Handle errors
    // });
  }
  return(
    <TouchableOpacity
    style={{
      backgroundColor: 'white',
      marginBottom: 12,
      borderRadius: 16,
      shadowColor: 'rgba(60,64,67,0.3)',
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 4,
      padding: 12,
    }}
    // navigate to the Device Screen
    onPress={() => handleConnect()}>
    <Text>{`Id : ${device.id}`}</Text>
    <Text>{`Name : ${device.name}`}</Text>
    <Text>{`Is connected : ${isConnected}`}</Text>
    <Text>{`RSSI : ${device.rssi}`}</Text>
    {/* Decode the ble device manufacturer which is encoded with the base64 algorithm */}
    <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
    <Text>{`ServiceData : ${device.serviceData}`}</Text>
    <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
  </TouchableOpacity>
  );
 
}


const WeightScale = ({...props}) => {
    const [devices_ , setdevices_] = useState([]);
    const [data , setdata] = useState([]);
    const [response , setresponse] = useState([]);
    const [monitor , setmonitor] = useState([]);
    const [monitor2 , setmonitor2] = useState([]);
    const [monitore , setmonitore] = useState([]);
    const [monitor2e , setmonitor2e] = useState([]);
    const [scannedDevices, setscannedDevices] = useState([]);
   
    
    const handleConnection = async() => {
      let sd = [];
      manager.startDeviceScan(null, null, async (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }
  
        // if a device is detected add the device to the list by dispatching the action into the reducer
        // console.log(scannedDevice)
        if (scannedDevice) {
          if (scannedDevice && !scannedDevices.find((dev) => dev.id === scannedDevice.id)) {
            props.AddDevice(scannedDevice)
          }

          // const connectedDevice = await scannedDevice.connect();
          // console.log(connectedDevice)
        //  if(1){
        //   scannedDevice.connect()
        //   .then(async (devices) => {
        //     console.log(devices)
        //       // const dsc = await devices.discoverAllServicesAndCharacteristics()
        //       // handleRead(dsc,devices);
        //       // // handleMonitor(manager)
        //       // setdata({data:devices})
        //       // console.log(devices)
        //   })
        //   .then(async(device_) => {
        //     console.log(device_)
        //       // setresponse({device_:device_})
        //       // const dsc = await device_.discoverAllServicesAndCharacteristics()
        //       // handleRead(dsc,device_);
        //       // setdata(device_)

        //   // Do work on device with services and characteristics
        //   })
        //   .catch((error) => {
        //      console.log(error)
        //     //  setresponse({error:error})
        //      // Handle errors
        //   });
        //  }
          
        }
      });
  
      // stop scanning devices after 5 seconds
      setTimeout(() => {
        manager.stopDeviceScan();
      }, 5000);
    }


      const scanAndConnect = async() =>  {
         manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.log(error)
                return
            }
            setdevices_({devices:device})

            // if(device.name != ''){
                // manager.stopDeviceScan();
                device.connect()
                    .then(async (devices) => {
                      console.log(devices)
                        const dsc = await devices.discoverAllServicesAndCharacteristics()
                        handleRead(dsc,devices);
                        // handleMonitor(manager)
                        setdata({data:devices})
                        // console.log(devices)
                    })
                    .then(async(device_) => {
                        // setresponse({device_:device_})
                        // const dsc = await device_.discoverAllServicesAndCharacteristics()
                        // handleRead(dsc,device_);
                        // setdata(device_)

                    // Do work on device with services and characteristics
                    })
                    .catch((error) => {
                       console.log(error)
                       setresponse({error:error})
                       // Handle errors
                    });
            // }
            setTimeout(() => {
              manager.stopDeviceScan();
              setIsLoading(false);
            }, 5000);
        });
    }
    
    const handleRead = async(dsc,device) => {
        const services = await device.services();
        setresponse(services)
        handleMonitor(services)
        handleMonitor2(services,device)
        services.forEach(async service => {
        const characteristics = await device.characteristicsForService(service.uuid);
        characteristics.forEach(x => console.log());
        });
    }

    const handleMonitor = (service) => {
        console.log(service[0].deviceID.toString(),service[0].uuid.toString())
        var thisSubscription = manager.monitorCharacteristicForDevice(service[0].deviceID.toString(), service[0].uuid.toString(), service[0].uuid.toString(), (err, characteristic) => {
            // console.log('monitorCharacteristicForDevice fires once');
            if(err) {
              console.log('Err from pen', err);
              setmonitore(err)
            }
            console.log('data from pen: ', characteristic);
            setmonitor(characteristic);
            // let tagValue = utils.base64toHEX(characteristic.value)
            // console.warn('Tag data: ', tagValue);
          })
          console.log('thisSubscription', thisSubscription);
    }

    const handleMonitor2 = (service, device) => {
        var thisSubscription = manager.monitorCharacteristicForDevice(service[0].deviceID.toString(), device.serviceUUIDs.toString(), device.serviceUUIDs.toString(), (err, characteristic) => {
            // console.log('monitorCharacteristicForDevice fires once');
            if(err) {
              console.log('Err from pen', err);
              setmonitor2e(err)
            }
            console.log('data from pen: ', characteristic);
            setmonitor2(characteristic)
            // let tagValue = utils.base64toHEX(characteristic.value)
            // console.warn('Tag data: ', tagValue);
          })
          console.log('thisSubscription', thisSubscription);
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
            <TouchableOpacity 
                onPress={() => handleConnection()}
                style={{width,height:60,alignItems:'center',backgroundColor:colors[3],justifyContent:'center',marginBottom:20}}>
                    <Text>Press here</Text>
                </TouchableOpacity>
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={props.data}
                  renderItem={({ item }) => <DeviceCard device={item} />}
                  contentContainerStyle={_.content}
                />
            {/* <JSONTree data={devices_} />
            <JSONTree data={response} />
            <JSONTree data={data} />
            <JSONTree data={monitor} />
            <JSONTree data={monitor2} />
            <JSONTree data={monitore} />
            <JSONTree data={monitor2e} /> */}
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
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeightScale);