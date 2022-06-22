import React, { memo, useEffect } from 'react';
import { SafeAreaView, } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../../component/header';
import Qr from '../../component/qr';
import { Colors } from '@constants';
import { getUser } from '../../redux/reducer/user';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header />
      <Qr />
    </SafeAreaView>
  );
}

export default memo(Dashboard)