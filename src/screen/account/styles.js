import { StyleSheet } from 'react-native';
import { Colors } from '@constants';

export default styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16, paddingTop: 16,
    backgroundColor: Colors.white
  },
  logoutBtn: {
    marginHorizontal: 16, marginTop: 24,
    backgroundColor: Colors.white,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: "#E4E7EC"
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  sampleStyle: {
    textDecorationLine: "underline",
  },
  featureIcon: {
    height: 20, width: 20, marginRight: 16
  },
  chevron_rightIcon: {
    height: 24, width: 24
  }
})
