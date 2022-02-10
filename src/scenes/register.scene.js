import React, { useState, useEffect } from 'react';
import {View, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView,AsyncStorage, Platform, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import {Text, Header, Input} from './../components/index';
import { styles as _ } from '../styles';
import { Formik } from 'formik'
import { colors, url, url2, width } from '../utils/constant';
import { loginValidationSchema_ } from '../utils/validation';
import axios from 'axios';
import { GETJSON, POSTJSON } from '../utils/api';
import { getDevice, getModel, getSystemName ,getSystemVersion } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';

const Register = ({...props}) => {
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fcmToken, setfcmToken] = useState('');
    console.disableYellowBox = true;

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);

      useEffect(async() => {
        handleNotification();
        console.log(props.navigation.getParam('data'))
      },[]);

    const handleNotification = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            getToken();
        } else {
            requestPermission();
        }
        // this.createNotificationListeners();
    }
    
   const getToken = async () => {
      let fcmToken_ = await messaging().getToken();
            // console.log(fcmToken)
            if (fcmToken_) {
                AsyncStorage.setItem('fcmToken', fcmToken_);
                setfcmToken(fcmToken_);
            }
    };
    
   const requestPermission = async () => {
        try {
            await messaging().requestPermission();
            getToken();
        } catch (error) {
            alert('permission rejected');
        }
    };
    
      const _keyboardDidShow = () => setKeyboardStatus(true);
      const _keyboardDidHide = () => setKeyboardStatus(false);
      const handleSubmit = async(values)=>{
        
        const {address, city, zipcode, state} = values;
        const {navigation} = props;
        const data = navigation.getParam('data');
        // setLoading(true);
        const user = data.user;
        
     
        axios.put(`${url2}signup/${user.id}/address_details/`, {
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            device_id:user.device_id,
            DOB:user.DOB,
            address:address,
            city:city,
            zip_code:zipcode
        }, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken':`3bsBVgmFfZZs4aQ6Hb7lhmmkjSLzy7PHhVl0r4tMbrl2n2rp5NYwO1pRqHdjOpiJ`,
            }
        })
            .then(async response => {
                AsyncStorage.setItem('token',data.token);
                AsyncStorage.setItem('userId',data.user.id.toString());
                AsyncStorage.setItem('name',`${user.first_name} ${user.last_name}`);
                setLoading(false);
                try{
                    const hui_ = await POSTJSON({state:state},'user-state/',data.token, 0);
                    const hui =  await handleUserInfo(data.token);
                    console.log(hui,"SDDSA")
                }catch(error) {
                    console.log(error);
                }
             
                navigation.navigate('AuthLoader')
            }).catch(error => {
                setLoading(false);
                Alert.alert('Something went wrong.');
                console.log(error,)
            })        
    }

    const handleUserInfo = async (token) => new Promise(async(resolve,reject) => {
        const dataset = {
            operating_system:getSystemName() ? getSystemName() : 'none',
            browser_version:getSystemVersion() ?  getSystemVersion() : 'none',
            device:getModel() ? getModel() : 'none',
            fcm:fcmToken ? fcmToken : 'none'
        }
        console.log(dataset)
        try{
            const res = await POSTJSON(dataset,'user-information/'
            ,token,0);
            resolve(res);
        }catch(error){
            reject(error)
            console.log(error.response)
        }
    }) 


    if(loading){
        return (
            <View style={[_._locontainer, _._lohorizontal]}>
            <ActivityIndicator animating={true} color={'white'} />
           </View>
        )
    }else{
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
           backBtn={true}
           back_={true}
           sideBtn={true}
           navigation={props.navigation}
           />
           <KeyboardAvoidingView
            behavior='padding' keyboardVerticalOffset={ Platform.OS === 'ios' ? 40 : -280}
           >
               <ScrollView>
                   <View style={_.blackBg}>
               <View style={[_.elements,_.alignICenter,_.flexFull,_.mt20]}>
             <Text style={[_.fs24,_.textCenter,_.textWhite,{maxWidth:width-80}]}>Congratulations! Welcome to the Prevention Remote Monitoring Program.</Text>
             <Text style={[_.para,_.mt20,_._lwpara,_.fs16,_.textCenter,{maxWidth:width-60}]}>We will work very closely with your provider to help you reduce your risk for chronic illness.
                We will send you a PreventScripts Starter Kit ASAP in the mail. Please let us know your address below.</Text>
                <Formik
            validationSchema={loginValidationSchema_}
            enableReinitialize
            initialValues={{
              address:'',
              city:'',
              zipcode:''
            }}
            onSubmit={values => handleSubmit(values)}>
               {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
             <View style={_.mt10}>
                <Input
                    placeholder="Enter Your Street Address"
                    value={values.address}
                    eStyles={{borderColor: (errors.address && touched.address) ? 'red' : '#fff'}}
                    onChangeText={handleChange('address')}
                    label="Street Address"
                />
                 <Input
                    placeholder="Enter Your City"
                    value={values.city}
                    eStyles={{borderColor: (errors.city && touched.city) ? 'red' : '#fff'}}
                    onChangeText={handleChange('city')}
                    label="City"
                />
               <View style={_._lreinput}>
               <Input
                    placeholder="Enter Your Zip Code"
                    value={values.zipcode}
                    eStyles={{borderColor: (errors.zipcode && touched.zipcode) ? 'red' : '#fff'}}
                    onChangeText={handleChange('zipcode')}
                    label="Zip Code"
                />
                  <View style={[_._labsIcon,{top:60}]}>
                        <Icon
                            type="font-awesome"
                            color={colors[3]}
                            size={16}
                            name="calendar"
                        />
                    </View>
               </View>
               <Input
                    placeholder="Enter Your State"
                    value={values.state}
                    eStyles={{borderColor: (errors.city && touched.city) ? 'red' : '#fff'}}
                    onChangeText={handleChange('state')}
                    label="State"
                />
          {!keyboardStatus &&
            <TouchableOpacity 
              onPress={() => handleSubmit()}
            //    onPress={() => props.navigation.navigate('Dashboard',{data:{a:'red'}})}
            style={[_._lbtn,_.mt20,{width:width-40}]}>
                   <Text style={[_.textWhite,_.textCenter,_.fs18]}>Submit</Text>
               </TouchableOpacity>
               }
            </View>
          )}

          </Formik>
           </View>
           </View>
               </ScrollView>
           </KeyboardAvoidingView>
        
        </View>       
    );
            }
}

export default Register;