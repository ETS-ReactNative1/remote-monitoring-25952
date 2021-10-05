import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text, Header} from './../components/index';
import { styles as _ } from '../styles';
import { width,colors } from '../utils/constant';
import { Icon } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { getSystemName } from 'react-native-device-info';

const Starter = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState('');
    useEffect(() => {
        handleLoad();
    },[]);

    const handleLoad = async() => {
        const viewMode = getParam('viewMode', 0);
     
        if(viewMode == 0){
            const loggedIn = await AsyncStorage.getItem('loggedIn');
            if(loggedIn == 'true'){
                props.navigation.navigate('Dashboard')
            }
        }
        const name = await AsyncStorage.getItem('name');
        getSystemName(name);
        setLoader(false);
       
    }
    if(loader) return  <View style={[_._locontainer, _._lohorizontal]}><ActivityIndicator animating={true} /></View>;
    return(
        <View style={[_.container,_.blackBg,_.relative,{paddingBottom:0}]}>
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
           sideBtn={true}
           navigation={props.navigation}
           />
           <View style={[_.elements,_.alignICenter,_.mt40,_.flexFull]}>
                
                <Text style={[_.textWhite,_.fs24,_.textCenter,_.mt20,{width:width-60}]}>Great! Your box is on its way. You will receive your kit within 3-7 days. Then we can get started!
</Text>
                {/* <Text style={[_.fs16,_.textCenter,_.para,{width:width-80},_.mt20]}>Here's how this program will work
Track: Healthy living choices and vitals that matter to your prevention plan.
Learn: Which advice matters and how to slowly make changes to get healthier.
Prevent: Work with your provider to prevent chronic illness before it starts.</Text> */}
                <TouchableOpacity 
                  onPress={() => props.navigation.navigate('Guide')}
                style={[_._lbtn,_.mt40]}>
                    <Text style={[_.textWhite,_.textCenter,_.fs18]}>Learn More</Text>
                </TouchableOpacity>
           </View>
           <View style={[_._lfooter,_._lfooterContent,_.row]}>
                <Text style={[_.textCenter,_.para,_.fs14]}>{name}</Text>
                <View style={_._liconContainer}>
                    <Icon
                        name="user"
                        type="feather"
                        size={12}
                        color={colors[4]}
                    />
                    {/* <Image
                    source={require('../assets/icons/user.png')}
                    style={_._lficon}
                    resizeMode='contain'
                    /> */}
                </View>
           </View>
        </View>       
    );
}

export default Starter;