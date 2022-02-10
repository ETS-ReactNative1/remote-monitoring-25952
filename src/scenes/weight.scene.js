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
    const [labels, setlabels] = useState(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
    const wei = props.navigation.getParam('weight',0);
    useEffect(() => {
      
      handleData();
      
    },[]);

    //When there is no data on any of the date It will add 0 
    //Add information on every point

    const getDates = () => {
      // var datesObj = [];
      const start = moment().startOf('week');
      const end = moment().endOf('week')
      var datesObj = [moment().startOf('week').subtract(1,'days').format('DD-MMM')];
      // console.log(,'ss')
      for(var i = 0; i< 6; i++){
        datesObj.push(moment(moment().startOf('week')).add(i, 'days').format('DD-MMM'))
      } 
      return datesObj;
    }

    const handleData= async ()=> {
      var uArr = [];
      const dates = getDates();
      console.log(dates);
      var labels_ = [];
      if(wei){
        var wDays = [parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei),parseFloat(wei)];
         const _weight = await GETJSON('weight/');
        // const _weight = {
        //   data:[
        //     {weight:200, timestamp:'2022-02-11'},
        //     {weight:0, timestamp:'2022-02-02'},
        //     {weight:60, timestamp:'2022-01-30'},
        //     {weight:60, timestamp:'2022-01-31'},
        //     {weight:100, timestamp:'2022-02-05'},
        //     {weight:150, timestamp:'2022-02-06'},
        //     {weight:160, timestamp:'2022-02-07'},
        //     {weight:170, timestamp:'2022-02-08'},
        //   ]
        // }
        var a = 0;
        // console.log(_weight.data)
        // console.log(_weight.data.sort((a,b) => Date.parse(b) - Date.parse(a)))
        dates.map((item,index) => {
          const dateA = _weight.data.find(x => moment(x.timestamp).format('DD-MMM') === item)
          if(dateA){
            wDays[a] = parseInt(dateA.weight);
          }else{
            wDays[a] = parseInt(0);
          }
          a++;
        })

        // _weight.data.sort(function (a, b) {
        //   var dateA = new Date(a.date_prop).getTime();
        //   var dateB = new Date(b.date_prop).getTime();
        //   return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
        // }).map((item,index) => {
        //   if(dates.includes(moment(item.timestamp).format('DD-MMM'))){
        //     console.log('asddas')
        //     if((moment(item.timestamp).diff(moment().subtract(1,'w')) > 0) && uArr.length <= 6 && !uArr.includes(moment(item.timestamp).format('DD-MM-YYYY'))){
        //       uArr.push(moment(item.timestamp).format('DD-MM-YYYY'));
        //       wDays[a] = parseInt(item.weight);
        //     }else{
        //       wDays[a] = parseInt(400);
        //     }
        //     a++;
        //   }
         
        
        // });
       
        // var wDays_ = wDays;
        // wDays_.map(item => {
        //   if(item.)
        // })
        console.log(wDays)
        setweightScale(wDays);
      }
      setlabels(dates);
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
      labels: labels,
      datasets: [
        {
          data: weightScale
        }
      ]
    }}
    width={width} // from react-native
    height={220}
    barRadius={0}
    withDots
    bezier
    horizontalLabelRotation={0}
    chartConfig={{
      backgroundColor: colors[0],
      backgroundGradientFrom: colors[0],
      strokeWidth:1,
      backgroundGradientTo: colors[0],
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      
      style: {
        borderRadius: 0
      },
      propsForDots: {
        r: "4",
        strokeWidth: "1",
        stroke: "#77b68b"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      
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