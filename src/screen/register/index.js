import React, { memo, useState } from 'react';
import { SafeAreaView, Image, ScrollView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import { Images, Colors, mailRegex } from '../../constants';
import Input from '../../component/input';
import apiRequest from '../services/networkProvider';

const Register = ({ navigation }) => {
  const [firstName, _firstName] = useState('')
  const [lastName, _lastName] = useState('')
  const [phone, _phone] = useState('')
  const [email, _email] = useState('')
  const [password, _password] = useState('')
  const [error, _error] = useState(false)
  const [loading, _loading] = useState(false)

  const signUp = () => {
    if (!(firstName && lastName && phone && email && password)) {
      showMessage({ message: 'All fields are required.', type: 'warning' })
      _error(true)
      return
    }
    else if (email && !mailRegex.test(email)) {
      showMessage({ message: "Enter valid email address.", type: "warning" });
      return;
    }
    else if (password && password.length < 8) {
      showMessage({ message: "password length should be 8 character.", type: "warning" });
      return;
    }

    _loading(true)
    auth().createUserWithEmailAndPassword(email, password).then((res) => {
      // console.log('User account created & signed in!', res);
      apiRequest.post('users', {
        data: {
          id: res.user?.uid,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          roles: ["customer"],
          email: email,
          profilePicture: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
      }).then(res => {
        // console.log('then --->>', res);
        showMessage({ message: 'Your account has been created successfully', type: 'success' })
        _loading(false)
      }).catch(err => {
        // console.log('catch =>>', err);
        showMessage({ message: 'Oh no it looks like there was some problem creating account, please contact support or try again', type: 'danger' })
        _loading(false)
        auth().currentUser.delete()
      })
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        showMessage({ message: 'That email address is already in use!', type: 'danger' })
      }
      else if (error.code === 'auth/invalid-email') {
        showMessage({ message: 'That email address is invalid!', type: 'danger' })
      }
      else showMessage({ message: error.message, type: 'danger' })
      _loading(false)
    });
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
            error={error}
            value={firstName}
            onChangeText={_firstName}
          />
          <Input
            label={'Last Name'}
            placeholder={'Enter last name'}
            error={error}
            value={lastName}
            onChangeText={_lastName}
          />
          <Input
            label={'Phone Number'}
            placeholder={'Enter your number'}
            error={error}
            value={phone}
            onChangeText={_phone}
            keyboardType='phone-pad'
          />
          <Input
            label={'Email'}
            placeholder={'Enter your email'}
            error={error}
            value={email}
            onChangeText={_email}
          />
          <Input
            label={'Password'}
            placeholder={'Create a password'}
            error={error}
            value={password}
            onChangeText={_password}
            secureTextEntry
          />
          <Text int14 gray500>Must be at least 8 characters.</Text>
          <Button
            label={'Create Account'}
            marginT-40
            onPress={signUp}
            disabled={loading}
          />
          <Text fs16SB marginT-28 center black >Already have an account? <Text primary600 onPress={() => navigation.navigate('login')}>Log in</Text></Text>
        </ScrollView >

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default memo(Register)