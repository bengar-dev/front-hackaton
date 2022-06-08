
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from './reducers/formReducers'
import userReducer from './reducers/userReducers'
import productReducer from './reducers/productReducers'

const rootReducer = combineReducers({
    formReducer,
    userReducer,
    productReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))