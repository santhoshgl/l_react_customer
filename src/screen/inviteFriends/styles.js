import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  image: {
    height: 240,
  },
  copyLinkContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "gray"
  },
  copyBtn: {
    display: "flex",
    backgroundColor: "transparent",
    borderColor: Colors.gray300,
    borderWidth: 1,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
  }
})
