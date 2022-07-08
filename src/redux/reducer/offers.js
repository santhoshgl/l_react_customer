import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";


export const getOffers = createAsyncThunk('offers/getOffers', async (hubID) => {
  try {
    const data = await apiRequest.get(`hubs/${hubID}/offers`)
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const getFeaturedOffers = createAsyncThunk('offers/getFeaturedOffers', async (hubID) => {
  try {
    const data = await apiRequest.get(`hubs/${hubID}/offers?featured=true`)
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const offersSlice = createSlice({
  name: 'offers',
  initialState: { offerData: [], featuredOfferData: [], offerLoading: false },
  reducers: {},
  extraReducers: {
    [getFeaturedOffers.pending]: (state, { payload }) => {
      state.offerLoading = true
    },
    [getFeaturedOffers.fulfilled]: (state, { payload }) => {
      state.featuredOfferData = payload
      state.offerLoading = false
    },
    [getFeaturedOffers.rejected]: (state, { payload }) => {
      state.offerLoading = false
    },
    [getOffers.fulfilled]: (state, { payload }) => {
      state.offerData = payload
    },
  }
})

export const { } = offersSlice.actions

export default offersSlice.reducer
