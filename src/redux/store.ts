import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import RootState from './reducer'
import FilesystemStorage from 'redux-persist-filesystem-storage';

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  whitelist: ['user', 'offers', 'business', 'network'],
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, RootState)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false
    })
    if (__DEV__) {
      const createDebugger = require("redux-flipper").default;
      middlewares.push(createDebugger());
    }
    return middlewares
  }
})

export default store;