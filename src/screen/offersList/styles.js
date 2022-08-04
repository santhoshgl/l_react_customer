import { StyleSheet } from 'react-native';
import { Colors } from '@constants';

export default styles = StyleSheet.create({
  card: {
    borderRadius: 16, marginVertical: 4, padding: 16,
    borderWidth: 1, borderColor: Colors.gray200,
    marginHorizontal: 16, backgroundColor: Colors.white,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1
  },
  badge: {
    paddingHorizontal: 8, paddingVertical: 2,
    backgroundColor: Colors.gray100, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-start'
  },
  separator: {
    height: 1, backgroundColor: Colors.gray200, marginTop: 16
  },
  bottom: {
    marginTop: 8, marginHorizontal: 8,
    flexDirection: 'row', alignItems: 'center'
  }
})
