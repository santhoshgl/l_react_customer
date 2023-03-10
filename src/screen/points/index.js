import React, { memo, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import Config from "react-native-config";
import _ from "underscore";
import moment from "moment";
import FastImage from "react-native-fast-image";
import Header from "@component/header";
import { Colors, Images } from "@constants";
import { getRewardWallet, getRewards, clearRewardData } from "../../redux/reducer/points";
import TransactionSkleton from "../../component/transactionSkleton";
import { useRoute } from "@react-navigation/native";

const History = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData, defaultHub } = useSelector((s) => s.user);
  const { walletData, rewards } = useSelector((s) => s.points);
  const scrollRef = useRef()
  const [rewardsData, _rewardsData] = useState([]);
  const [nextLink, _nextLink] = useState("");
  const [prevLink, _prevLink] = useState("");
  const [page, _page] = useState(1);
  const [sortBy, _sortBy] = useState('latest');
  const [listLoading, _listLoading] = useState(false);
  const route = useRoute()

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }

  const setPrevLink = (url) => {
    _prevLink(url?.replace(Config.API_URL, ''))
  }

  useEffect(() => {
    if (rewards?.data) {
      moveToTop();
      if (rewards?.meta?.offset) {
        _page((rewards?.meta?.offset / rewards?.meta?.limit) + 1);
      } else {
        _page(1);
      }
      _rewardsData(rewards?.data);
      setNextLink(rewards?.links?.next);
      setPrevLink(rewards?.links?.prev);
    } else {
      _rewardsData([]);
      _nextLink("");
      _prevLink("");
    }
  }, [rewards])

  useEffect(() => {
    if (defaultHub?.id) {
      dispatch(getRewardWallet({ userID: userData?.id, hubID: defaultHub?.id }))
    }
  }, [defaultHub?.id]);

  useEffect(() => {
    if (defaultHub?.id) {
      _listLoading(true)
      dispatch(getRewards({ userID: userData?.id, hubID: defaultHub?.id, sortBy: sortBy })).then(() => {
        _listLoading(false)
      })
    }
  }, [defaultHub?.id, sortBy]);

  const moveToTop = () => scrollRef.current?.scrollTo({
    y: 0,
    animated: true,
  });

  const nextPageHandler = () => {
    if (userData?.id && defaultHub?.id && nextLink)
      dispatch(getRewards({ userID: userData?.id, hubID: defaultHub?.id, url: nextLink }));
  }

  const prevPageHandler = () => {
    if (userData?.id && defaultHub?.id && prevLink)
      dispatch(getRewards({ userID: userData?.id, hubID: defaultHub?.id, url: prevLink }));
  }

  const onRefresh = () => {
    if (defaultHub?.id) {
      _listLoading(true)
      dispatch(getRewardWallet({ userID: userData?.id, hubID: defaultHub?.id }));
      dispatch(getRewards({ userID: userData?.id, hubID: defaultHub?.id, sortBy: sortBy })).then(() => {
        _listLoading(false)
      })
    }
  }

  const referenceHandler = () => {
    _sortBy((prevState) => prevState == "latest" ? "oldest" : "latest")
  }

  useEffect(() => {
    route?.params?._passData(null)
  }, [route?.params])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50 }}
        refreshControl={
          <RefreshControl
            refreshing={listLoading}
            onRefresh={() => onRefresh()}
            tintColor={Colors.primary600}
            colors={[Colors.primary600]}
          />
        }
      >
        <View style={{ backgroundColor: Colors.yellow }}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text fs16 lh24 gray900>
                Credit Balance
              </Text>
            </View>
            <View row centerV style={{ marginHorizontal: 24 }}>
              <Text beb48 lh60 gray900>
                {walletData?.attributes?.balance || 0}
              </Text>
              <FastImage tintColor={Colors.primary600} source={Images.star} style={styles.starIcon} />
            </View>
            <View style={styles.separator} />
            {/* <View row centerV style={styles.footer}>
              <Text fs14 lh20 primary700>
                Transfer credits to City
              </Text>
              <FastImage source={Images.arrowRight} style={styles.rightImg} />
            </View> */}
            <View style={styles.separator2} />
            <TouchableOpacity
              onPress={() => navigation.navigate("offers")}
              row
              centerV
              style={styles.footer}
            >
              <Text fs14 lh20 primary700>
                Use your Credits
              </Text>
              <FastImage source={Images.externalLink} style={styles.rightImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text beb24 lh32 black flex numberOfLines={1}>
            Transaction history
          </Text>
          <Text fs16 lh24 gray500>
            Below you will see your most recent transactions for your Lealzy
            account.
          </Text>
        </View>
        {listLoading ?
          <TransactionSkleton /> :
          rewardsData?.length > 0 ? (
            <>
              <View style={{ backgroundColor: Colors.white, paddingHorizontal: 10 }}>
                <View row centerV flex>
                  <Text fs12 lh18 gray500 flex center style={styles.tableTitle}>
                    Reference
                  </Text>
                  <TouchableOpacity onPress={() => referenceHandler()} style={styles.tableTitleRef}>
                    <Text fs12 lh18 center gray500>
                      Date
                    </Text>
                    <FastImage source={Images.arrowDown} style={{ width: 16, height: 16, transform: [{ rotate: sortBy == "latest" ? "180deg" : '360deg' }] }} />
                  </TouchableOpacity>
                  <Text fs12 lh18 gray500 flex center style={styles.tableTitle}>
                    Credits
                  </Text>
                  <Text fs12 lh18 gray500 flex center style={styles.tableTitle}>
                    Type
                  </Text>
                </View>
                {rewardsData?.map((reward, index) => {
                  return (
                    <TouchableOpacity
                      key={reward?.id}
                      onPress={() =>
                        navigation.navigate("rewardDetails", { rewardId: reward?.id, fromHistroy: true })
                      }
                    >
                      <View
                        row
                        centerV
                        flex
                        style={{
                          backgroundColor:
                            index % 2 == 0 ? Colors.gray50 : Colors.white,
                        }}
                      >
                        <Text fs14 lh20 gray500 center flex style={styles.tableBody}>{`#${reward?.id.substr(reward?.id.length - 4)}`}</Text>
                        <Text fs14 lh20 gray500 center flex style={styles.tableBody}>
                          {moment(reward?.attributes?.createdAt).format("ll")}
                        </Text>
                        <Text fs14 lh20 gray500 center flex style={styles.tableBody}>
                          {reward?.attributes?.credits}
                        </Text>
                        <View fs14 lh20 success700 center flex style={styles.tableBody}>
                          {reward?.attributes?.rewardType == "credit" ? (
                            <View center style={styles.typeText}>
                              <FastImage
                                source={Images.star}
                                tintColor={Colors.success700}
                                style={{
                                  width: 12,
                                  height: 12,
                                  tintColor: Colors.success700,
                                  marginRight: 4,
                                }}
                              />
                              <Text fs12 lh18 success700>
                                Reward
                              </Text>
                            </View>
                          ) : (
                            <View center style={styles.typeReward}>
                              <FastImage
                                source={Images.gift}
                                tintColor={Colors.blue700}
                                style={{
                                  width: 12,
                                  height: 12,
                                  tintColor: Colors.blue700,
                                  marginRight: 4,
                                }}
                              />
                              <Text fs12 lh18 blue700>
                                Redeem
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View row centerV flex style={styles.pagination}>
                <TouchableOpacity onPress={() => prevPageHandler()} disabled={prevLink ? false : true} style={[styles.paginationButton, prevLink ? {} : { backgroundColor: "#e3e3e3" }]}>
                  <FastImage source={Images.back} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
                <Text fs14 lh20 gray700>
                  Page {page} of {rewards?.meta?.totalPages}
                </Text>
                <TouchableOpacity onPress={() => nextPageHandler()} disabled={nextLink ? false : true} style={[styles.paginationButton, nextLink ? {} : { backgroundColor: "#e3e3e3" }]}>
                  <FastImage
                    source={Images.arrowRight}
                    style={{ height: 20, width: 20 }}
                  />

                </TouchableOpacity>
              </View>
            </>
          ) :
            <View flex center>
              <Text gray700>No transactions yet.</Text>
            </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(History);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: "rgba(16,24,40,0.05)",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  title: { marginHorizontal: 24, marginTop: 24 },
  starIcon: {
    marginLeft: 10,
    height: 30,
    width: 30,
    tintColor: Colors.primary600,
  },
  footer: {
    marginHorizontal: 24,
    marginVertical: 16,
    display: "flex",
    flexDirection: "row",
  },
  rightImg: {
    marginLeft: 12,
    height: 20,
    width: 20,
    tintColor: Colors.primary700,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: Colors.gray200,
    marginTop: 16,
  },
  separator2: {
    borderTopWidth: 1,
    borderColor: Colors.gray200,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.gray200,
  },
  tableTitleRef: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 13 },
  tableTitle: { paddingVertical: 13 },
  tableBody: { paddingVertical: 26 },
  pagination: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderTopWidth: 1,
    borderColor: Colors.gray200,
    backgroundColor: Colors.white,
  },
  paginationButton: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    padding: 8,
  },
  typeText: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ECFDF3",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 5,
    minWidth: 50,
  },
  typeReward: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EFF8FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 5,
    minWidth: 50,
  },
});
