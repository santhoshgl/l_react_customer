import React, { useCallback, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { Typography, ThemeManager } from 'react-native-ui-lib';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
import FlashMessage, { showMessage } from "react-native-flash-message";
import SplashScreen from 'react-native-splash-screen'
import { Fonts, Colors } from '@constants'
import Router, { FlashNotification } from './src/router';
import store from './src/redux/store'
import AppLoader from './src/component/AppLoader';

let persistor = persistStore(store);

const App = () => {
  const [showInAppNotification, onShowInAppNotification] = useState(false)
  LogBox.ignoreAllLogs()

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router onShowInAppNotification={onShowInAppNotification} />
        <AppLoader />
      </PersistGate>
      {showInAppNotification &&
        <FlashMessage position="top" duration={3000} renderCustomContent={(data) => FlashNotification(data, onShowInAppNotification)} style={{ backgroundColor: 'transparent', top: - 40 }}
          onHide={() => onShowInAppNotification(false)} />}
      {!showInAppNotification &&
        <FlashMessage position="top" duration={3000} />}
    </Provider>
  );
};


export default App;

Typography.loadTypographies({
  ...Fonts,
  fw500: { fontWeight: '500' },
  lh60: { lineHeight: 60 },
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