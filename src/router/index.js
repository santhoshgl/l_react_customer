import React, { useCallback, useEffect } from "react";
import { Pressable, Platform } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { isEmpty } from "underscore";
import { useNetInfo } from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import firebase from "@react-native-firebase/app";
import HighlightText from "@sanar/react-native-highlight-text";
import FastImage from "react-native-fast-image";
import PushNotification from "react-native-push-notification";
import "@react-native-firebase/messaging";
import Login from "../screen/login";
import Register from "../screen/register";
import Home from "../screen/home";
import Landing from "../screen/landing";
import Onboarding from "../screen/onboarding";
import ForgotPassword from "../screen/forgotPassword";
import Hub from "../screen/hub";
import AddHub from "../screen/hub/addHub";
import Offers from "../screen/offers";
import OffersList from "../screen/offersList";
import BusinessList from "../screen/businessList";
import History from "../screen/points";
import RewardDetails from "../screen/points/rewardDetails";
import Business from "../screen/business";
import Account from "../screen/account";
import personalDetails from "../screen/personalDetails";
import AccountSettings from "../screen/accountSettings";
import inviteFriends from "../screen/inviteFriends";
import accountNotifications from "../screen/accountNotifications";
import followingBusiness from "../screen/followingBusiness";
import aboutAccount from "../screen/aboutAccount";
import termsAccount from "../screen/termsAccount";
import privacyPolicyAccount from "../screen/privacyPolicyAccount";
import userNotification from "../screen/userNotification";
import BusinessInfo from "../screen/businessInfo";
import OfferFilter from "../screen/offerFilter";
import store from "../../src/redux/store";
import BusinessFilter from "../screen/businessFilter";
import { Support, Faqs } from "../screen/support";
import {
  DeleteAccountReason,
  ConfirDeleAccount,
  AccountDeleted,
} from "../screen/DeleteAccount";
import {
  handleNotificationBadge,
  onGetRouteNavigationData,
} from "../redux/reducer/user";
import { onGetInternetStatus } from "../redux/reducer/network";
import { onGetRouteName } from "../services/NotificationServices";
import { Colors, Images } from "../constants";
import { View, Text } from "react-native-ui-lib";
import SplashScreen from "react-native-splash-screen";
import { clearRewardData, onSetClearState } from "../redux/reducer/points";

const Stack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();
const BusinessStack = createNativeStackNavigator();
const PointsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
var flashNotifictionData = {};

const handlePressNotification = () => {
  const route = onGetRouteName(flashNotifictionData?.type);
  const navigationData = flashNotifictionData;
  const navigationObj = { route, navigationData, isNavigate: true };
  store.dispatch(onGetRouteNavigationData(navigationObj));
  // store.dispatch(handleNotificationBadge(false))
};

const onCreateNotificationObj = ({ data }) => {
  const type = data?.type;
  flashNotifictionData = {
    type,
    firstRow:
      data?.rewardCredits +
      " Credits " +
      (type === "debit" ? "Redeemed!" : "Rewarded!"),
    secondRow: {
      identification: type === "debit" ? "at " : "by ",
      businessName: data?.businessName,
    },
    thirdRow: data?.hubName,
    rewardID: data?.rewardID,
    notificationID: data?.notificationID,
    hubID: data?.hubID,
    businessID: data?.businessID,
    inAppNotification: true,
  };
  if (type === "offer") {
    flashNotifictionData.firstRow = data?.businessName;
    flashNotifictionData.secondRow = {
      identification: "have added a new ",
      businessName: "offer",
    };
  }
};

export const FlashNotification = (data, onClose) => {
  return (
    <View
      style={{
        padding: 16,
        borderColor: Colors.primary200,
        backgroundColor: Colors.primary25,
        borderRadius: 8,
        flexDirection: "row",
        borderWidth: 1,
        top: flashNotifictionData?.data?.type === "debit" ? 25 : 10,
      }}
    >
      <Pressable
        style={{ flex: 0.9 }}
        onPress={() => handlePressNotification()}
      >
        <View flex marginL-10>
          <Text fs16 black lh24>
            {flashNotifictionData?.firstRow}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text fs14L lh20 gray700 style={{ fontWeight: "400" }}>
              {flashNotifictionData?.secondRow?.identification}
            </Text>
            <Text fs14 lh20 primary700 style={{ fontWeight: "400" }}>
              {flashNotifictionData?.secondRow?.businessName}
            </Text>
          </View>
          <Text fs14 ls20 gray700 style={{ fontWeight: "500" }}>
            {flashNotifictionData?.thirdRow}{" "}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{ flex: 0.1, alignItems: "flex-end" }}
        onPress={() => onClose(false)}
      >
        <FastImage source={Images.x} style={{ height: 16, width: 16 }} />
      </Pressable>
    </View>
  );
};

export const App = ({
  onShowInAppNotification,
  _activeNotification,
  activeNotification,
  passData,
  _passData,
}) => {
  const { userData, defaultHub } = useSelector((s) => s.user);

  const clearState = useSelector((s) => s.points.clearState);

  let intialPage = userData ? "dashboard" : "landing";
  if (userData && (!defaultHub || isEmpty(defaultHub))) {
    intialPage = "hub";
  }

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  useEffect(() => {
    if (!activeNotification) {
      SplashScreen.hide();
    }
  }, []);

  useEffect(() => {
    if (clearState) {
      _passData({});
      onSetClearState(false);
    }
  }, [clearState]);

  const onReceiveInAppNotification = () => {
    firebase.messaging().onMessage((response) => {
      if (response !== null) {
        onShowInAppNotification(true);
        dispatch(handleNotificationBadge(true));
        onCreateNotificationObj(response);
        showMessage({ message: response?.notification?.body });
      }
    });
  };

  const onPressNotification = (notificationDetails) => {
    const route = onGetRouteName(notificationDetails?.data?.type);
    const navigationData = notificationDetails?.data;
    const navigationObj = { route, navigationData, isNavigate: true };
    dispatch(onGetRouteNavigationData(navigationObj));
  };

  // useEffect(() => {
  //   if (activeNotification && !) {
  //     console.log("app.js");
  //     onPressNotification(passData)
  //   }
  // }, [activeNotification, passData])

  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();
    dispatch(onGetInternetStatus(netInfo?.isConnected));
    onReceiveInAppNotification();
  }, [netInfo]); // in order to re-call the hooks whenever the netInfo status changed

  const _PointsStack = () => {
    return (
      <PointsStack.Navigator
        initialRouteName={activeNotification ? "rewardDetails" : "history"}
        screenOptions={{ headerShown: false }}
      >
        <PointsStack.Screen
          name="history"
          component={History}
          initialParams={{ _passData, passData }}
        />
        <PointsStack.Screen
          name="rewardDetails"
          component={RewardDetails}
          initialParams={{
            passData,
            activeNotification,
            _activeNotification,
            _passData,
          }}
        />
      </PointsStack.Navigator>
    );
  };

  const _OffersStack = () => {
    return (
      <OffersStack.Navigator
        initialRouteName={"offers"}
        screenOptions={{ headerShown: false }}
      >
        <OffersStack.Screen name="offers" component={Offers} />
        <OffersStack.Screen name="offersList" component={OffersList} />
        <OffersStack.Screen name="offerFilter" component={OfferFilter} />
      </OffersStack.Navigator>
    );
  };

  const _BusinessStack = () => {
    return (
      <BusinessStack.Navigator
        initialRouteName={activeNotification ? "businessInfo" : "businesses"}
        screenOptions={{ headerShown: false }}
      >
        <BusinessStack.Screen name="businesses" component={Business} />
        <BusinessStack.Screen name="businessList" component={BusinessList} />
        <BusinessStack.Screen
          name="businessInfo"
          component={BusinessInfo}
          initialParams={{
            activeNotification,
            _activeNotification,
          }}
        />
        <BusinessStack.Screen
          name="businessFilter"
          component={BusinessFilter}
        />
      </BusinessStack.Navigator>
    );
  };

  const Dashboard = useCallback((props) => {
    return (
      <Tab.Navigator
        initialRouteName={activeNotification ? "pointsTab" : "homeTab"}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors.primary600,
          tabBarInactiveTintColor: Colors.gray500,
          lazy: false,
          tabBarStyle: {
            height:
              Platform.OS == "android"
                ? getBottomSpace() + 90
                : Platform.isPad
                ? 90
                : getBottomSpace() + 60,
            paddingTop: 16,
            paddingBottom:
              Platform.OS == "android"
                ? 30
                : Platform.isPad
                ? 30
                : getBottomSpace(),
            borderTopWidth: 0.5,
            borderTopColor: Colors.gray300,
          },
          tabBarLabelPosition: "below-icon",
        }}
      >
        <Tab.Screen
          name="homeTab"
          component={Home}
          initialParams={props?.route?.params}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                fs12
                lh18
                style={{ color: focused ? Colors.black : Colors.gray500 }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FastImage
                tintColor={color}
                source={Images.home}
                style={{
                  height: size,
                  width: size,
                  resizeMode: "contain",
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="offersTab"
          component={_OffersStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                fs12
                lh18
                style={{ color: focused ? Colors.black : Colors.gray500 }}
              >
                Offers
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FastImage
                tintColor={color}
                source={Images.offers}
                style={{
                  height: size,
                  width: size,
                  resizeMode: "contain",
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="businessTab"
          component={_BusinessStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                fs12
                lh18
                style={{ color: focused ? Colors.black : Colors.gray500 }}
              >
                Businesses
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FastImage
                tintColor={color}
                source={Images.tab_business}
                style={{
                  height: size,
                  width: size,
                  resizeMode: "contain",
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="pointsTab"
          component={_PointsStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                fs12
                lh18
                style={{ color: focused ? Colors.black : Colors.gray500 }}
              >
                Points
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FastImage
                tintColor={color}
                source={Images.points}
                style={{
                  height: size,
                  width: size,
                  resizeMode: "contain",
                  tintColor: color,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={intialPage}
      >
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen name="hub" component={Hub} />
        <Stack.Screen name="addHub" component={AddHub} />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          initialParams={{
            onShowInAppNotification,
            activeNotification,
            _activeNotification,
            passData,
          }}
        />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="personalDetails" component={personalDetails} />
        <Stack.Screen name="accountSettings" component={AccountSettings} />
        <Stack.Screen name="inviteFriends" component={inviteFriends} />
        <Stack.Screen
          name="accountNotification"
          component={accountNotifications}
        />
        <Stack.Screen name="followingBusiness" component={followingBusiness} />
        <Stack.Screen name="aboutAccount" component={aboutAccount} />
        <Stack.Screen name="termsAccount" component={termsAccount} />
        <Stack.Screen
          name="privacyPolicyAccount"
          component={privacyPolicyAccount}
        />
        <Stack.Screen name="userNotification" component={userNotification} />
        <Stack.Screen name="BusinessInfo" component={BusinessInfo} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Faqs" component={Faqs} />
        <Stack.Screen
          name="DeleteAccountReason"
          component={DeleteAccountReason}
        />
        <Stack.Screen name="ConfirDeleAccount" component={ConfirDeleAccount} />
        <Stack.Screen name="AccountDeleted" component={AccountDeleted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
