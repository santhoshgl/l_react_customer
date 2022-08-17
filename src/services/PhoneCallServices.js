import { showMessage } from 'react-native-flash-message'
import call from 'react-native-phone-call'


export const onPhoneCall = (phoneNumber) => {
    const args = {
        number: phoneNumber, // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
    }
    call(args).catch((err) => {
        let errorMessage = console.error()
        showMessage({ message: err, type: 'danger' })
    })
}