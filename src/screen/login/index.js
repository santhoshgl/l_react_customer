import React, { memo } from 'react';
import { SafeAreaView, Image, StatusBar, Platform } from 'react-native';
import { Text, View, TouchableOpacity, Button } from 'react-native-ui-lib';
import { Images, Colors } from '../../constants';
import Input from '../../component/input';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'default'} />
      <View margin-24 flex >
        <Image source={Images.logo} style={{ height: 30, width: 30, alignSelf: 'center' }} resizeMode={'contain'} />
        <Text beb30 center marginT-25 black >Log in</Text>
        <Text fs14 center marginT-4 gray500 >Welcome back! Please enter your details.</Text>
        <Input
          label={'Email'}
          placeholder={'Enter your email'}
          style={{ marginTop: 24 }}
        />
        <Input
          label={'Password'}
          placeholder={'Enter your password'}
        />
        <TouchableOpacity style={{ marginTop: 4 }} >
          <Text fs16SB primary700 >Forgot Password?</Text>
        </TouchableOpacity>
        <Button
          label={'Login'}
          size={Button.sizes.large}
          backgroundColor={Colors.primary600}
          fs16 fw500
          marginT-40
        />
        <Text fs16SB marginT-28 center black >Don’t have an account? <Text primary600 onPress={() => navigation.navigate('register')}>Sign up</Text></Text>
      </View >
    </SafeAreaView>
  );
}

export default memo(Login)