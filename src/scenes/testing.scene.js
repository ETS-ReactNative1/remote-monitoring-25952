import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

class Testing extends React.Component{
    constructor(props){
        super();
        this.manager = new BleManager()
    }

    componentWillMount() {
        console.log("mounted")
        // const subscription = this.manager.onStateChange((state) => {
        //     console.log(state)
        //     if (state === 'PoweredOn') {
        //         // this.scanAndConnect();
        //         // subscription.remove();
        //     }
        // }, true);
        this.scanAndConnect();
    }
    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
          this.info("Scanning...");
          console.log(device);
    
          if (error) {
            this.error(error.message);
            return
          }
          device.connect()
          .then((device) => {
            this.info("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics()
          })
          .then((device) => {
            // this.info(device.id);
            console.log(device)
            // device.writeCharacteristicWithResponseForService('12ab', '34cd', 'aGVsbG8gbWlzcyB0YXBweQ==')
            //   .then((characteristic) => {
            //     this.info(characteristic.value);
            //     return 
            //   })
          })
          .catch((error) => {
            this.error(error.message)
          })
        //   if (device.name ==='MyDevice') {
        //     this.info("Connecting to Tappy");
        //     this.manager.stopDeviceScan();
    
         
        //    }
       });
    }
    render(){
        return(
            <View>

            </View>
        );
    }
}

export default Testing;