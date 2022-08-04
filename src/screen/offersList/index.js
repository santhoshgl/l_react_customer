import React, { memo, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Image, Pressable, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Config from "react-native-config";
import _ from 'underscore';
import apiRequest from '@services/networkProvider';
import { setLoading } from '../../redux/reducer/loading';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import { Colors, Images } from '@constants';
import { fetchBusinessCategory } from '@util';
import styles from './styles';
import { useRef } from 'react';

const OffersList = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const flatListRef = useRef()

  const param = useMemo(() => { return route?.params }, [route])
  const [offersData, _offersData] = useState([])
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)
  const [search, _search] = useState(null)
  const [filter, _filter] = useState(null)

  useEffect(() => {
    fetchData(search, filter);
  }, [defaultHub?.id])

  const fetchData = (search, filter) => {
    dispatch(setLoading(true))
    const category = fetchBusinessCategory(param?.title);
    let url = `hubs/${defaultHub?.id}/offers?sortBy=${filter?.sortBy ? filter?.sortBy : 'latest'}`;

    if (category)
      url = `${url}&category=${category}`;
    else if (param?.title == 'Featured Offers')
      url = `${url}&featured=true`;

    if (search)
      url = `${url}&search=${search}`;

    apiRequest.get(url).then(res => {
      _offersData(res?.data || [])
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
          _offersData(old => [...old, ...res?.data])
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

  const navigate = (routeBack) => {
    if (routeBack) {
      navigation.popToTop();
      navigation.navigate(routeBack);
    } else
      navigation.goBack();
  }

  useEffect(() => {
    if (param?.source == "homeTab") {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.popToTop();
        navigation.navigate(param?.source);
        return true
      })
      return () => backHandler.remove()
    }
  }, [])

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }

  const onFilterButtonClick = () => {
    navigation.navigate("offerFilter", {
      source: param?.title,
      filter,
      onApplyFilter: (val) => {
        _filter(val);
        fetchData(search, val);
        moveToTop()
      }
    })
  }

  const moveToTop = () => flatListRef?.current?.scrollToIndex({ index: 0 });

  const isFilterApplied = () => filter?.sortBy == 'oldest' || filter?.category;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
          <SearchBar
            value={search}
            style={{ flex: 1, marginVertical: 0 }}
            onSearch={(val) => {
              if (offersData.length > 0) {
                moveToTop()
              }
              fetchData(val, filter)
            }}
            onChangeText={(val) => _search(val)}
            placeholder={'Search for Offers'}
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
        <FlatList
          ref={flatListRef}
          data={offersData || []}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => <Card navigation={navigation} item={item} />}
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
              <Text gray700>No matching offers found. Please try again.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default memo(OffersList)

export const Card = ({ navigation, item }) => {

  const getCardStyles = useMemo(() => {
    let icon = Images.offers;
    let color = Colors.blue;
    if (item?.type == 'Percentage') {
      icon = Images.percent;
      color = Colors.yellow;
    } else if (item?.type == 'Half Price') {
      icon = Images.dollarSign;
      color = Colors.purple;
    } else if (item?.type == 'Free Gift') {
      icon = Images.gift;
      color = Colors.yellow;
    } else if (item?.type == "Buy 1 get 1") {
      icon = Images.award;
      color = Colors.blue;
    } else if (item?.type == "Points") {
      icon = Images.star;
      color = Colors.purple;
    } else {
      icon = Images.offers;
      color = Colors.blue;
    }
    return { icon, color }
  }, [item])

  const onPressOffers = () => {
    navigation.navigate('BusinessInfo', { business: { id: item?.businessID } })
  }

  return (
    <Pressable onPress={() => onPressOffers()} style={styles.card}>
      <View row >
        <View style={{ backgroundColor: getCardStyles?.color, height: 32, width: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 32 }}>
          <Image source={getCardStyles?.icon} style={{ height: 16, width: 16, tintColor: "black" }} />
        </View>
        <View marginL-16 flex>
          <Text beb24 lh32 black numberOfLines={1} ellipsizeMode='tail'>{item?.title || ''}</Text>
          <Text fs14 lh20 gray500 numberOfLines={2}>{item?.description || ''}</Text>
          <View marginT-12 row centerV >
            <Image source={item?.businessLogo ? { uri: item?.businessLogo } : Images.defaultBusinessSmall} style={{ height: 24, width: 24, borderRadius: 24 }} />
            <Text marginL-6 fs12 lh18 gray500>{item?.businessName}</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Image source={Images.star} style={{ height: 12, width: 12, tintColor: Colors.gray500 }} />
          <Text fs14 lh20 gray700 marginL-4>{item?.credit}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.bottom}>
        <Image source={Images.check} style={{ height: 16, width: 16 }} />
        <Text fs12 lh18 gray500 marginL-4>{item?.offersRedeemed ? 'Redeemed' : 'Rewarded'}</Text>
        <Text fs12SB lh18 gray700 marginH-4>{(item?.offersRedeemed ? item?.offersRedeemed : item?.offersRewarded) || 0}</Text>
        <Text fs12 lh18 gray500> times </Text>
      </View>
    </Pressable >
  );
}