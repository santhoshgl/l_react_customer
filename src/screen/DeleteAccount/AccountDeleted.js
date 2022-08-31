import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
} from "react-native-ui-lib";
import FastImage from "react-native-fast-image";
import style from "./style";
import { Images } from "@constants";
import { logout } from "../../redux/reducer/user";

const AccountDeleted = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
    setTimeout(() =>
      navigation.reset({
        index: 0,
        routes: [{ name: 'landing' }]
      }), 5000)
  }, [])

  return (
    <View style={style.deleteAccountContainer}>
      <FastImage source={Images.AccountDeleted} />
      <Text beb30 black lh-36 marginT-20 style={style.fontWeight}>
        Your Account Deleted.
      </Text>
      <Text
        fs16
        black
        lh-24
        marginT-8
        style={{ fontWeight: "400", textAlign: "center" }}
      >
        Thank you for using Lealzy.
      </Text>
    </View>
  );
};

export default AccountDeleted;
