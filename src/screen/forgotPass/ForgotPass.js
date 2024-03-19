import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React,{useState} from 'react'
import images from '../../assets/images'
import CustomTextInput from '../../componants/CustomTextInput'
import CustomButton from '../../componants/CustomButton'
import {  hp, wp, FONTS, COLORS } from '../../constants/constants'
import { Api } from '../../api/Api'
import utils from '../../utitls/utils'
import CustomProgressBar from '../../componants/CustomProgressBar'
import CustomBackBtn from '../../componants/CustomBackBtn'

const ForgotPass = ({route,navigation}) => {
  const { email} = route?.params
  const [userEmail, setEmail] = useState(email||"")
  const [isloading,setIsloading] = useState(false)

  const forgotPassApi = async () => {
    setIsloading(true)
    Api("forgot-password", {
      email: userEmail,
    })
      .then(result => {
        const response = JSON.parse(result);
        const { success, message,data } = response;
        if (success) {
          navigation.navigate('VerifyCode', { email: userEmail,code:data?.code,isForgtotPass:true })
        }
        utils.showToast(message)
        setIsloading(false)
      })
      .catch(error => {
        setIsloading(false)
        console.error(error)});
  };
  function isValidDetails(){
    return userEmail ? false:true
  }

    return (
        <View style={style.containerStyle}>
          <CustomProgressBar visible={isloading}/>

          <ImageBackground source={images.signUpBackgraound} style={style.bannerStyle}>
            <Image source={images.verifybgIcon} style={{
              height: wp(25),
              width: wp(20),
              resizeMode: 'contain',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: hp(5)
            }} />
          <CustomBackBtn onPress={()=>navigation.goBack()}/>

          </ImageBackground>

    
          <View style={style.chidViewContainer}>
            <Text style={{
              ...FONTS.screenTitle,
              
            }}>Forgot Password?</Text>

<Text style={{...FONTS.bodyText3,alignSelf:'flex-start',marginTop:15}}>Enter your registered email id, we will share verification code. </Text>

            <CustomTextInput label={'Email'} value={userEmail} onChange={setEmail} />


    
            <CustomButton 
            disabled={isValidDetails()}
            onPress={()=> forgotPassApi()}
            lable={'Submit'} containerStyle={{
              marginTop: 40,
              marginBottom: 10
            }} />
    
    
    
            
          </View>
          {/* Signup View  */}
          <View style={{position:'absolute',bottom:30,left:0,right:0}}>
            <Text style={{fontSize:16,lineHeight:24,color:'#343434',fontWeight:'400',textAlign:'center',marginTop:20}}>{"DRemember Password?  " }<Text onPress={()=>navigation.navigate('Login')} style={{color:COLORS.btnColor,fontWeight:'700'}}>Login</Text></Text>

            </View>
        </View>
      )
}

export default ForgotPass

const style = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    chidViewContainer: {
      padding: 20
    },
    bannerStyle: {
      width: '100%',
      height: hp(70),
      resizeMode: 'cover'
    },
  
  })