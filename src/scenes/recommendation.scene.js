import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, TextInput, Switch, FlatList, Touchable, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, recommendationList, width } from '../utils/constant';
import { SafeAreaView } from 'react-navigation';


const Recommendation = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const scale2 = getParam('scale2',{});
    const scale3 = getParam('scale3',{});
    const id = getParam('id',0);
    const [field1, setfield1] = useState('');
    const [field2, setfield2] = useState('');
    const current_ = recommendationList.filter(x => x.id == scale1.id)[0];
    return(
        <View style={[_.container,_.blackBg,_.relative]}>
              {Platform.OS == 'ios' &&
            <SafeAreaView style={{backgroundColor:'white'}}>
            <StatusBar
          translucent
          barStyle="light-content"
        />
            </SafeAreaView>
            }
    
        <ScrollView>
            <View style={{paddingBottom:80}}>
            <Header2
        navigation={props.navigation}
        mode={1}
        /> 
        <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter]}>RECOMMENDATION</Text>
        <Text style={[_.mt30,_.textCenter,_.fs22,_.textWhite,{width:width/2+ 80},_.alignCenter]}>
        Since you want to {scale1.text}, here is our scientific recommendation that should improve your health
        </Text>
        <View style={[_._drcontainer,_.mt40]}>
        <Text style={[_.mt20,_.textLight,_.fs18,_.bold,_.textCenter,{marginTop:-10}]}>GOAL</Text>
        
        <View style={[_.row,_.mt20,_.justifyCenter,_.alignCenter]}>
            <Text style={[_.textWhite,{width:current_.dose.length > 3 ? width/6 : width/7,fontSize:current_.dose.length > 3 ? 20 : 35, textAlign:'center'},_.bold]}>{current_.dose}</Text>
            <View style={[_.column,_.flexFull,_.ml10]}>
                <Text style={[_.fs20,_.textWhite,_.bold]}>{current_.title}</Text>
                <Text style={[_.fs16,_.textWhite,_.bold]}>{current_.para}</Text>
            </View>
        </View>
        <Text style={[_.textLight,_.fs18,_.mt10]}>{current_.body}</Text>
        <View style={[_.row,_.mt20]}>
        <View style={[_.flexFull,_.row,_.alignICenter]}>
                <TextInput
                    placeholder="0"
                    style={_._drstextinput}
                    value={field1}
                    onChangeText={field1 => setfield1(field1)}
                    keyboardType='numeric'
                />
             <Text style={[_.textWhite,_.fs14,_.bold, _.ml10, {maxWidth:width/5}]} numberOfLines={2}>{current_.box[0]}</Text>
            </View>
            {current_.box.length > 1 &&
            <View style={[_.flexFull,_.row,_.alignICenter]}>
                <TextInput
                    placeholder="0"
                    style={_._drstextinput}
                    value={field2}
                    onChangeText={field2 => setfield2(field2)}
                    keyboardType='numeric'

                />
              <Text style={[_.textWhite,_.fs14,_.bold, _.ml10, {maxWidth:width/5}]} numberOfLines={2}>{current_.box[1]}</Text>
           
            </View>
            }
        </View>
        <View style={[_.row,_.textCenter,_.mt10,_.alignICenter,_.justifyCenter]}>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Motivation',{
                scale1,
                scale2,
                scale3,
                id,
                fields:`${field1},${field2}`,
                recommendationText:current_
            })
        }}
        style={[_._drbtn,{width:width/2+40}]}>
        <Text style={[_.textWhite,_.textCenter,{maxWidth:width/2+40}]}>COMMIT TO THIS GOAL</Text>    
        </TouchableOpacity>
      
        </View>
        </View>
      
        </View>
        </ScrollView>
        <BottomNavInner
       dots
       dotIndex={1}
       navigation={props.navigation}

      />
        </View>       
    );
}



export default Recommendation;