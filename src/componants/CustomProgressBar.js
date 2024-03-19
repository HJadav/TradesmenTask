import {View, Text, ActivityIndicator, Modal, Platform} from 'react-native';

const CustomProgressBar = ({visible = false}) => {


  return (
    <Modal
      visible={visible}
      animationType={Platform.OS !== 'ios' ? 'fade' : 'none'}
      transparent={Platform.OS !== 'ios'}
      presentationStyle={Platform.OS !== 'ios' ? undefined : 'fullScreen'}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={'dark'} />
      </View>
    </Modal>
  );
};

export default CustomProgressBar;
