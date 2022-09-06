import React, { memo } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
// import { Colors, Fonts } from '@constants'
import { Text, View, Colors } from 'react-native-ui-lib';
import { Images } from '../constants';

const PhoneInput = ({ value, label, error, validVal = true, ...props }) => {
  return (
    <View marginT-16 style={props?.style}>
      {label ? <Text fs14SB gray700 style={{ lineHeight: 20 }}  >{label}</Text> : null}
      <View centerV row style={[styles.textInput, { borderColor: ((!value?.trim() && error) || !validVal) ? Colors.red40 : Colors.gray300 }]}>
        <View row marginR-6 centerV paddingR-6 style={{ height: 44, borderRightWidth: 1, borderRightColor: ((!value?.trim() && error) || !validVal) ? Colors.red40 : Colors.gray300 }}>
          <Text style={{ color: Colors.gray500 }}>US </Text>
          <FastImage
            source={Images.down}
            style={{ height: 24, width: 24, borderRadius: 24, tintColor: Colors.gray500 }}
          />
        </View>
        <TextInput
          {...props}
          // onChangeText˝
          value={value?.toString()}
          placeholderTextColor={Colors.gray500}
          autoCapitalize="none"
          maxLength={10}
          style={{ height: 44, width: "85%", color: Colors.black }}
        />
      </View>
    </View>
  )
}

export default memo(PhoneInput)

const styles = StyleSheet.create({
  textInput: {
    height: 44, marginVertical: 6, paddingHorizontal: 8, paddingVertical: 0,
    borderWidth: 1, borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    color: Colors.black
  }
})