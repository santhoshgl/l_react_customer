import React from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Login from '../screen/login';
import Register from '../screen/register';
import Home from '../screen/home';
import Landing from '../screen/landing';
import Onboarding from '../screen/onboarding';
import ForgotPassword from '../screen/forgotPassword';
import Hub from '../screen/hub';
import BottomTab from './bottomTab';
import Offers from '../screen/offers';
import OffersList from '../screen/offersList';

const Stack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const _OffersStack = () => {
  return (
    <OffersStack.Navigator screenOptions={{ headerShown: false }} >
      <OffersStack.Screen name="offers" component={Offers} />
      <OffersStack.Screen name="offersList" component={OffersList} />
    </OffersStack.Navigator>
  )
}

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true
      }}
      tabBar={props => <BottomTab {...props} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="offers" component={_OffersStack} />
      <Tab.Screen name="businesses" component={Offers} />
      <Tab.Screen name="points" component={Offers} />
    </Tab.Navigator>
  )
}

const App = () => {
  const { userData } = useSelector(s => s.user);
  const intialPage = userData ? 'dashboard' : 'landing';

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={intialPage} >
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen name="hub" component={Hub} />
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;