import React, { memo, useState } from "react";
import {
  SafeAreaView,
  ImageBackground,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import _ from "underscore";
import { Colors, Images } from "@constants";
import {
  getUser,
  logout,
  registerNotificationToken,
  updateImageProfile,
  updateUser,
} from "../../redux/reducer/user";
import styles from "./styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { setLoading } from "../../redux/reducer/loading";

const windowHeight = Dimensions.get("window").height;

const Account = ({ navigation }) => {
  const { userData } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [pictureModal, _pictureModel] = useState(false);
  const [picture, _picture] = useState(userData?.profilePicture);
  const userDeviceToken = useSelector((s) => s.user?.deviceToken?.token);
  const [logoutModal, _logoutModal] = useState(false);
  const [divisibleButton, setDivisibleButton] = useState(false)

  const _logout = () => {
    setDivisibleButton(true)
    var pushNotificationTokens = [];
    dispatch(setLoading(true))
    dispatch(getUser())
      .then(unwrapResult)
      .then((res) => {
        pushNotificationTokens = [...res?.pushNotificationTokens];
        const index = pushNotificationTokens.indexOf(userDeviceToken);
        if (index > -1) {
          // only splice array when item is found
          pushNotificationTokens.splice(index, 1); // 2nd parameter means remove one item only
        }
        dispatch(registerNotificationToken(pushNotificationTokens))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            dispatch(logout());
            dispatch(setLoading(false))
            setDivisibleButton(false)
            navigation.reset({
              index: 0,
              routes: [{ name: "landing" }],
            });
          });
      });
  };

  const takePhotoHandler = async () => {
    const options = { noData: true };
    const result = await launchCamera(options);
    if (result?.assets) {
      _pictureModel(false);
      setTimeout(() => {
        const img = result?.assets[0];
        saveProfilePicture(img);
      }, 500);
    }
  };

  const saveProfilePicture = (img) => {
    dispatch(
      updateImageProfile({
        image: { name: img?.fileName, type: img?.type, uri: img?.uri },
        user: userData,
      })
    )
      .unwrap()
      .then((res) => {
        _picture(img?.uri);
      });
  };

  const choosePhotoHandler = async () => {
    const options = { noData: true };
    const result = await launchImageLibrary(options);
    if (result?.assets) {
      _pictureModel(false);
      setTimeout(() => {
        const img = result?.assets[0];
        saveProfilePicture(img);
      }, 500);
    }
  };

  const deleteHandler = () => {
    let updatedUser = { ...userData };
    updatedUser.profilePicture = "";
    _pictureModel(false);
    setTimeout(() => {
      dispatch(updateUser(updatedUser))
        .then(unwrapResult)
        .then((res) => {
          dispatch(getUser())
            .then(unwrapResult)
            .then((response) => {
              dispatch(setLoading(false));
              _picture("");
            });
        });
    }, 500);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ backgroundColor: Colors.white }}>
          <View
            row
            centerV
            marginH-16
            marginT-16
            style={{ justifyContent: "space-between" }}
          >
            <Pressable onPress={navigation.goBack} hitSlop={10}>
              <Image source={Images.back} style={{ height: 24, width: 24 }} />
            </Pressable>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}
        >
          <View center>
            <View style={{ height: 197, width: 201 }}>
              <ImageBackground source={Images.account} re style={styles.image}>
                {picture && picture.length ? (
                  <View center style={styles.defaultUser}>
                    <Image
                      source={{ uri: picture }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                      }}
                    />
                    <View center style={styles.selectPicView}>
                      <Pressable
                        hitSlop={10}
                        onPress={() => _pictureModel(true)}
                      >
                        <Image
                          source={Images.camera}
                          style={styles.cameraIcon}
                        />
                      </Pressable>
                    </View>
                  </View>
                ) : (
                  <View center style={styles.defaultUser}>
                    <Image source={Images.user} style={styles.userIcon} />
                    <View center style={styles.selectPicView}>
                      <Pressable
                        hitSlop={10}
                        onPress={() => _pictureModel(true)}
                      >
                        <Image
                          source={Images.camera}
                          style={styles.cameraIcon}
                        />
                      </Pressable>
                    </View>
                  </View>
                )}
              </ImageBackground>
            </View>
          </View>
          <View style={styles.listContainer}>
            <Text beb24 lh32 black flex numberOfLines={1}>
              Hi {userData?.firstName}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.detailContainer}
            onPress={() => navigation.navigate("personalDetails")}
          >
            <Image source={Images.user} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              Personal Details{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailContainer}
            onPress={() => navigation.navigate("accountSettings")}
          >
            <Image source={Images.key} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              Account Settings{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailContainer}
            onPress={() => navigation.navigate("accountNotification")}
          >
            <Image source={Images.bell} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              Notifications{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.detailContainer} onPress={() => navigation.navigate("accountNotification")}>
            <Image source={Images.bell} style={styles.featureIcon} />
            <Text fs16 lh24 flex black> Notifications </Text>
            <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.detailContainer}
            onPress={() => navigation.navigate("aboutAccount")}
          >
            <Image source={Images.info} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              About Lealzy{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailContainer}
            onPress={() => navigation.navigate("inviteFriends")}
          >
            <Image source={Images.send} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              Invite friends{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Support")}
            style={styles.detailContainer}>
            <Image source={Images.support} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              Support{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailContainer}
            onPress={() => {
              navigation.navigate("DeleteAccountReason");
            }}
          >
            <Image source={Images.x_close} style={styles.featureIcon} />
            <Text fs16 lh24 flex black>
              {" "}
              Delete Account{" "}
            </Text>
            <Image
              source={Images.chevron_right}
              style={styles.chevron_rightIcon}
            />
          </TouchableOpacity>
          <View style={styles.logoutBtn}>
            <Text
              style={styles.sampleStyle}
              black
              marginB-60
              fs16
              lh20
              onPress={() => {
                _logoutModal(true);
              }}
            >
              Log out
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      {logoutModal && (
        <Modal
          visible={logoutModal}
          transparent
          animationType={"fade"}
          onRequestClose={() => _logoutModal(false)}
        >
          <Pressable
            disabled={divisibleButton}
            onPress={() => _logoutModal(false)}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              marginH-16
              bg-white
              style={{
                marginBottom: 67,
                borderRadius: 32,
                // height: windowHeight / 2.5,
                // height: 284,
              }}
            >
              <Image source={Images.logout} style={styles.logoutIcon} />
              <Text
                lh32
                beb24
                center
                marginT-16
                black
                style={styles.fontWeight400}
              >
                LOGOUT
              </Text>
              <Text fs14 center gray500 lh20 marginT-8>
                Are you sure you would like to log out?
              </Text>
              <Button
                disabled={divisibleButton}
                onPress={() => _logout()}
                marginH-16
                marginT-24
                label={"Yes, Log Out"}
              ></Button>
              <Button
                disabled={divisibleButton}
                onPress={() => _logoutModal(false)}
                marginH-16
                marginT-12
                style={styles.cancleButton}
              >
                <Text fs16 gray700 center lh24 style={styles.fontWeight400}>
                  Cancel
                </Text>
              </Button>
            </View>
          </Pressable>
        </Modal>
      )}
      {pictureModal ? (
        <Modal
          visible={true}
          transparent
          animationType={"fade"}
          onRequestClose={() => _pictureModel(false)}
        >
          <Pressable
            onPress={() => _pictureModel(false)}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              paddingH-24
              paddingV-42
              bg-white
              style={{
                borderTopLeftRadius: 32,
                maxHeight: windowHeight / 1.5,
                borderTopRightRadius: 32,
              }}
            >
              {/* <View style={{ flexDirection: 'row', borderRadius: 24, justifyContent: 'space-between' }} >
                  <View style={{ height: 24, width: 24 }} />
                  <Pressable onPress={() => _pictureModel(false)} >
                    <Image source={Images.x} style={{ height: 24, width: 24 }} />
                  </Pressable>
                </View> */}
              <TouchableOpacity onPress={() => takePhotoHandler()}>
                <View row centerV marginV-8>
                  <Image source={Images.camera} style={styles.iconModal} />
                  <Text fs16 black lh24 numberOfLines={1}>
                    Take Photo
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => choosePhotoHandler()}>
                <View row centerV marginV-8>
                  <Image source={Images.select_pic} style={styles.iconModal} />
                  <Text fs16 black lh24 numberOfLines={1}>
                    Choose Photo
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressIn={() => deleteHandler()}>
                {picture && picture.length ? (
                  <View row centerV marginV-8>
                    <Image source={Images.delete} style={styles.iconModal} />
                    <Text fs16 black lh24 numberOfLines={1}>
                      Delete Photo
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      ) : null}
    </>
  );
};

export default memo(Account);
