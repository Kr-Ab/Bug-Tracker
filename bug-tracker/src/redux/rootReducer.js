import {combineReducers } from 'redux'
import userReducer from './userRedux/userReducer'

const rootReducer = combineReducers({
    user : userReducer,
})

export default rootReducer