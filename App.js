import React from 'react';
import { LogBox } from 'react-native';
import Router from './src/Router';
import { Typography, ThemeManager } from 'react-native-ui-lib';
import { Fonts } from '@constants'

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
