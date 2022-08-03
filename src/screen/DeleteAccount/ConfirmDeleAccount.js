import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native-ui-lib";
import style from "./style";
import { Colors, Images } from "@constants";
import { SafeAreaView, ScrollView, TextInput, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { onDeleteUser } from "../../redux/reducer/user";
import { useRoute } from "@react-navigation/native";
import { unwrapResult } from '@reduxjs/toolkit';
import { showOfflineMessage } from "../../redux/reducer/network";
import { showMessage } from "react-native-flash-message";
import { deleteAccountReason, onsetPassword } from "../../redux/reducer/user";

const ConfirmDeleAccount = ({ navigation }) => {
  const isInternetReachable = useSelector((s) => s?.network?.isInternetReachable)
  const password = useSelector((s) => s.user.password)
  const [passwordError, setpassWordError] = useState(false);
  const dispatch = useDispatch();
  const reasonDetails = useSelector((s) => s?.user?.deleteAccountReason);
  const userEmail = useSelector((s) => s.user.userData.email)

  const handleConfurmDeleteAccount = () => {
    let reason = reasonDetails?.otherText || reasonDetails?.selectedRadioButton?.text
    if (reason === "" && reason?.length > 9) {
      setpassWordError(true);
    } else {
      let data = {
        password: password,
        reason: reason,
        email: userEmail
      }
      if (!isInternetReachable) {
        showMessage({ message: "You are offline", type: 'danger' })
      }
      else {
        dispatch(
          onDeleteUser(data)).then(unwrapResult)
          .then((data) => {
            data?.created &&
              navigation.reset({
                index: 0,
                routes: [{ name: 'AccountDeleted' }]
              })
          })
      }

    }
  };

  return (
    <SafeAreaView style={style.mainWrapper}>
      <ScrollView style={style.mainWrapper} contentContainerStyle={{ flexGrow: 1 }}
        onPress={() => Keyboard.dismiss()}
        keyboardShouldPersistTaps='handled'
      >
        <View style={[style.headerContainer, { marginTop: 15 }]}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={Images.back} style={style.backIcon} />
          </TouchableOpacity>
          <View style={style.deletAccountText}>
            <Text fs16 lh24 center black style={style.fontWeight500}>
              Delete Account
            </Text>
          </View>
        </View>
        <View style={style.deleteDetail}>
          <Text fs14 gray700 lh20 style={style.fontWeight}>
            If you delete your account, all the data of your{"\n"}account will be
            permanently deleted. You cannot{"\n"}retrieve it.
          </Text>
          <Text marginT-16 fs14 gray700 lh-20 style={style.fontWeight}>
            If you still wish to delete your account, please enter{"\n"}your password
            to confirm
          </Text>
          <View style={style.inputMargin}>
            <TextInput
              placeholder={"Password"}
              onChangeText={(value) => {
                dispatch(onsetPassword(value))
                setpassWordError(false);
              }}
              secureTextEntry={true}
              value={password}
              placeholderTextColor={Colors.gray500}
              autoCapitalize="none"
              style={style.passWordInput}
              blurOnSubmit={true}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
          {passwordError && (
            <View>
              <Text marginL-16 fs16 lh24 primary600>
                Please enter password
              </Text>
            </View>
          )}
        </View>
        <View style={style.buttonContainer}>
          <Button
            activeOpacity={0.9}
            disabled={!(password !== "" && password?.length > 7)}
            label={"Confirm Account Deletion"}
            style={{
              backgroundColor:
                password !== "" && password?.length > 7
                  ? Colors.primary600
                  : Colors.primary200,
            }}
            onPress={() => {
              handleConfurmDeleteAccount();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmDeleAccount;
