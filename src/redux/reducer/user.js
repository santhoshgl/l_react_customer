import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiRequest from '@services/networkProvider';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import store from "../store";
import { setLoading } from "./loading";


export const getUser = createAsyncThunk('user/getUser', async (param, { getState, requestId }) => {
  try {
    store.dispatch(setLoading(true))
    const userId = await auth().currentUser?.uid;
    const user = await apiRequest.get(`users/${userId}`)
    store.dispatch(setLoading(false))
    return user?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    store.dispatch(setLoading(false))
    throw (error)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (param, { getState, requestId }) => {
  try {
    store.dispatch(setLoading(true))
    const userId = await auth().currentUser?.uid;
    const data = {...param}
    const user = await apiRequest.put(`users/${userId}`, { data })
    store.dispatch(setLoading(false))
    return user?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    store.dispatch(setLoading(false))
    throw (error)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (param, { getState, requestId }) => {
  try {
    store.dispatch(setLoading(true))
    const res = await auth().signInWithEmailAndPassword(param?.email, param?.password);
    const userId = res.user?.uid;
    const user = await apiRequest.get(`users/${userId}`)
    showMessage({ message: 'Login successfully.', type: 'success' })
    store.dispatch(setLoading(false))
    return user?.data;
  } catch (error) {
    showMessage({ message: error?.userInfo?.code ? error?.userInfo?.message : error?.message, type: 'danger' })
    store.dispatch(setLoading(false))
    await auth().signOut();
    throw (error)
  }
})

export const registerUser = createAsyncThunk('user/registerUser', async (param, { getState, requestId }) => {
  try {
    store.dispatch(setLoading(true))
    const res = await auth().createUserWithEmailAndPassword(param?.email, param?.password);
    const data = {
      id: res.user?.uid,
      firstName: param?.firstName,
      lastName: param?.lastName,
      phoneNumber: param?.phone,
      roles: ["customer"],
      email: param?.email,
      profilePicture: 'https://cdn.quasar.dev/img/boy-avatar.png',
    }
    const user = await apiRequest.post('users', { data })
    showMessage({ message: 'Your account has been created successfully.', type: 'success' })
    store.dispatch(setLoading(false))
    return user?.data
  } catch (error) {
    if (error?.code === 'auth/email-already-in-use') {
      showMessage({ message: 'That email address is already in use!', type: 'danger' })
    }
    else if (error?.code === 'auth/invalid-email') {
      showMessage({ message: 'That email address is invalid!', type: 'danger' })
    }
    else showMessage({ message: 'Oh no it looks like there was some problem creating account, please contact support or try again', type: 'danger' })
    store.dispatch(setLoading(false))
    auth()?.currentUser?.delete()
    throw (error)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: { userData: null },
  reducers: {
    logout: (state, { payload }) => {
      state.userData = null
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.userData = payload
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userData = payload
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.userData = payload
    }
  }
})

export const { } = userSlice.actions

export default userSlice.reducer
