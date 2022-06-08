import React from 'react';
import { LogBox } from 'react-native';
import Router from './src/router';
import { Typography, ThemeManager } from 'react-native-ui-lib';
import { Fonts, Colors } from '@constants'

const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <Router />
  );
};


export default App;

Typography.loadTypographies({
  ...Fonts,
  fw500: { fontWeight: '500' }
});

ThemeManager.setComponentForcedTheme('Button', (props, context) => {
  return {
    backgroundColor: props?.backgroundColor || Colors.primary600,
    style: [props.style, { height: 48 }],
    labelStyle: { fontWeight: '500', ...Fonts.fs16 }
  }
});