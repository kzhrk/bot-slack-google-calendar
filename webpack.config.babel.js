import path from 'path';

export default {
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  devtool: (process.env.NODE_ENV === 'production')
    ? ''
    : 'inline-source-map',

  mode: process.env.NODE_ENV
};
