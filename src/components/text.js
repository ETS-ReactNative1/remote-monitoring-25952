import React from 'react';
import { Text } from 'react-native';
import { fontFamily } from '../utils/constant';

export default props => <Text
    {...props}
    style={[{ fontFamily: fontFamily,color:'#000' },props.style]}
>{props.children}</Text>