import Dialog, { DialogContent } from 'react-native-popup-dialog';
import React, { useState } from 'react';
import {View, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {styles as _} from '../styles';
import {colors, width, height, iconLink} from '../utils/constant';
import Text from './text';

const BHDialog = ({...props}) => {
    const {onTouchOutside,state,submitInput, heading = ''} = props;
    const [bheight, setbheight] = useState('');
    const [bheight2, setbheight2] = useState('');

    const handleSubmit = () => {
        submitInput(`${bheight}.${bheight2}`);
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
        <Text style={s.heading}>{heading == '' ? 'Height in ft and inches' : `Your height is ${bheight != '' ? bheight : heading.split('.')[0]} feet and ${bheight2 != '' ? bheight2 : heading.split('.')[1]} inches`}</Text>
        <View style={[_.row,{height:52,marginTop:15}]}>
        <TextInput
            onChangeText={val => setbheight(val)}
            placeholder="Height in ft"
            value={bheight}
            style={s.input}
            />
              <TextInput
            onChangeText={val => setbheight2(val)}
            placeholder="inches"
            value={bheight2}
            style={[s.input,{marginLeft:10}]}
            />
        </View>
      
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
            disabled={bheight == ''}
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
        height:height/4 + 30,
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
        flex:1,
        paddingLeft:15,
        height:52,
        
    }
});

export default BHDialog;