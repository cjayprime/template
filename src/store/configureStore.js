import {  createStore , applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    const logger = createLogger({
        collapsed: true
    })

    const middleware = [
        logger,
        thunk
    ]

    const enhancer = applyMiddleware(...middleware)

    const store = createStore(rootReducer, initialState, enhancer)

    return store
}
