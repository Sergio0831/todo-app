const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) =>
	isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
	const configObj = {
		splitChunks: {
			chunks: 'all',
		},
	};

	if (isProd) {
		configObj.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin(),
		];
	}

	return configObj;
};

const plugins = () => {
	const basePlugins = [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `./css/${filename('css')}`,
		}),
	];

	if (isProd) {
		basePlugins.push(
			new ImageMinimizerPlugin({
				minimizerOptions: {
					plugins: [
						['mozjpeg', { quality: 30 }],
						['pngquant', { quality: [0.5, 0.5] }],
					],
				},
			})
		);
	}

	return basePlugins;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './js/index.js',
	output: {
		filename: `./js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist'),
		publicPath: '',
	},
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, 'dist'),
		open: true,
		hot: true,
		compress: true,
		port: 3000,
	},
	devtool: isProd ? false : 'source-map',
	module: {
		rules: [
			{
				test: /\.(?:|gif|svg|png|jpeg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `./images/${filename('[ext]')}`,
						},
					},
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
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
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: (resourcePath, context) => {
								return path.relative(path.dirname(resourcePath), context) + '/';
							},
						},
					},
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	optimization: optimization(),
	plugins: plugins(),
};
