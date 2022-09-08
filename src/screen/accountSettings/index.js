import React, { memo, useState } from 'react';
import { SafeAreaView, Pressable, ScrollView, Alert } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import _ from 'underscore';
import { Colors, Images } from '@constants';
import Input from '@component/input';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';
import styles from './styles';
import { logout } from '../../redux/reducer/user';
import { setLoading } from '../../redux/reducer/loading';

const AccountSettings = ({ navigation }) => {

  var user = auth().currentUser;

  const { userData } = useSelector(s => s.user);
  const dispatch = useDispatch()

  const [currentPass, _currentpass] = useState("")
  const [newPass, _newPass] = useState("")
  const [confirmNewPass, _confirmNewPass] = useState("")
  const [error, _error] = useState(false)
  const [invalid, _invalid] = useState({})

  const reauthenticate = (current_pass) => {
    var cred = auth.EmailAuthProvider.credential(userData?.email, current_pass);
    return user.reauthenticateWithCredential(cred);
  }

  const updatePasswordHandler = () => {
    if (!(currentPass?.trim() && newPass?.trim() && confirmNewPass?.trim())) {
      showMessage({ message: 'All fields are required.', type: 'warning' })
      _error(true)
      return
    }
    else if (currentPass && currentPass.length < 8) {
      showMessage({ message: "Current Password length should be 8 character.", type: "warning" });
      return;
    }
    else if (newPass && newPass.length < 8) {
      showMessage({ message: "New Password length should be 8 character.", type: "warning" });
      return;
    }
    else if (confirmNewPass && confirmNewPass.length < 8) {
      showMessage({ message: "Confirm Password length should be 8 character.", type: "warning" });
      return;
    }
    else if (newPass !== confirmNewPass) {
      showMessage({ message: "New Password and Confirm Password Must be same.", type: "warning" });
      return;
    }
    Alert.alert(
      "Are you sure?",
      "Once the password is updated you will be automatically logged out and you need to login with your new password.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Update",
          onPress: () => {
            dispatch(setLoading(true))
            reauthenticate(currentPass).then(() => {
              auth().currentUser.updatePassword(newPass).then(() => {
                dispatch(setLoading(false))
                showMessage({ message: "Password changed successfully.", type: "success" });
                dispatch(logout())
                navigation.navigate('landing')
              }).catch((error) => { dispatch(setLoading(false)), console.log(error); });
            }).catch((err) => {
              console.log('err :>> ', err);
              dispatch(setLoading(false))
              showMessage({ message: "Your current password is invalid.", type: "danger" });
            })
          }
        }
      ])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <FastImage source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Account Settings</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View style={styles.listContainer}>

          <Input
            label={'Current Password'}
            placeholder={'Enter your current password'}
            secureTextEntry
            value={currentPass}
            onChangeText={_currentpass}
            error={error || invalid?.currentPass}
            validVal={!invalid?.currentPass}
            onBlur={(e) => {
              if (!currentPass?.trim() || currentPass?.trim().length < 8) { _invalid({ ...invalid, currentPass: true }) }
              else { _invalid({ ...invalid, currentPass: false }) }
            }}
          />
          <View>
            <Text style={styles.sampleStyle} fs14 black lh20 onPress={() => navigation.reset({ index: 0, routes: [{ name: 'forgotPassword', params: { source: 'accountSettings' } }] })}>Forgot Password</Text>
          </View>

          <Input
            label={'New Password'}
            placeholder={'Enter your new password'}
            secureTextEntry
            value={newPass}
            onChangeText={_newPass}
            error={error || invalid?.newPass}
            validVal={!invalid?.newPass}
            onBlur={(e) => {
              if (!newPass?.trim() || newPass?.trim().length < 8) { _invalid({ ...invalid, newPass: true }) }
              else { _invalid({ ...invalid, newPass: false }) }
            }}
          />

          <Input
            label={'Confirm Password'}
            placeholder={'Confirm your new password'}
            secureTextEntry
            value={confirmNewPass}
            onChangeText={_confirmNewPass}
            error={error || invalid?.confirmNewPass}
            validVal={!invalid?.confirmNewPass}
            onBlur={(e) => {
              if (!confirmNewPass?.trim() || confirmNewPass?.trim().length < 8) { _invalid({ ...invalid, confirmNewPass: true }) }
              else { _invalid({ ...invalid, confirmNewPass: false }) }
            }}
          />
          <Text int14 lh20 style={styles.passMsg} onPress={() => navigation.navigate("forgotPassword")}>Must be at least 8 characters.</Text>

        </View>
        <View style={styles.updateBtn}>
          <Button
            label={'Update Password'}
            marginT-40
            onPress={() => updatePasswordHandler()}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(AccountSettings)
