import Dialog, { DialogContent } from 'react-native-popup-dialog';
import React from 'react';
import {View, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const InputDialog = ({...props}) => {
    const {onTouchOutside,state,value, onChangeText,submitInput} = props;
    return(
        <Dialog
        visible={true}
        onTouchOutside={onTouchOutside}
        dialogStyle={[s.dialogStyle]}
    >
        <DialogContent
            style={s.container}
        >
        <Text>Blood Pressure / Heart Rate</Text>
        {/* <RNInputMasking
          style={{
            borderColor: 'black',
            borderWidth: 1,
            height: 50,
            alignSelf: 'center',
            marginTop: 5
          }}
          value={value}
          onChangeText={onChangeText}
          maskFormat="DD-DD"
          keyboardType="number-pad"
        />  */}
        </DialogContent>
        <View style={_.row}>
        <TouchableOpacity>
            <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={submitInput}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
        </View>
        
    </Dialog>
    );
}

const s = StyleSheet.create({
    container:{
        flex:1,
        width,
        height:100,
        backgroundColor:'white'
    },
    dialogStyle:{
        flex:1,
        width,
        height:100,
        backgroundColor:'white'
    }
});

export default InputDialog;