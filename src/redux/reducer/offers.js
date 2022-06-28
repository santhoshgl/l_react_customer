import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";
import store from "../store";
import { setLoading } from "./loading";


export const getOffers = createAsyncThunk('offers/getOffers', async (hubID) => {
  try {
    store.dispatch(setLoading(true))
    const data = await apiRequest.get(`hubs/${hubID}/offers`)
    store.dispatch(setLoading(false))
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    store.dispatch(setLoading(false))
    throw (error)
  }
})

export const offersSlice = createSlice({
  name: 'offers',
  initialState: { userData: null, defaultHub: {} },
  extraReducers: {
    [getOffers.fulfilled]: (state, { payload }) => {
      state.offerData = payload
    }
  }
})

export const { } = offersSlice.actions

export default offersSlice.reducer
