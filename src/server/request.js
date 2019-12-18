import axios from 'axios';
import config from '../config'

// 往参数中加：params对象会报错。
const createInstance = (req) => axios.create({
    baseURL: 'http://47.95.113.63/ssr',
    headers: {
        cookie: req.get('cookie') || ''
    }
});

export default createInstance;