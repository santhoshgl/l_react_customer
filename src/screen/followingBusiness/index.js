import React, { memo, useEffect, useState } from 'react';
import { Image, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
import SearchBar from '../../component/searchBar';
import { Colors, Images } from '@constants';
import { useMemo } from 'react';
import { setLoading } from '../../redux/reducer/loading';
import apiRequest from '@services/networkProvider';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Config from "react-native-config"


const FollowingBusiness = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const hubID = useSelector(s => s.user?.defaultHub?.id)
    const [businessData, _businessData] = useState([])
    const [nextLink, _nextLink] = useState('')
    const [loading, _loading] = useState(false)
    const [nomore, _nomore] = useState(false)
    const [search, _search] = useState(null)
    const userId = auth().currentUser?.uid;

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [search])

    const fetchData = () => {
        dispatch(setLoading(true))
        let url = `followers/business?hubID=${hubID}&userID=${userId}`;
        apiRequest.get(url).then(res => {
            _businessData( res?.data || [])
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

    const setNextLink = (url) => {
        _nextLink(url?.replace(Config.API_URL, ''))
      }

      const Card = ({ item }) => {
        return (
            <View style={styles.card}>
                <View row >
                    <Image source={item?.logo ? { uri: item?.logo } : Images.defaultBusiness} style={{ height: 72, width: 72, borderRadius: 72 }} />
                    <View marginL-12 flex>
                        <Text beb24 lh32 black >{item?.name}</Text>
                        <Text fs12 lh18 gray500 marginT-5 >{item?.category?.label}</Text>

                        <Text fs12 lh18 gray500 numberOfLines={2}>{item?.category?.description}</Text>
                        <View flex row spread style={{ alignItems: 'center' }} >
                            <View style={styles.tag} >
                                <Image source={Images.offers} style={{ height: 12, width: 12 }} />
                                <Text fs14 ln20 gray700 marginL-4 >Offers: <Text fs14SB  >{item?.totalOffers || 0}</Text></Text>
                            </View>
                            <TouchableOpacity
                                disabled={item?.following}
                                activeOpacity={0.7}
                                style={[styles.follow, styles.grayBorder]}
                                onPress={() => onPressFollow(item)}>
                                <Text style={item?.following ? styles.followingText : styles.followText}>
                                    {item?.following ? "Following" : "Follow"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View >
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue, paddingTop: Platform.OS === 'ios' ? 40 : 30 }}>
            <View style={{ flexDirection: 'row', height: 100 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 0.2 }}>
                    <Image source={Images.backBlack} style={{ height: 20, width: 20, margin: 20 }} />
                </TouchableOpacity>
                <View style={{ flex: 0.6 }}>
                    <Text style={{ marginVertical: 20, fontSize: 16, textAlign: 'center', fontWeight: '600' }} fs14 lh24>Following</Text>
                </View>
            </View>

            <View style={{ backgroundColor: Colors.gray50, flex: 1 }}>

                    <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center', top: -40 }}>
                        <SearchBar style={{ flex: 1, marginVertical: 0 }} placeholder={'Search for Business'} fromFollowingBusiness />
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
                    style={{ marginTop: -40 }}
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

        </View>

    )

}
export default memo(FollowingBusiness)