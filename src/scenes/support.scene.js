import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList} from 'react-native';
import {Text, Header, BottomNav} from './../components/index';
import { styles as _ } from '../styles';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';
import {GETJSON} from './../utils/api';
import { Beacon } from 'react-native-help-scout'
// import HelpscoutBeacon from 'react-native-helpscout-beacon';

const Support = ({...props}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        handleData();
        Beacon.init('3da06e34-e05b-494a-a630-607697d8af30');
       
        // Open Beacon
        // Beacon.open()
        
        // // Set user information in Beacon
        // Beacon.identify({
        //     email: 'usama.shahid@crowdbotics.com',
        //     name: 'Usama Shahid',
        //     company: 'Crowdbotics',
        //     jobTitle: 'React Native Developer',
        // })
        // // Beacon.openArticle('26-thepreventscriptsplate')
        // Beacon.contactForm()
    },[]);
    
    const handleData = async() => {
        const userId  = await AsyncStorage.getItem('userId');
        try{
            const getUser = await GETJSON(`users/${userId}/`);
            console.log(getUser.data,"GET")
            Beacon.identify({
                email: getUser.data.email,
                name: getUser.data.name,
                company: 'Crowdbotics',
                jobTitle: 'Prevent Script',
            });
        }catch(error){
            console.log(error)
        }
    }

    const handleArticle = () => {
        Beacon.open();
    }

    const handleContact = () => {
        
        Beacon.contactForm()
    }

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
        navigation={props.navigation}
        />
        
       
        <ScrollView>
            <View style={{paddingBottom:80}}>
            <TouchableOpacity
            onPress={() => handleArticle()}
            style={_._dlist}>
                <Text style={[_.textWhite,_.fs20]}>Open Article</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => handleContact()}
            style={_._dlist}>
                <Text style={[_.textWhite,_.fs20]}>Open Contact Form</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
     
        <BottomNav
            navigation={props.navigation}
            eventFired={() => console.log('Event Fired')}
        />
        </View>       
    );
}



export default Support;