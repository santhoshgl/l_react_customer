import React, { memo } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { useDispatch } from 'react-redux';
import { Images } from '../constants';
import { onGetRouteNavigationData } from '../redux/reducer/user';

const CustomTabBarScreen = ({ state, navigation }) => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.tabView} >
        <Pressable hitSlop={15} onPress={() => { dispatch(onGetRouteNavigationData({})), navigation.navigate('homeTab') }}>
          <FastImage source={Images.home} style={[styles.icon, { tintColor: state.index == 0 ? Colors.primary600 : Colors.gray500 }]} />
          <Text fs12 lh18 style={{ color: state.index == 0 ? Colors.black : Colors.gray500 }} >Home</Text>
        </Pressable>
      </View>
      <View style={styles.tabView}  >
        <Pressable hitSlop={15} onPress={() => { dispatch(onGetRouteNavigationData({})), navigation.navigate('offersTab')}}>
          <FastImage source={Images.offers} style={[styles.icon, { tintColor: state.index == 1 ? Colors.primary600 : Colors.gray500 }]} />
          <Text fs12 lh18 style={{ color: state.index == 1 ? Colors.black : Colors.gray500 }} >Offers</Text>
        </Pressable>
      </View>
      <View style={styles.tabView} >
        <Pressable hitSlop={15} onPress={() => { dispatch(onGetRouteNavigationData({})), navigation.navigate('businessTab')}}>
          <FastImage source={Images.tab_business} style={[styles.icon, { tintColor: state.index == 2 ? Colors.primary600 : Colors.gray500 }]} />
          <Text fs12 lh18 style={{ color: state.index == 2 ? Colors.black : Colors.gray500 }} >Businesses</Text>
        </Pressable>
      </View>
      <View style={styles.tabView}  >
        <Pressable hitSlop={15} onPress={() => navigation.navigate('pointsTab')}>
          <FastImage source={Images.points} style={[styles.icon, { tintColor: state.index == 3 ? Colors.primary600 : Colors.gray500 }]} />
          <Text fs12 lh18 style={{ color: state.index == 3 ? Colors.black : Colors.gray500 }} >Points</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
export default memo(CustomTabBarScreen)



const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row', backgroundColor: Colors.white,
    justifyContent: 'space-around', borderTopWidth: 1,
    borderTopColor: Colors.gray300
  },
  tabView: {
    marginTop: 18,
    ...ifIphoneX({
      marginBottom: 0
    }, {
      marginBottom: 18
    })
  },
  icon: { alignSelf: 'center', height: 24, width: 24 }
});