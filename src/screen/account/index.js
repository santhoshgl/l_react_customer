import React, { memo } from 'react';
import { SafeAreaView, ImageBackground, Pressable, ScrollView, Image } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { Colors, Images } from '@constants';
import { logout } from '../../redux/reducer/user';
import styles from './styles'

const Account = ({ navigation }) => {
  const { userData } = useSelector(s => s.user);
  const dispatch = useDispatch()

  const _logout = () => {
    dispatch(logout())
    navigation.navigate('landing')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginT-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View center>
          <View style={{ height: 197, width: 201 }}>
            <ImageBackground source={Images.account} re style={styles.image}>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text beb24 lh32 black flex numberOfLines={1}>Hi {userData?.firstName}</Text>
        </View>

        <View center style={styles.detailContainer}>
          <Image source={Images.user} style={styles.featureIcon} />
          <Text fs16 lh24 flex black> Personal Details </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View center style={styles.detailContainer}>
          <Image source={Images.key} style={styles.featureIcon} />
          <Text fs16 lh24 flex black> Account Settings </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View center style={styles.detailContainer}>
          <Image source={Images.bell} style={styles.featureIcon} />
          <Text fs16 lh24 flex black> Notifications </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View center style={styles.detailContainer}>
          <Image source={Images.info} style={styles.featureIcon} />
          <Text fs16 lh24 flex black> About Lealzy </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View center style={styles.detailContainer}>
          <Image source={Images.send} style={styles.featureIcon} />
          <Text fs16 lh24 flex black> Invite friends </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View center style={styles.detailContainer}>
          <Image source={Images.support} style={styles.featureIcon} />
          <Text fs16 lh24 flex black> Support </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View center style={styles.detailContainer}>
          <Image source={Images.x_close} style={styles.featureIcon} />
          <Text fs16 lh24 flex> Delete Account </Text>
          <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
        </View>
        <View style={styles.logoutBtn}>
          <Text style={styles.sampleStyle} fs16 lh20 onPress={_logout}>Log out</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(Account)
