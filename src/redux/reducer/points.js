import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";
import SplashScreen from 'react-native-splash-screen';
import { setLoading } from "./loading";
import { onGetRouteNavigationData } from './user';


export const getRewardWallet = createAsyncThunk('points/getRewardWallet', async (params, { dispatch }) => {
  try {
    const data = await apiRequest.get(`rewardWallet?id=${params?.userID}&hubID=${params?.hubID}&userType=customer`)
    return data?.data;
  } catch (error) {
    // showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const getRewards = createAsyncThunk('points/getRewards', async (params, { dispatch }) => {
  try {
    let url = `rewards?customerID=${params?.userID}&hubID=${params?.hubID}&sortBy=${params?.sortBy}`;
    if (params?.url) {
      url = params?.url
    }
    const data = await apiRequest.get(url)
    return data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const getRewardDetails = createAsyncThunk('points/getRewardDetails', async (rewardID, { dispatch }) => {
  try {
    const data = await apiRequest.get(`rewards/${rewardID}`)
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})


export const onRewardInfo = createAsyncThunk('points/getRewardDetails', async (params, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await apiRequest.get(`rewards/${params?.rewardId}`)
    const navigationObj = { isNavigate: false }
    dispatch(onGetRouteNavigationData(navigationObj))
    dispatch(setLoading(false))
    dispatch(clearPassData())
    return data?.data;
  } catch (error) {
    SplashScreen.hide();
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})



export const pointsSlice = createSlice({
  name: 'points',
  initialState: { walletData: [], rewards: {}, rewardDetails: {}, rewardData: {}, clearState: false },
  reducers: {
    clearRewardData: (state, { payload }) => {
      state.rewardData = {}
    },
    onSetClearState:(state, { payload }) => {
      state.clearState = false
    },
    clearPassData:(state, { payload }) => {
      state.clearState = true
    },
  },
  extraReducers: {
    [getRewardWallet.fulfilled]: (state, { payload }) => {
      state.walletData = payload
    },
    [getRewards.fulfilled]: (state, { payload }) => {
      state.rewards = payload
    },
    [getRewardDetails.pending]: (state, { payload }) => {
      state.rewardDetails = {}
    },
    [getRewardDetails.fulfilled]: (state, { payload }) => {
      state.rewardDetails = payload
      state.clearState= true
    },
    [onRewardInfo.pending]: (state, { payload }) => {
      state.rewardData = {}
    },
    [onRewardInfo.fulfilled]: (state, { payload }) => {
      state.rewardData = payload
    }
  }
})

export const {clearRewardData, onSetClearState , clearPassData} = pointsSlice.actions

export default pointsSlice.reducer
