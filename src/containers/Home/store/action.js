import { CHANGE_LIST } from './constants';

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
});

// http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE
export const getHomeList = () => {
    // request参数是通过redux-thunk的withExtraArgument(request)传递进来的,
    // 参考redux-thunk文档
    return (dispatch, getState, request) => {
        return request.get('/api/news.json?secret=PP87ANTIPIRATE').then((res) => {
            const list = res.data.data;
            dispatch(changeList(list));
        })
    };
};