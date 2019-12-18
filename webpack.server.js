const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const server = {
	target: 'node',
	mode: 'development',
	entry: './src/server/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	externals: [nodeExternals()],
	module: {
		rules: [{
			test: /\.css?$/,
			use: [
				'isomorphic-style-loader',
				{
					loader: 'css-loader',
					options: {
                        modules: true,
						importLoaders: 1
                    }
				}
			]
		}]
	}
}

module.exports = merge(base, server);