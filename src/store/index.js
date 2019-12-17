import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as homeReducer} from '../containers/Home/store';

const reducer = combineReducers({
    home: homeReducer
});

// 使用getStore，每次都会返回一个新的单例，对于服务端渲染，每个用户访问都必须返回一个新的单例对象，才能保证数据独立。
export const getStore = ()=> {
    // createStore返回的是单例对象
    return createStore(reducer, applyMiddleware(thunk));
};

export const getClientStore = () => {
    const state = window.context.state;
    return createStore(reducer, state, applyMiddleware(thunk));
};