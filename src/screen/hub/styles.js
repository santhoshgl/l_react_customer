import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Colors } from '../../constants';
const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  logoImg: { height: 30, width: 30, alignSelf: 'center' },
  hubImg: { height: width * 0.8, width: width * 0.8, alignSelf: 'center', marginVertical: 20 },
  warningImg: { height: 72, width: 72, alignSelf: 'center' },
 

})

export default styles