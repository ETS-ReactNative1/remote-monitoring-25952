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

const dobInitial = {
    state:false,
    value: new Date(),
    visible:false
}

const Login = ({...props}) => {
    const [dobValidate, setdobValidate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dob, setDob] = useState(dobInitial);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
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

    const onChangeDob = (value) => {
        let dob_ = {
            state:true,
            value:value,
            visible:false
        }
        setdobValidate(false);
        setDob(dob_);
    }

    const handleSubmit = (values) => {
        const {name, lastname, email} = values;
        const {navigation} = props;
        setLoading(true);
        axios.post(`${url}signup/`, {
            first_name:name,
            last_name:lastname,
            email:email,
            device_id:getUniqueId(),
            DOB:moment(dob.value).format('YYYY-MM-DD')
        }, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken':`3bsBVgmFfZZs4aQ6Hb7lhmmkjSLzy7PHhVl0r4tMbrl2n2rp5NYwO1pRqHdjOpiJ`,
            }
        })
            .then(response => {
                const data = response.data;
             
                setLoading(false);
                navigation.navigate('Register',{
                    data
                })
            }).catch(error => {

                setLoading(false);
                Alert.alert('Something went wrong.');
                console.log(error)
            })
    }

    const handleDobValidate = () => {
        // alert('asds')
        if(!dob.state){
            setdobValidate(true);
        }
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
               <Header/>
              
               <KeyboardAvoidingView
                behavior='padding' keyboardVerticalOffset={ Platform.OS === 'ios' ? 40 : -280}
               >
                   <ScrollView>
                       <View style={_.blackBg}>
               <View style={[_.elements,_.alignICenter,_.flexFull,_.mt40]}>
                 <Text style={[_.fs30,_.textCenter,_.textWhite]}>Log In</Text>
                 <Formik
                validationSchema={loginValidationSchema}
                enableReinitialize
                initialValues={{
                  name:'',
                  lastname:'',
                  email:'',
                  dob:''
                }}
                onSubmit={values => handleSubmit(values)}>
                   {({
                      handleChange,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                    }) => (
                 <View style={_.mt20}>
                    <Input
                        placeholder="Enter Your Name"
                        value={values.name}
                        eStyles={{borderColor: (errors.name && touched.name) ? 'red' : '#fff'}}
                        onChangeText={handleChange('name')}
                        label="Name"
                    />
                     <Input
                        placeholder="Enter Your Last Name"
                        value={values.lastname}
                        onChangeText={handleChange('lastname')}
                        eStyles={{borderColor: (errors.lastname && touched.lastname) ? 'red' : '#fff'}}
                        label="Last Name"
                    />
                     <Input
                        placeholder="Enter Your Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        eStyles={{borderColor: (errors.email && touched.email) ? 'red' : '#fff'}}
                        label="Email"
                        keyboardType={'email-address'}
                    />
                    <Text style={[_.para,_.mt20]}>Date of Birth</Text>
                    <TouchableOpacity 
                    onPress={() => setDob({...dob,visible:true})}
                    style={[_.mt5,_._linput,_.justifyCenter,_.relative,{borderColor:(dobValidate) ? 'red' : 'white'}]}>
                        <Text style={[_.para,{color:!dob.state ? colors[2] : colors[0]}]}>{!dob.state ? 'Choose the Date' : moment(dob.value).format('DD-MMM-YYYY')}</Text>
                        <View style={_._labsIcon}>
                            <Icon
                                type="font-awesome"
                                color={colors[3]}
                                size={16}
                                name="calendar"
                            />
                        </View>
                    </TouchableOpacity>
                    {!keyboardStatus &&
                 <TouchableOpacity 
                  onPress={() => handleSubmit() || handleDobValidate()}
                // onPress={() => props.navigation.navigate('Register',{data:{a:'red'}})}
                 style={[_._lbtn,_.mt20,{width:width-40}]}>
                        <Text style={[_.textWhite,_.textCenter,_.fs18]}>Starter Kit</Text>
                    </TouchableOpacity>
                    }
                 </View>
               )}
    
               </Formik>
               </View>
               </View>
                   </ScrollView>
               </KeyboardAvoidingView>
              
               <DateTimePickerModal
                    isVisible={dob.visible}
                    mode={'date'}
                    onConfirm={value => onChangeDob(value)}
                    onCancel={() => setDob({...dob,visible:false})}
                    />
            </View>       
        );
    }
    
   
}

export default Login;