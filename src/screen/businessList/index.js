import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView, Image, Pressable, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Config from "react-native-config"
import _ from 'underscore';
import apiRequest from '@services/networkProvider';
import { setLoading } from '../../redux/reducer/loading';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import { Colors, Images } from '@constants';
import { fetchBusinessCategory } from '@util'
import styles from './styles';
import { onFollowBusiness } from '../../redux/reducer/business';
import { cloneDeep } from 'lodash';
import { unwrapResult } from '@reduxjs/toolkit';
import ListSkeleton from '../../component/listSkeleton';

const BusinessList = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const listLoading = useSelector(s => s.loading.loading)
  const param = useMemo(() => { return route?.params }, [route])
  const [businessData, _businessData] = useState([])
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)
  const [search, _search] = useState(null)
  const hubId = useSelector(s => s?.user?.defaultHub?.id)
  const [filter, _filter] = useState(null)

  const flatListRef = useRef()

  // useEffect(() => {
  //   fetchData();
  // }, [])

  useEffect(() => {
    fetchData(search, filter);
  }, [defaultHub?.id])

  // const fetchData = (search, filter) => {
  //   console.log('search :>> ', search);
  //   dispatch(setLoading(true))
  //   const category = fetchBusinessCategory(param?.title);
  //   let url = `hubs/${defaultHub?.id}/business?category=${category}`;
  //   if (search && search?.length > 0)
  //     url = `hubs/${defaultHub?.id}/business?category=${category}&search=${search}`;
  //   if (param?.title == 'Latest Businesses')
  //     url = `hubs/${defaultHub?.id}/business?sortBy=latest`;
  //   else if (param?.title == 'Featured businesses')
  //     url = `hubs/${defaultHub?.id}/business?featured=true`;

  //   apiRequest.get(url).then(res => {
  //     _businessData(res?.data || [])
  //     setNextLink(res?.links?.next)
  //     dispatch(setLoading(false))
  //   }).catch(() => {
  //     dispatch(setLoading(false))
  //   })
  // }

  const fetchData = (search, filter) => {
    dispatch(setLoading(true))
    const category = fetchBusinessCategory(param?.title);
    let url = `hubs/${defaultHub?.id}/business?sortBy=${filter?.sortBy ? filter?.sortBy : 'latest'}`;

    if (category)
      url = `${url}&category=${category}`;
    else if (param?.title == 'Featured businesses')
      url = `${url}&featured=true`;

    if (search)
      url = `${url}&search=${search}`;

    if (filter?.category?.length) {
      filter?.category?.forEach((item) => {
        url = `${url}&category=${item}`
      });
    }

    apiRequest.get(url).then(res => {
      _businessData(res?.data || [])
      setNextLink(res?.links?.next)
      dispatch(setLoading(false))
    }).catch((err) => {
      dispatch(setLoading(false))
    })
  }

  const fetchMore = async () => {
    if (nextLink) {
      try {
        _loading(true)
        const res = await apiRequest.get(nextLink);
        if (res?.data) {
          _businessData(old => [...old, ...res?.data])
          setNextLink(res?.links?.next)
        } else {
          _nomore(true)
        }
        _loading(false)
      } catch (error) {
        _loading(false)
      }
    }
    else {
      _nomore(true)
    }
  }

  const navigate = (routeBack) => {
    if (routeBack) {
      navigation.popToTop();
      navigation.navigate(routeBack);
    } else
      navigation.goBack();
  }

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }

  const onPressFollow = (business) => {
    dispatch(setLoading(true))
    let updatedBusinessData = []
    updatedBusinessData = businessData
    updatedBusinessData.map(data => {
      if (data.id == business.id) {
        return data.following = true
      }
    })
    let requestData = {
      hubID: hubId,
      businessID: business?.id
    }
    dispatch(onFollowBusiness(requestData)).then(unwrapResult)
      .then((data) => {
        data?.created && _businessData(cloneDeep(updatedBusinessData))
      })
    setTimeout(() => dispatch(setLoading(false)), 1000)
  }

  const onFilterButtonClick = () => {
    navigation.navigate("businessFilter", {
      source: param?.title,
      filter,
      onApplyFilter: (val) => {
        _filter(val);
        fetchData(search, val);
        moveToTop()
      }
    })
  }

  const onPressBusiness = (business) => {
    navigation.navigate('BusinessInfo', businessInfo = { business })
  }

  const moveToTop = () => flatListRef?.current?.scrollToIndex({ index: 0 });

  const isFilterApplied = () => filter?.sortBy == 'oldest' || filter?.category;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
          {/* <SearchBar style={{ flex: 1, marginVertical: 0 }} placeholder={'Search for Businesses'} /> */}
          <SearchBar
            value={search}
            style={{ flex: 1, marginVertical: 0 }}
            onSearch={(val) => {
              if (businessData.length > 0) {
                moveToTop()
              }
              fetchData(val, filter)
            }}
            onChangeText={(val) => _search(val)}
            placeholder={'Search for Businesses'}
          />
          <Pressable hitSlop={10} onPress={() => onFilterButtonClick()} >
            <Image source={Images.filter} style={{ height: 24, width: 24, marginLeft: 24 }} />
            {isFilterApplied() ?
              <View style={{ backgroundColor: Colors?.primary600, height: 8, width: 8, borderRadius: 8, position: 'absolute', right: 0 }}></View>
              : null
            }
          </Pressable>
        </View>
        <View paddingH-16 row centerV marginB-8 >
          <Pressable onPress={() => navigate(param?.source)} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text beb24 lh32 black flex marginL-10 numberOfLines={1} >{param?.title}</Text>
        </View>
        {
          listLoading ?
            <ListSkeleton source="businessList" /> :
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{ flexGrow: 1 }}
              data={businessData || []}
              renderItem={({ item }) => <Card item={item} onPressBusiness={onPressBusiness} onPressFollow={onPressFollow} />}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={'on-drag'}
              onEndReached={!nomore && fetchMore}
              scrollEventThrottle={16}
              onEndReachedThreshold={0.3}
              refreshing={loading}
              ListFooterComponent={() => (
                <View center marginV-20>
                  {nomore ?
                    <Text gray700>No more results.</Text>
                    : <ActivityIndicator animating={loading} size={'large'} />
                  }
                </View>
              )}
              ListEmptyComponent={() => (
                <View flex center>
                  <Text Text gray700>No matching Business found. Please try again.</Text>
                </View>
              )}
            />}
      </View>
    </SafeAreaView >
  );
}

export default BusinessList

export const Card = ({ item, onPressBusiness, onPressFollow }) => {
  return (
    <Pressable style={styles.card} onPress={() => onPressBusiness(item)}>
      <View row >
        <Image source={item?.logo ? { uri: item?.logo } : Images.defaultBusiness} style={{ height: 72, width: 72, borderRadius: 72 }} />
        <View marginL-12 flex>
          <Text beb24 lh32 black >{item?.name}</Text>
          <Text fs12 lh18 gray500 numberOfLines={2}>{item?.category?.label}</Text>
          <View flex row spread marginT-12 >
            <View style={styles.tag} >
              <Image source={Images.offers} style={{ height: 12, width: 12 }} />
              <Text fs14 ln20 gray700 marginL-4 >Offers: <Text fs14SB >{item?.totalOffers || 0}</Text></Text>
            </View>
            {/* <View style={styles.following} >
              <Text fs14 lh20 gray700 >Following</Text>
            </View> */}
            <TouchableOpacity
              disabled={item?.following}
              activeOpacity={0.7}
              style={[styles.follow, item?.following ? styles.grayBorder : styles.redbackGround]}
              onPress={() => onPressFollow(item)}>
              <Text style={item?.following ? styles.followingText : styles.followText}>
                {item?.following ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </Pressable >
  );
}

