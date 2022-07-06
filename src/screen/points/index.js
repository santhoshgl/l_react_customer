import React, { memo, useEffect } from 'react';
import { SafeAreaView, FlatList, Pressable, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import moment from 'moment';
import Header from '@component/header';
import { Colors, Images } from '@constants';
import apiRequest from '@services/networkProvider';
import { setLoading } from '../../redux/reducer/loading';
import { getRewardWallet, getRewards } from '../../redux/reducer/points';

const { width } = Dimensions.get('screen')

const History = ({ navigation }) => {
  const dispatch = useDispatch()
  const { userData, defaultHub } = useSelector(s => s.user)
  const { walletData, rewards } = useSelector(s => s.points)

  useEffect(() => {
    dispatch(getRewardWallet({ userID: userData?.id, hubID: defaultHub?.id }));
    dispatch(getRewards({ userID: userData?.id, hubID: defaultHub?.id }));
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ backgroundColor: Colors.yellow }}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text fs16 lh24 gray900>Credit Balance</Text>
            </View>
            <View row centerV style={{ marginHorizontal: 24 }}>
              <Text beb48 lh60 gray900>{walletData?.attributes?.balance || 0}</Text>
              <Image source={Images.star} style={styles.starIcon} />
            </View>
            <View style={styles.separator} />
            <View row centerV style={styles.footer}>
              <Text fs14 lh20 primary700>Use your Credits</Text>
              <Image source={Images.arrowRight} style={styles.rightImg} />
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text beb24 lh32 black flex numberOfLines={1}>Transaction history</Text>
          <Text fs16 lh24 gray500>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </View>
        <View style={{ backgroundColor: Colors.white }}>
          <View row centerV flex>
            <Text fs12 lh18 gray500 style={styles.tableTitle}>Reference</Text>
            <Text fs12 lh18 gray500 style={styles.tableTitle}>Date</Text>
            <Text fs12 lh18 gray500 style={styles.tableTitle}>Credit Amount</Text>
          </View>
          {rewards?.data?.map((reward, index) => {
            return (
              <TouchableOpacity key={reward?.id} onPress={() => navigation.navigate('rewardDetails', { rewardId: reward?.id })} >
                <View row centerV flex style={{ backgroundColor: index % 2 == 0 ? Colors.gray50 : Colors.white }} >
                  <Text fs14 lh20 gray500 style={styles.tableBody}>{`#${index + 1}`}</Text>
                  <Text fs14 lh20 gray500 style={styles.tableBody}>{moment(reward?.attributes?.createdAt).format('ll')}</Text>
                  <Text fs14 lh20 gray500 style={styles.tableBody}>{reward?.attributes?.credits}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        {rewards?.length > 0 ?
          <View row centerV flex style={styles.pagination}>
            <View style={styles.paginationButton}>
              <Image source={Images.back} style={{ height: 20, width: 20, }} />
            </View>
            <Text fs14 lh20 gray700>Page 1 of {rewards?.meta?.totalPages}</Text>
            <View style={styles.paginationButton}>
              <Image source={Images.arrowRight} style={{ height: 20, width: 20 }} />
            </View>
          </View>
          : null
        }
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(History)

const styles = StyleSheet.create({
  card: {
    borderRadius: 16, backgroundColor: Colors.white, shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 1, height: 2 }, shadowOpacity: 1, shadowRadius: 2, elevation: 1,
    marginHorizontal: 16, marginTop: 24, marginBottom: 32
  },
  title: { marginHorizontal: 24, marginTop: 24 },
  starIcon: { marginLeft: 10, height: 30, width: 30, tintColor: Colors.primary600 },
  footer: { marginHorizontal: 24, marginVertical: 16 },
  rightImg: { marginLeft: 12, height: 20, width: 20, tintColor: Colors.primary700 },
  separator: {
    borderTopWidth: 1, borderColor: Colors.gray200, marginTop: 16
  },
  listContainer: {
    paddingHorizontal: 16, paddingVertical: 24,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderColor: Colors.gray200
  },
  tableTitle: { width: '33.33%', paddingLeft: 16, paddingVertical: 13 },
  tableBody: { width: '33.33%', paddingLeft: 16, paddingVertical: 26 },
  pagination: {
    justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 11,
    borderTopWidth: 1, borderColor: Colors.gray200, backgroundColor: Colors.white
  },
  paginationButton: { borderWidth: 1, borderColor: Colors.gray300, borderRadius: 8, padding: 8 },

})