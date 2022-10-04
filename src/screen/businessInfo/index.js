import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  BackHandler,
} from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Colors } from "@constants";
import { useDispatch, useSelector } from "react-redux";
import { capitalize, cloneDeep } from "lodash";
import { unwrapResult } from "@reduxjs/toolkit";
import Config from "react-native-config";
import FastImage from "react-native-fast-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Images } from "../../constants";
import { convert24hourTo12HourFormat } from "../../services/DateServices";
import { onFollowBusiness } from "../../redux/reducer/business";
import apiRequest from "@services/networkProvider";
import images from "../../constants/images";
import { onPhoneCall } from "../../services/PhoneCallServices";
import ListSkeleton from "../../component/listSkeleton";

const BusinessInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { id } = route?.params?.business;
  const { source, title } = route?.params;
  const { sourceFrom } = route?.params;
  const [businessInfo, setBusinessInfo] = useState();
  const [offerData, setOfferData] = useState([]);
  const [lengthMore, setLengthMore] = useState(false);
  const [showFullMsg, setShowFullMsg] = useState(false);
  const [nextLink, _nextLink] = useState("");
  const [loading, _loading] = useState(false);
  const [nomore, _nomore] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const hubId = useSelector((s) => s?.user?.defaultHub?.id);
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerList, setOfferList] = useState([]);
  const [isDisibleTouch, setDisibleTouch] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (source && source.length) {
          navigation.navigate(source, {
            isRefresh: Math.floor(Math.random() * 900000),
            title,
          });
          return true;
        }
        if (sourceFrom && sourceFrom.length) {
          navigation.goBack();
          return true;
        }
      }
    );
    return () => backHandler.remove();
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    // })
    // return () => backHandler.remove()
  }, []);

  const fetchData = () => {
    let businessInfoUrl = `business/${id}`;
    let offerListUrl = `business/${id}/offers?active=true`;
    setOfferLoading(true);
    apiRequest
      .get(businessInfoUrl)
      .then((res) => {
        setDisibleTouch(false);
        apiRequest.get(offerListUrl).then((res) => {
          setOfferData(cloneDeep(res?.data) || []);
          setOfferList(cloneDeep(res?.data.splice(0, 3)));
          setNextLink(res?.links?.next);
        });
        setOfferLoading(false);
        setBusinessInfo(cloneDeep(res?.data) || {});
      })
      .catch(() => {
        setOfferLoading(false);
      });
  };

  const fetchMore = async () => {
    if (nextLink) {
      try {
        _loading(true);
        const res = await apiRequest.get(nextLink);
        if (res?.data) {
          setOfferList((old) => [...old, ...res?.data]);
          setNextLink(res?.links?.next);
        } else {
          _nomore(true);
          setLoadMore(false);
        }
        _loading(false);
      } catch (error) {
        _loading(false);
      }
    } else {
      _nomore(true);
    }
  };

  const onPressLoadMore = () => {
    setLoadMore(true);
    setOfferList(offerData);
  };

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ""));
  };

  const LoadMore = () => {
    return (
      <Pressable onPress={() => onPressLoadMore()} style={styles.loadMoreView}>
        <Text fs16 gray700 center lh24 style={styles.loadMoreText}>
          {" "}
          Load More
        </Text>
      </Pressable>
    );
  };

  const CloseIcon = () => {
    return (
      <Pressable
        onPress={() =>
          source && source.length
            ? navigation.navigate(source, {
                isRefresh: Math.floor(Math.random() * 900000),
              })
            : navigation.goBack()
        }
      >
        <View style={styles.closeView}>
          <FastImage source={Images.x} style={styles.closeIcon} />
        </View>
      </Pressable>
    );
  };

  const AvtarView = useCallback(() => {
    return (
      <View style={styles.avatarView}>
        {Platform.OS === "android" ? (
          <FastImage
            source={
              businessInfo?.logo?.length > 0
                ? { uri: businessInfo?.logo }
                : Images.defaultBusiness
            }
            style={styles.avatarImg}
          />
        ) : (
          <FastImage
            source={
              businessInfo?.logo?.length > 0
                ? { uri: businessInfo?.logo }
                : Images.defaultBusiness
            }
            style={styles.avatarImg}
          />
        )}
      </View>
    );
  }, [businessInfo]);

  const onTextLayout = useCallback(
    (e) => {
      setLengthMore(e.nativeEvent.lines.length >= 2);
    },
    [lengthMore]
  );

  const onPressSocialLink = (url) => {
    url?.length > 0 && Linking.openURL(url);
  };

  const onClickWebSite = (url) => {
    url?.length > 0 && Linking.openURL(`https://${url}`);
  };

  const SocialMediaView = () => {
    return (
      <View style={{ marginTop: 8 }}>
        {businessInfo?.socialLinks?.facebook && (
          <View style={{ flexDirection: "row" }}>
            <FastImage
              source={Images.fbIcon}
              style={{ height: 24, width: 24, marginRight: 12 }}
            />
            <Text
              fs16
              lh24
              primary700
              onPress={() =>
                onPressSocialLink(businessInfo?.socialLinks?.facebook)
              }
            >
              {businessInfo?.socialLinks?.facebook?.length > 0 &&
                businessInfo?.socialLinks?.facebook.replace(
                  /^.*\/\/[^\/]+/,
                  ""
                )}
            </Text>
          </View>
        )}

        {businessInfo?.socialLinks?.twitter && (
          <View style={{ flexDirection: "row", marginTop: 18 }}>
            <FastImage
              source={Images.twiterIcon}
              style={{ height: 24, width: 24, marginRight: 12 }}
            />
            <Text
              fs16
              lh24
              primary700
              onPress={() =>
                onPressSocialLink(businessInfo?.socialLinks?.twitter)
              }
            >
              {businessInfo?.socialLinks?.twitter?.length > 0 &&
                businessInfo?.socialLinks?.twitter.replace(/^.*\/\/[^\/]+/, "")}
            </Text>
          </View>
        )}
        {businessInfo?.socialLinks?.instagram && (
          <View style={{ flexDirection: "row", marginTop: 18 }}>
            <FastImage
              source={Images.instaIcon}
              style={{ height: 24, width: 24, marginRight: 12 }}
            />
            <Text
              fs16
              lh24
              primary700
              onPress={() =>
                onPressSocialLink(businessInfo?.socialLinks?.instagram)
              }
            >
              {businessInfo?.socialLinks?.instagram?.length > 0 &&
                businessInfo?.socialLinks?.instagram.replace(
                  /^.*\/\/[^\/]+/,
                  ""
                )}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const LocationInfo = () => {
    return (
      <View>
        <View style={{ width: "100%", margin: 15 }} />
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          {businessInfo?.contactDetails?.website && (
            <Pressable
              onPress={() =>
                onClickWebSite(businessInfo?.contactDetails?.website)
              }
            >
              <FastImage
                source={Images.website}
                resizeMode={"contain"}
                style={{ height: 56, width: 56, marginHorizontal: 13 }}
              />
              <Text
                fs12
                lh18
                gray500
                center
                style={{ fontWeight: "500", paddingTop: 3 }}
              >
                {" "}
                Website
              </Text>
            </Pressable>
          )}
          {/* <View>
                        <FastImage source={Images.direction} resizeMode={'contain'} style={{ height: 56, width: 56, marginHorizontal: 13 }} />
                        <Text fs12 lh18 gray500 center style={{ fontWeight: '500', paddingTop: 3 }}> Directions</Text>
                    </View> */}
          {businessInfo?.contactDetails?.phoneNumber && (
            <Pressable
              onPress={() =>
                onPhoneCall(businessInfo?.contactDetails?.phoneNumber)
              }
            >
              <FastImage
                source={Images.phone}
                resizeMode={"contain"}
                style={{ height: 56, width: 56, marginHorizontal: 13 }}
              />
              <Text
                fs12
                lh18
                gray500
                center
                style={{ fontWeight: "500", paddingTop: 3 }}
              >
                {" "}
                Phone
              </Text>
            </Pressable>
          )}
        </View>
        <View style={{ marginLeft: 24, marginTop: 25 }}>
          {businessInfo?.addressLine?.length > 0 && (
            <>
              <Text fs16SB lh24 black style={{ fontWeight: "600" }}>
                {businessInfo?.name}
              </Text>
              <Text fs16 lh24 black style={{ fontWeight: "400", marginTop: 8 }}>
                {businessInfo?.addressLine}, {businessInfo?.addressLine2 + "\n"}
                {businessInfo?.city}, {businessInfo?.state},{" "}
                {businessInfo?.zipCode}
              </Text>
            </>
          )}
          {businessInfo?.contactDetails?.businessEmail && (
            <Text
              fs16SB
              lh24
              black
              style={{ fontWeight: "600", marginTop: 24 }}
            >
              Email
            </Text>
          )}
          <Text fs16 lh24 primary700 style={{ fontWeight: "400" }}>
            {businessInfo?.contactDetails?.businessEmail}
          </Text>
          {businessInfo?.socialLinks &&
            Object.keys(businessInfo?.socialLinks).length > 0 && (
              <>
                <Text
                  fs16SB
                  lh24
                  black
                  style={{ fontWeight: "600", marginTop: 24 }}
                >
                  Social
                </Text>
                <SocialMediaView />
              </>
            )}
        </View>
      </View>
    );
  };
  const OpeningHours = () => {
    return (
      <View style={{ paddingBottom: 30 }}>
        <Text
          fs16SB
          lh24
          black
          style={{ fontWeight: "600", marginTop: 29, paddingLeft: 24 }}
        >
          Opening Hours
        </Text>
        {businessInfo?.openHours &&
          Object.keys(businessInfo?.openHours).map((schedule) => {
            return (
              <View
                style={{
                  paddingLeft: 24,
                  marginTop: 6,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Text
                    fs16
                    lh24
                    black
                    style={{
                      fontWeight: "400",
                      marginVertical: 1,
                      flex: 0.3,
                    }}
                  >
                    {capitalize(schedule)}
                  </Text>
                  <View
                    style={{
                      flex: 0.6,
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      fs16
                      lh24
                      black
                      style={{
                        fontWeight: "400",
                        marginVertical: 1,
                      }}
                    >
                      {businessInfo?.openHours[schedule]?.status !== "closed"
                        ? convert24hourTo12HourFormat(
                            businessInfo?.openHours[schedule]?.startTime
                          ) +
                          " - " +
                          convert24hourTo12HourFormat(
                            businessInfo?.openHours[schedule]?.endTime
                          )
                        : capitalize(businessInfo?.openHours[schedule]?.status)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  const FollowView = () => {
    return (
      <View style={styles.followView}>
        <TouchableOpacity
          disabled={isDisibleTouch || businessInfo?.following}
          activeOpacity={0.7}
          style={[
            styles.follow,
            businessInfo?.following ? styles.grayBorder : styles.redbackGround,
          ]}
          onPress={() => onPressFollow(businessInfo)}
        >
          <Text
            style={
              businessInfo?.following ? styles.followingText : styles.followText
            }
          >
            {businessInfo?.following ? "Following" : "Follow"}
          </Text>
          {/* following  */}
        </TouchableOpacity>
      </View>
    );
  };

  const Description = () => {
    return (
      <Pressable style={{}}>
        <Text
          fs16
          black
          lh24
          onTextLayout={onTextLayout}
          numberOfLines={showFullMsg ? undefined : 4}
          style={styles.descriptionText}
        >
          {businessInfo?.description}
        </Text>
        {businessInfo?.description?.length > 1 && !showFullMsg ? (
          <Text
            onPress={() => setShowFullMsg(!showFullMsg)}
            style={styles.readMoreText}
          >
            Read More
          </Text>
        ) : (
          businessInfo?.description?.length > 1 && (
            <Text
              onPress={() => setShowFullMsg(!showFullMsg)}
              style={styles.readMoreText}
            >
              Read Less
            </Text>
          )
        )}
      </Pressable>
    );
  };

  const BusinessTitle = () => {
    return (
      <>
        <Text beb30 black style={styles.titleText}>
          {businessInfo?.name}
        </Text>

        <Text fs12 gray500 lh18 style={styles.titleText}>
          {businessInfo?.category?.label}
        </Text>
      </>
    );
  };

  const BannerImage = useCallback(() => {
    return businessInfo?.bannerImage?.length > 0 ? (
      Platform.OS === "android" ? (
        <FastImage
          source={{ uri: businessInfo?.bannerImage }}
          style={styles.bannerImage}
        />
      ) : (
        <FastImage
          source={{ uri: businessInfo?.bannerImage }}
          style={styles.bannerImage}
        />
      )
    ) : (
      <FastImage source={Images.businessCover} style={styles.bannerImage} />
    );
  }, [businessInfo?.bannerImage?.length]);

  const OfferCard = ({ item, businessDetails }) => {
    const getCardStyles = useMemo(() => {
      let icon = Images.offers;
      let color = Colors.blue;
      if (item?.type == "Percentage") {
        icon = Images.percent;
        color = Colors.yellow;
      } else if (item?.type == "Half Price") {
        icon = Images.dollarSign;
        color = Colors.purple;
      } else if (item?.type == "Free Gift") {
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
      return { icon, color };
    }, [item]);

    return (
      <View style={styles.card}>
        <View row padding-16>
          <View
            style={{
              backgroundColor: getCardStyles?.color,
              height: 32,
              width: 32,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 32,
            }}
          >
            <FastImage
              tintColor={Colors.black}
              source={getCardStyles?.icon}
              style={{ height: 16, width: 16, tintColor: "black" }}
            />
          </View>
          <View marginL-16 flex>
            <Text beb24 lh32 black numberOfLines={1} ellipsizeMode="tail">
              {item?.title || ""}
            </Text>
            <Text fs14 lh20 gray500 numberOfLines={2}>
              {item?.description || ""}
            </Text>
            <View marginT-12 row centerV>
              <FastImage
                source={
                  businessDetails?.logo
                    ? { uri: businessDetails?.logo }
                    : images.defaultBusinessSmall
                }
                style={{ height: 24, width: 24, borderRadius: 24 }}
              />
              <Text marginL-6 fs12 lh18 gray500>
                {" "}
                {businessDetails?.name}
              </Text>
            </View>
          </View>
          <View style={styles.badge}>
            <FastImage
              tintColor={Colors.gray500}
              source={Images.star}
              style={{ height: 12, width: 12, tintColor: Colors.gray500 }}
            />
            <Text fs14 lh20 gray700 marginL-4>
              {item?.credit}
            </Text>
          </View>
        </View>
        <View
          style={{ height: 1, width: "100%", backgroundColor: Colors.gray200 }}
        />
        <View style={{ flexDirection: "row", marginVertical: 8 }}>
          <FastImage
            source={Images.check}
            style={{
              height: 17,
              width: 17,
              alignSelf: "center",
              marginLeft: 17,
              marginRight: 6,
            }}
          />
          <Text fs12 lh18 gray500 style={{ fontWeight: "400" }}>
            Rewarded{" "}
          </Text>
          <Text fs12 lh18 gray700 style={{ fontWeight: "600" }}>
            {" "}
            {item?.offersRewarded ? item?.offersRewarded : 0}{" "}
          </Text>
          <Text fs12 lh18 gray500 style={{ fontWeight: "400" }}>
            {" "}
            times{" "}
          </Text>
        </View>
      </View>
    );
  };

  const onPressFollow = (business) => {
    let updatedBusinessData = {};
    updatedBusinessData = business;
    updatedBusinessData.following = true;
    let requestData = {
      hubID: hubId,
      businessID: business?.id,
    };
    dispatch(onFollowBusiness(requestData))
      .then(unwrapResult)
      .then((data) => {
        data?.created && setBusinessInfo(cloneDeep(updatedBusinessData));
      });
  };

  const NoOffersFound = () => {
    return (
      <View center marginT-20>
        <Text gray700 marginB-50>
          No offers found
        </Text>
      </View>
    );
  };

  const Offers = useCallback(() => {
    return (
      <View style={styles.offerView}>
        <Text beb30 black style={styles.offerText}>
          OFFERS
        </Text>
        {offerLoading ? (
          <View style={{ marginTop: 32 }}>
            <ListSkeleton source="offerList" />
          </View>
        ) : (
          <>
            <FlatList
              data={offerList}
              extraData={offerList}
              renderItem={({ item }) => (
                <OfferCard item={item} businessDetails={businessInfo} />
              )}
              ListEmptyComponent={NoOffersFound}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={"on-drag"}
              onEndReached={!nomore && fetchMore}
              scrollEventThrottle={16}
              numberOfLines={4}
              onEndReachedThreshold={0.3}
              nestedScrollEnabled={true}
              refreshing={loading}
              style={{ top: 40 }}
              ListFooterComponent={() => (
                <View center marginV-20>
                  {nomore && loadMore ? (
                    <Text gray700 marginB-50>
                      No more offers.
                    </Text>
                  ) : (
                    <ActivityIndicator animating={loading} size={"large"} />
                  )}
                </View>
              )}
            />
            {offerData?.length > 2 && !loadMore && <LoadMore />}
          </>
        )}
      </View>
    );
  }, [offerList, loadMore, nomore, offerLoading, loading]);

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <View
        style={
          businessInfo?.bannerImage?.length > 0
            ? styles.withBannerBar
            : styles.defaultStatusbar
        }
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.white }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <CloseIcon />
        <BannerImage businessInfo={businessInfo} />
        <View>
          <AvtarView />
          <FollowView />
        </View>
        <BusinessTitle />
        {businessInfo?.description?.length > 0 && <Description />}
        <Offers />
        <LocationInfo />
        <OpeningHours />
      </ScrollView>
    </>
  );
};

export default memo(BusinessInfo);

const styles = StyleSheet.create({
  defaultStatusbar: { backgroundColor: Colors.white, height: 40 },
  withBannerBar: { backgroundColor: Colors.white, height: 40 },
  closeView: {
    backgroundColor: Colors.white,
    position: "absolute",
    top: 20,
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
  closeIcon: { height: 17, width: 17, alignSelf: "center" },
  bannerImage: { height: 200, width: "100%", position: "relative", zIndex: -1 },
  bannerImageView: {
    height: 220,
    width: "100%",
    position: "relative",
    zIndex: -1,
    backgroundColor: Colors.yellow,
  },
  avatarView: {
    backgroundColor: Colors.white,
    right: 10,
    borderRadius: 60,
    top: -60,
    marginLeft: 24,
    height: 120,
    width: 120,
    justifyContent: "center",
  },
  avatarImg: {
    height: "100%",
    width: "100%",
    height: 114,
    width: 114,
    borderRadius: 57,
    alignSelf: "center",
  },
  followView: { position: "absolute", right: 24, top: 24 },
  follow: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-end",
  },
  followText: {
    textAlign: "center",
    alignSelf: "center",
    color: Colors.white,
    fontSize: 14,
  },
  followingText: {
    textAlign: "center",
    alignSelf: "center",
    color: Colors.gray700,
    fontSize: 14,
    padding: 2,
    fontWeight: "500",
  },
  redbackGround: {
    backgroundColor: Colors.primary600,
  },
  grayBorder: {
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  titleText: { top: -36, fontWeight: "400", paddingLeft: 16 },
  descriptionText: {
    top: -36,
    fontWeight: "400",
    paddingLeft: 16,
    marginTop: 8,
    width: "96%",
    alignSelf: "stretch",
  },
  readMoreText: { top: -30, fontWeight: "400", paddingLeft: 16, color: "red" },
  card: {
    borderRadius: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    shadowColor: "rgba(16,24,40,0.05)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: Colors.gray100,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  offerView: { flex: 1, backgroundColor: Colors.gray50 },
  offerText: { fontWeight: "400", paddingLeft: 16, top: 28 },
  loadMoreView: {
    width: 160,
    height: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginBottom: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
  loadMoreText: { fontWeight: "500", alignSelf: "center" },
  bottomSafearea: { flex: 0, backgroundColor: Colors.white },
});

// const BannerImage = memo(({ businessInfo }) => {
//   return businessInfo?.bannerImage?.length > 0 ? (
//     Platform.OS === 'android' ?
//       <FastImage
//         source={{ uri: businessInfo?.bannerImage }}
//         style={styles.bannerImage}
//         resizeMode={"stretch"}
//       /> :
//       <FastImage
//         source={{ url: businessInfo?.bannerImage }}
//         style={styles.bannerImage}
//         resizeMode={"stretch"}
//       />
//   ) : (
//     <FastImage
//       source={Images.businessCover}
//       style={styles.bannerImage}
//       resizeMode={"stretch"}
//     />
//   );
// })
