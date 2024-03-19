import { View, Text,TouchableOpacity,Image,StyleSheet } from 'react-native'
import React from 'react'
import images from '../assets/images'

const CustomBackBtn = ({onPress,containerStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.containerStyle,{...containerStyle}]}>
      <Image source={images.backArrow} style={styles.iconStyle} />
    </TouchableOpacity>
  )
}

export default CustomBackBtn

const styles = StyleSheet.create({
containerStyle:{position:'absolute',left:20,top:20},
iconStyle:{
    height:30,
    width:30,
  }
})