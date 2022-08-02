import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image, SectionList } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../redux/reducer/user';
import styles from './styles';
import moment from 'moment';

const dummyData = [
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-07-26T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "reward", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-07-26T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": true,
    "type": "reward", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-07-25T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "reward", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-07-15T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "reward", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-06-02T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "business", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-06-02T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "reward", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-06-02T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "reward", //| redeem | offer | business,
    "logo": ""
  },
  {
    "id": "62d91380bdf12a1568cd5871",
    "uid": "UsuSGDZSbSgQ7xUOcsMGyuUY1F02",
    "message": "Redeem the bill amount of $192 @",
    "description": "offer acctepted",
    "created": "2022-07-20T08:51:12.989Z",
    "updated": "2022-07-21T08:51:12.989Z",
    "redirectURL": "/redeem-status/62d913804db688ff5edabf09",
    "read": false,
    "type": "redeem", //| redeem | offer | business,
    "logo": ""
  },
]

const UserNotification = ({ navigation }) => {

  const { userNotification } = useSelector(s => s.user)
  const dispatch = useDispatch()

  const [groupData, _groupData] = useState([])

  useEffect(() => {
    dispatch(getNotification())
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
      _groupData(updated.filter((item) => item.data.length > 0));
    }
  }, [userNotification])

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
      <SectionList
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        sections={groupData || []}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={[styles.notificationContainer, !(item.read) ? { backgroundColor: Colors.primary25 } : {}]} marginT-16>
            <Image source={(item?.type == "reward") ? Images?.notificationStar : (item?.type == "redeem") ? Images?.redeem : { uri: item?.logo }} style={{ height: 32, width: 32, marginLeft: 16, marginTop: 16 }} />
            <View flex marginL-10 marginT-16>
              <Text fs16 lh24 black> {item.message} </Text>
              <Text fs14 lh20 black> <Text primary700 fs14 lh20>{item.description} </Text> </Text>
              <Text fs12 lh18 gray500> {moment(item?.created).fromNow()} </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text primary700 fs14 lh20 marginT-16> {title} </Text>
        )}
        ListEmptyComponent={() => (
          <View flex center>
            <Text gray700>No new notifications.</Text>
          </View>
        )}
      />
    </SafeAreaView >
  );
}

export default memo(UserNotification)
