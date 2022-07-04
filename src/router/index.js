import React from 'react';
import { Image, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
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
import { logout } from '../redux/reducer/user';

const Stack = createNativeStackNavigator();
const OffersStack = createNativeStackNavigator();
const BusinessStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function business() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> business </Text>
    </View>
  );
}
function points({ navigation }) {
  const dispatch = useDispatch()
  const _logout = () => {
    dispatch(logout())
    navigation.navigate('landing')
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='logout' onPress={_logout} />
    </View>
  );
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
      <BusinessStack.Screen name="businesses" component={business} />
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
        lazy: false
      }}
      tabBar={props => <BottomTab {...props} />}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="offers" component={_OffersStack} />
      <Tab.Screen name="businesses" component={_BusinessStack} />
      <Tab.Screen name="points" component={points} />
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
        <Stack.Screen name="addHub" component={AddHub} />
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;