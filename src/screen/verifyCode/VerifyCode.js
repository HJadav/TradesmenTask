import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { hp, wp, FONTS, COLORS } from '../../constants/constants'
import OtpInputs from '@twotalltotems/react-native-otp-input';
import CustomButton from '../../componants/CustomButton';
import { Api } from '../../api/Api';
import utils from '../../utitls/utils';
import CustomProgressBar from '../../componants/CustomProgressBar';
import CustomBackBtn from '../../componants/CustomBackBtn';


const VerifyCode = ({ route, navigation }) => {
  const { email, code, isForgtotPass } = route?.params
  const [timer, setTimer] = useState(120);
  const [otp, setOtp] = useState(code.toString())
  const [isloading, setIsloading] = useState(false)

  const firstFiveChars = email?.substring(0, 4);
  const middleChars = '******';
  const lastTwoChars = email?.substring(email?.length - 2);

  const maskedEmail = `${firstFiveChars}${middleChars}${lastTwoChars}`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const formattedTime = `${String(Math.floor(timer / 60)).padStart(
    1,
    '0',
  )}:${String(timer % 60).padStart(2, '0')}`;
  const verifyOtpApi = async () => {
    setIsloading(true)
    Api(isForgtotPass ? "verify-password-token" : "verify-email", {
      email: email,
      code: otp,
    })
      .then(result => {
        const response = JSON.parse(result);
        const { success, message, data } = response;
        if (success) {
          if (isForgtotPass) {
            navigation.navigate('ResetPass', { code: otp, email: email })
          } else {
            navigation.navigate('ResponseScreen', { logImg: images.errorIcon, screenTitle: 'OTP is verified...', screenDec: 'Happy to say everything went smoothly. Start with Tradesmen for great experience...', btnName: 'Continue to App' })
          }
        } else if (success) {
          navigation.navigate('ResponseScreen', { logImg: images.errorIcon, screenTitle: 'OTP is incorrect', screenDec: 'Please enter valid data, code is incorrect.', btnName: 'Try Again' })
        }
        utils.showToast(message)
        setIsloading(false)

      })
      .catch(error => {
        setIsloading(false)
        console.error(error)
      });
  };

  const reSendOtpApi = async () => {
    setIsloading(true)
    Api("resend-email-code", {
      email: email,
    })
      .then(result => {
        const response = JSON.parse(result);
        const { success, message, data } = response;
        if (success) {
          setTimer(120)
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
    return otp && otp.length === 6 ? false : true
  }
  return (
    <View style={style.containerStyle}>
      <CustomProgressBar visible={isloading} />
      <ImageBackground source={images.verifyBg} style={style.bannerStyle}>
        <Image source={images.verifybgIcon} style={{
          height: wp(25),
          width: wp(20),
          resizeMode: 'contain',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: hp(5)
        }} />
        {isForgtotPass && <CustomBackBtn onPress={() => navigation.goBack()} />}

      </ImageBackground>

      <View style={style.chidViewContainer}>
        <Text style={{
          ...FONTS.screenTitle,
          color: 'black'
        }}>Verify Code</Text>

        <Text style={{ ...FONTS.bodyText3, alignSelf: 'center', marginTop: 20 }}>Check your Email Inbox we have sent you the code at {maskedEmail}</Text>


        {/* Otp View  */}
        <OtpInputs
          style={{ width: '100%', height: hp(5), alignSelf: 'center', marginTop: 30, marginBottom: 10 }}
          pinCount={6}
          autoFocusOnLoad={true}
          code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            const otp = code.replace(/[^0-9]/g, '');
            setOtp(otp);
          }}

          codeInputFieldStyle={style.underlineStyleBase}

        />

        {/* Timer Count Text  */}

        <Text style={{ ...FONTS.bodyText3, lineHeight: 24, color: COLORS.inputTextColor, marginTop: 15 }}>({formattedTime})</Text>

        <Text style={{ ...FONTS.bodyText3, lineHeight: 24, color: '#454545', marginTop: 10 }}>Did not received the code?</Text>
        <Text disabled={timer !== 0} onPress={() => reSendOtpApi()} style={{ ...FONTS.bodyText3, fontWeight: '700', textDecorationLine: 'underline', color: timer !== 0 ? COLORS.inputPlaceHolderColor : COLORS.btnColor, marginTop: 10 }}>Resend Code</Text>


        <CustomButton disabled={isValidDetails()} lable={'Verify'} containerStyle={{ marginVertical: 35 }} onPress={() => verifyOtpApi()} />
      </View>


    </View>
  )
}

export default VerifyCode

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
  borderStyleBase: {
    width: 30,
    height: 45
  },



  underlineStyleBase: {
    width: hp(11),
    height: hp(11),
    backgroundColor: '#E2E9FF',
    alignContent: 'space-between',
    color: 'black'
  },


})