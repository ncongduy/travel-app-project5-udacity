const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	output: {
		libraryTarget: 'var',
		library: 'Client',
	},
	mode: 'production',
	optimization: {
		minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/client/views/index.html',
			filename: './index.html',
			favicon: "favicon.ico",
		}),
		new WorkboxPlugin.GenerateSW(),
		new MiniCssExtractPlugin({ filename: '[name].css' }),
	],
};
