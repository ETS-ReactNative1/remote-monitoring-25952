import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header2, BottomNav, BPDialog, WGDialog, BottomNavInner, BottomNavInner2} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, width, pbsData } from '../utils/constant';
import { SafeAreaView } from 'react-navigation';


const ProblemSolving = ({...props}) => {
    const {navigation} = props;
    const {getParam} = navigation;
    const scale1 = getParam('scale1',{});
    const scale2 = getParam('scale2',{});
    const scale3 = getParam('scale3',{});
    const motivation = getParam('motivation','');
    const fields = getParam('fields','');
    const id = getParam('id',0);
    const recommendationText = getParam('recommendationText','');

    const [selectedField,setSelectedField] = useState([]);
    const [selIndex, setselIndex] = useState(-1);
    const [choice, setChoice] = useState(-1);
    // console.log(pbsData.filter(x => x.key == 'EAT_LESS_RED_PROCESSED_AND_FATTY_MEATS'))
    const handleTranslate = (value) => {
        switch(value){
            case 1:
                return 'One';
            case 2:
                return 'Two';
            case 3:
                return 'Three';
            case 4:
                return 'Four';
            case 5:
                return 'Five';
        }
    }


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
        mode={2}
        />
        <Text style={[_.mt40,_.textLight,_.fs14,_.bold,_.textCenter,{marginTop:60}]}>PROBLEM SOLVING
        </Text>
        <Text style={[_.mt20,_.textCenter,_.fs20,_.textWhite,{width:width- 120},_.alignCenter]}>
        Brainstorm with your provider ways to eat more fruit.
        </Text>
        <View style={_.mt20}/>
        {
            pbsData.filter(x => x.key == scale1.value)[0].list.map((item,index) => {
                return(
                <TouchableOpacity 
                onPress={() => {
                    setSelectedField(`Option ${handleTranslate(index+1)}`);
                    setselIndex(index);
                    setChoice(item.body)
                }}
                style={[_._dpslistcontainer,_.row,_.alignICenter]} key={index}>
                    <View style={[_._dpslistincon,{borderColor:selIndex == index ? colors[4] :colors[0],backgroundColor:selIndex == index ? colors[4] : 'transparent' }]}>
                        <Icon type="font-awesome" color={selIndex == index ? colors[0] : 'transparent'} size={16} name="circle" />
                    </View>
                    <View style={[_.column,_.flexFull,_.ml20]}>
                    <Text style={[_.bold, _.fs18,_.textWhite]}>Option {handleTranslate(index+1)}</Text>
                    <View style={[_.row,_.mt10]}>
                    <Text style={[_.textWhite,_.fs14,_.bold]} >{item.title}.
                    <Text style={[_.textLight,_.fs14,{fontWeight:'normal'}]}>&nbsp;{item.body}.</Text>
                    </Text>
                    
                  
                    </View>
                    </View>
                   
                </TouchableOpacity>
                );
            })
        }
          {/* <TouchableOpacity style={[_._dhbtn,_.mt40]}
              onPress={() => {
                navigation.navigate('Summary',{
                    scale1,
                    scale2,
                    scale3,
                    motivation,
                    problemSolving: selectedField,
                    id
                })
            }}
        >
            <Text style={_._dhbtext}>Got 'EM</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
             onPress={() => {
                navigation.navigate('Summary',{
                    scale1,
                    scale2,
                    scale3,
                    motivation,
                    problemSolving: selectedField,
                    id,fields,
                    recommendationText,
                    problemString:choice
                })
            }}
       style={[_._dmbtn,_.column,_.alignICenter,_.alignCenter,_.justifyCenter,{marginTop:40}]}>
            <Text style={[_.bold,_.textWhite,_.fs16]}>Got 'EM</Text>
           
       </TouchableOpacity>
        </View>
       </ScrollView>
       <BottomNavInner2
       dots
       dotIndex={3}
       navigation={props.navigation}

      />
        </View>       
    );
}



export default ProblemSolving;