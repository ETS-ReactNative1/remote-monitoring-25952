import React, { useState, useEffect } from 'react';
import {View, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView,AsyncStorage, Platform, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import {Text, Header, Input} from './../components/index';
import { styles as _ } from '../styles';
import { Formik } from 'formik'
import { colors, url, width } from '../utils/constant';
import { loginValidationSchema_ } from '../utils/validation';
import axios from 'axios';


const Register = ({...props}) => {
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [loading, setLoading] = useState(false);
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
      const handleSubmit = (values)=>{
        const {address, city, zipcode} = values;
        const {navigation} = props;
        const data = navigation.getParam('data');
        setLoading(true);
        const user = data.user;
        axios.put(`${url}signup/${user.id}/address_details/`, {
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            device_id:user.device_id,
            DOB:user.DOB,
            address:address,
            city:city,
            zipcode:zipcode
        }, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken':`3bsBVgmFfZZs4aQ6Hb7lhmmkjSLzy7PHhVl0r4tMbrl2n2rp5NYwO1pRqHdjOpiJ`,
            }
        })
            .then(response => {
                console.log(response)
                AsyncStorage.setItem('token',data.token);
                setLoading(false);
                navigation.navigate('AuthLoader')
            }).catch(error => {
                setLoading(false);
                Alert.alert('Something went wrong.');
                console.log(error,)
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
           <Header
           backBtn={true}
           back_={true}
           sideBtn={true}
           navigation={props.navigation}
           />
           <KeyboardAvoidingView
            behavior='padding' keyboardVerticalOffset={ Platform.OS === 'ios' ? 40 : -250}
           >
               <ScrollView>
                   <View style={_.blackBg}>
               <View style={[_.elements,_.alignICenter,_.flexFull,_.mt20]}>
             <Text style={[_.fs24,_.textCenter,_.textWhite,{maxWidth:width-80}]}>Congratulations! Welcome to the Provider Coaching Program.</Text>
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
          {!keyboardStatus &&
            <TouchableOpacity 
             onPress={() => handleSubmit()}
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