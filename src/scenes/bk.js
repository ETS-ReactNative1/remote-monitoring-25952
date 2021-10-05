
    // services.forEach(async service => {
    // const characteristics = await device.characteristicsForService(service.uuid);
    // characteristics.forEach(x => console.log());
    // console.log(characteristics)
    // });

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




      // console.log(device.id,'DEV', service.uuid,"SER", c[0].uuid,"UISS","DAD")


       // manager.monitorCharacteristicForDevice(device.id, service.uuid, c[1].uuid, (error, charact) => {
      //   console.log(error,"ERR")
      //   console.log(charact,"CAJHSD")
      // })
      // service.characteristic().then(response => {
      //   console.log(response)
      // }).catch(error =>{
      //   console.log(error)
      // })
      console.log(service)
    
  
    // let sc = [];
    // serChar_.forEach(async (characteristic) => {
    //   const setdes_ = await characteristic.descriptors();
    //   sc.push(setdes_);
    // });
    // setdes_(sc);
    // setChar(serChar_);




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
 