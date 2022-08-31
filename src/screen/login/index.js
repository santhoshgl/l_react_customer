import React, { memo, useState } from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { showMessage } from 'react-native-flash-message';
import { Images, Colors } from '@constants';
import Input from '@component/input';
import { loginUser } from '../../redux/reducer/user';
import { mailRegex } from '@util';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const [email, _email] = useState('')
  const [password, _password] = useState('')
  const [error, _error] = useState(false)
  const [invalid, _invalid] = useState({})

  const _login = () => {
    if (!(email?.trim() && password?.trim())) {
      showMessage({ message: 'All fields are required.', type: 'warning' })
      _error(true)
      return
    }
    else if (email && !mailRegex.test(email)) {
      showMessage({ message: "Enter valid email address.", type: "warning" });
      return;
    }
    else if (password && password.length < 8) {
      showMessage({ message: "Password length should be 8 character.", type: "warning" });
      return;
    }
    const param = {
      email: email?.trim(),
      password: password?.trim()
    }
    dispatch(loginUser(param)).then(unwrapResult)
      .then((originalPromiseResult) => {
        if (originalPromiseResult?.hubs?.length > 0) {
          navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'hub' }] })
        }
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'default'} />
      <View margin-24 flex >
        <FastImage source={Images.logo} style={{ height: 30, width: 30, alignSelf: 'center' }} resizeMode={'contain'} />
        <Text beb30 center marginT-25 black >Log in</Text>
        <Text fs14 center marginT-4 gray500 >Welcome back! Please enter your details.</Text>
        <Input
          label={'Email'}
          placeholder={'Enter your email'}
          style={{ marginTop: 24 }}
          error={error || invalid?.email}
          value={email}
          onChangeText={_email}
          validVal={!invalid?.email}
          onBlur={(e) => {
            if (!email?.trim() || !mailRegex.test(email?.trim())) { _invalid({ ...invalid, email: true }) }
            else { _invalid({ ...invalid, email: false }) }
          }}
        />
        <Input
          label={'Password'}
          placeholder={'Enter your password'}
          error={error || invalid?.password}
          value={password}
          secureTextEntry
          onChangeText={_password}
          validVal={!invalid?.password}
          onBlur={(e) => {
            if (!password?.trim() || password?.trim().length < 8) { _invalid({ ...invalid, password: true }) }
            else { _invalid({ ...invalid, password: false }) }
          }}
        />
        <View style={{ marginTop: 5, alignItems: 'flex-start' }}  >
          <View>
            <Text fs16SB primary700 onPress={() => navigation.navigate('forgotPassword')} >Forgot Password?</Text>
          </View>
        </View>
        <Button
          label={'Login'}
          marginT-40
          onPress={_login}
        />
        <Text fs16SB marginT-28 center black >Don’t have an account? <Text primary600 onPress={() => navigation.navigate('register')}>Sign up</Text></Text>
      </View >
    </SafeAreaView>
  );
}

export default memo(Login)