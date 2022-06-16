import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  dot: {
    backgroundColor: Colors.black, width: 10, height: 10,
    borderRadius: 5, marginLeft: 5, marginRight: 5,
    marginTop: 3, marginBottom: 3,
  },
  activeDot: {
    backgroundColor: Colors.primary600, width: 10,
    height: 10, borderRadius: 5, marginLeft: 5, marginRight: 5,
    marginTop: 3, marginBottom: 3,
  },
  btn: { marginTop: 50, marginBottom: 10 },
  imageBack: { flex: 1, paddingHorizontal: 24 },
  safe: { flex: 1, justifyContent: 'flex-end', marginTop: 10, marginHorizontal: 24 },
  skip: { position: 'absolute', right: 24, top: 50 },
  bottomView: { backgroundColor: 'white', justifyContent: 'flex-end', marginTop: 10, marginHorizontal: 24 }
})

export default styles