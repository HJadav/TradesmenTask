import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


const KeyboardAvoidingComponent = ({ChildrenView}) => {
  return (
    <KeyboardAwareView 
      style={styles.container}>
       {ChildrenView}
      
    </KeyboardAwareView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});

export default KeyboardAvoidingComponent;