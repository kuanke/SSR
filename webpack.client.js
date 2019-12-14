const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const client = {
	target: 'node',
	mode: 'development',
	entry: './src/client/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'public')
	}
}

module.exports = merge(base, client);