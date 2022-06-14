import { combineReducers } from '@reduxjs/toolkit'
import user from './user'
import loading from './loading'

const appReducer = combineReducers({
  user,
  loading
})


const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
