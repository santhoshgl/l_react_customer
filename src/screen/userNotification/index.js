import React, { memo, useEffect, useState } from "react";
import {
  SafeAreaView,
  Pressable,
  Image,
  SectionList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { View, Text } from "react-native-ui-lib";
import moment from "moment";
import { cloneDeep } from "lodash";
import FastImage from "react-native-fast-image";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Images } from "@constants";
import {
  getNotification,
  readAllNotifications,
} from "../../redux/reducer/user";
import NotificationSkeleton from "../../component/notificationSkleton";
import styles from "./styles";
import { clearPassData, clearRewardData } from "../../redux/reducer/points";

const UserNotification = ({ navigation }) => {
  const { userNotification } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [groupData, _groupData] = useState([]);
  const [isCheckedMarkAll, setMarkAll] = useState(false);
  const [loader, setLoader] = useState(false);

  const onGetNotificationList = () => {
    setLoader(true);
    dispatch(getNotification())
      .then(() => {
        setLoader(false);
      })
      .catch(() => setLoader(false));
  };

  useEffect(() => {
    onGetNotificationList();
  }, []);

  useEffect(() => {
    if (userNotification?.length > 0) {
      const updated = [
        { title: "New", data: [] },
        { title: "Today", data: [] },
        { title: "This Week", data: [] },
        { title: "This Month", data: [] },
        { title: "Earlier", data: [] },
      ];
      userNotification?.forEach((item) => {
        const notificationData = {
          type: item?.reward?.type,
          firstRow:
            item?.reward?.credits +
            " Credits " +
            (item?.reward?.type === "credit" ? "Rewarded!" : "Redeemed!"),
          secondRow: {
            identification: item?.reward?.type === "credit" ? "by " : "at ",
            businessName: item?.business?.name,
          },
          thirdRow: item?.hub?.name,
          forthRow: item?.created,
          read: item?.read,
          rewardId: item?.reward?.id,
          notificationID: item?.id,
          hubId: item?.hub?.id,
          businessID: item?.business?.id,
        };
        if (item?.type === "offer") {
          notificationData.type = "offer";
          notificationData.firstRow = item?.business?.name;
          notificationData.secondRow = {
            identification: "have added a new ",
            businessName: "offer",
          };
          notificationData.logo = item?.business?.logo;
        }
        if (
          moment(item.created).isSame(moment(), "day") &&
          item?.read == false
        ) {
          updated[0]?.data?.push(notificationData);
        } else if (
          moment(item.created).isSame(moment(), "day") &&
          item?.read == true
        ) {
          updated[1]?.data?.push(notificationData);
        } else if (
          moment(item.created).isBetween(
            moment().startOf("week"),
            moment().endOf("week")
          )
        ) {
          updated[2]?.data?.push(notificationData);
        } else if (
          moment(item.created).isBetween(
            moment().startOf("month"),
            moment().endOf("month")
          )
        ) {
          updated[3]?.data?.push(notificationData);
        } else {
          updated[4]?.data?.push(notificationData);
        }
      });

      let notificationData = updated.filter((item) => item.data.length > 0);
      let isRequireMarkAll = updated.filter(
        (item) => item?.data[0]?.read === false
      );
      isRequireMarkAll?.length === 0 ? setMarkAll(true) : setMarkAll(false);
      // isRequireMarkAll?.length > 0 ? notificationData[0].showMarkAll = true : notificationData
      notificationData[0].showMarkAll = true;
      _groupData(cloneDeep(notificationData));
    }
  }, [userNotification, dispatch]);

  const onPressMarkAllRead = () => {
    setMarkAll(!isCheckedMarkAll);
    dispatch(readAllNotifications())
      .then(unwrapResult)
      .then((res) => {
        dispatch(getNotification());
      });
  };

  const onPressNotificationItem = (item) => {
    if (
      item?.type === "reward" ||
      item?.type === "credit" ||
      item?.type === "debit"
    ) {
      dispatch(clearRewardData());
      dispatch(clearPassData());
      navigation.navigate("rewardDetails", {
        rewardId: item?.rewardId,
        notificationID: item?.notificationID,
        hubId: item?.hubId,
        fromNotificationList: true,
      });
    } else if (item?.type === "offer") {
      navigation.navigate("BusinessInfo", {
        business: { id: item?.businessID },
        notificationID: item?.notificationID,
        notificationRead: item?.read,
      });
    }
  };

  const NotificationCard = ({ item }) => {
    let imageSource = { uri: item?.logo };
    if (item.type === "offer" && !item.logo) {
      imageSource = Images?.defaultBusiness;
    } else if (item.type === "credit") {
      imageSource = Images?.notificationStar;
    } else if (item.type === "debit") {
      imageSource = Images?.giftNotification;
    }
    return (
      <Pressable
        style={[
          styles.notificationContainer,
          !item?.read ? { backgroundColor: Colors.primary25 } : {},
        ]}
        onPress={() => onPressNotificationItem(item)}
      >
        <FastImage
          source={imageSource}
          style={{ height: 32, width: 32, marginTop: 2, borderRadius: 200 }}
        />
        <View flex marginL-10>
          <Text fs16 black lh24>
            {item?.firstRow}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text fs14L lh20 gray700 style={{ fontWeight: "400" }}>
              {item?.secondRow?.identification}
            </Text>
            <Text fs14 lh20 primary700 style={{ fontWeight: "400" }}>
              {item?.secondRow?.businessName}
            </Text>
          </View>
          <Text fs14 ls20 gray700 style={{ fontWeight: "500" }}>
            {item?.thirdRow}{" "}
          </Text>
          <Text fs12 lh18 gray500 style={{ marginLeft: -2 }}>
            {" "}
            {moment(item?.forthRow).fromNow()}{" "}
          </Text>
        </View>
      </Pressable>
    );
  };

  const onRefresh = () => {
    _groupData([]);
    onGetNotificationList();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View
          row
          centerV
          marginH-16
          marginV-16
          style={{ justifyContent: "space-between" }}
        >
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <FastImage source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black>
            Notifications
          </Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      {loader ? (
        <NotificationSkeleton />
      ) : (
        <SectionList
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.gray50,
            paddingHorizontal: 16,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={cloneDeep(groupData) || []}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <NotificationCard item={item} />}
          renderSectionHeader={({ section: { title, showMarkAll } }) => (
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text primary700 fs14 lh20 marginT-16>
                {" "}
                {title}{" "}
              </Text>
              {showMarkAll && (
                <TouchableOpacity
                  disabled={isCheckedMarkAll}
                  onPress={() => onPressMarkAllRead()}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <FastImage
                    source={
                      !isCheckedMarkAll
                        ? Images.checkNotifications
                        : Images.notificationGray
                    }
                    style={{
                      width: 13,
                      height: 10,
                      marginBottom: 3,
                      alignSelf: "flex-end",
                      marginRight: 5,
                    }}
                  />
                  <Text
                    fs14
                    lh20
                    marginT-16
                    style={{
                      color: !isCheckedMarkAll
                        ? Colors.primary700
                        : Colors.gray500,
                    }}
                  >
                    {" "}
                    Mark all as read{" "}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          ListEmptyComponent={() => (
            <View flex center>
              <Text gray700>No new notifications.</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={{ marginTop: 30 }} />}
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={onRefresh}
              tintColor={Colors.primary600}
              colors={[Colors.primary600]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default memo(UserNotification);
