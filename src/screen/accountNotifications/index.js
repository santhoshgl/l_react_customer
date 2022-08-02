import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image } from 'react-native';
import { View, Text, Switch } from 'react-native-ui-lib';
import _ from 'underscore';
import { Colors, Images } from '@constants';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../redux/reducer/user';
import { unwrapResult } from '@reduxjs/toolkit';

const AccountNotification = ({ navigation }) => {

  const { userData } = useSelector(s => s.user)
  const dispatch = useDispatch()

  const [typeNotifiction, _typeNotifiction] = useState({
    inApp: false,
    email: false,
  })
  const [activityNotication, _activityNotication] = useState({
    updates: false,
    transactions: false,
    newOffers: false,
    newBusinesses: false,
    promotions: false,
  })

  useEffect(() => {
    if (userData?.notificationSettings?.activity)
      _activityNotication(userData.notificationSettings.activity)
    if (userData?.notificationSettings?.type)
      _typeNotifiction(userData.notificationSettings.type)
  }, [userData])

  const notifictionChangeHandler = (val, name, type) => {
    let typePayload = { ...typeNotifiction }
    let activityPayload = { ...activityNotication }
    if (type == "typeNotification") {
      typePayload = {
        ...typeNotifiction,
        [name]: val
      }
      _typeNotifiction(typePayload)
    } else if (type == "activityNotification") {
      activityPayload = {
        ...activityNotication,
        [name]: val
      }
      _activityNotication(activityPayload)
    }
    const updated = {
      type: typePayload,
      activity: activityPayload
    }

    saveNotifications(updated)
  }

  const saveNotifications = (updated) => {
    let updatedUser = { ...userData }
    updatedUser.notificationSettings = updated;
    dispatch(updateUser(updatedUser)).then((res) => {
      dispatch(getUser()).then(unwrapResult).then((response) => {
      })
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Notifications</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View style={styles.listContainer}>
          <View>
            <View marginT-16>
              <Text beb24 lh32 black flex numberOfLines={1}> Type </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={typeNotifiction?.inApp}
                  onValueChange={(val) => notifictionChangeHandler(val, "inApp", "typeNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > In App </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={typeNotifiction?.email}
                  onValueChange={(val) => notifictionChangeHandler(val, "email", "typeNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > Email </Text>
            </View>
          </View>
          <View>
            <View marginT-24>
              <Text beb24 lh32 black flex numberOfLines={1}> Activity </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={activityNotication?.updates}
                  onValueChange={(val) => notifictionChangeHandler(val, "updates","activityNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > Updates </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={activityNotication?.transactions}
                  onValueChange={(val) => notifictionChangeHandler(val, "transactions","activityNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > Transactions </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={activityNotication?.newOffers}
                  onValueChange={(val) => notifictionChangeHandler(val, "newOffers","activityNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > New Offers </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={activityNotication?.newBusinesses}
                  onValueChange={(val) => notifictionChangeHandler(val, "newBusinesses","activityNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > New Businesses </Text>
            </View>
            <View paddingV-16 style={styles.notificationContainer}>
              <View marginR-12>
                <Switch
                  onColor={Colors.primary600}
                  offColor={Colors.gray200}
                  value={activityNotication?.promotions}
                  onValueChange={(val) => notifictionChangeHandler(val, "promotions","activityNotification")}
                />
              </View>
              <Text fs16 lh24 flex gray700 > Promotions </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(AccountNotification)
