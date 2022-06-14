import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from 'react-native-ui-lib';

const AppLoader = () => {
  const { loading } = useSelector(s => s.loading)
  return (
    <Modal
      transparent
      visible={loading}
      animationType="none"
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={style.overlayStyle}>
        <ActivityIndicator size="large" color={Colors?.primary700} />
      </View>
    </Modal>
  );
};


export default AppLoader;

const style = StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});