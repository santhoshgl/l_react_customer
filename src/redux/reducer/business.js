import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';

const generateBusinessURL = (url, filter, search) => {
  if (search?.length)
    url = `${url}?search=${search}`;

  let operator = search?.length ? '&' : '?';

  if (filter?.sortBy?.length) {
    url = `${url}${operator}sortBy=${filter?.sortBy}`;
  }

  operator = (search?.length || filter?.sortBy?.length) ? '&' : '?';

  if (filter?.category?.length) {
    filter?.category?.forEach((item, index) => {
      if (index == 0)
        url = `${url}${operator}category=${item}`
      else
        url = `${url}&category=${item}`
    });
  }
  return url;
}


export const getBusiness = createAsyncThunk('business/getBusiness', async (hubID) => {
  try {
    const data = await apiRequest.get(`hubs/${hubID}/business?sortBy=category`)
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const getFilteredBusiness = createAsyncThunk('offers/getFilteredBusiness', async (params) => {
  try {
    const { hubId, search = null, filter = null } = params;
    let url = `hubs/${hubId}/business`;

    if (filter?.category?.length > 0 || filter?.sortBy?.length > 0 || search?.length) {
      url = generateBusinessURL(url, filter, search);
    }

    const data = await apiRequest.get(url);
    return data;
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
  const userID = await auth().currentUser?.uid;
  let data = { ...param, userID }
  const response = await apiRequest.post('followers/business', { data })
  return response?.data;
})

export const businessSlice = createSlice({
  name: 'business',
  initialState: { businessData: [], featuredBusinessData: [], businessLoading: false, featuredBusinessLoading: false, filteredBusiness: {} },
  reducers: {},
  extraReducers: {
    [getFeaturedBusiness.pending]: (state, { payload }) => {
      state.featuredBusinessLoading = true
    },
    [getFeaturedBusiness.fulfilled]: (state, { payload }) => {
      state.featuredBusinessData = payload
      state.featuredBusinessLoading = false
    },
    [getFeaturedBusiness.rejected]: (state, { payload }) => {
      state.featuredBusinessLoading = false
    },
    [getBusiness.pending]: (state, { payload }) => {
      state.businessLoading = true
    },
    [getBusiness.fulfilled]: (state, { payload }) => {
      state.businessData = payload
      state.businessLoading = false
    },
    [getBusiness.rejected]: (state, { payload }) => {
      state.businessLoading = false
    },
    [getFilteredBusiness.pending]: (state, { payload }) => {
      state.businessLoading = true
    },
    [getFilteredBusiness.fulfilled]: (state, { payload }) => {
      state.filteredBusiness = payload
      state.businessLoading = false
    },
    [getFilteredBusiness.rejected]: (state, { payload }) => {
      state.businessLoading = false
    },
  }
})

export const { } = businessSlice.actions

export default businessSlice.reducer
