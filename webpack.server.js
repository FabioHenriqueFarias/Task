const path = require('path');
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, 'server', 'server.ts'),
  },
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    module: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      fs: require.resolve('graceful-fs'),
      util: require.resolve('util/'),
    },
  },
  externals: [
    nodeExternals({
      allowlist: ['fs'], // Permite explicitamente o módulo 'fs'
    }),
    (context, request, callback) => {
      if (request === 'crypto') {
        return callback(null, 'crypto-browserify'); // Substitui 'crypto' por 'crypto-browserify' no ambiente do servidor
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
