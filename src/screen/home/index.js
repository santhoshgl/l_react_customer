import React, { memo, useEffect } from 'react';
import { SafeAreaView, FlatList, Pressable, ScrollView, Image, Dimensions } from 'react-native';
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
import { getUser } from '../../redux/reducer/user';
import { getOffers } from '../../redux/reducer/offers';
import { getBusiness } from '../../redux/reducer/business';
import styles from './styles';

const { width } = Dimensions.get('screen')

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const { offerData, offerLoading } = useSelector(s => s.offers)
  const { businessData, businessLoading } = useSelector(s => s.business)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getOffers(defaultHub?.id))
    dispatch(getBusiness(defaultHub?.id))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50 }}>
        <Qr />
        <View paddingT-24  >
          <View paddingH-16 row spread centerV >
            <Text beb24 lh32 black flex numberOfLines={1} >{'Featured Offers'}<Text primary600 beb32 >{'.'}</Text></Text>
            <Pressable hitSlop={10} onPress={() => {
              navigation.jumpTo('offers', { screen: 'offersList', params: { title: 'Featured Offers', source: 'home' } });
            }}>
              <Text fs14M lh20 primary700 >See all</Text>
            </Pressable>
          </View>
          {offerLoading ? <OfferCardSkeleton /> :
            <FlatList
              horizontal
              data={offerData || []}
              renderItem={({ item }) => <OfferCard item={item} loading={offerLoading} />}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              keyboardDismissMode={'on-drag'}
            />
          }
          <View style={styles.separator} />
        </View>

        <View paddingT-24  >
          <View paddingH-16 row spread centerV >
            <Text beb24 lh32 black flex numberOfLines={1} >{'Featured Businesses'}<Text primary600 beb32 >{'.'}</Text></Text>
            <Pressable hitSlop={10} onPress={() => {
              navigation.navigate('businesses', { screen: 'businessList', params: { title: 'Featured businesses', item: offerData, source: 'home' } });
            }}>
              <Text fs14M lh20 primary700 >See all</Text>
            </Pressable>
          </View>
          {businessLoading ? <BusinessCardSkeleton /> :
            <FlatList
              horizontal
              data={businessData || []}
              renderItem={({ item }) => <BusinessCard item={item} />}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              keyboardDismissMode={'on-drag'}
            />
          }
          <View style={styles.separator} />
        </View>
        {/* <View style={styles.card} > */}
        <Image source={Images.heroCard}
          style={{ width: width - 32, height: width - 32, marginTop: 60, marginBottom: 30, alignSelf: 'center' }} />
        {/* </View> */}
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(Home)