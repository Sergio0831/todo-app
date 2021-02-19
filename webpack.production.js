const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(process.cwd(), 'dist'),
		publicPath: '',
	},
	mode: 'production',
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
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader?url=false',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['autoprefixer', {}]],
							},
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader?url=false',
					'resolve-url-loader',
					'sass-loader',
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
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new CssMinimizerPlugin(),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/images',
					to: path.resolve(__dirname, 'dist/images'),
				},
			],
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['mozjpeg', { quality: 30 }],
					['pngquant', { quality: [0.5, 0.5] }],
				],
			},
		}),
	],
};
