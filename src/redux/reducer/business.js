import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";
import store from "../store";
import { setLoading } from "./loading";


export const getBusiness = createAsyncThunk('business/getBusiness', async (hubID) => {
  try {
    store.dispatch(setBusinessLoading(true))
    const data = await apiRequest.get(`hubs/${hubID}/business`)
    store.dispatch(setBusinessLoading(false))
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    store.dispatch(setBusinessLoading(false))
    throw (error)
  }
})

export const businessSlice = createSlice({
  name: 'business',
  initialState: { businessData: [], businessLoading: false },
  reducers: {
    setBusinessLoading: (state, { payload }) => {
      state.businessLoading = payload
    },
  },
  extraReducers: {
    [getBusiness.fulfilled]: (state, { payload }) => {
      state.businessData = payload
    }
  }
})

export const { setBusinessLoading } = businessSlice.actions

export default businessSlice.reducer
