import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Login from '../screen/login';
import Register from '../screen/register';
import Dashboard from '../screen/dashboard';
import Landing from '../screen/landing';
import Onboarding from '../screen/onboarding';
import ForgotPassword from '../screen/forgotPassword';
import Hub from '../screen/hub';

const Stack = createNativeStackNavigator();

function App() {
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