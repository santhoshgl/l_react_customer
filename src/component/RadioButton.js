import React, { memo } from "react";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";
import { Colors } from "@constants";
import { StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const RadioButton = ({ radioItem, handleRadioItem }) => {
  return (
    radioItem &&
    radioItem.map((item, index) => {
      return (
        <>
          <View style={style.mainContainer} key={index.toString()}>
            <TouchableOpacity
              key={index.toString()}
              onPress={() => {
                handleRadioItem(item?.id, item);
              }}
              style={[
                {
                  marginTop: 2,
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: !item?.isSelected
                    ? Colors.gray300
                    : Colors.primary600,
                  marginRight: 12,
                  left: 16,
                  alignSelf: "center",
                },
              ]}
            >
              {item?.isSelected && <View style={style.radioButton} />}
            </TouchableOpacity>
            <Pressable onPress={() => {
              handleRadioItem(item?.id, item);
            }}>
              <Text
                fs16 lh24 gray700 marginL-12 style={style.fontWeight}>
                {item?.text}
              </Text>
            </Pressable>
          </View>
        </>
      );
    })
  );
};

export default memo(RadioButton);

const style = StyleSheet.create({
  mainContainer: {
    marginTop: 16,
    flexDirection: "row",
    // backgroundColor:"red"
  },
  radioButton: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary600,
    alignSelf: "center",
    marginTop: 5,
  },
  fontWeight: { fontWeight: "500", },
});
