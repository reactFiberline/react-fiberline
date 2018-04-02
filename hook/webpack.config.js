const path = require('path');

module.exports = {
  entry: './src/AddHook.js',
  output: {
    filename: 'fiberlineHook.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // target: 'web' packs bundle for the web so it can be run in the HTML head
  target: 'web',
  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        use:{
          loader:'babel-loader',
          options: {
            presets: ['es2015'],
            // plugins: ["transform-class-properties"]
          },
        },
      },
    ],
  },

};
