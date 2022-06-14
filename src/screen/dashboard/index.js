import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Colors } from '../../constants';

const Dashboard = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Text beb30 center marginT-25 black >Dashboard</Text>

    </SafeAreaView>
  );
}

export default memo(Dashboard)