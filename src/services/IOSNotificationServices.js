import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import { Platform } from 'react-native';

var senderId = firebase.app().options.messagingSenderId;

export const getToken = async () => {
  return await firebase
    .messaging()
    .getToken(senderId)
    .then(tokenData => {
      let deviceToken = {
        deviceType: Platform.OS,
        token: tokenData
      };
      return deviceToken
    })
    .catch(e => console.log(e));
};

export const requestPermissions = async () => {
 return await firebase
    .messaging()
    .requestPermission()
    .then((status) => {
      if (status === 1) {
        return status
        // console.log('Authorized', status);
      } else {
        return status
        // console.log('Not authorized');
      }
    })
    .catch(e => console.log(e));
};
export const onMessage = () => {
  firebase.messaging().onMessage(response => {
    // console.log("response", response)
  });
};
