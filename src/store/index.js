import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer} from '../containers/Home/store';
import { reducer as headerReducer } from '../components/Header/store';
import { reducer as translationReducer } from '../containers/Translation/store';
import clientRequest from '../client/request'
import createInstance from '../server/request'

const reducer = combineReducers({
    home: homeReducer,
    header: headerReducer,
    translation: translationReducer
});

// 使用getStore，每次都会返回一个新的单例，对于服务端渲染，每个用户访问都必须返回一个新的单例对象，才能保证数据独立。
export const getStore = (req)=> {
    // createStore返回的是单例对象
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(createInstance(req))));
};

export const getClientStore = () => {
    const state = window.context.state;
    return createStore(reducer, state, applyMiddleware(thunk.withExtraArgument(clientRequest)));
};