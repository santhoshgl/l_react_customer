import React, { memo, useMemo, useState } from 'react';
import { SafeAreaView, Image, StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, Button } from 'react-native-ui-lib';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { Images, Colors } from '@constants';
import Input from '@component/input';
import { mailRegex } from '@util';

const ForgotPassword = ({ navigation, route }) => {
  const { userData } = useSelector(s => s.user);
  const param = useMemo(() => { return route?.params }, [route])
  
  const [email, _email] = useState('')
  const [error, _error] = useState(false)
  const [invalid, _invalid] = useState({})
  const [isEditable, _isEditable] = useState(true)

  const _reset = () => {
    if (!mailRegex.test(email)) {
      showMessage({ message: "Enter valid email address.", type: "warning" });
      return;
    }
    auth().sendPasswordResetEmail(email).then((res) => {
      showMessage({ message: "Password reset link has been sent to your mail address successfully.", type: "success" });
      navigation.navigate('login')
    }).catch((err) => {
      showMessage({ message: err?.userInfo?.message, type: "danger" });
    })
  }

  useFocusEffect(() => {
    if (param?.source == 'accountSettings') {
      _email(userData?.email)
      _isEditable(false)
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'default'} />
      <View margin-24 flex >
        <Image source={Images.logo} style={{ height: 30, width: 30, alignSelf: 'center' }} resizeMode={'contain'} />
        <Text beb30 center marginT-25 black >Forgot Password</Text>
        <Text fs14 center marginT-4 gray500 >No worries, we’ll send you reset instructions.</Text>
        <Input
          label={'Email'}
          keyboardType='email-address'
          placeholder={'Enter your email'}
          style={{ marginTop: 24 }}
          error={error || invalid?.email}
          value={email}
          editable={isEditable}
          onChangeText={_email}
          validVal={!invalid?.email}
          onBlur={(e) => {
            if (!email || !mailRegex.test(email)) { _invalid({ ...invalid, email: true }) }
            else { _invalid({ ...invalid, email: false }) }
          }}
        />
        <Button
          label={'Reset password'}
          marginT-40
          onPress={_reset}
        />
        <Text fs16SB marginT-28 center primary600
          onPress={() => {
            if (param?.source == 'accountSettings')
              navigation.goBack()
            else
              navigation.navigate('login')
          }}
        >{param?.source == 'accountSettings' ? 'Back' : 'Back to Log in'}</Text>
      </View >
    </SafeAreaView>
  );
}

export default memo(ForgotPassword)