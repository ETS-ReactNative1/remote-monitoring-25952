import Dialog, { DialogContent } from 'react-native-popup-dialog';
import React, { useState } from 'react';
import {View, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const BMIDialog = ({...props}) => {
    const {onTouchOutside,state,submitInput, weight} = props;
    const [height, setheight] = useState('');

    const handleSubmit = () => {
        const result = weight / height^2;
        submitInput(result);
    }
    return(
        <Dialog
        visible={state}
        onTouchOutside={onTouchOutside}
        dialogStyle={[s.dialogStyle]}
    >
        <DialogContent
            style={s.container}
        >
        <Text style={s.heading}>Height</Text>
        <TextInput
            onChangeText={val => setheight(val)}
            placeholder="Height"
            value={height}
            style={s.input}
            />
        </DialogContent>
        <View style={[_.row,{justifyContent:'flex-end'}]}>
        <TouchableOpacity
        onPress={onTouchOutside}
        style={s.btn}
        >
            <Text style={[s.btnText,{fontWeight:'normal'}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={s.btn}
            disabled={height == ''}
        onPress={() => handleSubmit()}
        >
            <Text style={[s.btnText,{color:colors[4]}]}>Submit</Text>
        </TouchableOpacity>
        </View>
        
    </Dialog>
    );
}

const s = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:20
    },
    dialogStyle:{
        width:width-40,
        height:height/4,
        backgroundColor:'white'
    },
    btn:{
        margin:20,marginLeft:10
    },
    btnText:{
        color:colors[1],
        fontSize:16,
        fontWeight:'bold'
    },
    heading:{
        fontSize:20,
    },
    input:{
        borderColor:colors[2],
        borderWidth:1,
        marginTop:15,
        borderRadius:4,
        color:colors[1],
        fontSize:16,
        paddingLeft:15
    }
});

export default BMIDialog;