import express from 'express';
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import {render} from './utils';
import {getStore} from '../store';
import routes from '../Routes'

const app = express();
app.use(express.static('public'));

app.use('/api', proxy('http://47.95.113.63', {
    proxyReqPathResolver: function (req) {
        return '/ssr/api' + req.url
    }
}));

app.get('*', function (req, res) {
	const store = getStore(req);
	// 匹配输入的路径，可显示多层级
	const matchedRoutes = matchRoutes(routes, req.path);

	const promises = [];
	matchedRoutes.forEach(item => {
		if (item.route.loadData) {
			const promise = new Promise(function (resolve, reject) {
                item.route.loadData(store).then(resolve).catch(resolve);
            });
			promises.push(promise);
		}
	});
	// promises都返回resolve状态才会执行then()
	Promise.all(promises).then(() => {
        // 得到最后一项路由的key值，事先在路由中写入key：404
        const lastRouteKey = matchedRoutes[matchedRoutes.length - 1].route.key;
        let context = {css: []};
        const html = render(store, routes, req, context);
        console.log(context.css + '----------')
		// 进入/translation页面，碰到<Redirect />，StaticRouter和renderRoutes结合时，如果发现有重定向标签，会
		// 向context对象中注入重定向的信息。
        if (context.action === 'REPLACE') {
			res.redirect(context.url);
			return;
		}
        if (lastRouteKey === '404') {
            res.status(404);
        }
        res.send(html);
	});

});

const server = app.listen(3001);