var path              = require('path');
var webpack           = require('webpack');

module.exports = {
  entry: {
    'browser' : './src/editor/entry.js'
  },
  output: {
    path: __dirname + '/public',
    filename: '/bundle/[name].js',
    publicPath: '/public/',
    sourceMapFilename: '/bundle/[name].js.map'
  },
  resolve: {
    modulesDirectories: [__dirname + '/src', 'node_modules', 'bower_components', 'src', 'vendor', __dirname],
    extensions: ['', '.json', '.jsx', '.js']
  },
  devtool: 'inline-source-map',
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src')]
  },
  lazy: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  node: {
    __filename: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff)$/,
        loader: 'url-loader?limit=1000'
      },
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader?cache=true'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
          ignore: ['buffer']
        }
      }
    ]
  }
};
