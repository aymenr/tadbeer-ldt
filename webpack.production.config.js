var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')
var config = require('./config')
var modeJS = path.join(__dirname, '/node_modules/ace-builds/src-noconflict/mode-javascript')
var sweetJS = path.join(__dirname, '/node_modules/@sweet-js/core/dist/sweet.js')


var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    __LOCAL_DEV__: false
})

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']

  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: 'js/bundle.js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin(['build']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8, 
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' /* chunkName= */ , filename: 'js/vendor.bundle.js' /* filename= */ }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // path.resolve(__dirname, 'build', 'index.html'),
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    }),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'raw-loader',
        include: path.join(__dirname, './src/wrappers')
      },
      { test: /\.sjs$/, loader: 'raw-loader' },
      { 
		test: /\.js$/, 
		loader: 'babel-loader', 
		include: path.join(__dirname, 'src'),
		query : {
          plugins: ['transform-class-properties'],
          presets: ['es2015']
        },
        exclude: /wrappers/
	  },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      'modeJS': modeJS
    },
    modules: ['node_modules']
  }
}
