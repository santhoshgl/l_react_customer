import React, { memo, useEffect } from 'react';
import { SafeAreaView, ImageBackground, StatusBar, Platform } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { Images, Colors } from '../../constants';
import { onGetDeviceToken } from '../../redux/reducer/user';
import { useDispatch } from 'react-redux';
import { getToken, onMessage, requestPermissions } from '../../services/IOSNotificationServices';
import PushNotification from 'react-native-push-notification';


const Landing = ({ navigation }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    if (Platform.OS === 'android') {      


      PushNotification.configure({
        onRegister: function (tokenData) {
          let deviceToken = {
            deviceType: Platform.OS,
            token: tokenData?.token
          };
          dispatch(onGetDeviceToken(deviceToken))
        },
        onNotification: function (notification) {
          // const { data } = notification;
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
          largeIcon: "ic_launcher_round",
          smallIcon: "notification",
          color: '#00000000'
      });
    }
    if (Platform.OS === 'ios') {
      requestPermissions().then(status=>{
        if(status === 1){
          getToken().then(deviceToken => {
            dispatch(onGetDeviceToken(deviceToken))
          })
        } 
      })
      onMessage()
    }
  }, [])
  return (
    <>
      <StatusBar barStyle={Platform.OS == 'ios' ? 'light-content' : 'default'} />
      <ImageBackground source={Images.splash} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, marginHorizontal: 24, justifyContent: 'flex-end' }} >
          <Button
            label={'Get Started!'}
            backgroundColor={Colors.primary600}
            onPress={() => navigation.navigate('register')}
          />
          <Button
            label={'Log in'}
            backgroundColor={Colors.black}
            style={{ marginTop: 24, marginBottom: 12 }}
            outline
            outlineColor={Colors.white}
            onPress={() => navigation.navigate('login')}
          />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

export default memo(Landing)