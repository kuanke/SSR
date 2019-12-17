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
	const matchedRoutes = matchRoutes(routes, req.path);

	// console.log(matchedRoutes);
	const promises = [];
	matchedRoutes.forEach(item => {
		if (item.route.loadData) {
			promises.push(item.route.loadData(store));
		}
	});
	Promise.all(promises).then(() => {
        res.send(render(store, routes, req));
	});

});

const server = app.listen(3001);