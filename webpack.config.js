var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
var config = require('./config')
var modeJS = path.join(__dirname, '/node_modules/ace-builds/src-noconflict/mode-javascript')
var sweetJS = path.join(__dirname, '/node_modules/@sweet-js/core/dist/sweet.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

const host = process.env.IP || 'localhost'
const port = process.env.PORT || 3000

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */}),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'fbinstant',
        entry: 'https://connect.facebook.net/en_US/fbinstant.6.2.js',
        global: 'FBInstant'
      }]
    }),
    new BrowserSyncPlugin({
      host: host,
      port: port,
      server: {
        baseDir: ['./', './build']
      },
      https: true,
      open: 'external',
      host: 'www.facebook.com/embed/instantgames/' + config.FB_APP_ID + '/player?game_url=https://' + host
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'raw-loader',
        include: path.join(__dirname, './src/wrappers')
      },
      { test: /\.sjs$/,
        loader: 'raw-loader',
      },
      { 
		test: /\.js$/, 
		loader: 'babel-loader', 
        include: path.join(__dirname, './src'),
		query : {
			plugins: ['transform-class-properties']
        },
        exclude: /wrappers/
	  },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
      { test: /sweet\.js/, use: ['imports-loader?define=>false'] }
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
      //modules: ['node_modules']
  }
}
