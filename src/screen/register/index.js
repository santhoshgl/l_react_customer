import React, { memo } from 'react';
import { SafeAreaView, Image, ScrollView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import { Images, Colors } from '../../constants';
import Input from '../../component/input';

const Register = ({ navigation }) => {
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
          // value={''}
          // onChangeText={_firstName}
          />
          <Input
            label={'Last Name'}
            placeholder={'Enter last name'}
          />
          <Input
            label={'Phone Number'}
            placeholder={'Enter your number'}
          />
          <Input
            label={'Email'}
            placeholder={'Enter your email'}
          />
          <Input
            label={'Password'}
            placeholder={'Create a password'}
          />
          <Text int14 gray500>Must be at least 8 characters.</Text>
          <Button
            label={'Create Account'}
            size={Button.sizes.large}
            backgroundColor={Colors.primary600}
            fs16 fw500
            marginT-40
          />
          <Text fs16SB marginT-28 center black >Already have an account? <Text primary600 onPress={() => navigation.navigate('login')}>Log in</Text></Text>
        </ScrollView >

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default memo(Register)