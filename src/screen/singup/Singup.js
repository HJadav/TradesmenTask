import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import images from '../../assets/images'
import { hp, wp, FONTS, COLORS } from '../../constants/constants'
import CustomTextInput from '../../componants/CustomTextInput'
import CustomButton from '../../componants/CustomButton'
import { Api } from '../../api/Api';
import utils from '../../utitls/utils'
import CustomProgressBar from '../../componants/CustomProgressBar'
import { RFValue } from 'react-native-responsive-fontsize'
import KeyboardAvoidingComponent from '../../componants/KeyboardAvoidingComponent'


const Singup = ({ navigation }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isCheck, setIsCheck] = useState(false)
  const [isloading, setIsloading] = useState(false)

  const registerApiCall = async () => {
    setIsloading(true)
    Api("register", {
      email: email,
      fname: firstName,
      lname: lastName,
      username: firstName + lastName,
      password: password
    })
      .then(result => {
        const response = JSON.parse(result);
        const { success, message, data } = response;
        if (success) {
          navigation.navigate('VerifyCode', { email: email, code: data?.code, isForgtotPass: false })
        }
        utils.showToast(message)
        setIsloading(false)
      })
      .catch(error => {
        setIsloading(false)
        console.error(error)
      });
  };

  function isValidDetails() {
    return email && firstName && lastName && password && isCheck ? false : true
  }

  return (
    <KeyboardAvoidingComponent
      ChildrenView={<ScrollView style={style.containerStyle} showsVerticalScrollIndicator={false}>

        {/* Progress bar  */}
        <CustomProgressBar visible={isloading} />
        {/* Image BannerView  */}
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

          }}>Sign up</Text>
          <CustomTextInput label={'First Name'} value={firstName} onChange={setFirstName} />
          <CustomTextInput label={'Last Name'} value={lastName} onChange={setLastName} />
          <CustomTextInput label={'Email'} value={email} onChange={setEmail} />
          <CustomTextInput label={'Password'} secureTextEntry={true} value={password} onChange={setPassword} />

          {/* Radio btn View  */}
          <View style={{
            paddingVertical: 10,
            flexDirection: 'row'
          }}>

            {/* Terms & Condition View  */}
            <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
              <Image source={isCheck ? images.checkBox : images.unCheckBox} style={{
                height: 20,
                width: 20,
                resizeMode: 'cover',
                marginTop: 5
              }} />
            </TouchableOpacity>
            <Text style={{ ...FONTS.bodyText3, fontSize: RFValue(14, FONTS.height), marginStart: 10, fontWeight: '400' }}>{`By clicking here you are agreed to \nour `}<Text onPress={() => console.log('clicked')} style={{
              fontWeight: '700', color: COLORS.btnColor, textDecorationLine: 'underline',

            }}>Terms & Condition</Text></Text>
          </View>

          {/* Sign Up Btn  */}
          <CustomButton
            disabled={isValidDetails()}
            onPress={registerApiCall}
            lable={'Sign Up'} containerStyle={{
              marginTop: 20,
              marginBottom: 10
            }}
          />


          <Text style={{ fontSize: 12, lineHeight: 18, fontFamily: 'Poppins-Regular', fontWeight: '500', color: COLORS.inputTextColor, textAlign: 'center' }}>We will share OTP to your Email ID for authentication</Text>

          {/* Login View  */}
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#343434', fontWeight: '400', textAlign: 'center', marginTop: 20, fontFamily: 'Poppins-Regular', }}>{"Already have an account? "}<Text onPress={() => navigation.navigate('Login')} style={{ color: COLORS.btnColor, fontWeight: '700', fontFamily: 'Poppins-Bold', }}>Login</Text></Text>
        </View>
      </ScrollView>
      }
    />
  )
}



export default Singup
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