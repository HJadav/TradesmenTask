import { Platform, ToastAndroid } from "react-native";
// import Toast from 'react-native-simple-toast';


const showToast = message => {
    try {
      if (Platform.OS === 'android' && message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        // Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
      }
    } catch (error) {
      console.log('Error showing toast on iOS:', error);
    }
  };

  export default {
    showToast
  }