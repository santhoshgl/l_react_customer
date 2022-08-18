import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, Pressable, Image, SectionList, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, readAllNotifications } from '../../redux/reducer/user';
import NotificationSkeleton from "../../component/notificationSkleton"
import styles from './styles';
import moment from 'moment';
import { cloneDeep } from 'lodash'
import { unwrapResult } from '@reduxjs/toolkit';

const UserNotification = ({ navigation }) => {
  const { userNotification } = useSelector(s => s.user)
  const dispatch = useDispatch()
  const [groupData, _groupData] = useState([])
  const [isCheckedMarkAll, setMarkAll] = useState(false)
  const [isDisableMark, setDisableMark] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    dispatch(getNotification()).then(() => {
      setLoader(false)
    }).catch(() => setLoader(false))
  }, [])

  useEffect(() => {
    if (userNotification?.length > 0) {
      const updated = [
        { title: "New", data: [] },
        { title: "Today", data: [] },
        { title: "This Week", data: [] },
        { title: "This Month", data: [] },
        { title: "Earlier", data: [] },
      ]
      userNotification?.forEach(item => {
        if (moment(item.created).isSame(moment(), 'day') && item?.read == false) {
          updated[0]?.data?.push(item)
        } else if (moment(item.created).isSame(moment(), 'day') && item?.read == true) {
          updated[1]?.data?.push(item)
        } else if (moment(item.created).isBetween(moment().startOf('week'), moment().endOf('week'))) {
          updated[2]?.data?.push(item)
        } else if (moment(item.created).isBetween(moment().startOf('month'), moment().endOf('month'))) {
          updated[3]?.data?.push(item)
        } else {
          updated[4]?.data?.push(item)
        }
      })

      let notificationData = updated.filter((item) => item.data.length > 0)
      let isRequireMarkAll = updated.filter((item) => item?.data[0]?.read === false)
      isRequireMarkAll?.length === 0 ? setMarkAll(true) : setMarkAll(false)
      // isRequireMarkAll?.length > 0 ? notificationData[0].showMarkAll = true : notificationData
      notificationData[0].showMarkAll = true
      _groupData(cloneDeep(notificationData))
    }
  }, [userNotification, dispatch])

  const onPressMarkAllRead = () => {
    setMarkAll(!isCheckedMarkAll)
    dispatch(readAllNotifications())
      .then(unwrapResult)
      .then((res) => {
        dispatch(getNotification())
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
      {loader ?
        <NotificationSkeleton /> : <SectionList
          contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={cloneDeep(groupData) || []}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <NotificationCard item={item} />}
          renderSectionHeader={({ section: { title, showMarkAll } }) => (
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text primary700 fs14 lh20 marginT-16> {title} </Text>
              {showMarkAll &&
                <TouchableOpacity
                  disabled={isCheckedMarkAll}
                  onPress={() => onPressMarkAllRead()}
                  style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Image source={!isCheckedMarkAll ? Images.checkNotifications : Images.notificationGray} style={{ width: 13, height: 10, marginBottom: 3, alignSelf: 'flex-end', marginRight: 5 }} />
                  <Text fs14 lh20 marginT-16 style={{ color: !isCheckedMarkAll ? Colors.primary700 : Colors.gray500 }} > Mark all as read </Text>
                </TouchableOpacity>}
            </View>
          )}
          ListEmptyComponent={() => (
            <View flex center>
              <Text gray700>No new notifications.</Text>
            </View>
          )}
        />}
    </SafeAreaView >
  );
}

export default memo(UserNotification)

const NotificationCard = ({ item }) => {
  return (
    <View style={[styles.notificationContainer, !(item.read) ? { backgroundColor: Colors.primary25 } : {}]} marginT-16>
      <Image source={(item?.type == "reward") ? Images?.notificationStar : (item?.type == "redeem") ? Images?.redeem : { uri: item?.logo }} style={{ height: 32, width: 32, marginLeft: 16, marginTop: 16 }} />
      <View flex marginL-10 marginT-16>
        <Text fs16 lh24 black> {item.message} </Text>
        <Text fs14 lh20 black> <Text primary700 fs14 lh20>{item.description} </Text> </Text>
        <Text fs12 lh18 gray500> {moment(item?.created).fromNow()} </Text>
      </View>
    </View>
  );
}