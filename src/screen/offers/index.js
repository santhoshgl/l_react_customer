import React, { memo, useEffect, useMemo } from 'react';
import { SafeAreaView, Image, Pressable, FlatList } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import OfferList from '../../component/offers/offerList';
import { Colors } from '@constants';
import { getOffers } from '../../redux/reducer/offers';
import { Images } from '../../constants';

const Offers = ({ navigation }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const { offerData } = useSelector(s => s.offers)

  useEffect(() => {
    if (defaultHub?.id) {
      dispatch(getOffers(defaultHub?.id))
    }
  }, [defaultHub])

  const offersList = useMemo(() => {
    let filterData = {};
    Object.keys(offerData).forEach(item => {
      if (offerData[item] && offerData[item].length > 0) {
        filterData = { ...filterData, [item]: offerData[item] }
      }
    });
    return filterData;
  }, [offerData])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
          <SearchBar style={{ flex: 1, marginVertical: 0 }} placeholder={'Search for Offers'} />
          <Pressable onPress={() => { }} hitSlop={10}>
            <Image source={Images.filter} style={{ height: 24, width: 24, marginLeft: 24 }} />
          </Pressable>
        </View>
        <FlatList
          data={Object.keys(offersList) || []}
          renderItem={({ item }) => <OfferList item={offersList?.[item]} title={item} />}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'on-drag'}
        />
      </View>
    </SafeAreaView>
  );
}

export default memo(Offers)