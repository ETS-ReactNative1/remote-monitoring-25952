import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList, RefreshControl, Platform, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from './../components/index';
import { styles as _ } from '../styles';
import { ActivityIndicator } from 'react-native-paper';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { barrierList, boxIcon, colors, dropIcon, fruitIcon, goalsList, mobileIcon, motivationsList, url, vegetableIcon } from '../utils/constant';
import { POSTJSON,GETJSON, DELETEJSON } from '../utils/api';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import axios from 'axios';




const MyPlans = ({...props}) => {
    
    const [plans, setPlans] = useState([]);
    const [loader, setLoader] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [selectedId, setselectedId]  =useState(-1);

    useEffect(() => {
        handleGetCounseling();
    },[]);


    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userId');
        props.navigation.navigate('AuthLoader');
    }


    const handleGetCounseling = async() => {
        const userId = await AsyncStorage.getItem('userId');
        setLoader(true);
        GETJSON(`users/${userId}/plans/`,1).then(response => {
            // console.log(response.data,'DATA')
            setPlans(response.data.sort((a,b) => b.id - a.id));
            setLoader(false);
            setrefreshing(false);
        }).catch(error => {
            console.log(error)
            setLoader(false);
            setrefreshing(false);
        })
    }

    const handleCounseling = async() => {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        setLoader(true);
        console.log(token)
        const data = {
            "the_one_thing": "EAT_MORE_FRUITS",
            "biggest_reason": "LIVE_LONGER",
            "number_one_reason": "DONT_HAVE_TIME",
            "user": userId
          }
          console.log(data)
        //   props.navigation.navigate('Goals', {id: 3})
        //  
        POSTJSON(data,'plans/',null, 1).then(response => {
            setLoader(true);
            props.navigation.navigate('Goals', {id: response.data.id})
           
        }).catch(error => {
            console.log(error)
            setLoader(false);
        })
    }

    const handleOpenSummary = (item) => {
        props.navigation.navigate('Summary',{
            scale1:{text:item.the_one_thing},
            scale2:{text:item.biggest_reason},
            scale3:{text:item.number_one_reason},
            motivation:item.motivation,
            id:item.id,
            problemSolving:{title:item.recommendation_option},
            view:true
        })
    }
    // if(loader){
    //     return <View style={[_._locontainer, _._lohorizontal]}> <ActivityIndicator animating={true} color={'white'} /> </View>
    // } 

    const handleOneThing = (value) => {
        const goal_ = goalsList.filter(x => x.value == value)[0];
        if(goal_) return goal_.text; else '';
    }
    const handleBiggestReason = (value) => {
        const biggest_reason_ = motivationsList.filter(x => x.value == value)[0];
        if(biggest_reason_) return biggest_reason_.text; else '';
    }
    const handleBarrier = (value) => {
        const barrierList_ = barrierList.filter(x => x.value == value)[0];
        if(barrierList_) return barrierList_.text; else '';
    }

    const handleImage = (type) => {

        switch(type){
            case 'EAT_MORE_FRUIT':
                return fruitIcon;
            case 'EAT_LESS_RED_PROCESSED_AND_FATTY_MEATS':
                return boxIcon;
            case 'DRINK_MORE_WATER':
                return dropIcon;
            case 'MOVE_MORE':
                return mobileIcon;
            case 'EAT_MORE_VEGETABLES':
                return vegetableIcon;
            default:
                return boxIcon;
        }
    }

    const handleDeletePlan = async(id) => {
        const token = await AsyncStorage.getItem('token');
        axios.delete(`https://preventive-counseli-25953.botics.co/api/v1/plans/${id}/`, {
            headers: {
                'Authorization':`Token ${token}`,
                'accept': 'application/json',
                'X-CSRFToken':`TWxccrp9CI1tPhqRzpTJRc68Ouqj0UVcYZGPU89l3YNiquFwxVLSzCEckJ999rNg`,
            }
        })
            .then(response => {
               console.log(response)
               setPlans([...plans.filter(x => x.id != id)])
               alert('Plan has been deleted successfully!')
            }).catch(error => {
                alert('Something went wrong!')
                console.log(error)
            })
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
        <Header
        menu
        navigation={props.navigation}
        backBtn
        onBack={() => props.navigation.goBack()}
        />
  <ScrollView
   refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={() => handleGetCounseling()}
      color={colors[4]}
    />
   }
  >
            <View style={{paddingBottom:80,paddingTop:60}}>
                
        <TouchableOpacity style={[_._dhbtn,_.mt40]}
            onPress={() => handleCounseling()}
        >
            <Text style={[_._dhbtext,{fontWeight:'normal'}]}>Start a new path</Text>
            <Icon
                name="plus"
                type="feather"
                size={20}
                color={colors[0]}
            />
        </TouchableOpacity>

        <Text style={[_.mt40,_.fs24,_.textCenter,_.textWhite,{marginBottom:20,marginTop:60}]}>Previous Plans</Text>
        {plans.map((item,index) => {
            return(
                <TouchableOpacity 
                key={index}
                onPress={() => handleOpenSummary(item)}
                style={[_._dlbtn,_.mt20]}>
                <View style={[_.row,_.alignICenter,_.justifyCenter]}>
                <Image source={handleImage(item.the_one_thing)} style={{width:30,height:30}} resizeMode='contain'/>
                <View style={[_.column,_.ml20,_.flexFull,_.mt20]}>
                <Text style={[{color:colors[3]},_.fs16]}>{goalsList.filter(x => x.value == item.the_one_thing).length != 0 ? goalsList.filter(x => x.value == item.the_one_thing)[0].text : 'None'}</Text>
                <Text style={[_.textLight,{fontSize:8}]}>{moment(item.updated_at).format('MM/DD/YYYY')}</Text>
                </View>
                <TouchableOpacity  
                onPress={() => setselectedId(item.id)}
                style={[_.mr10,_._dliconcon]}><Icon name={selectedId == item.id ? "angle-up"  :"angle-down"} type="font-awesome" color={selectedId == item.id ? colors[4] : colors[0]} size={24} />
                </TouchableOpacity>
                <TouchableOpacity  
                onPress={() => handleDeletePlan(item.id)}
                style={[_.mr10,_._dliconcon]}><Icon name={"times"} type="font-awesome" color={colors[0]} size={14} />
                </TouchableOpacity>
                </View>
                {selectedId == item.id &&
                <View>
               <Text style={[_.textWhite,_.fs14,{textAlign:'left',alignSelf:'flex-start'},_.mt10]}>SUMMARY</Text>
               <Text style={[{color:colors[3]},_.fs14,_.mt10]}>
                   I will work hard to make the changes I have selected. I will try my best to {(handleOneThing(item.the_one_thing))} because I want to {(handleBiggestReason(item.biggest_reason))} , 
                   and work with my provider to come up with ways to overcome my biggest issue that {(handleBarrier(item.number_one_reason))} .
               </Text>
               </View>
               }
            </TouchableOpacity>
            );
        })}
     
        {/* <TouchableOpacity style={[_.row, _._dlbtn,_.mt20]}>
            <Image source={require('../assets/icons/water.png')} style={{width:30,height:30,marginTop:10}} resizeMode='contain'/>
            <View style={[_.column,_.ml20,_.flexFull,_.mt20]}>
            <Text style={[_.textWhite]}>Walk More</Text>
            <Text style={[_.textLight,_.fs12]}>1/03/21</Text>
            </View>
            <View style={[_.mr10]}><Icon name="sort-down" type="font-awesome" color={colors[0]} size={30} /></View>
        </TouchableOpacity>
        <TouchableOpacity style={[_.row, _._dlbtn,_.mt20]}>
            <Image source={require('../assets/icons/step.png')} style={{width:30,height:30}} resizeMode='contain'/>
            <View style={[_.column,_.ml20,_.flexFull,_.mt20]}>
            <Text style={[_.textWhite]}>Drink more H20</Text>
            <Text style={[_.textLight,_.fs12]}>1/03/21</Text>
            </View>
            <View style={[_.mr10]}><Icon name="sort-down" type="font-awesome" color={colors[0]} size={30} /></View>
        </TouchableOpacity> */}
        </View>
                </ScrollView>
      <BottomNav
       navigation={props.navigation}
       position={0}
      />
        </View>       
    );
}



export default MyPlans;