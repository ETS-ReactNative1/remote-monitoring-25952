import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {styles as _} from '../styles';
import {colors, width, height, fontFamily} from '../utils/constant';
import Text from './text';

const Input = ({...props}) => {
    const {placeholder, value, onChangeText, label,keyboardType, eStyles = {}} = props;
    return(
        <View style={[_.column,_.mt20]}>
            <Text style={[s.label,_.fs14]}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[s.input,eStyles]}
                placeholderTextColor={colors[3]}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const s = StyleSheet.create({
    label:{
        color:colors[3]
    },
    input:{
        color:colors[0],
        borderRadius:4,
        borderColor:colors[0],
        borderWidth:1,
        width:width-40,
        paddingLeft:15,
        marginTop:5,
        height:52,
        fontFamily:fontFamily
    }
});

export default Input;