import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import apiRequest from '@services/networkProvider';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { showMessage } from "react-native-flash-message";
import { setLoading } from "./loading";


export const getUser = createAsyncThunk('user/getUser', async (param, { getState, requestId, dispatch }) => {
  try {
    dispatch(setLoading(true))
    const userId = await auth().currentUser?.uid;
    const user = await apiRequest.get(`users/${userId}`)
    dispatch(setLoading(false))
    return user?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    dispatch(setLoading(false))
    throw (error)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (param, { getState, requestId, dispatch }) => {
  try {
    dispatch(setLoading(true))
    const userId = await auth().currentUser?.uid;
    const data = { ...param }
    const user = await apiRequest.put(`users/${userId}`, { data })
    dispatch(setLoading(false))
    return user?.data;
  } catch (error) {
    showMessage({ message: error?.message, type: 'danger' })
    dispatch(setLoading(false))
    throw (error)
  }
})

export const updateImageProfile = createAsyncThunk('user/profileUpload', async (param, { getState, requestId, dispatch }) => {
  dispatch(setLoading(true))
  let updatedUser = { ...param.user };
  try {
    await storage().ref(`images/${updatedUser?.id}/${param?.image.name}`)
      .putFile(param?.image?.uri).then(async response => {
        const storageRef = await storage().ref()
        await storageRef.child(response.metadata.fullPath).getDownloadURL().then(async res => {
          updatedUser.profilePicture = res
          await dispatch(updateUser(updatedUser)).then(unwrapResult).then(async (result) => {
            await dispatch(getUser()).then(unwrapResult).then((response) => {
              dispatch(setLoading(false))
              return response
            })
          })
        }).catch(error => {
          dispatch(setLoading(false))
          throw (error)
        })
      }).catch(error => {
        showMessage({ message: error?.userInfo?.code ? error?.userInfo?.message : error?.message, type: 'danger' })
        dispatch(setLoading(false))
        throw (error)
      })
  } catch (error) {
    showMessage({ message: error?.userInfo?.code ? error?.userInfo?.message : error?.message, type: 'danger' })
    dispatch(setLoading(false))
    throw (error)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (param, { getState, requestId, dispatch }) => {
  try {
    dispatch(setLoading(true))
    const res = await auth().signInWithEmailAndPassword(param?.email, param?.password);
    const userId = res.user?.uid;
    const user = await apiRequest.get(`users/${userId}`)
    showMessage({ message: 'Login successfully.', type: 'success' })
    dispatch(setLoading(false))
    return user?.data;
  } catch (error) {
    showMessage({ message: error?.userInfo?.code ? error?.userInfo?.message : error?.message, type: 'danger' })
    dispatch(setLoading(false))
    await auth().signOut();
    throw (error)
  }
})

export const registerUser = createAsyncThunk('user/registerUser', async (param, { getState, requestId, dispatch }) => {
  try {
    dispatch(setLoading(true))
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
    dispatch(setLoading(false))
    return user?.data
  } catch (error) {
    if (error?.code === 'auth/email-already-in-use') {
      showMessage({ message: 'That email address is already in use!', type: 'danger' })
    }
    else if (error?.code === 'auth/invalid-email') {
      showMessage({ message: 'That email address is invalid!', type: 'danger' })
    }
    else showMessage({ message: 'Oh no it looks like there was some problem creating account, please contact support or try again', type: 'danger' })
    dispatch(setLoading(false))
    auth()?.currentUser?.delete()
    throw (error)
  }
})


export const registerNotificationToken = createAsyncThunk('user/registerNotificationToken', async (param, { getState, requestId, dispatch }) => {
  const userId = await auth().currentUser?.uid;
  const data = {
    pushNotificationTokens: param
  }
  try {
    dispatch(setLoading(true))
    const userNotificationToken = await apiRequest.patch(`users/${userId}`, { data });
    dispatch(setLoading(false))
    return userNotificationToken?.data;
  } catch (error) {
    dispatch(setLoading(false))
    throw (error)
  }
})




export const userSlice = createSlice({
  name: 'user',
  initialState: { userData: null, defaultHub: {}, deviceToken: {} },
  reducers: {
    onGetDeviceToken: (state, { payload }) => {
      state.deviceToken = payload
    },
    logout: (state, { payload }) => {
      state.userData = null;
      auth().signOut()
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.userData = payload
      state.defaultHub = payload?.hubs?.find(hub => hub.default === true);
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userData = payload
      state.defaultHub = payload?.hubs?.find(hub => hub.default === true);
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.userData = payload
      state.defaultHub = payload?.hubs?.find(hub => hub.default === true);
    },
    [registerNotificationToken.fulfilled]: (state, { payload }) => {
      // console.log()
      state.userData = payload
      state.defaultHub = payload?.hubs?.find(hub => hub.default === true);
    }
  }
})

export const { onGetDeviceToken, logout } = userSlice.actions

export default userSlice.reducer
