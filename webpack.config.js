const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/app.jsx',
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_BROWSER__: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devServer: {
    host: 'frontend',
    contentBase: 'public/',
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL | 'http://localhost:3001/',
        pathRewrite: { '^/api': '' }
      }
    }
  }
};