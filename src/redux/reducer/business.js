import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';

export const getBusiness = createAsyncThunk('business/getBusiness', async (hubID) => {
  try {
    const data = await apiRequest.get(`hubs/${hubID}/business`)
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const getFeaturedBusiness = createAsyncThunk('business/getFeaturedBusiness', async (hubID) => {
  try {
    const data = await apiRequest.get(`hubs/${hubID}/business?featured=true`)
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const onFollowBusiness = createAsyncThunk('followers/business', async (param) => {
  const userId = await auth().currentUser?.uid;
  let data = { ...param, userId }
  const response = await apiRequest.post('followers/business', { data })
  return response?.data;
})

export const businessSlice = createSlice({
  name: 'business',
  initialState: { businessData: [], featuredBusinessData: [], businessLoading: false },
  reducers: {},
  extraReducers: {
    [getFeaturedBusiness.pending]: (state, { payload }) => {
      state.businessLoading = true
    },
    [getFeaturedBusiness.fulfilled]: (state, { payload }) => {
      state.featuredBusinessData = payload
      state.businessLoading = false
    },
    [getFeaturedBusiness.rejected]: (state, { payload }) => {
      state.businessLoading = false
    },
    [getBusiness.fulfilled]: (state, { payload }) => {
      state.businessData = payload
    },
  }
})

export const { } = businessSlice.actions

export default businessSlice.reducer
