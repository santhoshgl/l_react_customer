import React, { memo } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@constants'
import { Text, View } from 'react-native-ui-lib';

const Input = ({ value, label, ...props }) => {
  return (
    <View marginT-16 style={props?.style}>
      {label ? <Text fs14SB gray700 style={{ lineHeight: 20 }}  >{label}</Text> : null}
      <TextInput
        {...props}
        // onChangeText
        value={value?.toString()}
        placeholderTextColor={Colors.gray500}
        style={styles.textInput}
        autoCapitalize="none"
      />
    </View>
  )
}

export default memo(Input)

const styles = StyleSheet.create({
  textInput: {
    height: 44, marginVertical: 6, paddingHorizontal: 8, paddingVertical: 0,
    borderWidth: 1, borderColor: Colors.gray300, borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    color: Colors.black
  }
})