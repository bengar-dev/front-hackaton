
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from './reducers/formReducers'
import userReducer from './reducers/userReducers'

const rootReducer = combineReducers({
    formReducer,
    userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))