import React, { memo, useEffect, useMemo } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import { showMessage } from 'react-native-flash-message';




const onGetRouteName = (notificationType) => {
    switch (notificationType) {

        case 'reward':
            return 'rewardDetails'
            break;

        case 'credit':
            return 'rewardDetails'
            break;

        case 'debit':
            return 'rewardDetails'
            break;
    
        default:
            return 'homeTab'

    }
}

export { onGetRouteName }