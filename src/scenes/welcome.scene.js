import React from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Text, Header} from './../components/index';
import { styles as _ } from '../styles';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { colors } from 'react-native-elements';
import { StatusBar } from 'react-native';

const Welcome = ({...props}) => {
    const {navigation} = props;
    return(
        <View style={[_.container,_.blackBg]}>
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
           <Header/>
           <ScrollView>
           <View style={[_.elements,_.alignICenter,_.mt40,_.flexFull]}>
                <Image
                    source={require('../assets/icons/handshake.png')}
                    style={_._lmimg}
                    resizeMode='contain'
                />
                <Text style={[_.textWhite,_.fs24,_.textCenter,_._lwhead,_.mt20]}>Welcome to Your Prevention Remote Monitoring App!</Text>
                <Text style={[_.fs16,_.para,_._lwpara,_.mt10,_.textCenter]}>
                Track: Healthy living choices and vitals that matter to your prevention plan.
                </Text>
                <Text style={[_.fs16,_.para,_._lwpara,_.mt10,_.textCenter]}>
                Learn: Which advice matters and how to slowly make changes to get healthier.
                </Text>
                <Text style={[_.fs16,_.para,_._lwpara,_.mt10,_.textCenter]}>
                Prevent: Work with your provider to prevent chronic illness before it starts.
                </Text>
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('Login')}
                style={[_._lbtn,_.mt40]}>
                    <Text style={[_.textWhite,_.textCenter,_.fs18]}>Get Started</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                onPress={() => navigation.navigate('UserLogin')}
                >
                    <Text style={[_.textWhite,_.mt20]}>Sign in into account?</Text>
                </TouchableOpacity> */}
           </View>
                </ScrollView>
        </View>       
    );
}

export default Welcome;