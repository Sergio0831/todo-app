'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'main.js',
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
		new ESLintPlugin({
			emitError: true,
		}),
	],
};
