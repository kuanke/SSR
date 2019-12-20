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
	},
    module: {
        rules: [{
            test: /\.css?$/,
            use: [
                {
                    loader: 'style-loader',
                    options: { injectType: 'singletonStyleTag' },
                },
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

module.exports = merge(base, client);