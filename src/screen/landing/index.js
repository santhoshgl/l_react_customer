import React, { memo } from 'react';
import { SafeAreaView, ImageBackground, StatusBar, Platform } from 'react-native';
import { View, Button } from 'react-native-ui-lib';
import { Images, Colors } from '../../constants';

const Landing = ({ navigation }) => {
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
            style={{ marginTop: 24 }}
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