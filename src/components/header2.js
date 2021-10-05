import moment from 'moment';
import React from 'react';
import {View, Image, StyleSheet, AsyncStorage, TouchableOpacity, StatusBar, Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const Header2 = ({...props}) => {
    const {backBtn = false,onBack,sideBtn = false, navigation, logout, menu, mode = 0} = props;

    

    return(
        <View style={[s.container,{height:mode == 0 ? height/10 : height/10 + 30}]}>
            <View style={[_.flexFull,_.row,{height:height/10,marginTop:-10},_.alignICenter,_.justifyCenter]}>
            {backBtn &&
            <TouchableOpacity 
            onPress={onBack}
            style={[{alignItems:'flex-start',marginLeft:10}]}>
                <Icon
                    name="arrow-left"
                    color={colors[1]}
                    type="feather"
                    size={26}
                />
            </TouchableOpacity>
            }
            <View style={[_.flexFull,_.alignICenter,_.justifyCenter]}>
                <Image
                    source={require(`../assets/icons/logo.png`)}
                    style={[s.logo]}
                    resizeMode='contain'
                 />
            </View>
            {menu &&
            <View style={[{alignItems:'flex-end',marginRight:10}]}>
                <Icon
                    name="bars"
                    color={colors[1]}
                    type="font-awesome"
                    size={24}
                />
            </View>
            }
            {mode == 1 &&
           <View style={s.datedContainer}>
                <Icon name='calendar' type="font-awesome" size={14} color={colors[0]} />
                <Text style={[_.textWhite,_.ml10,{marginTop:2}]}>{moment().format('MM/DD/YY')}</Text>
            </View>
            }
              {mode == 2 &&
           <View style={s.dtwdcontainer}>
               <View style={[{backgroundColor:colors[5],height:60,padding:20},_.flexFull,_.row,]}> 
                <Text style={[_.textLight,_.flexFull]}>Natalie Hodga, MD</Text>
                <View style={{marginTop:-4}}>
                <Icon name='angle-down' type="font-awesome" size={24} color={colors[3]} />
                </View>
               
                </View>
                <View style={[_.row,_.alignICenter,{width:100,marginLeft:20}]}>
                <Text style={[_.textWhite,{marginTop:2,color:'gold',marginRight:10}]}>{moment().format('M/DD/YY')}</Text>
                <Icon name='calendar' type="font-awesome" size={14} color={'gold'} />
                </View>
            </View>
            }
            </View>
            
             </View>       
        
    );
}

const s = StyleSheet.create({
    container:{
        flexDirection:'row',
        width,
        height:height/10 + 30,
        backgroundColor:colors[0],
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20
    },
    logo:{
        width:140,
        alignSelf:'center'
    },
    datedContainer:{
        height:40,
        backgroundColor:colors[6],
        width,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:10,
        position:'absolute',
        top:50,
    },
    dtwdcontainer:{
        height:60,
        backgroundColor:'#000',
        width,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:10,position:'absolute',
        top:50,
    }
});

export default Header2;