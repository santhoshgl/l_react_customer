import React, { memo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import { showMessage } from "react-native-flash-message";
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import { Images, Colors } from '@constants';
import Input from '@component/input';
import { registerUser } from '../../redux/reducer/user';
import { mailRegex } from '@util';
import PhoneInput from '../../component/phoneInput';

const Register = ({ navigation }) => {
  const dispatch = useDispatch()

  const [firstName, _firstName] = useState('')
  const [lastName, _lastName] = useState('')
  const [phoneNumber, _phoneNumber] = useState('')
  const [email, _email] = useState('')
  const [password, _password] = useState('')
  const [error, _error] = useState(false)
  const [invalid, _invalid] = useState({})

  const signUp = () => {
    if (!(firstName?.trim() && lastName?.trim() && phoneNumber?.trim() && email?.trim() && password?.trim())) {
      showMessage({ message: 'All fields are required.', type: 'warning' })
      _error(true)
      return
    }
    else if (phoneNumber.length != 10) {
      showMessage({ message: "Enter valid Phone Number.", type: "warning" });
      return;
    }
    else if (email?.trim() && !mailRegex.test(email?.trim())) {
      showMessage({ message: "Enter valid email address.", type: "warning" });
      return;
    }
    else if (password?.trim() && password?.trim()?.length < 8) {
      showMessage({ message: "Password length should be at least 8 characters.", type: "warning" });
      return;
    }
    const param = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      phoneNumber: `+1${phoneNumber?.trim()}`,
      email: email?.trim(),
      password: password?.trim()
    }
    dispatch(registerUser(param)).then(unwrapResult)
      .then((originalPromiseResult) => {
        navigation.reset({ index: 0, routes: [{ name: 'onboarding' }] })
      })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
      <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'default'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ padding: 24, flexGrow: 1 }} >
          <FastImage source={Images.logo} style={{ height: 30, width: 30, alignSelf: 'center' }} resizeMode={'contain'} />
          <Text beb30 center marginT-25 black  >Create an account</Text>
          <Text fs14 center marginT-4 gray500 >Sign up today and get started with Lealzy!</Text>
          <Input
            label={'First Name'}
            placeholder={'Enter first name'}
            style={{ marginTop: 24 }}
            error={error || invalid?.firstName}
            value={firstName}
            onChangeText={_firstName}
            onBlur={(e) => { if (!firstName?.trim()) { _invalid({ ...invalid, firstName: true }) } }}
          />
          <Input
            label={'Last Name'}
            placeholder={'Enter last name'}
            error={error || invalid?.lastName}
            value={lastName}
            onChangeText={_lastName}
            onBlur={(e) => { if (!lastName?.trim()) { _invalid({ ...invalid, lastName: true }) } }}
          />
          <PhoneInput
            label={'Phone Number'}
            placeholder={'Enter your number'}
            error={error || invalid?.phoneNumber}
            value={phoneNumber}
            onChangeText={_phoneNumber}
            keyboardType='phone-pad'
            validVal={!invalid?.phoneNumber}
            onBlur={(e) => {
              if (!phoneNumber?.trim() || phoneNumber.length != 10) { _invalid({ ...invalid, phoneNumber: true }) }
              else { _invalid({ ...invalid, phoneNumber: false }) }
            }}
          />
          <Input
            label={'Email'}
            placeholder={'Enter your email'}
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
            placeholder={'Create a password'}
            error={error || invalid?.password}
            value={password}
            onChangeText={_password}
            secureTextEntry
            validVal={!invalid?.password}
            onBlur={(e) => {
              if (!password?.trim() || password?.trim()?.length < 8) { _invalid({ ...invalid, password: true }) }
              else { _invalid({ ...invalid, password: false }) }
            }}
          />
          <Text int14 gray500>Must be at least 8 characters.</Text>
          <Button
            label={'Create Account'}
            marginT-40
            onPress={signUp}
          />
          <Text fs16SB marginT-28 center black >Already have an account? <Text primary600 onPress={() => navigation.navigate('login')}>Log in</Text></Text>
        </ScrollView >

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default memo(Register)