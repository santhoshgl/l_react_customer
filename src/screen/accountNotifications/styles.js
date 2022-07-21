import { StyleSheet } from 'react-native';
import { Colors } from '@constants';

export default styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    borderColor: Colors.gray200,
    borderBottomWidth: 1
  }

})
