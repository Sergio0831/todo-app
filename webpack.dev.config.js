'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './src'),
		publicPath: '',
	},
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, './src'),
		index: 'index.html',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(svg|png|jpeg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images',
							publicPath: 'images',
							emitFile: true,
						},
					},
				],
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 25000,
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader?url=false'],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader?url=false',
					'resolve-url-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new StylelintPlugin({}),
	],
};
