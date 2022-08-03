import { combineReducers } from '@reduxjs/toolkit'
import user from './user'
import offers from './offers'
import loading from './loading'
import business from './business'
import points from './points'
import network from './network'


const appReducer = combineReducers({
  user,
  loading,
  offers,
  business,
  points,
  network
})


const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
