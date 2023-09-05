const path = require('path');
const glob = require('glob');

module.exports = {
  mode: 'production',
  entry: {
    client: glob.sync(path.resolve(__dirname, 'src', '**/*.ts')),
  },
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      fs: require.resolve('graceful-fs'),
      util: require.resolve('util/'),
      "stream": require.resolve("stream-browserify")
    },
  },
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
