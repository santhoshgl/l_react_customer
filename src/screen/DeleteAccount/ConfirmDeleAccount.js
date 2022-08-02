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
import { SafeAreaView, ScrollView, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { onDeleteUser } from "../../redux/reducer/user";
import { useRoute } from "@react-navigation/native";
import { unwrapResult } from '@reduxjs/toolkit';

const ConfirmDeleAccount = ({ navigation }) => {
  const [password, setPassWord] = useState("");
  const [passwordError, setpassWordError] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const { params } = route;

  const handleConfurmDeleteAccount = () => {
    if (password == "" && password.length > 9) {
      setpassWordError(true);
    } else {
      let data = {
        password: password,
        reason: params?.otherText || params?.selectedRadioButton?.text
      }
      dispatch(
        onDeleteUser(data)).then(unwrapResult)
        .then((data) => {
          data?.created && navigation.navigate("AccountDeleted")
        })
    }
  };

  return (
    <SafeAreaView style={style.mainWrapper}>
      <ScrollView style={style.mainWrapper} contentContainerStyle={{ flexGrow: 1}}>
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
                setPassWord(value);
                setpassWordError(false);
              }}
              secureTextEntry={true}
              value={password}
              placeholderTextColor={Colors.gray500}
              autoCapitalize="none"
              style={style.passWordInput}
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
            disabled={!(password !== "" && password.length > 7)}
            label={"Confirm Account Deletion"}
            style={{
              backgroundColor:
                password !== "" && password.length > 7
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
