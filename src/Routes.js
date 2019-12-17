import React from 'react';
import Home from './containers/Home';
import Translation from './containers/Translation';
import App from './App';

export default [{
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
        {
            path: '/home',
            component: Home,
            exact: true,
            loadData: Home.loadData,
            key: 'home'
        }, {
            path: '/translation',
            component: Translation,
            loadData: Translation.loadData,
            exact: true,
            key: 'translation'
        }
    ]
}]