import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import _ from 'underscore';
import { Colors, Images } from '@constants';
import Input from '@component/input';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { mailRegex } from '@util';
import { showMessage } from "react-native-flash-message";
import { getUser, updateUser } from '../../redux/reducer/user';
import { unwrapResult } from '@reduxjs/toolkit';
import PhoneInput from '../../component/phoneInput';

const PersonalDetails = ({ navigation }) => {

  const { userData } = useSelector(s => s.user);
  const dispatch = useDispatch()

  const [firstName, _firstName] = useState('')
  const [lastName, _lastName] = useState('')
  const [phoneNumber, _phoneNumber] = useState('')
  const [error, _error] = useState(false)
  const [invalid, _invalid] = useState({})

  useEffect(() => {
    if (userData) {
      _firstName(userData?.firstName)
      _lastName(userData?.lastName)
      _phoneNumber(userData?.phoneNumber.substring(2))
    }
  }, [userData])

  const signUp = () => {
    if (!(firstName?.trim() && lastName?.trim() && phoneNumber?.trim())) {
      showMessage({ message: 'All fields are required.', type: 'warning' })
      _error(true)
      return
    }
    else if (phoneNumber.length != 10) {
      showMessage({ message: "Enter valid Phone Number.", type: "warning" });
      return;
    }

    const updatedUser = { ...userData }
    updatedUser["firstName"] = firstName?.trim()
    updatedUser["lastName"] = lastName?.trim()
    updatedUser["phoneNumber"] = `+1${phoneNumber?.trim()}`

    dispatch(updateUser(updatedUser)).then(unwrapResult).then((originalPromiseResult) => {
      dispatch(getUser()).then(unwrapResult).then((response) => {
        showMessage({ message: "Personal Details Updated.", type: "success" });
      })
    })

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Personal Details</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View style={styles.listContainer}>
          <Input
            label={'First Name'}
            placeholder={'Enter First Name'}
            value={firstName}
            error={error || invalid?.firstName}
            onChangeText={_firstName}
            onBlur={(e) => { if (!firstName?.trim()) { _invalid({ ...invalid, firstName: true }) } }}
          />

          <Input
            label={'Last Name'}
            placeholder={'EnterLast Name'}
            value={lastName}
            onChangeText={_lastName}
            error={error || invalid?.lastName}
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
            value={userData?.email}
            editable={false}
          />

        </View>
        <View style={styles.updateBtn}>
          <Button
            label={'Update'}
            marginT-40
            onPress={signUp}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(PersonalDetails)
