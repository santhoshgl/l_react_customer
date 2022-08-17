import React, { memo, useEffect, useMemo } from 'react';
import { SafeAreaView, ImageBackground, Pressable, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import moment from 'moment';
import { Colors, Images } from '@constants';
import { getRewardDetails } from '../../redux/reducer/points';
import Clipboard from '@react-native-community/clipboard';
import { showMessage } from 'react-native-flash-message';
import { onGetRouteNavigationData, onReadNotification } from '../../redux/reducer/user';

const RewardDetails = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const param = useMemo(() => { return route?.params }, [route])
  const { rewardDetails } = useSelector(s => s.points)
  const navigationData = useSelector(s => s?.user?.routeNavigationData?.navigationData)
  const id = useSelector(s => s?.user?.routeNavigationData?.navigationData?.id)

  useEffect(() => {
    if (param?.rewardId || id)
      dispatch(getRewardDetails(param?.rewardId ? param?.rewardId : id));
    dispatch(onReadNotification(navigationData?.notificationID))
  }, [param, navigationData, id])


  const getCardStyles = useMemo(() => {
    let icon = Images.offers;
    let color = Colors.blue;
    if (rewardDetails?.attributes?.offer?.type == 'Percentage') {
      icon = Images.percent;
      color = Colors.yellow;
    } else if (rewardDetails?.attributes?.offer?.type == 'Half Price') {
      icon = Images.dollarSign;
      color = Colors.purple;
    } else if (rewardDetails?.attributes?.offer?.type == 'Free Gift') {
      icon = Images.gift;
      color = Colors.yellow;
    } else if (rewardDetails?.attributes?.offer?.type == "Buy 1 get 1") {
      icon = Images.award;
      color = Colors.blue;
    } else if (rewardDetails?.attributes?.offer?.type == "Points") {
      icon = Images.star;
      color = Colors.purple;
    } else {
      icon = Images.offers;
      color = Colors.blue;
    }
    return { icon, color }
  }, [rewardDetails])

  const copyRefernceHandler = () => {
    Clipboard.setString(rewardDetails?.id);
    showMessage({ message: "Reference copied to clipboard.", type: "success" });
  }

  const onPressOffers = () => {
    navigation.navigate('BusinessInfo', { business: { id: rewardDetails?.attributes?.business?.id } })
  }


  const onPressBack = () => {
    dispatch(onGetRouteNavigationData({}))
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={() => onPressBack()} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Reward Details</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ height: 312 }}>
          <ImageBackground source={Images.rewardDetails} re style={styles.image}>
            <View center marginT-50>
              <Image source={rewardDetails.attributes?.rewardType == 'credit' ? Images.star : Images.gift} style={{ height: 26, width: 26, tintColor: "white", marginBottom: 10 }} />
              <Text fs16 lh24 white >{`Credits ${rewardDetails.attributes?.rewardType == 'credit' ? 'Rewarded' : 'Redeemed'}!`}</Text>
              <Text beb48 lh60 white>{rewardDetails.attributes?.credits}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.listContainer}>
          <Text beb24 lh32 black flex numberOfLines={1}>{rewardDetails.attributes?.rewardType == 'credit' ? 'Rewarded' : 'Redeemed'}</Text>
          <Text fs14 lh20 gray500>{`${moment(rewardDetails?.attributes?.createdAt).format('ll')}  ·  ${moment(rewardDetails?.attributes?.createdAt).format('LT')}`}</Text>
          <TouchableOpacity marginT-4 onPress={() => copyRefernceHandler()}>
            <Text fs14 lh20 gray500>{`Reference #${rewardDetails?.id}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 16 }}>
          <Text fs14 lh20 gray700>Business</Text>
          <View style={styles.card}>
            <View row >
              <Image source={rewardDetails?.attributes?.business?.logo?.length ? { uri: rewardDetails?.attributes?.business?.logo } : Images.defaultBusiness}
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
              <View marginL-12 flex>
                <Text beb24 lh32 black >{rewardDetails?.attributes?.business?.name}</Text>
                <Text fs12 lh18 gray500 numberOfLines={2}>{rewardDetails?.attributes?.business?.category}</Text>
              </View>
            </View>

          </View>
          {rewardDetails.attributes?.rewardType == 'credit' ?
            <>
              <Text fs14 lh20 gray700>Offer used</Text>
              <Pressable onPress={() => onPressOffers()} style={styles.card}>
                <View row >
                  <View style={{
                    backgroundColor: getCardStyles?.color, height: 32, width: 32, justifyContent: 'center',
                    alignItems: 'center', borderRadius: 32
                  }}>
                    <Image source={getCardStyles?.icon} style={{ height: 16, width: 16, tintColor: "black" }} />
                  </View>
                  <View marginL-16 flex>
                    <Text beb24 lh32 black numberOfLines={1} ellipsizeMode='tail'>{rewardDetails?.attributes?.offer?.title}</Text>
                    <Text fs14 lh20 gray500 numberOfLines={2}>{rewardDetails?.attributes?.offer?.description || ''}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Image source={Images.star} style={{ height: 12, width: 12, tintColor: Colors.gray500 }} />
                    <Text fs14 lh20 gray700 marginL-4>{rewardDetails?.attributes?.offer?.credit}</Text>
                  </View>
                </View>
              </Pressable>
            </>
            : null
          }
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(RewardDetails)

const styles = StyleSheet.create({
  card: {
    marginBottom: 16, marginTop: 8, padding: 16, backgroundColor: Colors.white, borderRadius: 16,
    shadowColor: 'rgba(16,24,40,0.05)', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1,
    borderColor: Colors.gray200, shadowRadius: 2, borderWidth: 1, elevation: 1,
  },
  title: { marginHorizontal: 24, marginTop: 24 },
  starIcon: { marginLeft: 10, height: 30, width: 30, tintColor: Colors.primary600 },
  footer: { marginHorizontal: 24, marginVertical: 16 },
  rightImg: { marginLeft: 12, height: 20, width: 20, tintColor: Colors.primary700 },
  separator: {
    borderTopWidth: 1, borderColor: Colors.gray200, marginTop: 16
  },
  listContainer: {
    paddingHorizontal: 16, paddingVertical: 16,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderColor: Colors.gray200
  },
  tableTitle: { width: '33.33%', paddingLeft: 16, paddingVertical: 13 },
  tableBody: { width: '33.33%', paddingLeft: 16, paddingVertical: 26 },
  pagination: {
    justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 11,
    borderTopWidth: 1, borderColor: Colors.gray200, backgroundColor: Colors.white
  },
  paginationButton: { borderWidth: 1, borderColor: Colors.gray300, borderRadius: 8, padding: 8 },
  badge: {
    paddingHorizontal: 8, paddingVertical: 2,
    backgroundColor: Colors.gray100, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-start'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: 'contain'
  },
})