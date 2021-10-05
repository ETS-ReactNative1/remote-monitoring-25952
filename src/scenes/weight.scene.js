import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, height, width } from '../utils/constant';
import ActivityRings from "react-native-activity-rings";  
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import LinearProgress from 'react-native-elements/dist/linearProgress/LinearProgress';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';
import { GETJSON } from '../utils/api';
import moment from 'moment';


const defaultWeight =[
  0 * 100,
  0 * 100,
  0 * 100,
  0 * 100,
  0 * 100,
  0 * 100,
  0 * 100
]


const Weight = ({...props}) => {
    const [weightScale, setweightScale] = useState(defaultWeight);
    const wei = props.navigation.getParam('weight',0);
    useEffect(() => {
      handleData();
    },[]);

    const handleData= async ()=> {
      var uArr = [];
      if(wei){
        var wDays = [parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei)];
        const _weight = await GETJSON('weight/');
        const asset = _weight.data.map((item,index) => {
          // console.log(moment(item.timestamp).day(),'asdads')
          if(!uArr.includes(moment(item.timestamp).format('DD-MM-YYYY')) && uArr.length <= 6){
            uArr.push(moment(item.timestamp).format('DD-MM-YYYY'));
            wDays[moment(item.timestamp).day()] = parseInt(item.weight);
            
          }
          // if(index < 7){
          //   wDays[moment(item.timestamp).day()] = parseInt(item.weight);
          // }
        });
        setweightScale(wDays);
      }
     
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
        <Text style={[_.textCenter,_.textWhite,_.fs16,_.mt20]}>WEIGHT</Text>
        <View style={[_.row,_.alignCenter,_.mt30,{width:width-100}]}>
        <View style={[_.column,_.flexFull,_.alignICenter]}>
                <Text style={_.textWhite}>CURRENT</Text>
                <Text style={[_.textWhite,_.fs24]}>{wei == undefined ? 0 : wei} <Text style={[_.textWhite,_.fs14]}>lbs</Text></Text>
            </View>
            {/* <View style={[_.column,_.flexFull]}>
            <Image
                source={require('./../assets/icons/weight_switch.png')}
                style={{width:30,heigth:30,alignSelf:"center",marginTop:10}}
                resizeMode='contain'
            />
            </View>
           
            <View style={[_.column,_.flexFull,_.alignICenter]}>
                <Text style={_.textWhite}>TARGET</Text>
                <Text style={[_.textWhite,_.fs24]}>164 <Text style={[_.textWhite,_.fs14]}>lbs</Text></Text>
            </View> */}
        </View>
        <View style={[_.mt40,{backgroundColor:colors[0],height:height/2 - 50}]}>
            <View style={[_.mt20, _.mb10,_.row,{width:width-40,alignSelf:'center'}]}>
            <Text style={[_.textBlack, _.fs22,{fontWeight:'bold'}]}>My progress</Text>
            
            </View>
        <LineChart
    data={{
      labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      datasets: [
        {
          data: weightScale
        }
      ]
    }}
    width={width} // from react-native
    height={220}
    withVerticalLines={false}
    withHorizontalLines={false}
    horizontalLabelRotation={0}
    chartConfig={{
      backgroundColor: colors[0],
      backgroundGradientFrom: colors[0],
      backgroundGradientTo: colors[0],
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 0
      },
      propsForDots: {
        r: "0",
        strokeWidth: "0",
        stroke: "#77b68b"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
    

         </View>
        </ScrollView>
     
        <BottomNav
            navigation={props.navigation}
            eventFired={() => console.log('Event Fired')}

        />
        </View>       
    );
}



export default Weight;