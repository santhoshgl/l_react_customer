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
import { Colors, Images } from '@constants';
import { fetchBusinessCategory } from '@util'
import styles from './styles';

const BusinessList = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const param = useMemo(() => { return route?.params }, [route])
  const [businessData, _businessData] = useState([])
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)
  const [search, _search] = useState(null)

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchData();
  }, [search])

  const fetchData = () => {
    dispatch(setLoading(true))

    const category = fetchBusinessCategory(param?.title);
    let url = `hubs/${defaultHub?.id}/business?category=${category}`;
    if (search && search?.length > 0)
      url = `hubs/${defaultHub?.id}/business?category=${category}&search=${search}`;
    if (param?.title == 'Latest Businesses')
      url = `hubs/${defaultHub?.id}/business?sortBy=latest`;
    else if (param?.title == 'Featured businesses')
      url = `hubs/${defaultHub?.id}/business?featured=true`;

    apiRequest.get(url).then(res => {
      _businessData(res?.data || [])
      setNextLink(res?.links?.next)
      dispatch(setLoading(false))
    }).catch(() => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
          <SearchBar style={{ flex: 1, marginVertical: 0 }} placeholder={'Search for Businesses'} />
          <Pressable onPress={() => { }} hitSlop={10}>
            <Image source={Images.filter} style={{ height: 24, width: 24, marginLeft: 24 }} />
          </Pressable>
        </View>
        <View paddingH-16 row centerV marginB-8 >
          <Pressable onPress={() => navigate(param?.source)} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text beb24 lh32 black flex marginL-10 numberOfLines={1} >{param?.title}</Text>
        </View>
        <FlatList
          data={businessData || []}
          renderItem={({ item }) => <Card item={item} />}
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
        />
      </View>
    </SafeAreaView>
  );
}

export default memo(BusinessList)

const Card = ({ item }) => {

  return (
    <View style={styles.card}>
      <View row >
        <Image source={{ uri: item?.logo }} style={{ height: 72, width: 72, borderRadius: 72 }} />
        <View marginL-12 flex>
          <Text beb24 lh32 black >{item?.name}</Text>
          <Text fs12 lh18 gray500 numberOfLines={2}>{item?.category?.description}</Text>
          <View flex row spread marginT-12 >
            <View style={styles.tag} >
              <Image source={Images.offers} style={{ height: 12, width: 12 }} />
              <Text fs14 ln20 gray700 marginL-4 >Offers: <Text fs14SB >{item?.totalOffers || 0}</Text></Text>
            </View>
            {/* <View style={styles.following} >
              <Text fs14 lh20 gray700 >Following</Text>
            </View> */}
            <View style={styles.follow} >
              <Text fs14 lh20 gray700 white>Follow</Text>
            </View>
          </View>
        </View>
      </View>

    </View >
  );
}