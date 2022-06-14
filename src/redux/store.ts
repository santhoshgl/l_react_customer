import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import RootState from './reducer'
import FilesystemStorage from 'redux-persist-filesystem-storage';

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  whitelist: ['user' ],
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, RootState)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;