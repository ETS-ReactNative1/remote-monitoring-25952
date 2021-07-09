import React, { useState } from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Text, Header} from './../components/index';
import { styles as _ } from '../styles';
import { width,colors, guide_,height } from '../utils/constant';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-looped-carousel';

const Guide = ({...props}) => {
    const [size, setSize] = useState({width, height:height-180});
    const renderContent =({item, index}) => {
        return(
           <View/>
        );
    }
    const _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        setSize( { width: layout.width, height: layout.height } )
      }
    return(
        <View style={[_.container,_.relative,_.blackBg]}>
           <Header
            />
            <ScrollView>
           <View style={[_.elements,_.alignICenter,_.mt40,_.flexFull]}>
              
               <TouchableOpacity 
                 onPress={() => props.navigation.navigate('Dashboard')}
               style={[_.row,_._lskipBtn,{width,justifyContent:'flex-end',marginRight:20}]}>
                    <Text style={[_.textWhite,_.fs20,{marginRight:5}]}>Skip</Text>
                    <Icon
                    name="angle-right"
                    type="font-awesome"
                    color={colors[0]}
                    size={26}
                    />
                </TouchableOpacity> 
                <Carousel
                 style={size}
                autoplay={false}
                bullets={true}
                isLooped={false}
                delay={1000}
        >
            {guide_.map((item,index) => {
                return(
                    <View style={[_.justifyCenter,_.alignICenter,{width,height:height - 220}]}>
                        <Image
                           source={require('../assets/icons/asterik.png')}
                           style={_._lmimg}
                           resizeMode='contain'
                        />
                    <Text style={[_.textWhite,_.textCenter,_.fs24,_.mt20,{width:width-100}]}>{item.head}</Text>
                    <View
                        style={[_.borderLine,_.mt20,{width:width-100}]}
                    />
                    <Text style={[_.textWhite,_.fs20,_.mt20,{width:width-100}]}>{item.para}</Text>
                     </View>
                );
            })}
       
        </Carousel>
               </View>

          </ScrollView>

         </View>       
    );
}

export default Guide;