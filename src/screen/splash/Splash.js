import { View, Text,StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images'
import { wp } from '../../constants/constants'

const Splash = ({navigation}) => {

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('Singup')
    }, 1000);
  },[])
  return (
    <View style={style.containerStyle}>
     <Image source={images.splashLogo} style={style.imageStyle}/>
    </View>
  )
}
const style = StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center'
    },
    imageStyle:{
        height:wp(45),
        width:wp(45),
        alignSelf:'center',
        resizeMode:'cover',
     }
})

export default Splash