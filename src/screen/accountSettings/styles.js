import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  sampleStyle: {
    textDecorationLine: "underline",
  },
  updateBtn: {
    paddingHorizontal: 16,
    ...ifIphoneX({
      marginBottom: 0
    }, {
      marginBottom: 24
    })
  },
  passMsg: {
    color: "#667085"
  }
})
