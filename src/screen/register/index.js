import React, { memo, useState } from 'react';
import { SafeAreaView, Image, ScrollView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import { showMessage } from "react-native-flash-message";
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Images, Colors, mailRegex } from '../../constants';
import Input from '../../component/input';
import { registerUser } from '../../redux/reducer/user';
import { useNavigation } from '@react-navigation/native';

const Register = ({ }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [firstName, _firstName] = useState('')
  const [lastName, _lastName] = useState('')
  const [phoneNumber, _phoneNumber] = useState('')
  const [email, _email] = useState('')
  const [password, _password] = useState('')
  const [error, _error] = useState(false)
  const [invalid, _invalid] = useState({})

  const signUp = () => {
    if (!(firstName && lastName && phoneNumber && email && password)) {
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
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password
    }
    dispatch(registerUser(param)).then(unwrapResult)
      .then((originalPromiseResult) => {
        navigation.reset({ index: 0, routes: [{ name: 'onboarding' }] })
      })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}    >
      <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'default'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }} >
          <Image source={Images.logo} style={{ height: 30, width: 30, alignSelf: 'center' }} resizeMode={'contain'} />
          <Text beb30 center marginT-25 black  >Create an account</Text>
          <Text fs14 center marginT-4 gray500 >Sign up today and get started with Lealzy!</Text>
          <Input
            label={'First Name'}
            placeholder={'Enter first name'}
            style={{ marginTop: 24 }}
            error={error || invalid?.firstName}
            value={firstName}
            onChangeText={_firstName}
            onBlur={(e) => { if (!firstName) { _invalid({ ...invalid, firstName: true }) } }}
          />
          <Input
            label={'Last Name'}
            placeholder={'Enter last name'}
            error={error || invalid?.lastName}
            value={lastName}
            onChangeText={_lastName}
            onBlur={(e) => { if (!lastName) { _invalid({ ...invalid, lastName: true }) } }}
          />
          <Input
            label={'Phone Number'}
            placeholder={'Enter your number'}
            error={error || invalid?.phoneNumber}
            value={phoneNumber}
            onChangeText={_phoneNumber}
            keyboardType='phone-pad'
            onBlur={(e) => { if (!phoneNumber) { _invalid({ ...invalid, phoneNumber: true }) } }}
          />
          <Input
            label={'Email'}
            placeholder={'Enter your email'}
            error={error || invalid?.email}
            value={email}
            onChangeText={_email}
            validVal={!invalid?.email}
            onBlur={(e) => {
              if (!email || !mailRegex.test(email)) { _invalid({ ...invalid, email: true }) }
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
              if (!password || password.length < 8) { _invalid({ ...invalid, password: true }) }
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