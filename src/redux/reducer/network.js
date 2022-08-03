import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showMessage } from "react-native-flash-message";



export const onGetInternetStatus = createAsyncThunk('network/onGetInternetStatus', async (status, { getState, requestId, dispatch }) => {
  try {
    // !status || status !== null &&
    //  showOfflineMessage()
    return status
  } catch (error) {
    showMessage({ message: error, type: 'danger' })
  }
})

export const showOfflineMessage = () => {
  showMessage({ message: "You are offline", type: 'danger' })
}


export const networkSlice = createSlice({
  name: 'network',
  initialState: { isInternetReachable: true },
  reducers: {},
  extraReducers: {
    [onGetInternetStatus.fulfilled]: (state, { payload }) => {
      state.isInternetReachable = payload
    }
  }
})

export default networkSlice.reducer

