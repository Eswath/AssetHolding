import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware,routerReducer} from 'react-router-redux'
import {browserHistory} from 'react-router'
import rootReducer from "./reducer/RootReducer";
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewareHistory = routerMiddleware(browserHistory)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,middlewareHistory),routerReducer))
const AppRedux = () => (
    <Provider store = {store} >
        <App/>
    </Provider>
)
render(<AppRedux />, document.getElementById('root'));
