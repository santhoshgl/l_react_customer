import React, { memo } from 'react';
import { SafeAreaView, } from 'react-native';
import Header from '../../component/header';
import Qr from '../../component/qr';
import { Colors } from '@constants';

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header />
      <Qr />
    </SafeAreaView>
  );
}

export default memo(Dashboard)