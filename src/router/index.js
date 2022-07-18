import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { isEmpty } from 'underscore';
import Login from '../screen/login';
import Register from '../screen/register';
import Home from '../screen/home';
import Landing from '../screen/landing';
import Onboarding from '../screen/onboarding';
import ForgotPassword from '../screen/forgotPassword';
import Hub from '../screen/hub';
import AddHub from '../screen/hub/addHub';
import BottomTab from './bottomTab';
import Offers from '../screen/offers';
import OffersList from '../screen/offersList';
import BusinessList from '../screen/businessList';
import History from '../screen/points';
import RewardDetails from '../screen/points/rewardDetails';
import Business from '../screen/business';
import Account from '../screen/account';
import personalDetails from '../screen/personalDetails';
import AccountSettings from '../screen/accountSettings';

const Stack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();
const BusinessStack = createNativeStackNavigator();
const PointsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const _PointsStack = () => {
  return (
    <PointsStack.Navigator initialRouteName={'history'} screenOptions={{ headerShown: false }} >
      <PointsStack.Screen name="history" component={History} />
      <PointsStack.Screen name="rewardDetails" component={RewardDetails} />
    </PointsStack.Navigator>
  )
}

const _OffersStack = () => {
  return (
    <OffersStack.Navigator initialRouteName={'offers'} screenOptions={{ headerShown: false }} >
      <OffersStack.Screen name="offers" component={Offers} />
      <OffersStack.Screen name="offersList" component={OffersList} />
    </OffersStack.Navigator>
  )
}

const _BusinessStack = () => {
  return (
    <BusinessStack.Navigator initialRouteName={'businesses'} screenOptions={{ headerShown: false }} >
      <BusinessStack.Screen name="businesses" component={Business} />
      <BusinessStack.Screen name="businessList" component={BusinessList} />
    </BusinessStack.Navigator>
  )
}

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: false,
      }}
      tabBar={props => <BottomTab {...props} />}
    >
      <Tab.Screen name="homeTab" component={Home} />
      <Tab.Screen name="offersTab" component={_OffersStack} />
      <Tab.Screen name="businessTab" component={_BusinessStack} />
      <Tab.Screen name="pointsTab" component={_PointsStack} />
    </Tab.Navigator>
  )
}

const App = () => {
  const { userData, defaultHub } = useSelector(s => s.user);
  let intialPage = userData ? 'dashboard' : 'landing';
  if (userData && (!defaultHub || isEmpty(defaultHub))) {
    intialPage = 'hub'
  }
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={intialPage} >
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen name="hub" component={Hub} />
        <Stack.Screen name="addHub" component={AddHub} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="personalDetails" component={personalDetails} />
        <Stack.Screen name="accountSettings" component={AccountSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;