import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screen/splash/Splash';
import Singup from '../screen/singup/Singup';
import VerifyCode from '../screen/verifyCode/VerifyCode';
import ResponseScreen from '../screen/responseScreen/ResponseScreen';
import Login from '../screen/login/Login';
import ForgotPass from '../screen/forgotPass/ForgotPass';
import ResetPass from '../screen/reSetPass/ResetPass';


const stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
       <stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
      >
      <stack.Screen name="Splash" component={Splash} />
      <stack.Screen name="Singup" component={Singup} />
      <stack.Screen name="VerifyCode" component={VerifyCode} />
      <stack.Screen name="ResponseScreen" component={ResponseScreen} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="ForgotPass" component={ForgotPass} />
      <stack.Screen name="ResetPass" component={ResetPass} />

      
    </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;