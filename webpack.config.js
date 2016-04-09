var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};
const ENTRIES = ['index', 'user', 'share', 'about', 'discovery', 'temporary'];

process.env.BABEL_ENV = TARGET;

var common = {
  resolve: {
    alias: {
      'src': PATHS.app,
      'vendor': PATHS.app+"/vendor"
    },
    extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg', '.jpeg', '.gif',
      '.svg', '.woff', '.woff2', '.eot', '.ttf', '.json']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[local]'),
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: PATHS.app,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=5120&name=img/[hash:8].[name].[ext]',  // return Data URL if smaller than 5k, otherwise use file-loader
        //loader: "file-loader?name=img/[name]-[hash].[ext]",
        include: PATHS.app
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'url?limit=5120&name=fonts/[hash:8].[name].[ext]',  // use url-loader will make js files bigger
        //loader: "file-loader?name=img/[name]-[hash].[ext]",
        include: PATHS.app
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: PATHS.app
      }
    ]
  }
};
var commonPlugins = [
  //shim
  new webpack.ProvidePlugin({
    $: 'cmd-zepto',
    Zepto: 'cmd-zepto',
    BC: 'src/utils/broadcast'
  }),

  // for webpack optimize
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: ENTRIES,
    filename: 'js/[hash:8].[name].min.js'
  })
];

// dev
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    entry: path.join(PATHS.app, 'all.jsx'),
    output: {
      path: PATHS.build,
      publicPath: '/',
      filename: 'main.js'  // name of output file
    },
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      // host: process.env.HOST,
      host: '0.0.0.0',
      port: process.env.PORT
    },
    plugins: commonPlugins.concat([
      new HtmlWebpackPlugin({
        inject: 'body',
        filename: 'index.html',
        favicon: path.join(__dirname, '/src/img/favicon.ico'),
        template: path.join(__dirname, '/src/base.html')
      }),
      new ExtractTextPlugin('css/[hash:8].[name].css', {
        allChunks: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev')
      })
    ])
  });
}

// production
if(TARGET === 'build' || TARGET === 'build_dev' || TARGET === 'stats' || TARGET === 'deploy' || TARGET === 'deploy_dev') {
  var plugins = commonPlugins.concat([
    new CleanWebpackPlugin(['build'], {verbose: false}),
    new webpack.DefinePlugin({  // This affects react lib size
      'process.env.NODE_ENV': JSON.stringify(TARGET === 'build_dev' ? 'dev' : 'production')
    }),
    new ExtractTextPlugin('css/[hash:8].[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      sourceMap: false
    })
  ]);
  for (var i in ENTRIES) {
    var entry = ENTRIES[i];
    plugins.push(new HtmlWebpackPlugin({
      inject: 'body',
      filename: entry + '.html',
      chunks: [entry, 'common'],
      favicon: path.join(__dirname, '/src/img/favicon.ico'),
      template: path.join(__dirname, '/src/base.html')
    }));
  }

  module.exports = merge(common, {
    entry: {
      index: path.join(PATHS.app, 'index.jsx'),
      user: path.join(PATHS.app, 'user.jsx'),
      share: path.join(PATHS.app, 'share.jsx'),
      about: path.join(PATHS.app, 'about.jsx'),
      discovery: path.join(PATHS.app, 'discovery.jsx'),
      temporary: path.join(PATHS.app, 'temporary.jsx')
    },
    output: {
      path: PATHS.build,
      publicPath: TARGET === 'build_dev' ? '/' : 'http://7xpmif.com2.z0.glb.qiniucdn.com/',
      filename: 'js/[chunkhash:8].[name].min.js',
      chunkFilename: 'js/[chunkhash:8].chunk.min.js'
    },
    devtool: 'hidden-source-map',
    plugins: plugins
  });
}
