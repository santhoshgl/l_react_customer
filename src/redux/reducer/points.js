import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";
import { setLoading } from "./loading";


export const getRewardWallet = createAsyncThunk('points/getRewardWallet', async (params, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await apiRequest.get(`rewardWallet?id=${params?.userID}&hubID=${params?.hubID}&userType=customer`)
    dispatch(setLoading(false))
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    dispatch(setLoading(false))
    throw (error)
  }
})

export const getRewards = createAsyncThunk('points/getRewards', async (params, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await apiRequest.get(`rewards?customerID=${params?.userID}&hubID=${params?.hubID}`)
    dispatch(setLoading(false))
    return data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    dispatch(setLoading(false))
    throw (error)
  }
})

export const getRewardDetails = createAsyncThunk('points/getRewardDetails', async (rewardID, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await apiRequest.get(`rewards/${rewardID}`)
    dispatch(setLoading(false))
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    dispatch(setLoading(false))
    throw (error)
  }
})

export const pointsSlice = createSlice({
  name: 'points',
  initialState: { walletData: [], rewards: [], rewardDetails: {} },
  reducers: {},
  extraReducers: {
    [getRewardWallet.fulfilled]: (state, { payload }) => {
      state.walletData = payload
    },
    [getRewards.fulfilled]: (state, { payload }) => {
      state.rewards = payload
    },
    [getRewardDetails.fulfilled]: (state, { payload }) => {
      state.rewardDetails = payload
    }
  }
})

export const { } = pointsSlice.actions

export default pointsSlice.reducer
