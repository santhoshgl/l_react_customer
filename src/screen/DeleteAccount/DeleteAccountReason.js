import React, { useState } from "react";
import { SafeAreaView, ScrollView, TextInput, Keyboard } from "react-native";
import style from "./style";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native-ui-lib";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { Colors, Images } from "@constants";
import RadioButton from "../../component/RadioButton";
import { radioArray } from "../../constants/RadioArray";
import { deleteAccountReason } from "../../redux/reducer/user";

const DeleteAccountReason = ({ navigation }) => {
  const [radioItem, setRadioItem] = useState(radioArray);
  const [selectedRadioButton, setRadioButton] = useState({});
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  //....... handle Radio Item true or false........ //
  const handleRadioItem = (id, item) => {
    setError(false);
    setOtherText("");
    setRadioButton({ ...item, isSelected: true });
    const radioItemSelected = radioItem.map((selected) => {
      if (selected?.id === id) {
        return { ...selected, isSelected: true };
      }
      return { ...selected, isSelected: false };
    });
    setRadioItem(radioItemSelected);
  };

  //........... Delete Account handle ............ //
  const handleDeleteAccount = () => {
    if (selectedRadioButton?.id === 5 && otherText === "") {
      setError(true);
    } else {
      let reasonData = {
        selectedRadioButton: selectedRadioButton,
        otherText: otherText
      }
      dispatch(deleteAccountReason(reasonData))
      navigation.navigate("ConfirDeleAccount", {
        selectedRadioButton: selectedRadioButton,
        otherText: otherText,
      });
    }
  };

  return (
    <SafeAreaView style={style.mainWrapper}
      onPress={() => Keyboard.dismiss()}
      keyboardShouldPersistTaps='handled'
    >
      <View style={style.mainWrapper}>
        <View
          marginV-16
          marginH-16
          row
          style={{ justifyContent: "space-between" }}
        >
          <TouchableOpacity
            hitSlop={10}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FastImage source={Images.back} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
          <Text fs16 lh24 center black style={style.fontWeight500}>
            Delete Account
          </Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={style.deleteReason}>
            <Text fs16 lh24 black marginL-16 style={style.fontWeight500}>
              Why are you deleting your account
            </Text>

            <RadioButton
              radioItem={radioItem}
              handleRadioItem={handleRadioItem}
            />
            {selectedRadioButton?.id === 5 &&
              selectedRadioButton?.isSelected === true && (
                <>
                  <View style={style.inputContainer}>
                    <TextInput
                      multiline={true}
                      placeholder={"Enter your reason to delete account"}
                      onChangeText={(value) => {
                        setOtherText(value);
                        setError(false);
                      }}
                      numberOfLines={4}
                      maxLength={150}
                      value={otherText}
                      placeholderTextColor={Colors.gray500}
                      autoCapitalize="none"
                      style={style.input}
                      blurOnSubmit={true}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                  </View>
                  {error && (
                    <View>
                      <Text
                        marginL-16
                        fs16
                        lh24
                        primary600
                        style={[style.fontWeight500, { marginTop: -100 }]}
                      >
                        Please enter the reason
                      </Text>
                    </View>
                  )}
                </>
              )}
          </View>
          <View style={style.buttonContainer}>
            <Button
              activeOpacity={0.9}
              disabled={!selectedRadioButton?.isSelected}
              label={"Continue"}
              style={[
                {
                  backgroundColor: selectedRadioButton?.isSelected
                    ? Colors.primary600
                    : "#FFC6C8",
                },
              ]}
              onPress={() => {
                handleDeleteAccount();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccountReason;
