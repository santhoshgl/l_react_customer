import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import { showMessage } from "react-native-flash-message";

const generateOfferURL = (url, filter, search) => {
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

export const getOffers = createAsyncThunk('offers/getOffers', async (params) => {
  try {
    const { hubId } = params;
    let url = `hubs/${hubId}/offers?sortBy=category`;
    const data = await apiRequest.get(url);
    return data?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    throw (error)
  }
})

export const getFilteredOffers = createAsyncThunk('offers/getFilteredOffers', async (params) => {
  try {
    const { hubId, search = null, filter = null } = params;
    let url = `hubs/${hubId}/offers`;

    if (filter?.category?.length > 0 || filter?.sortBy?.length > 0 || search?.length) {
      url = generateOfferURL(url, filter, search);
    }

    const data = await apiRequest.get(url);
    return data;
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
  initialState: { offerData: [], featuredOfferData: [], offerLoading: false, filteredOffers: {} },
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
    [getFilteredOffers.fulfilled]: (state, { payload }) => {
      state.filteredOffers = payload
    },
  }
})

export const { } = offersSlice.actions

export default offersSlice.reducer
