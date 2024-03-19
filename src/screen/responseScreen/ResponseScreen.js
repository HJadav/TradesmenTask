import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native'
import React from 'react'
import { hp, wp, FONTS, COLORS } from '../../constants/constants'
import images from '../../assets/images'

const ResponseScreen = ({ route, navigation }) => {
    const { screenTitle, screenDec, btnName } = route?.params

    return (
        <View style={style.containerStyle}>
            {/* Banner View  */}
            <ImageBackground source={images.signUpBackgraound} style={style.bannerStyle}>
                <Image source={screenTitle=='OTP is incorrect'? images.otpIncorrectIcon:images.verifyOtpIcon} style={{
                    height: wp(25),
                    width: wp(20),
                    resizeMode: 'contain',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: hp(5)
                }} />
            </ImageBackground>

            <View style={style.chidViewContainer}>
                <Text style={{
                    ...FONTS.screenTitle,
                    color:'black'

                }}>{screenTitle}</Text>

                <Text style={{ ...FONTS.bodyText3, alignSelf: 'flex-start', marginVertical: 20 }}>{screenDec}</Text>

                <Text onPress={() => navigation.navigate('Login')} style={{ ...FONTS.bodyText3, fontFamily: 'Poppins-Bold',fontWeight: '700', textDecorationLine: 'underline', color: COLORS.btnColor, }}>{btnName}</Text>
            </View>
        </View>
    )
}

export default ResponseScreen

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
        height: hp(80),
        resizeMode: 'cover'
    },
})