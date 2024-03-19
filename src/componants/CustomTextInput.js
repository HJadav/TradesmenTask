import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { COLORS,FONTS } from '../constants/constants';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomTextInput = ({label,value,onChange,containerStyle,secureTextEntry=false,errorSmg=''}) => {
  return (
    <View>
      <TextInput
      label={label}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChange}
      error={errorSmg}
      placeholderTextColor={COLORS.inputTextColor}
      underlineColor={COLORS.btnColor}
      style={{
        backgroundColor:'white',
        color:'black',
        ...containerStyle
        
      }}
    />
    {errorSmg && <Text style={{
      fontFamily: 'Poppins-Regular',
      fontSize: RFValue(14, FONTS.height),
      lineHeight:RFValue(24, FONTS.height),
      color:COLORS.errorColor,
      fontWeight: '400',
    }} >{errorSmg}</Text>}
    
    </View>
  )
}

export default CustomTextInput