import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView, Pressable, FlatList, Text, ActivityIndicator, RefreshControl, Keyboard } from 'react-native';
import { View } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import Config from "react-native-config";
import _ from 'underscore';
import apiRequest from '@services/networkProvider';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import OfferList from '../../component/offers/offerList';
import { Colors } from '@constants';
import { getOffers, getFilteredOffers } from '../../redux/reducer/offers';
import { Images } from '../../constants';
import { Card } from '../offersList';

const Offers = ({ navigation }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const { offerData, filteredOffers, offerLoading } = useSelector(s => s.offers)
  const flatListRef = useRef()

  const [offerFilterList, _offerFilterList] = useState([])
  const [search, _search] = useState(null)
  const [filter, _filter] = useState(null)
  const [isListView, _isListView] = useState(false)
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)

  useEffect(() => {
    if (defaultHub?.id) {
      dispatch(getOffers({ hubId: defaultHub?.id }));
    }
  }, [defaultHub])

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }

  useEffect(() => {
    if (filteredOffers) {
      _offerFilterList(filteredOffers?.data  || [])
      setNextLink(filteredOffers?.links?.next)
    }
  }, [filteredOffers])

  const offersList = useMemo(() => {
    let filterData = {};
    Object.keys(offerData || {}).forEach(item => {
      if (offerData[item] && offerData[item].length > 0) {
        filterData = { ...filterData, [item]: offerData[item] }
      }
    });
    return filterData;
  }, [offerData])

  const fetchFilteredOffers = (hubId, search, filter) => {
    dispatch(getFilteredOffers({ hubId, search, filter }))
  }

  const onFilterButtonClick = () => {
    Keyboard.dismiss()
    setTimeout(() => {
      navigation.navigate("offerFilter", {
        source: 'all',
        filter,
        onApplyFilter: (val) => {
          _filter(val);
          fetchFilteredOffers(defaultHub?.id, search, val);
        }
      })
    }, 500);
  }

  useEffect(() => {
    if (filter?.sortBy?.length > 0 || filter?.category?.length > 0 || search?.length > 0) {
      _isListView(true)
      if (offerFilterList.length > 0) {
        moveToTop()
      }
    } else {
      _isListView(false)
    }
  }, [filter])

  const moveToTop = () => flatListRef?.current?.scrollToIndex({ index: 0 });

  const onSearchOffers = (val) => {
    fetchFilteredOffers(defaultHub?.id, val, filter);
    if (filter?.sortBy?.length > 0 || val?.length > 0 || filter?.category?.length > 0) {
      _isListView(true)
      if (offerFilterList.length > 0) {
        moveToTop()
      }
    }
    else {
      _isListView(false)
    }
  }


  const fetchMore = async () => {
    if (nextLink) {
      try {
        _loading(true)
        const res = await apiRequest.get(nextLink);
        if (res?.data) {
          _offerFilterList(old => [...old, ...res?.data])
          setNextLink(res?.links?.next)
        } else {
          _nomore(true)
        }
        _loading(false)
      } catch (error) {
        _loading(false)
      }
    } else {
      _nomore(true)
    }
  }

  const _handleRefresh = () => {
    dispatch(getOffers({ hubId: defaultHub?.id }));
    dispatch(getFilteredOffers({ hubId: defaultHub?.id, search, filter }))
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
          <SearchBar
            value={search}
            style={{ flex: 1, marginVertical: 0 }}
            placeholder={'Search for Offers'}
            onChangeText={(val) => _search(val)}
            onSearch={(val) => onSearchOffers(val)}
          />
          <Pressable onPress={() => onFilterButtonClick()} hitSlop={10}>
            <FastImage source={Images.filter} style={{ height: 24, width: 24, marginLeft: 24 }} />
            {(filter?.sortBy?.length > 0 || filter?.category?.length > 0) ?
              <View style={{ backgroundColor: Colors?.primary600, height: 8, width: 8, borderRadius: 8, position: 'absolute', right: 0 }}></View>
              : null
            }
          </Pressable>
        </View>
        {isListView ?
          <FlatList
            ref={flatListRef}
            data={offerFilterList || []}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => <Card navigation={navigation} item={item} />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            onEndReached={!nomore && fetchMore}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={() => (
              <View flex center>
                <Text gray700>No matching offers found. Please try again.</Text>
              </View>
            )}
            refreshing={loading}
            refreshControl={
              <RefreshControl
                refreshing={offerLoading}
                onRefresh={() => _handleRefresh()}
                tintColor={Colors.primary600}
                colors={[Colors.primary600]}
              />
            }
            ListFooterComponent={() => (
              <View center marginV-20>
                {nomore ?
                  <Text gray700>No more results.</Text>
                  : <ActivityIndicator animating={loading} size={'large'} />
                }
              </View>
            )}
          />
          :
          <FlatList
            data={Object.keys(offersList) || []}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => <OfferList item={offersList?.[item]} title={item} offerLoading={offerLoading} />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            refreshControl={
              <RefreshControl
                refreshing={offerLoading}
                onRefresh={() => _handleRefresh()}
                tintColor={Colors.primary600}
                colors={[Colors.primary600]}
              />
            }
            ListEmptyComponent={() => (
              <View flex center>
                <Text gray700>No offers found.</Text>
              </View>
            )}
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default memo(Offers)