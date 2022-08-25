import React, { memo, useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  Pressable,
  Modal,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, View, Button } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Colors, Images } from "@constants";
import { getNotification, getUser, handleNotificationBadge, updateUser } from "../redux/reducer/user";
import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";

const windowHeight = Dimensions.get("window").height;

const Header = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData, defaultHub, userNotification, showNotificationBadge } = useSelector((s) => s.user);
  const [showHubs, _showHubs] = useState(false);
  const [showHubAdded, _showHubAdded] = useState(false);
  const [addedHub, _addedHub] = useState(undefined);
  const focus = useIsFocused()

  const _onSelectHub = (_hub) => {
    dispatch(getUser())
      .then(unwrapResult)
      .then((res) => {
        var updatedUser = { ...res };
        var hubs =
          updatedUser?.hubs?.map((hub) => {
            var temp = Object.assign({}, hub);
            temp.default = _hub?.id == temp?.id ? true : false;
            return temp;
          }) || [];
        updatedUser["hubs"] = hubs;
        _showHubs(false);
        dispatch(updateUser(updatedUser))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            dispatch(getUser())
              .then(unwrapResult)
              .then((response) => { });
          });
      });
  };

  useEffect(() => {
    dispatch(getNotification())
  }, [focus])

  useEffect(() => {
    if (userNotification?.length > 0) {
    }
    let notificationReadCount = _.filter(userNotification, notification => { return notification?.read === false })
    notificationReadCount?.length > 0 ? dispatch(handleNotificationBadge(true)) :
      dispatch(handleNotificationBadge(false))
  }, [userNotification, focus])

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors.white,
          borderBottomColor: Colors.gray200,
          borderBottomWidth: 1,
        }}
      >
        <View right row centerV marginT-12 marginH-16>
          <Pressable onPress={() => navigation.navigate("userNotification")}>
            {showNotificationBadge ?
              <Image
                source={Images.notificationPending}
                style={{ height: 24, width: 24, marginRight: 27 }}
              /> :
              <Image
                source={Images.bell}
                style={{ height: 24, width: 24, marginRight: 27 }}
              />}
          </Pressable>
          <Pressable onPress={() => navigation.navigate("account")}>
            {userData?.profilePicture ? (
              <Image
                source={{ uri: userData?.profilePicture }}
                style={{ height: 32, width: 32, borderRadius: 32 }}
              />
            ) : (
              <View
                center
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 32,
                  backgroundColor: Colors.primary50,
                }}
              >
                <Image
                  source={Images.user}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: Colors.primary600,
                  }}
                />
              </View>
            )}
          </Pressable>
        </View>
        <View row centerV marginV-12 marginH-16>
          <TouchableOpacity
            onPress={() => _showHubs(true)}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={defaultHub?.logo ? { uri: defaultHub?.logo } : Images.hubLogoDefault}
              style={{ height: 40, width: 40, borderRadius: 40 }}
            />
            <Text beb30 black marginH-12 numberOfLines={1}>
              {defaultHub?.name}
            </Text>
            <Image
              source={Images.down}
              style={{ height: 24, width: 24, borderRadius: 24 }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {showHubs ? (
        <Modal
          visible={true}
          transparent
          animationType={"none"}
          onRequestClose={() => _showHubs(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              padding-24
              bg-white
              style={{
                borderTopLeftRadius: 24,
                maxHeight: windowHeight / 1.5,
                borderTopRightRadius: 24,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 24,
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <View style={{ height: 24, width: 24 }} />
                <Text fs16SB black>
                  Cities
                </Text>
                <Pressable onPress={() => _showHubs(false)}>
                  <Image source={Images.x} style={{ height: 24, width: 24 }} />
                </Pressable>
              </View>

              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {userData?.hubs?.map((_hub, i) => {
                  return (
                    <TouchableOpacity onPress={() => _onSelectHub(_hub)}>
                      <View row centerV marginV-8 key={i}>
                        <Image
                          source={_hub?.logo ? { uri: _hub?.logo } : Images.hubLogoDefault}
                          style={{ height: 32, width: 32, borderRadius: 32 }}
                        />
                        <Text beb24 black marginH-12 lh32 numberOfLines={1}>
                          {_hub?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <Button
                label={"Add another City"}
                marginV-24
                onPress={() => {
                  _showHubs(false);
                  navigation.navigate("addHub", {
                    addedHub: userData?.hubs?.map((item) => item?.id),
                    handleItem: (item, hub) => {
                      _addedHub(hub);
                      _showHubAdded(item);
                    },
                  });
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
      {showHubAdded && addedHub ? (
        <Modal visible={true} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View padding-16 marginB-94 bg-white style={{ borderRadius: 16 }}>
              <ImageBackground
                source={addedHub?.bannerImage ? { uri: addedHub?.bannerImage } : Images.hubCover}
                imageStyle={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  height: 122,
                }}
              >
                <Pressable onPress={() => _showHubAdded(false)}>
                  <Image
                    source={Images.x}
                    style={{
                      height: 20,
                      width: 20,
                      position: "absolute",
                      top: 12,
                      right: 12,
                      tintColor: Colors.white,
                    }}
                  />
                </Pressable>
                <Image
                  source={addedHub?.logo ? { uri: addedHub?.logo } : Images.hubLogoDefault}
                  style={{
                    height: 72,
                    width: 72,
                    borderRadius: 75,
                    marginTop: 86,
                    alignSelf: "center",
                    borderWidth: 3,
                    borderColor: Colors.white,
                  }}
                />
                <Text
                  beb24
                  ln32
                  center
                  marginT-16
                  marginB-8
                  black
                >{`${addedHub?.name} Added!`}</Text>
                <View row center marginB-4>
                  <Image source={Images.pin} style={{ height: 15, width: 12 }} resizeMode={'contain'} />
                  <Text center fa12 gray500 marginL-8 ln18>{addedHub?.city}{addedHub?.state ? `, ${addedHub?.state}` : ''}{addedHub?.country ? `, ${addedHub?.country}` : ''}</Text>
                </View>
                <Text fs14 ln20 center gray500 marginB-8>
                  {addedHub?.description}
                </Text>
                <Text
                  fs14SB
                  lh20
                  primary700
                  center
                  marginV-8
                  onPress={() => _showHubAdded(false)}
                >
                  {"Continue"}
                </Text>
              </ImageBackground>
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default memo(Header);
