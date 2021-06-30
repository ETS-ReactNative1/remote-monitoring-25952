import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text, Header} from './../components/index';
import { styles as _ } from '../styles';
import { width,colors } from '../utils/constant';
import { Icon } from 'react-native-elements';

const Starter = ({...props}) => {
    return(
        <View style={[_.container,_.blackBg,_.relative]}>
           <Header
           backBtn={true}
           sideBtn={true}
           />
           <View style={[_.elements,_.alignICenter,_.mt40,_.flexFull]}>
                
                <Text style={[_.textWhite,_.fs24,_.textCenter,_.mt20,{width:width-60}]}>Great! Your box is on its way. You will receive your kit within 3-7 days. Then we can get started!
Here's how this program will work</Text>
                <Text style={[_.fs16,_.textCenter,_.para,{width:width-80},_.mt20]}>When you are with your provider for a coaching visit, you will pull this app up and click "start visit" to walk through the questions along with your provider. You can then go back and look at the decisions you made together under the "My Plans" tab.</Text>
                <TouchableOpacity 
                  onPress={() => props.navigation.navigate('Guide')}
                style={[_._lbtn,_.mt40]}>
                    <Text style={[_.textWhite,_.textCenter,_.fs18]}>Learn More</Text>
                </TouchableOpacity>
           </View>
           <View style={[_._lfooter,_._lfooterContent,_.row]}>
                <Text style={[_.textCenter,_.para,_.fs14]}>ANDREW</Text>
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