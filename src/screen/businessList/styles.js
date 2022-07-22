import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '@constants';

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
  tag: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.gray100, paddingVertical: 4,
    paddingHorizontal: 10, borderRadius: 16,
  },
  following: {
    paddingHorizontal: 12, paddingVertical: 4,
    borderWidth: 1, borderColor: Colors.gray200,
    borderRadius: 16
  },
  follow: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    justifyContent: 'center'
  },
  followText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 14
  },
  followingText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.gray700,
    fontSize: 14
  },
  redbackGround: {
    backgroundColor: Colors.primary600,
  },
  grayBorder: {
    borderWidth: 1,
    borderColor: Colors.gray200
  }
})
