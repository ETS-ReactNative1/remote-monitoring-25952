import React, { useState, useEffect } from 'react';
import {View, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView, Platform, AsyncStorage,Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ActivityIndicator} from 'react-native-paper';
import { getUniqueId } from 'react-native-device-info';
import { Formik } from 'formik'
import {Text, Header, Input} from './../components/index';
import { styles as _ } from '../styles';
import moment from 'moment';
import { colors, url, width } from '../utils/constant';
import { loginValidationSchema } from '../utils/validation';
import { POSTJSON } from './../utils/api';
import axios from 'axios';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';

const UserLogin = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    
      const _keyboardDidShow = () => setKeyboardStatus(true);
      const _keyboardDidHide = () => setKeyboardStatus(false);

      const handleSubmit = (values) => {
        const {navigation} = props;
        setLoading(true);
        axios.post(`${url}login/`, {
            email,
            password
        }, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken':`3bsBVgmFfZZs4aQ6Hb7lhmmkjSLzy7PHhVl0r4tMbrl2n2rp5NYwO1pRqHdjOpiJ`,
            }
        })
            .then(response => {
              AsyncStorage.setItem('token',data.token);
              AsyncStorage.setItem('userId',data.user.id.toString());
              setLoading(false);
            
              navigation.navigate('AuthLoader')
            }).catch(error => {

                setLoading(false);
                Alert.alert('Something went wrong.');
                console.log(error)
            })
    }

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
               backBtn
               navigation={props.navigation}
               />
              
               <KeyboardAvoidingView
                behavior='padding' keyboardVerticalOffset={ Platform.OS === 'ios' ? 40 : -280}
               >
                   <ScrollView>
                       <View style={_.blackBg}>
               <View style={[_.elements,_.alignICenter,_.flexFull,_.mt40]}>
                 <Text style={[_.fs30,_.textCenter,_.textWhite]}>Log In</Text>
                
                 <View style={_.mt20}>
                   
                     <Input
                        placeholder="Enter Your Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        label="Email"
                        keyboardType={'email-address'}
                    />
                     <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={password => setEmail(password)}
                        label="Password"
                        secureEntryType={true}
                    />
                    {!keyboardStatus &&
                 <TouchableOpacity 
                 disabled={email == '' || password == ''}
                 style={[_._lbtn,_.mt20,{width:width-40}]}>
                        <Text style={[_.textWhite,_.textCenter,_.fs18]}>Sign In</Text>
                    </TouchableOpacity>
                    }
                 </View>
            
               </View>
               </View>
                   </ScrollView>
               </KeyboardAvoidingView>
             
            </View>       
        );
    }
    
   
}

export default UserLogin;