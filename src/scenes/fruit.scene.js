import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView, StyleSheet, Switch, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import {Text, Header, BottomNav, BPDialog, WGDialog} from './../components/index';
import { styles as _ } from '../styles';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import { colors, url2, width } from '../utils/constant';
import ActivityRings from "react-native-activity-rings";  
import { ActivityIndicator } from 'react-native-paper';
import { GETJSON, POSTJSON } from '../utils/api';
import moment from 'moment';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { StatusBar } from 'react-native';
import { Alert } from 'react-native';

  const activityConfig = { 
    width: 300,  
    height: 300,
    radius: 100,
    ringSize: 14,
  };

const Fruit = ({...props}) => {
    const [vegetable, setVegetable] = useState(0);
    const [fruit, setFruit] = useState(0);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        handleGetVegeFruit();
    },[]);

    const handleGetVegeFruit = async() => {
        setLoader(true);
        try{
            const vegeCount = await GETJSON('vegetables-fruits/');
            const vegeCount__ = vegeCount.data;
            const vegeCount_ = vegeCount__.filter(x => moment(x.timestamp).isSame(moment(), 'day'))
            const vcl = vegeCount_.sort((a, b) => {
                return b.id - a.id;
            });
            setFruit(parseInt(vcl[0].fruits));
            setVegetable(parseInt(vcl[0].vegetables));
            setLoader(false);
        }catch(error){
            console.log(error)
            setLoader(false);
        }
    }

    const handleFruit = (type) => {
        let fruit_ = 0;
        if(type == 0){
            fruit_ = fruit == 0 ? 0 : fruit-1;
        }else{
            fruit_ = fruit == 4 ? 4 : fruit+1;
        }
        setFruit(fruit_);
    }

    const handleVegetable = (type) => {
        let vege_ = 1;
        if(type == 0){
            vege_ = vegetable == 0 ? 0 : vegetable-1;
        }else{
            vege_ = vegetable == 8 ? 8 : vegetable+1;
        }
        setVegetable(vege_);
    }

    const handleSaveVegeFruit = async() => {
        setLoader(true);
        try{
            const vege_ = await POSTJSON({vegetables:vegetable,fruits:fruit},'vegetables-fruits/');
            console.log(vege_);
            setLoader(false);
            Alert.alert('Saved successfully!')
        }catch(error){
            setLoader(false);
            Alert.alert('Try again later')
            console.log(error)
        }
    }
    if(loader) return   <View style={[_._locontainer, _._lohorizontal]}><ActivityIndicator animating={true} /></View>;
    
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
        <Text style={[_.textCenter,_.textWhite,_.fs16,_.mt20]}>DAILY INTAKE</Text>
        <Text style={[_.textCenter,_.textWhite,_.fs26,_.mt20,{maxWidth:width-80,alignSelf:'center'}]}>1/2 Cup Servings of Fruit and Vegetables</Text>
        <ActivityRings data={[
            { value: vegetable/8,color: "#77b68b", }, 
            { value: fruit/4, color: "#de5e5f"  }, 
        ]} config={activityConfig} /> 
        <View style={_._dfcont}>
            <View style={[_._dfclist,_.row,_.alignICenter]}>
                <Icon
                    name="square"
                    type="font-awesome"
                    color={'#77b68b'}
                    size={20}
                />
                <Text style={[_.fs16,_.flexFull,_.ml10]}>Vegetables</Text>

                <TouchableOpacity
                onPress={() => handleVegetable(0)}
                style={_._dfcbtn}>
                    <Icon
                        name="minus"
                        type="font-awesome"
                        color={colors[1]}
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={_._dfctext}>{vegetable}</Text>
                <TouchableOpacity
                onPress={() => handleVegetable(1)}
                style={_._dfcbtn}>
                    <Icon
                        name="plus"
                        type="font-awesome"
                        color={colors[1]}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <View style={[_._dfclist,_.row,_.alignICenter,_.mt20]}>
                <Icon
                    name="square"
                    type="font-awesome"
                    color={'#de5e5f'}
                    size={20}
                />
                <Text style={[_.fs16,_.flexFull,_.ml10]}>Fruits</Text>

                <TouchableOpacity 
                onPress={() => handleFruit(0)}
                style={_._dfcbtn}>
                    <Icon
                        name="minus"
                        type="font-awesome"
                        color={colors[1]}
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={_._dfctext}>{fruit}</Text>
                <TouchableOpacity
                onPress={() => handleFruit(1)}
                style={_._dfcbtn}>
                    <Icon
                        name="plus"
                        type="font-awesome"
                        color={colors[1]}
                        size={24}
                    />
                </TouchableOpacity>
              
            </View>
      
            <TouchableOpacity 
                onPress={() => handleSaveVegeFruit()}
             style={[_._dsavebtn,_.mt30,_.alignCenter]}>
                <Text style={[_.textCenter,_.textWhite,_.fs18]}>Save</Text>
            </TouchableOpacity>
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



export default Fruit;