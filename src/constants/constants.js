import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';


export const COLORS = {
    inputPlaceHolderColor:'#4F4F4F',
    inputTextColor : '#333A42',
    btnColor:'#314FA4',
    disableBtnColor:'#BABABA',
    errorColor:'#C60000'
}

export function wp(percentage) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  
  export function hp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }

  export const FONTS = {

    height:height,
    width:width,
    screenTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: RFValue(28, height),
      fontWeight: '600',
      color:'black'
    },
    inputField:{
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(14, height),
        lineHeight:16,
        color:'#4F4F4F',
        fontWeight: '400',
    },
    bodyText3:{
      fontFamily: 'Poppins-Regular',
      fontSize: RFValue(16, height),
        lineHeight:20,
        color:COLORS.inputTextColor,
        fontWeight: '400',

    }
}
