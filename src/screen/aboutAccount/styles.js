import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  image: {
    height: 375,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: "#E4E7EC",
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureIcon: {
    height: 20, width: 20,
    marginRight: 16
  },
  chevron_rightIcon: {
    height: 24, width: 24
  },
})
