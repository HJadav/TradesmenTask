import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React,{useState} from 'react'
import images from '../../assets/images'
import CustomTextInput from '../../componants/CustomTextInput'
import CustomButton from '../../componants/CustomButton'
import {  hp, wp, FONTS, COLORS } from '../../constants/constants'
import { Api } from '../../api/Api'
import utils from '../../utitls/utils'
import CustomProgressBar from '../../componants/CustomProgressBar'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isloading,setIsloading] = useState(false)



  const loginApiCall = async () => {
    setIsloading(true)
    Api("login", {
      email: email,
      password: password
    })
      .then(result => {
        const response = JSON.parse(result);
        const { success, message,data } = response;
    
        utils.showToast(message)
        setIsloading(false)
      })
      .catch(error => {
        setIsloading(false)
        console.error(error)});
  };

  function isValidDetails(){
    return email && password ? false:true
  }

    return (
        <View style={style.containerStyle}>

          <CustomProgressBar visible={isloading}/>
          <ImageBackground source={images.signUpBackgraound} style={style.bannerStyle}>
            <Image source={images.workerIcon} style={{
              height: wp(25),
              width: wp(20),
              resizeMode: 'cover',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: hp(5)
            }} />
          </ImageBackground>
    
          <View style={style.chidViewContainer}>
            <Text style={{
              ...FONTS.screenTitle,
    
            }}>Login</Text>
            <CustomTextInput label={'Email'} value={email} onChange={setEmail} />
            <CustomTextInput label={'Password'}secureTextEntry={true}  value={password} onChange={setPassword} containerStyle={{ marginTop: 0 }} />

    
            {/* Radio btn View  */}
            <Text onPress={()=>navigation.navigate('ForgotPass',{email:email})} style={{
                fontWeight: '700', color: COLORS.btnColor, textDecorationLine: 'underline',textAlign:'right',
                marginTop:10
              }}>Forgot password?</Text>  
    
            <CustomButton 
            disabled={isValidDetails()}
            onPress={()=>loginApiCall()}
            lable={'Login'} containerStyle={{
              marginTop: 40,
              marginBottom: 10
            }} />
  
          </View>
          {/* Signup View  */}
          <View style={{position:'absolute',bottom:30,left:0,right:0}}>
            <Text onPress={()=>navigation.navigate('Singup')} style={{fontSize:16,lineHeight:24,color:'#343434',fontWeight:'400',textAlign:'center',marginTop:20}}>{"Don’t have an account? " }<Text style={{color:COLORS.btnColor,fontWeight:'700'}}>Signup</Text></Text>

            </View>
        </View>
      )
}

export default Login

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