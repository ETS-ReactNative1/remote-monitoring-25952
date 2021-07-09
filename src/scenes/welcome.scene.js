import React from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Text, Header} from './../components/index';
import { styles as _ } from '../styles';

const Welcome = ({...props}) => {
    return(
        <View style={[_.container,_.blackBg]}>
           <Header/>
           <ScrollView>
           <View style={[_.elements,_.alignICenter,_.mt40,_.flexFull]}>
                <Image
                    source={require('../assets/icons/handshake.png')}
                    style={_._lmimg}
                    resizeMode='contain'
                />
                <Text style={[_.textWhite,_.fs24,_.textCenter,_._lwhead,_.mt20]}>Welcome to your provider coaching companion app</Text>
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
           </View>
                </ScrollView>
        </View>       
    );
}

export default Welcome;