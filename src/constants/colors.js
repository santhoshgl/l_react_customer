import { Colors as UIColor } from 'react-native-ui-lib';

const Colors = {
  white: '#fff',
  black: '#000',
  gray50: '#F9FAFB',
  gray100: '#F2F4F7',
  gray200: '#E4E7EC',
  gray300: '#D0D5DD',
  gray500: '#667085',
  gray700: '#344054',
  gray800 :'#E5E5E5',
  gray900: '#101828',
  primary25: '#FFF5F6',
  primary50: "#FFECED",
  primary600: '#FF4048',
  primary700: '#CC333A',
  purple: '#D5B4FF',
  blue: '#23E7FF',
  yellow: '#F8CD5C',
  success700: "#027A48",
  blue700: "#175CD3"
}

export default Colors

UIColor.loadSchemes({
  light: {
    ...Colors
  },
  dark: {
    ...Colors
  }
});