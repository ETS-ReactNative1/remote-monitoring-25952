import React,{useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import {Text, Header, BottomNav, InputDialog} from './../components/index';
import { styles as _ } from '../styles';
import BluetoothSerial from '@voxylu/react-native-bluetooth-serial'
import { Buffer } from 'buffer'
global.Buffer = Buffer
import { colors, width } from '../utils/constant';


const Dashboard = ({...props}) => {
    const [dialog, setDialog] = useState(false);
    const [upVisible, setupVisible] = useState(false);
    const [bloodPressure, setBloodPressure] = useState('0');


    const handleColor = () => {
      if(bloodPressure < 70){
          return '#edd674'
      }
      if(bloodPressure < 120){
        return '#77b68b'
      }
        if(bloodPressure > 120){
            return '#de5e5f'
        }
    }

    const handlePressureText = () => {
        if(bloodPressure < 70){
            return 'Low'
        }
        if(bloodPressure < 120){
          return 'Normal'
        }
          if(bloodPressure > 120){
              return 'High'
          }
      }

    const handleSubmitPressureInput =() => {
        setDialog(false);
        setupVisible(true);
        setTimeout(() => {setupVisible(false);}, 5500)
    }

  
    
    return(
        <View style={[_.container,_.blackBg,_.relative]}>
        <Header
        navigation={props.navigation}
        />
        {/* {upVisible &&
        <View style={[_._dpopup,{backgroundColor:handleColor()}]}>
            <Text style={[_.textWhite,_.fs20]}>Your blood pressure is {handlePressureText()}</Text>
        </View>
        } */}
        <ScrollView>
            <View style={{paddingBottom:80}}>
        <Text style={[_.textCenter,_.textWhite,_.fs16,_.mt20]}>MY HEALTH MONITORING</Text>
        <Text style={[_.textCenter,_.textWhite,_.para,_.mt30,_.fs18]}>Health Biometrics</Text>
        <View style={[_.elements,_.mt5,{paddingBottom:0}]}>
        <View style={[_.row,_.alignICenter]}> 
            <TouchableOpacity style={[_._dfclbtns]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,{height:25}]}>WEIGHT</Text>
                <Image
                    source={require('./../assets/icons/weight.png')}
                    style={[_._dfclbimg,_.mt10]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.mt5]}>158 lbs</Text>
                  <Text style={[_.textCenter,_.para,_.fs12]}>last update 3d</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[_._dfclbtns,{backgroundColor:'#77b68b'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,_.textWhite,{maxWidth:width/4-20,height:25}]}>BLOOD SUGAR</Text>
                <Image
                    source={require('./../assets/icons/sugar.png')}
                    style={[_._dfclbimg,_.mt10]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite]}>80</Text>
                  <Text style={[_.textCenter,_.textWhite,_.fs12]}>last update 3d</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() =>setDialog(true)}
            style={[_._dfclbtns,{backgroundColor:'#de5e5f'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,_.textWhite,{maxWidth:width/4-20,height:25}]}>BLOOD PRESSURE</Text>
                <Image
                    source={require('./../assets/icons/blood.png')}
                    style={[_._dfclbimg,_.mt10]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite]}>{bloodPressure} / 100</Text>
                  <Text style={[_.textCenter,_.textWhite,_.fs12]}>last update 3d</Text>
            </TouchableOpacity>
        </View>

        
        </View>
    
        <Text style={[_.textCenter,_.textWhite,_.para,_.mt30,_.fs18]}>Health Behaviors</Text>
        <View style={[_.elements,_.mt5,{paddingBottom:0}]}>
        <View style={[_.row,_.alignICenter]}> 
            <TouchableOpacity style={[_._dfclbtns,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,_.textWhite,{height:25}]}>WATER</Text>
                <Image
                    source={require('./../assets/icons/water.png')}
                    style={[_._dfclbimg,_.mt10]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.mt5,_.textWhite]}>60 oz</Text>
                  <Text style={[_.textCenter,_.para,_.fs12,_.textWhite]}>last update 3d</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[_._dfclbtns,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,_.textWhite,{maxWidth:width/4-20,height:25}]}>STEPS</Text>
                <Image
                    source={require('./../assets/icons/step.png')}
                    style={[_._dfclbimg,_.mt10]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite]}>1,000</Text>
                  <Text style={[_.textCenter,_.textWhite,_.fs12]}>last update 3d</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[_._dfclbtns,{backgroundColor:'#edd674'}]}>
                <Text style={[_.textCenter,_.mt5,_.fs12,_.textWhite,{maxWidth:width/4-20,height:25}]}>FRUIT & VEGETABLES</Text>
                <Image
                    source={require('./../assets/icons/fruit.png')}
                    style={[_._dfclbimg,_.mt10]}
                    resizeMode='contain'
                />
                  <Text style={[_.textCenter,_.fs16,_.textWhite]}>6</Text>
                  <Text style={[_.textCenter,_.textWhite,_.fs12]}>last update 3d</Text>
            </TouchableOpacity>
        </View>

        
        </View>
        <View style={[_.row,_.mt30,_.alignICenter,{justifyContent:'flex-end',paddingRight:20}]}>
        <Text style={[_.textCenter,_.textWhite,_.fs18,{marginRight:10}]}>CONNECT MY SCALE</Text>
        <Icon
        name="angle-right"
        type="font-awesome"
        size={30}
        color={colors[0]}
        />
        </View>
        </View>
        </ScrollView>
        {/* <DialogInput 
            isDialogVisible={dialog}
            title={"Blood Presure"}
            message={"Enter your blood pressure"}
            textInputProps={{keyboardType:'numeric'}}
            submitInput={ (inputText) =>  handleSubmitPressureInput(inputText)}
            closeDialog={ () => {setDialog(false)}}>
</DialogInput> */}
        {/* <InputDialog
         submitInput={ () =>  handleSubmitPressureInput()}
         onTouchOutside={ () => {setDialog(false)}}
         value={bloodPressure}
         state={dialog}
         onChangeText={ (inputText) =>  setBloodPressure(inputText)}
        /> */}
        <BottomNav
            navigation={props.navigation}
        />
        </View>       
    );
}

export default Dashboard;