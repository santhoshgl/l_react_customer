import React, { memo } from 'react';
import { TextInput, StyleSheet } from 'react-native';
// import { Colors, Fonts } from '@constants'
import { Text, View, Colors } from 'react-native-ui-lib';

const Input = ({ value, label, error, validVal = true, ...props }) => {
  return (
    <View marginT-16 style={props?.style}>
      {label ? <Text fs14SB gray700 style={{ lineHeight: 20 }}  >{label}</Text> : null}
      <TextInput
        {...props}
        // onChangeText
        value={value?.toString()}
        placeholderTextColor={Colors.gray500}
        autoCapitalize="none"
        style={[styles.textInput, { borderColor: ((!value?.trim() && error) || !validVal) ? Colors.red40 : Colors.gray300, color: props.editable != false ? Colors.black : Colors.gray400 }]}
      />
    </View>
  )
}

export default memo(Input)

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