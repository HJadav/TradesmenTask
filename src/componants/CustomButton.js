import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/constants'

const CustomButton = ({ lable, labelStyle, onPress, containerStyle, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[style.containerStyle, { ...containerStyle, backgroundColor: disabled ? COLORS.disableBtnColor : COLORS.btnColor }]} >
      <Text style={[style.labelStyle, { ...labelStyle }]}>{lable}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLORS.btnColor,
    borderRadius: 30,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    // fontFamily:'',
    textAlign: 'center',
    color: 'white',
    padding: 13
  }
})