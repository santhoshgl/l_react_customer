import { StyleSheet } from 'react-native';
import { Colors } from '@constants';

export default styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 16,
    margin: 16,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  }
})