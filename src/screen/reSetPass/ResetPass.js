import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import images from '../../assets/images'
import CustomTextInput from '../../componants/CustomTextInput'
import CustomButton from '../../componants/CustomButton'
import { hp, wp, FONTS } from '../../constants/constants'
import { Api } from '../../api/Api'
import utils from '../../utitls/utils'
import CustomProgressBar from '../../componants/CustomProgressBar'
import CustomBackBtn from '../../componants/CustomBackBtn'

const ResetPass = ({ route }) => {
  const { code, email } = route?.params
  const [isloading, setIsloading] = useState(false)

  const [newPass, setnewPass] = useState("")
  const [cPass, setCNetPass] = useState("")
  const [errorSmg, setErrorSmg] = useState('')

  const reSetPass = async () => {
    setIsloading(true)
    Api("reset-password", {
      email: email,
      code: code,
      password: cPass
    })
      .then(result => {
        const response = JSON.parse(result);
        const { success, message, data } = response;

        utils.showToast(message)
        setIsloading(false)
      })
      .catch(error => {
        setIsloading(false)
        console.error(error)
      });
  };

  function checkValidation() {
    const isSamePass = newPass === cPass
    if (isSamePass) {
      reSetPass()
    } else {
      setErrorSmg('Please, make sure your password match.');
    }

  }

  function isValidDetails() {
    return newPass && cPass && !errorSmg ? false : true
  }

  return (
    <View style={style.containerStyle}>
      {/* Loader */}
      <CustomProgressBar visible={isloading} />
      {/* Banner View  */}
      <ImageBackground source={images.signUpBackgraound} style={style.bannerStyle}>
        <Image source={images.verifybgIcon} style={{
          height: wp(25),
          width: wp(20),
          resizeMode: 'contain',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: hp(5)
        }} />
        <CustomBackBtn onPress={() => navigation.goBack()} />

      </ImageBackground>



      <View style={style.chidViewContainer}>
        <Text style={{
          ...FONTS.screenTitle,

        }}>Reset Password?</Text>

        <Text style={{ ...FONTS.bodyText3, alignSelf: 'flex-start', marginTop: 15 }}>Your new password must be different from previous used password, contain at least 8 letters. </Text>

        <CustomTextInput label={'New Password'} secureTextEntry={true} value={newPass} onChange={setnewPass} />
        <CustomTextInput label={'Confirm Password'} errorSmg={errorSmg} secureTextEntry={true} value={cPass} onChange={text => {
          setErrorSmg("")
          setCNetPass(text)
        }} />

        {/* Confirm Btn  */}
        <CustomButton lable={'Confirm'}
          disabled={isValidDetails()}
          onPress={() => checkValidation()}
          containerStyle={{
            marginTop: 40,
            marginBottom: 10
          }} />




      </View>

    </View>
  )
}

export default ResetPass

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