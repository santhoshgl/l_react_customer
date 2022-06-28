import React, { memo, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Image, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Config from "react-native-config"
import _ from 'underscore';
import apiRequest from '@services/networkProvider';
import { setLoading } from '../../redux/reducer/loading';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import { Colors } from '@constants';
import { Images } from '../../constants';
import styles from './styles';

const OffersList = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const param = useMemo(() => { return route?.params }, [route])
  const [offersData, _offersData] = useState([])
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }
  useEffect(() => {
    dispatch(setLoading(true))
    apiRequest.get(`hubs/${defaultHub?.id}/offers`).then(res => {
      _offersData(res?.data || [])
      setNextLink(res?.links?.next)
      dispatch(setLoading(false))
    }).catch(() => {
      dispatch(setLoading(false))
    })
  }, [])

  const fetchData = async () => {
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
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header />
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
          <SearchBar style={{ flex: 1, marginVertical: 0 }} placeholder={'Search for Offers'} />
          <Pressable onPress={alert} hitSlop={10}>
            <Image source={Images.filter} style={{ height: 24, width: 24, marginLeft: 24 }} />
          </Pressable>
        </View>
        <View paddingH-16 row centerV marginB-8 >
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text beb24 lh32 black flex marginL-10 numberOfLines={1} >{param?.title}</Text>
        </View>
        <FlatList
          data={offersData || []}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'on-drag'}
          onEndReached={!nomore && fetchData}
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
        />
      </View>
    </SafeAreaView>
  );
}

export default memo(OffersList)

const Card = ({ item }) => {

  const getCardStyles = useMemo(() => {
    let icon = Images.award;
    let color = Colors.blue;
    if (item?.type == 'discount') {
      icon = Images.percent;
      color = Colors.yellow;
    } else if (item?.type == 'credit') {
      icon = Images.dollarSign;
      color = Colors.purple;
    } else if (item?.type == 'gift') {
      icon = Images.gift;
      color = Colors.yellow;
    }
    return { icon, color }
  }, [item])

  return (
    <View style={styles.card}>
      <View row >
        <View style={{ backgroundColor: getCardStyles?.color, height: 32, width: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 32 }}>
          <Image source={getCardStyles?.icon} style={{ height: 16, width: 16 }} />
        </View>
        <View marginL-16 flex>
          <Text beb24 lh32 black >{item?.title || ''}</Text>
          <Text fs14 lh20 gray500 numberOfLines={2}>{item?.description || ''}</Text>
          <View marginT-12 row centerV >
            <Image source={{ uri: item?.businessLogo }} style={{ height: 24, width: 24, borderRadius: 24 }} />
            <Text marginL-6 fs12 lh18 gray500>{item?.businessName}</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Image source={Images.star} style={{ height: 12, width: 12, tintColor: Colors.gray500 }} />
          <Text fs14 lh20 gray700 marginL-4>{item?.credit}</Text>
        </View>
      </View>

    </View >
  );
}