import React, { memo, useEffect, useRef, useState, useMemo } from 'react';
import { SafeAreaView, Pressable, FlatList, ActivityIndicator, RefreshControl, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { cloneDeep } from 'lodash';
import { unwrapResult } from '@reduxjs/toolkit';
import { Card } from '../businessList';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import BusinessList from '@component/business/businessList';
import { Colors, Images } from '@constants';
import { getBusiness, getFilteredBusiness, onFollowBusiness } from '../../redux/reducer/business';
import apiRequest from '@services/networkProvider';
import { setLoading } from '../../redux/reducer/loading';

const Business = ({ navigation }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const { businessData, filteredBusiness, businessLoading } = useSelector(s => s.business)
  const hubId = useSelector(s => s?.user?.defaultHub?.id)
  const flatListRef = useRef()

  const [businessFilterList, _businessFilterList] = useState([])
  const [search, _search] = useState(null)
  const [filter, _filter] = useState(null)
  const [isListView, _isListView] = useState(false)
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)

  useEffect(() => {
    if (defaultHub?.id) {
      dispatch(getBusiness(defaultHub?.id))
    }
  }, [defaultHub?.id])

  useEffect(() => {
    if (filteredBusiness) {
      _businessFilterList(filteredBusiness?.data || [])
      setNextLink(filteredBusiness?.links?.next)
    }
  }, [filteredBusiness])

  const businessList = useMemo(() => {
    let filterData = {};
    Object.keys(businessData || {}).forEach(item => {
      if (businessData[item] && businessData[item].length > 0) {
        filterData = { ...filterData, [item]: businessData[item] }
      }
    });
    return filterData;
  }, [businessData])

  useEffect(() => {
    if (filter?.sortBy?.length > 0 || filter?.category?.length > 0 || search?.length > 0) {
      _isListView(true)
      if (businessFilterList.length > 0) {
        moveToTop()
      }
    } else {
      _isListView(false)
    }
  }, [filter])

  const moveToTop = () => flatListRef?.current?.scrollToIndex({ index: 0 });

  const fetchFilteredBusiness = (hubId, search, filter) => {
    dispatch(getFilteredBusiness({ hubId, search, filter }))
  }

  const onSearchOffers = (val) => {
    fetchFilteredBusiness(defaultHub?.id, val, filter);
    if (filter?.sortBy?.length > 0 || val?.length > 0 || filter?.category?.length > 0) {
      _isListView(true)
      if (businessFilterList.length > 0) {
        moveToTop()
      }
    }
    else {
      _isListView(false)
    }
  }

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }

  const onFilterButtonClick = () => {
    Keyboard.dismiss()
    setTimeout(() => {
      navigation.navigate("businessFilter", {
        source: 'all',
        filter,
        onApplyFilter: (val) => {
          _filter(val);
          fetchFilteredBusiness(defaultHub?.id, search, val);
        }
      })
    }, 500);
  }

  const fetchMore = async () => {
    if (nextLink) {
      try {
        _loading(true)
        const res = await apiRequest.get(nextLink);
        if (res?.data) {
          _businessFilterList(old => [...old, ...res?.data])
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

  const onPressBusiness = (business) => {
    navigation.navigate('BusinessInfo', businessInfo = { business })
  }

  const onPressFollow = (business) => {
    dispatch(setLoading(true))
    const getBusiness = [...businessFilterList].map((item) => {
      if (item.id == business.id) {
        return { ...item, following: true }
      }
      else return item
    })
    let requestData = {
      hubID: hubId,
      businessID: business?.id
    }

    dispatch(onFollowBusiness(requestData)).then(unwrapResult)
      .then((data) => {
        data?.created && _businessFilterList(cloneDeep(getBusiness))
      })
    setTimeout(() => dispatch(setLoading(false)), 1000)
  }

  const _handleRefresh = () => {
    dispatch(getBusiness(defaultHub?.id))
    dispatch(getFilteredBusiness({ hubId, search, filter }))
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
        <SearchBar
          value={search}
          style={{ flex: 1, marginVertical: 0 }}
          placeholder={'Search for Businesses'}
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
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>

        {isListView ?
          <FlatList
            ref={flatListRef}
            data={businessFilterList || []}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => <Card item={item} onPressBusiness={onPressBusiness} onPressFollow={onPressFollow} />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            onEndReached={!nomore && fetchMore}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.3}
            refreshing={loading}
            refreshControl={
              <RefreshControl
                refreshing={businessLoading}
                onRefresh={() => _handleRefresh()}
                tintColor={Colors.primary600}
                colors={[Colors.primary600]}
              />
            }
            ListEmptyComponent={() => (
              <View flex center>
                <Text gray700>No matching Business found. Please try again.</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View center marginV-20>
                {!businessFilterList && nomore ?
                  <Text gray700>No more results.</Text>
                  : <ActivityIndicator animating={loading} size={'large'} />
                }
              </View>
            )}
          />
          :
          <FlatList
            data={Object.keys(businessList) || []}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => (
              <BusinessList
                item={businessList?.[item]}
                title={item}
                onPressBusiness={onPressBusiness}
                businessLoading={businessLoading}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            refreshControl={
              <RefreshControl
                refreshing={businessLoading}
                onRefresh={() => _handleRefresh()}
                tintColor={Colors.primary600}
                colors={[Colors.primary600]}
              />
            }
            ListEmptyComponent={() => (
              <View flex center>
                <Text gray700>No businesses found.</Text>
              </View>
            )}
          />
        }
      </View>
    </SafeAreaView >
  );
}

export default memo(Business)