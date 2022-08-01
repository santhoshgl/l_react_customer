import React, { useState } from "react";
import { SafeAreaView, TextInput } from "react-native";
import style from "./style";
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native-ui-lib";
import { Colors, Images } from "@constants";
import RadioButton from "../../component/RadioButton";
import { radioArray } from "../../constants/RadioArray";

const DeleteAccountReason = ({ navigation }) => {
  const [radioItem, setRadioItem] = useState(radioArray);
  const [selectedRadioButton, setRadioButton] = useState({});
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState(false);

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
      navigation.navigate("ConfirDeleAccount", {
        selectedRadioButton: selectedRadioButton,
        otherText: otherText,
      });
    }
  };

  return (
    <SafeAreaView style={style.mainWrapper}>
    <View style={style.mainWrapper}>
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image source={Images.back} style={style.backIcon} />
        </TouchableOpacity>
        <View style={style.deletAccountText}>
          <Text fs16 lh24 center black style={style.fontWeight500}>
            Delete Account
          </Text>
        </View>
      </View>

      <View style={style.deleteReason}>
        <Text fs16 lh24 black marginL-16 style={style.fontWeight500}>
          Why are you deleting your account
        </Text>
        <RadioButton radioItem={radioItem} handleRadioItem={handleRadioItem} />
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
                  value={otherText}
                  placeholderTextColor={Colors.gray500}
                  autoCapitalize="none"
                  style={style.input}
                />
              </View>
              {error && (
                <View>
                  <Text
                    marginL-16
                    fs16
                    lh24
                    primary600
                    style={style.fontWeight500}
                  >
                    Please enter the reason
                  </Text>
                </View>
              )}
            </>
          )}
        <View style={style.buttonContainer}>
          <Button
            activeOpacity={0.9}
            disabled={!selectedRadioButton?.isSelected}
            label={"Continue"}
            style={{
              backgroundColor: selectedRadioButton?.isSelected
                ? Colors.primary600
                : "#FFC6C8",
            }}
            onPress={() => {
              handleDeleteAccount();
            }}
          />
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default DeleteAccountReason;
