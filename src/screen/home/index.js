import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Pressable, ScrollView, Image, Dimensions, RefreshControl } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import Header from '@component/header';
import Qr from '@component/qr';
import OfferCard from '@component/offers/offerCard';
import OfferCardSkeleton from '@component/offers/offerCardSkeleton';
import BusinessCard from '@component/business/card';
import BusinessCardSkeleton from '@component/business/businessCardSkeleton';
import { Colors, Images } from '@constants';
import { getUser, registerNotificationToken } from '../../redux/reducer/user';
import { getFeaturedOffers } from '../../redux/reducer/offers';
import { getFeaturedBusiness } from '../../redux/reducer/business';
import styles from './styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';
import { useRoute } from '@react-navigation/native';
import { getRewardWallet } from '../../redux/reducer/points';

const { width } = Dimensions.get('screen')

const Home = ({ navigation },) => {
  const dispatch = useDispatch()
  const { userData, defaultHub } = useSelector(s => s.user)
  const { featuredOfferData, offerLoading } = useSelector(s => s.offers)
  const { featuredBusinessData, businessLoading } = useSelector(s => s.business)
  const userDeviceToken = useSelector(s => s.user?.deviceToken?.token)
  const onNotificationData = useSelector(s => s.user.routeNavigationData)
  const [isRefresh, onSetRefresh] = useState(false)
  const route = useRoute()

  useEffect(() => {
    var pushNotificationTokens = []
    dispatch(getUser()).then(unwrapResult).then((res) => {
      pushNotificationTokens = [...res?.pushNotificationTokens || [], userDeviceToken]
      pushNotificationTokens = uniqBy(pushNotificationTokens, function (tokens) {
        return tokens
      });
      dispatch(registerNotificationToken(pushNotificationTokens))
    })
  }, [])

  useEffect(() => {
    getDetails()
  }, [defaultHub?.id])

  const onPressBusiness = (business) => {
    navigation.navigate('BusinessInfo', businessInfo = { business })
  }


  useEffect(() => {
    if (onNotificationData?.isNavigate) {
      route?.params?.onShowInAppNotification(false)
      navigation.navigate(onNotificationData?.route)
    }
  }, [onNotificationData])


  const onRefresh = () => {
    onSetRefresh(true)
    if (defaultHub?.id) {
      dispatch(getRewardWallet({ userID: userData?.id, hubID: defaultHub?.id }));
    }
    getDetails()
  }


  const getDetails = () => {
    if (defaultHub?.id) {
      dispatch(getFeaturedOffers(defaultHub?.id))
      dispatch(getFeaturedBusiness(defaultHub?.id))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50 }}
        refreshControl={
          <RefreshControl
            refreshing={offerLoading || businessLoading}
            onRefresh={onRefresh}
          />
        }>
        <Qr isRefresh={isRefresh} onSetRefresh={onSetRefresh} />
        {
          featuredOfferData?.length > 0 ?
            <View paddingT-24 >
              <View paddingH-16 row spread centerV >
                <Text beb24 lh32 black flex numberOfLines={1} >{'Featured Offers'}<Text primary600 beb32 >{'.'}</Text></Text>
                <Pressable hitSlop={10} onPress={() => {
                  navigation.navigate('offersTab', { screen: 'offersList', params: { title: 'Featured Offers', source: 'homeTab' } });
                }}>
                  {featuredOfferData?.length == 1 ? <Text></Text> : <Text fs14M lh20 primary700 >See all</Text>}
                </Pressable>
              </View>
              {offerLoading ? <OfferCardSkeleton /> :
                <FlatList
                  horizontal
                  data={featuredOfferData || []}
                  renderItem={({ item }) => <OfferCard item={item} loading={offerLoading} />}
                  keyExtractor={(_, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  keyboardDismissMode={'on-drag'}
                />
              }
              <View style={styles.separator} />
            </View>
            : null
        }
        {
          featuredBusinessData?.length > 0 ?
            <View paddingT-24 >
              <View paddingH-16 row spread centerV >
                <Text beb24 lh32 black flex numberOfLines={1} >{'Featured Businesses'}<Text primary600 beb32 >{'.'}</Text></Text>
                <Pressable hitSlop={10} onPress={() => {
                  navigation.navigate('businessTab', { screen: 'businessList', params: { title: 'Featured businesses', source: 'homeTab' } });
                }}>
                  {
                    featuredBusinessData?.length == 1 ?
                      <Text></Text> : <Text fs14M lh20 primary700 >See all</Text>
                  }
                </Pressable>
              </View>
              {businessLoading ? <BusinessCardSkeleton /> :
                <FlatList
                  horizontal
                  data={featuredBusinessData || []}
                  renderItem={({ item }) => <BusinessCard item={item} onPressBusiness={onPressBusiness} />}
                  keyExtractor={(_, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  keyboardDismissMode={'on-drag'}
                />
              }
              <View style={styles.separator} />
            </View>
            : null
        }
        <Image
          source={Images.heroCard}
          style={{ width: width - 32, height: width - 32, marginVertical: 30, alignSelf: 'center' }}
        />
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(Home)