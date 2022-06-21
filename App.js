import React from 'react';
import { LogBox } from 'react-native';
import { Typography, ThemeManager } from 'react-native-ui-lib';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
import FlashMessage from "react-native-flash-message";
import { Fonts, Colors } from '@constants'
import Router from './src/router';
import store from './src/redux/store'
import AppLoader from './src/component/AppLoader';

let persistor = persistStore(store);

const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        <AppLoader />
      </PersistGate>
      <FlashMessage position="top" duration={3000} />
    </Provider>
  );
};


export default App;

Typography.loadTypographies({
  ...Fonts,
  fw500: { fontWeight: '500' },
  lh32: { lineHeight: 32 },
  lh24: { lineHeight: 24 },
  lh20: { lineHeight: 20 },
  lh18: { lineHeight: 18 },

});

ThemeManager.setComponentForcedTheme('Button', (props, context) => {
  return {
    backgroundColor: props?.backgroundColor || Colors.primary600,
    style: [props.style, { height: 48 }],
    labelStyle: props.labelStyle ? props.labelStyle : { fontWeight: '500', ...Fonts.fs16 } 
  }
});