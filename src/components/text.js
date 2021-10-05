import React from 'react';
import { Text } from 'react-native';
import { fontFamily } from '../utils/constant';

const fonts = {fontFamily:fontFamily};

export default props => <Text
    {...props}
    style={[{ color:'#000' },props.style]}
>{props.children}</Text>