
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from './reducers/formReducers'

const rootReducer = combineReducers({
    formReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))